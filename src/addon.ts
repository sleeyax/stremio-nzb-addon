import {
  AddonBuilder,
  AddonInterface,
  Manifest,
  ManifestCatalog,
  Stream,
} from "@stremio-addon/sdk";
import { NzbHydraAddonConfig, Item, NzbAddonConfig } from "./types.js";
import { NZBWebApiPool } from "./nzb-api.js";

export function createAddonInterface(
  manifest: Manifest,
  catalog: ManifestCatalog,
  name: string,
): AddonInterface {
  const builder = new AddonBuilder(manifest);

  builder.defineStreamHandler<NzbHydraAddonConfig | NzbAddonConfig>(
    async ({ config: rawConfig, id, type }) => {
      try {
        const config = normalizeConfig(rawConfig);
        const api = new NZBWebApiPool(config.indexers);
        let items: Item[] | undefined;

        if (type === "movie") {
          const imdbid = id.replace("tt", "");
          items = await api.searchMovie(imdbid);
        } else if (type === "series") {
          const [imdbIdWithPrefix, season, episode] = id.split(":");
          const imdbId = imdbIdWithPrefix.replace("tt", "");

          const tvdbId = await imdbToTvdb(`tt${imdbId}`);
          if (tvdbId) {
            items = await api.searchSeries(tvdbId, season, episode);
          } else {
            console.warn(`Could not find TVDB ID for IMDB: tt${imdbId}`);
          }
        } else {
          console.warn("Unsupported ", `type '${type}' with id ${id}`);
        }

        const nntpServers = config.nntpServers.map(({ server }) => server);
        const streams: Stream[] = (items ?? []).map((item) =>
          itemToStream(item, nntpServers, name),
        );

        console.log(`Found ${streams.length} streams for ${type} ${id}`);

        return { streams, cacheMaxAge: 3600 };
      } catch (err: any) {
        console.error(`Unexpected error in stream handler: ${err.message}`);
        throw err;
      }
    },
  );

  builder.defineCatalogHandler(async ({ extra: { search } }) => {
    try {
      const searchQuery = search?.trim() || "";

      if (!searchQuery) {
        return { metas: [] };
      }

      return {
        metas: [
          {
            id: `${catalog.id}:${encodeURIComponent(searchQuery)}`,
            name: searchQuery,
            type: "tv",
            logo: manifest.logo,
            background: manifest.background,
            posterShape: "square",
            poster: manifest.logo,
            description: `Provides search results from ${manifest.name} for '${search}'`,
          },
        ],
        cacheMaxAge: 3600 * 24 * 30, // The returned data is static so it may be cached for a long time (30 days).
      };
    } catch (err: any) {
      console.error(`Unexpected error in catalog handler: ${err.message}`);
      throw err;
    }
  });

  builder.defineMetaHandler<NzbHydraAddonConfig | NzbAddonConfig>(
    async ({ id, config: rawConfig }) => {
      try {
        const config = normalizeConfig(rawConfig);

        if (!id.startsWith(catalog.id + ":")) {
          return {
            meta: { id, name: catalog.name, type: "tv" },
          };
        }

        const searchQuery = decodeURIComponent(
          id.replace(catalog.id + ":", ""),
        );
        const nntpServers = config.nntpServers.map(({ server }) => server);
        const api = new NZBWebApiPool(config.indexers);
        const items = await api.search(searchQuery);

        return {
          meta: {
            id,
            name: catalog.name,
            type: "tv",
            videos: (items ?? []).map((item) => ({
              id: `${catalog.id}:${item.id}`,
              title: item.title,
              overview: item.description,
              released: new Date(item.pubDate).toISOString(),
              streams: [itemToStream(item, nntpServers, name)],
            })),
          },
          cacheMaxAge: 3600,
        };
      } catch (err: any) {
        console.error(`Unexpected error in meta handler: ${err.message}`);
        throw err;
      }
    },
  );

  const addonInterface = builder.getInterface();

  return addonInterface;
}

function itemToStream(item: Item, servers: string[], name: string): Stream {
  const size = getItemSize(item);
  const sizeStr = size ? toHumanFileSize(size) + "\n" : "";
  return {
    title: `${item.title}\n${sizeStr}${item.category}`,
    name,
    nzbUrl: getNzbUrlFromItem(item),
    servers,
    behaviorHints: {
      filename: item.title,
      videoSize: size,
    }
  };
}

function getNzbUrlFromItem(item: Item): string {
  return (
    item.link?.split("&amp;").join("&") || item.enclosure["@attributes"].url
  );
}

function toHumanFileSize(size: number): string {
  if (size === 0) {
    return "0 B";
  }
  const i = Math.floor(Math.log(size) / Math.log(1024));
  return `${Number((size / Math.pow(1024, i)).toFixed(2))} ${
    ["B", "kB", "MB", "GB", "TB"][i]
  }`;
}

const _imdbTvdbCache: Record<string, string> = {}; // TODO: implement proper caching mechanism
async function imdbToTvdb(imdbId: string): Promise<string | null> {
  if (_imdbTvdbCache[imdbId]) {
    return _imdbTvdbCache[imdbId];
  }

  try {
    const response = await fetch(
      `https://thetvdb.com/api/GetSeriesByRemoteID.php?imdbid=${imdbId}`,
    );
    const text = await response.text();

    // Parse XML to extract series ID
    const match = text.match(/<seriesid>(\d+)<\/seriesid>/);
    if (match && match[1]) {
      _imdbTvdbCache[imdbId] = match[1];
      return match[1];
    }
  } catch (err) {
    console.error("Failed to convert IMDB to TVDB:", err);
  }

  return null;
}

function getItemSize(item: Item): number {
  const attr = item.attr || [];
  const sizeAttr = attr.find((el) => el["@attributes"]?.name === "size");
  return sizeAttr ? parseInt(sizeAttr["@attributes"].value, 10) || 0 : 0;
}

function normalizeConfig(
  config: NzbHydraAddonConfig | NzbAddonConfig,
): NzbAddonConfig {
  if ("indexerUrl" in config && "indexerApiKey" in config) {
    // Convert NzbHydraAddonConfig to NzbAddonConfig.
    return {
      indexers: [
        {
          url: config.indexerUrl,
          apiKey: config.indexerApiKey,
        },
      ],
      nntpServers: config.nntpServers,
    };
  }
  return config;
}

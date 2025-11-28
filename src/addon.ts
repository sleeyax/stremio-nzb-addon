import {
  AddonBuilder,
  AddonInterface,
  Manifest,
  ManifestCatalog,
  MetaPreview,
  Stream,
} from "@stremio-addon/sdk";
import { NzbHydraAddonConfig, Item } from "./types.js";
import { NZBWebApi } from "./nzb-api.js";

export function createAddonInterface(
  manifest: Manifest,
  catalog: ManifestCatalog,
  name: string
): AddonInterface {
  const builder = new AddonBuilder(manifest);

  builder.defineStreamHandler<NzbHydraAddonConfig>(
    async ({ config, id, type }) => {
      try {
        const nntpServers = config.nttpServers.map(({ server }) => server);

        if (id.startsWith(catalog.id + ":")) {
          const encodedUrl = id.replace(catalog.id + ":", "");
          const url = decodeURIComponent(encodedUrl);
          return {
            streams: [{ nzbUrl: url, servers: nntpServers, name, title: "Stream" }],
          };
        }

        const api = new NZBWebApi(config.indexerUrl, config.indexerApiKey);
        let items: Item[] = [];

        if (type === "movie") {
          const imdbid = id.replace("tt", "");
          const { channel } = await api.searchMovie(imdbid);
          items = channel.item || [];
        } else if (type === "series") {
          const [imdbIdWithPrefix, season, episode] = id.split(":");
          const imdbId = imdbIdWithPrefix.replace("tt", "");

          const tvdbId = await imdbToTvdb(`tt${imdbId}`);
          if (tvdbId) {
            const { channel } = await api.searchSeries(tvdbId, season, episode);
            items = channel.item || [];
          } else {
            console.warn(`Could not find TVDB ID for IMDB: tt${imdbId}`);
          }
        } else {
          console.warn("Unsupported ", `type '${type}' with id ${id}`);
          return { streams: [], cacheMaxAge: 0, staleRevalidate: 0 };
        }

        const streams: Stream[] = items.map((item) =>
          itemToStream(item, nntpServers, name)
        );

        console.log(`Found ${streams.length} streams for ${type} ${id}`);

        return { streams, cacheMaxAge: 0, staleRevalidate: 0 };
      } catch (err: any) {
        console.error(`Unexpected error in stream handler: ${err.message}`);
        throw err;
      }
    }
  );

  builder.defineCatalogHandler<NzbHydraAddonConfig>(
    async ({ config, extra: { search } }) => {
      try {
        if (search == null || search.trim() === "") {
          console.warn("No search query provided");
          return { metas: [], cacheMaxAge: 0, staleRevalidate: 0 };
        }

        const api = new NZBWebApi(config.indexerUrl, config.indexerApiKey);
        const { channel } = await api.search(search);

        const metas: MetaPreview[] = channel.item.map((item) => ({
          id: `${catalog.id}:${encodeURIComponent(getNzbUrlFromItem(item))}`,
          type: "tv",
          name: item.title,
          description: item.description,
        }));

        return { metas, cacheMaxAge: 0, staleRevalidate: 0 };
      } catch (err: any) {
        console.error(`Unexpected error in catalog handler: ${err.message}`);
        throw err;
      }
    }
  );

  builder.defineMetaHandler<NzbHydraAddonConfig>(async ({ id }) => {
    try {
      return {
        meta: { id, name: catalog.name, type: "tv" },
        cacheMaxAge: 0,
        staleRevalidate: 0,
        staleError: 0,
      };
    } catch (err: any) {
      console.error(`Unexpected error in meta handler: ${err.message}`);
      throw err;
    }
  });

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
  };
}

function getNzbUrlFromItem(item: Item): string {
  return (
    item.link?.split("&amp;").join("&") || item.enclosure["@attributes"].url
  );
}

export function toHumanFileSize(size: number): string {
  if (size === 0) {
    return "0 B";
  }
  const i = Math.floor(Math.log(size) / Math.log(1024));
  return `${Number((size / Math.pow(1024, i)).toFixed(2))} ${
    ["B", "kB", "MB", "GB", "TB"][i]
  }`;
}

const _imdbTvdbCache: Record<string, string> = {}; // TODO: implement proper caching mechanism
export async function imdbToTvdb(imdbId: string): Promise<string | null> {
  if (_imdbTvdbCache[imdbId]) {
    return _imdbTvdbCache[imdbId];
  }

  try {
    const response = await fetch(
      `https://thetvdb.com/api/GetSeriesByRemoteID.php?imdbid=${imdbId}`
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

export function getItemSize(item: Item): number {
  const attr = item.attr || [];
  const sizeAttr = attr.find((el) => el["@attributes"]?.name === "size");
  return sizeAttr ? parseInt(sizeAttr["@attributes"].value, 10) || 0 : 0;
}

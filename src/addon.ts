import { AddonBuilder, MetaPreview, Stream } from "@stremio-addon/sdk";
import { catalog, manifest } from "./manifest.js";
import { AddonConfig, Item } from "./types.js";
import { NZBWebApi } from "./nzb-api.js";
import { getNttpServers, toHumanFileSize, imdbToTvdb, getItemSize } from "./utils.js";

const builder = new AddonBuilder(manifest);

function itemToStream(item: Item, nttpServers: string): Stream {
  const size = getItemSize(item);
  const sizeStr = size ? toHumanFileSize(size) + "\n" : "";
  return {
    title: `${item.title}\n${sizeStr}${item.category}`,
    name: "NZB",
    nzbUrl: item.link?.split("&amp;").join("&") || item.enclosure["@attributes"].url,
    servers: getNttpServers(nttpServers),
  };
}

builder.defineStreamHandler<AddonConfig>(async ({config, id, type}) => {
  try {
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
      console.warn("Unsupported type:", type);
      return ({ streams: [], cacheMaxAge: 0, staleRevalidate: 0 });
    }

    const streams: Stream[] = items.map((item) => itemToStream(item, config.nttpServers));

    console.log(`Found ${streams.length} streams for ${type} ${id}`);

    return ({ streams, cacheMaxAge: 0, staleRevalidate: 0 });
  } catch (err: any) {
    console.error(`Unexpected error in stream handler: ${err.message}`);
    throw err;
  }
});


builder.defineCatalogHandler<AddonConfig>(async ({config, extra: {search}}) => {
   try {
    if (search == null || search.trim() === "") {
      console.warn("No search query provided");
      return { metas: [], cacheMaxAge: 0, staleRevalidate: 0 };
    }

    const api = new NZBWebApi(config.indexerUrl, config.indexerApiKey);
    const { channel } = await api.search(search);

    const metas: MetaPreview[] = channel.item.map((item) => ({
      id: `${catalog.id}:${encodeURIComponent(
        item.enclosure["@attributes"].url
      )}`,
      type: "tv",
      name: item.title,
      description: item.description,
    }));

    return ({ metas, cacheMaxAge: 0, staleRevalidate: 0 });
  } catch (err: any) {
    console.error(`Unexpected error in catalog handler: ${err.message}`);
    throw err;
  }
});

builder.defineMetaHandler<AddonConfig>(async ({id}) => {
  try {
    return ({
      meta: { id, name: "Test", type: "tv" },
      cacheMaxAge: 0,
      staleRevalidate: 0,
      staleError: 0,
    });
  } catch (err: any) {
    console.error(`Unexpected error in meta handler: ${err.message}`);
    throw err;
  }
});

export const addonInterface = builder.getInterface();

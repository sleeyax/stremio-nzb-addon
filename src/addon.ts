import { AddonBuilder, MetaPreview, Stream } from "@stremio-addon/sdk";
import { catalog, manifest } from "./manifest.js";
import { AddonConfig } from "./types.js";
import { NZBWebApi } from "./nzb-api.js";

const builder = new AddonBuilder(manifest);

builder.defineStreamHandler<AddonConfig>(async (args) => {
  try {
    console.log(args);
    const imdbid = args.id.replace("tt", "");
    const config = args.config;

    if (args.type !== "movie") {
      console.warn("Unsupported type:", args.type);
      return ({ streams: [], cacheMaxAge: 0, staleRevalidate: 0 });
    }

    const api = new NZBWebApi(config.indexerUrl, config.indexerApiKey);
    const { channel } = await api.searchMovie(imdbid);

    const streams: Stream[] = channel.item.map((item) => ({
      description: `${item.title}\n${item.category}`,
      name: `NZB`,
      nzbUrl: item.enclosure["@attributes"].url,
    }));

    console.log(`Found ${streams.length} streams`);

    return ({ streams, cacheMaxAge: 0, staleRevalidate: 0 });
  } catch (err: any) {
    console.error(`Unexpected error in stream handler: ${err.message}`);
    throw err;
  }
});


builder.defineCatalogHandler<AddonConfig>(async (args) => {
   try {
    console.log(args);
    const config = args.config;
    const extra = args.extra
    const searchQuery = extra.search;

    if (searchQuery == null || searchQuery.trim() === "") {
      console.warn("No search query provided");
      return { metas: [], cacheMaxAge: 0, staleRevalidate: 0 };
    }

    const api = new NZBWebApi(config.indexerUrl, config.indexerApiKey);
    const { channel } = await api.search(searchQuery);

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

builder.defineMetaHandler<AddonConfig>(async (args) => {
  try {
    console.log(args);

    return ({
      meta: { id: args.id, name: "Test", type: "tv" },
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

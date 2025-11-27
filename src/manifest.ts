import { Manifest, ManifestCatalog } from "@stremio-addon/sdk";

export const catalog: ManifestCatalog = {
  id: "nzb",
  name: "NZB",
  type: "tv",
  extra: [{ name: "search" }],
};

export const manifest: Manifest = {
  id: "com.sleeyax.stremio-nzb-addon",
  name: "NZB addon",
  description: "Usenet FTW",
  version: "1.0.0",
  resources: [
    "catalog",
    { name: "meta", types: ["movie"], idPrefixes: ["nzb"] },
    { name: "stream", types: ["movie", "series"], idPrefixes: ["tt"] },
  ],
  types: ["movie", "series", "tv"],
  catalogs: [catalog],
  config: [
    { key: "indexerUrl", type: "text", title: "Indexer URL" },
    { key: "indexerApiKey", type: "text", title: "Indexer API key" },
  ],
  behaviorHints: { configurable: true, configurationRequired: true },
};

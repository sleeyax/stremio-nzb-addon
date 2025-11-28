import { Manifest, ManifestCatalog } from "@stremio-addon/sdk";
import { Config } from "../types.js";

export const catalog: ManifestCatalog = {
  id: "nzbh",
  name: "NZBHydra 2 Search Results",
  type: "tv",
  extra: [{ name: "search" }],
};

export const manifest: Manifest = {
  id: "com.sleeyax.nzbhydra",
  name: "NZBHydra 2",
  description: "Provides usenet streams from your NZBHydra 2 instance",
  logo: "https://raw.githubusercontent.com/theotherp/nzbhydra2/c06734c1489b361680dbae6f6cef2fc9841121d2/core/ui-src/img/banner-grey-dark.png",
  version: "1.0.1",
  resources: [
    "catalog",
    { name: "meta", types: [catalog.type], idPrefixes: [catalog.id] },
    { name: "stream", types: ["movie", "series", "tv"], idPrefixes: ["tt", catalog.id] },
  ],
  types: ["movie", "series", "tv"],
  catalogs: [catalog],
  behaviorHints: { configurable: true, configurationRequired: true },
};

export const config: Config = {
  fields: [
    { key: "indexerUrl", type: "text", title: "Indexer URL", required: true },
    {
      key: "indexerApiKey",
      type: "password",
      title: "Indexer API key",
      required: true,
    },
    {
      key: "nttpServers",
      type: "array",
      title: "NNTP Servers",
      required: true,
      arrayOptions: [
        { key: "server", type: "text", title: "URL", required: true },
      ]
    },
  ],
};

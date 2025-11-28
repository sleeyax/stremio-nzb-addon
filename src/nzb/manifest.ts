import { Manifest, ManifestCatalog } from "@stremio-addon/sdk";
import { Config } from "../types.js";

export const catalog: ManifestCatalog = {
  id: "nzb",
  name: "NZB Search Results",
  type: "tv",
  extra: [{ name: "search" }],
};

export const manifest: Manifest = {
  id: "com.sleeyax.nzb",
  name: "NZB",
  description: "Provides usenet streams from your NZB indexer(s)",
  logo: "https://raw.githubusercontent.com/nzbget/nzbget/5e26d52d706f129769e1d620a595c78498ca8cff/webui/img/favicon-256x256.png",
  version: "1.0.0",
  resources: [
    "catalog",
    { name: "meta", types: [catalog.type], idPrefixes: [catalog.id] },
    {
      name: "stream",
      types: ["movie", "series", "tv"],
      idPrefixes: ["tt", catalog.id],
    },
  ],
  types: ["movie", "series", "tv"],
  catalogs: [catalog],
  behaviorHints: { configurable: true, configurationRequired: true },
};

export const config: Config = {
  fields: [
    {
      key: "indexers",
      type: "array",
      title: "Indexers",
      required: true,
      arrayOptions: [
        {
          key: "url",
          type: "text",
          title: "Indexer URL",
          placeholder: "https://api.example.com",
          required: true,
        },
        {
          key: "apiKey",
          type: "password",
          title: "Indexer API key",
          placeholder: "abcd1234efgh5678ijkl9012mnop3456",
          required: true,
        },
      ],
    },
    {
      key: "nntpServers",
      type: "array",
      title: "NNTP Servers",
      required: true,
      arrayOptions: [
        {
          key: "server",
          type: "text",
          title: "URL",
          placeholder: "nntps://username:password@example.com/4",
          required: true,
        },
      ],
    },
  ],
};

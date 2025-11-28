import { Config, Item } from "./types.js";
import { getRouter } from "@stremio-addon/node-express";
import { Router } from "express";
import { landingTemplate } from "./configure.js";
import { AddonInterface, Manifest, Stream } from "@stremio-addon/sdk";

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

export function createRouter(manifest: Manifest, addonInterface: AddonInterface, config: Config): Router {
  const router: Router = Router();
  
  router.use("/", getRouter(addonInterface));
  router.get("/", (req, res) => res.redirect(`${req.baseUrl}/configure`));
  
  router.get("/:configure/configure", (_, res) => {
    res.send(landingTemplate(manifest, config));
  });
  
  router.get("/configure", (_, res) => {
    res.send(landingTemplate(manifest, config));
  });
  
  return router;
}

export function itemToStream(item: Item, servers: string[], name: string): Stream {
  const size = getItemSize(item);
  const sizeStr = size ? toHumanFileSize(size) + "\n" : "";
  return {
    title: `${item.title}\n${sizeStr}${item.category}`,
    name,
    nzbUrl: item.link?.split("&amp;").join("&") || item.enclosure["@attributes"].url,
    servers
  };
}

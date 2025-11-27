import { Item } from "./types";

export function getNttpServers(value: string): string[] {
  return value
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
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

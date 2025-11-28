import { createAddonInterface } from "../addon";
import { catalog, manifest } from "./manifest";

export const addonInterface = createAddonInterface(manifest, catalog, "NZBH");

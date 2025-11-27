import { getRouter } from "@stremio-addon/node-express";
import { addonInterface } from "./addon.js";
import express from "express";
import { landingTemplate } from "@stremio-addon/compat";
import { manifest } from "./manifest.js";

const app = express();
const port = process.env.PORT ? +process.env.PORT : 3000;

app.use("/", getRouter(addonInterface));
app.get("/", (_, res) => res.redirect("/configure"));

app.listen(port, () => {
  console.log(`Addon listening at http://localhost:${port}`);
});

app.get("/:configure/configure", (_, res) => {
  res.send(landingTemplate(manifest));
});

app.get("/configure", (_, res) => {
  res.send(landingTemplate(manifest));
});

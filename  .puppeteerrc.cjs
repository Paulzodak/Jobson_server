// const { join } = require("path");
import { join } from "path";
/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
  // Changes the cache location for Puppeteer.
  cacheDirectory: join("/puppeteer", ".cache", "puppeteer"),
};

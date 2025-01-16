import { ForgeClient, ForgeExtension } from "@tryforge/forgescript";

export class FSSelfbot extends ForgeExtension {
  name: string = "FSSelfbot";
  description: string = require("../package.json").description;
  version: string = require("../package.json").version;

  init(client: ForgeClient): void {}
}

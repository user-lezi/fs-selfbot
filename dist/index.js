"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FSSelfbot = void 0;
const forgescript_1 = require("@tryforge/forgescript");
const Manager_1 = require("./core/Manager");
class FSSelfbot extends forgescript_1.ForgeExtension {
    name = "FSSelfbot";
    description = require("../package.json").description;
    version = require("../package.json").version;
    options;
    manager = new Manager_1.Manager();
    constructor(opts = {}) {
        super();
        if (!opts.userTokens)
            throw new Error(`No user tokens are provided.`);
        if (!(Array.isArray(opts.userTokens) &&
            opts.userTokens.every((x) => typeof x == "string")))
            throw new TypeError(`Expected userTokens value to be array of user tokens (string). Got ${typeof opts.userTokens}`);
        if (!opts.cacheDuration) {
            opts.cacheDuration = 10 * 60 * 1000;
        }
        else {
            if (!(typeof opts.cacheDuration === "number" &&
                Number.isInteger(opts.cacheDuration)))
                throw new TypeError(`Expected cacheDuration to be an integer`);
            if (opts.cacheDuration < 1000)
                throw new Error("Please make cacheDuration more than a second");
        }
        this.options = {
            cacheDuration: opts.cacheDuration,
        };
        this.manager.cacheDuration = opts.cacheDuration;
        opts.userTokens.forEach((token) => this.manager.addUserToken(token));
    }
    async init(client) {
        client.selfBotManager = this.manager;
        this.load(`${__dirname}/functions`);
        let results = await this.manager.validate();
        let err = "";
        for (let i = 0; i < results.length; i++) {
            const [valid, token, message] = results[i];
            let args = [message];
            if (valid) {
                let info = await this.manager.getTokenInfo(token);
                args.push(`\n\tUsername: ${info.username} | Email: ${info.email ? "Verified" : "Not verified"} | Phone: ${info.phone ? "Verified" : "Not verified"}`);
            }
            else
                err = token;
            forgescript_1.Logger[valid ? "info" : "warn"](...args);
        }
        if (err)
            throw new Error(`Found invalid token [${err}]\n` +
                (await this.manager
                    .getTokenInfo(err)
                    .then(() => ":p")
                    .catch((e) => e.message)));
    }
}
exports.FSSelfbot = FSSelfbot;
__exportStar(require("./typings"), exports);
__exportStar(require("./core"), exports);
//# sourceMappingURL=index.js.map
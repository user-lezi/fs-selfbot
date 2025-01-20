"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const typings_1 = require("../../typings");
exports.default = new forgescript_1.NativeFunction({
    name: "$clearRequesterCache",
    version: "1.0.0",
    description: "Clears the cache from the Requester class.",
    unwrap: true,
    brackets: true,
    args: [
        forgescript_1.Arg.optionalEnum(typings_1.RequesterCacheType, "type", "The type of cache to clear"),
    ],
    execute(ctx, [type]) {
        ctx.client.selfBotManager.requester.clearCache(type ?? "all");
        return this.success();
    },
});
//# sourceMappingURL=clearRequesterCache.js.map
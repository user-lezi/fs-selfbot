"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: "$userTokenCount",
    version: "1.0.0",
    description: "Returns the amount of user tokens the extension has.",
    output: forgescript_1.ArgType.Number,
    unwrap: false,
    execute(ctx) {
        return this.success(ctx.client.selfBotManager.userTokens.length);
    },
});
//# sourceMappingURL=userTokenCount.js.map
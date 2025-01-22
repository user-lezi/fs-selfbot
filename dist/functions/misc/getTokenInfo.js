"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
    name: "$getTokenInfo",
    version: "1.0.2",
    description: "Get info about the token from the provided name.",
    brackets: true,
    args: [
        forgescript_1.Arg.requiredString("name", "The saved name for the token to get info of."),
        forgescript_1.Arg.optionalString("env", "The env variable name to load info to."),
    ],
    output: forgescript_1.ArgType.String,
    unwrap: true,
    async execute(ctx, [name, env]) {
        let extension = ctx.client.getExtension(__1.FSSelfbot, true);
        let token = extension.getTokenFromName(name);
        if (!token)
            return this.customError(`The token with name "${name}" not found.`);
        try {
            let json = await ctx.client.selfBotManager.getTokenInfo(token);
            if (!json)
                return this.success(null);
            if (env) {
                ctx.setEnvironmentKey(env, json);
                return this.success();
            }
            else
                return this.successJSON(json);
        }
        catch (err) {
            return this.customError(err.message);
        }
    },
});
//# sourceMappingURL=getTokenInfo.js.map
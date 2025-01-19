"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: "$getUserProfileInfo",
    version: "1.0.0",
    description: "Returns the user profile info.",
    output: forgescript_1.ArgType.String,
    unwrap: true,
    brackets: true,
    args: [
        forgescript_1.Arg.requiredUser("user", "The user to get info of."),
        forgescript_1.Arg.optionalBoolean("force", "Force to fetch new info rather than using from cache"),
        forgescript_1.Arg.optionalString("env", "The env variable name to load info to."),
    ],
    async execute(ctx, [user, force, env]) {
        let id = user.id;
        try {
            let json = await ctx.client.selfBotManager.requester.getUserProfileInfo({
                id,
                force: force ?? false,
            });
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
//# sourceMappingURL=getUserProfileInfo.js.map
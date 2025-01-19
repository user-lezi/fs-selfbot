"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: "$getUserInfo",
    version: "1.0.0",
    description: "Returns the user info.",
    output: forgescript_1.ArgType.String,
    unwrap: true,
    brackets: false,
    args: [
        forgescript_1.Arg.optionalUser("user", "The user to get info of."),
        forgescript_1.Arg.optionalBoolean("force", "Force to fetch new info rather than using from cache"),
        forgescript_1.Arg.optionalString("env", "The env variable name to load info to."),
    ],
    async execute(ctx, [user, force, env]) {
        let id = user?.id ?? ctx.user.id;
        try {
            let json = await ctx.client.selfBotManager.requester.getUserInfo({
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
//# sourceMappingURL=getUserInfo.js.map
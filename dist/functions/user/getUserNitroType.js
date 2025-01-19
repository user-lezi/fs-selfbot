"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const typings_1 = require("../../typings");
exports.default = new forgescript_1.NativeFunction({
    name: "$getUserNitroType",
    aliases: ["$getUserPremiumType"],
    version: "1.0.0",
    description: "Returns the user nitro type.",
    output: forgescript_1.ArgType.String,
    unwrap: true,
    brackets: true,
    args: [forgescript_1.Arg.requiredUser("user", "The user to get info of.")],
    async execute(ctx, [user]) {
        let id = user.id;
        try {
            let json = await ctx.client.selfBotManager.requester.getUserProfileInfo({
                id,
                force: false,
            });
            if (!json)
                return this.success(null);
            return this.success(typings_1.UserPremiumType[json.premium_type]);
        }
        catch (err) {
            return this.customError(err.message);
        }
    },
});
//# sourceMappingURL=getUserNitroType.js.map
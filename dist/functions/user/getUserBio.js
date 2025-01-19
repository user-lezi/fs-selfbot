"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: "$getUserBio",
    aliases: ["$getUserAboutMe"],
    version: "1.0.0",
    description: "Returns the user's bio.",
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
            return this.success(json.user_profile.bio);
        }
        catch (err) {
            return this.customError(err.message);
        }
    },
});
//# sourceMappingURL=getUserBio.js.map
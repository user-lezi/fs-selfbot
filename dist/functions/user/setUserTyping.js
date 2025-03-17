"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
    name: "$setUserTyping",
    aliases: ["$triggerUserTyping"],
    version: "1.0.3",
    description: "Triggers the typing indicator as the saved user using its token.",
    brackets: true,
    args: [
        forgescript_1.Arg.requiredString("name", "The saved name for the token to get."),
        forgescript_1.Arg.optionalString("channel ID", "The channel to send this message to"),
    ],
    output: forgescript_1.ArgType.String,
    unwrap: true,
    async execute(ctx, [name, channel]) {
        let extension = ctx.client.getExtension(__1.FSSelfbot, true);
        let token = extension.getTokenFromName(name);
        if (!token)
            return this.customError(`The token with name "${name}" not found.`);
        channel ??= ctx.channel.id;
        if (!channel)
            return this.customError(`Invalid channel. (couldnt find the channel)`);
        try {
            let res = await ctx.client.selfBotManager.requester.setUserTyping({
                channelId: channel,
                token,
            });
            return this.success(res ?? 0);
        }
        catch (err) {
            return this.customError(err.message);
        }
    },
});
//# sourceMappingURL=setUserTyping.js.map
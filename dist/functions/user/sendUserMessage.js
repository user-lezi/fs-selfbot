"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
    name: "$sendUserMessage",
    version: "1.0.2",
    description: "Send message as the saved user using its token.",
    brackets: true,
    args: [
        forgescript_1.Arg.requiredString("name", "The saved name for the token to get."),
        forgescript_1.Arg.requiredString("content", "The message content."),
        forgescript_1.Arg.optionalChannel("channel ID", "The channel to send this message to"),
        forgescript_1.Arg.optionalBoolean("return ID", "Results the message id."),
        forgescript_1.Arg.optionalString("env", "The env variable name to load output to."),
    ],
    output: forgescript_1.ArgType.String,
    unwrap: true,
    async execute(ctx, [name, content, channel, returnID, env]) {
        let extension = ctx.client.getExtension(__1.FSSelfbot, true);
        let token = extension.getTokenFromName(name);
        if (!token)
            return this.customError(`The token with name "${name}" not found.`);
        channel ??= ctx.channel;
        if (!channel || !channel.isTextBased())
            return this.customError(`Invalid channel. (${!channel ? "couldnt find the channel" : "the channel isn't text based"})`);
        try {
            let message = await ctx.client.selfBotManager.requester.sendUserMessage({
                channelId: channel.id,
                token,
                payload: {
                    content,
                },
            });
            if (!message)
                return this.success(null);
            let out = returnID ? message.id : message;
            if (env) {
                ctx.setEnvironmentKey(env, message);
                return this.success();
            }
            else
                return this.successJSON(out);
        }
        catch (err) {
            return this.customError(err.message);
        }
    },
});
//# sourceMappingURL=sendUserMessage.js.map
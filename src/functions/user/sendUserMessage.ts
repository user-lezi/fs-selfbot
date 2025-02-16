import { Arg, ArgType, ErrorType, NativeFunction } from "@tryforge/forgescript";
import { FSSelfbot } from "../..";

export default new NativeFunction({
  name: "$sendUserMessage",
  version: "1.0.2",
  description: "Send message as the saved user using its token.",
  brackets: true,
  args: [
    Arg.requiredString("name", "The saved name for the token to get."),
    Arg.requiredString("content", "The message content."),
    Arg.optionalChannel("channel ID", "The channel to send this message to"),
    Arg.optionalBoolean("return ID", "Results the message id."),
    Arg.optionalString("env", "The env variable name to load output to."),
  ],
  output: ArgType.String,
  unwrap: true,
  async execute(ctx, [name, content, channel, returnID, env]) {
    let extension = ctx.client.getExtension(FSSelfbot, true);
    let token = extension.getTokenFromName(name);
    if (!token)
      return this.customError(`The token with name "${name}" not found.`);
    channel ??= ctx.channel;
    if (!channel || !channel.isTextBased())
      return this.customError(
        `Invalid channel. (${!channel ? "couldnt find the channel" : "the channel isn't text based"})`,
      );

    try {
      let message = await ctx.client.selfBotManager.requester.sendUserMessage({
        channelId: channel.id,
        token,
        payload: {
          content,
        },
      });
      if (!message) return this.success(null);
      let out = returnID ? message.id : message;
      if (env) {
        ctx.setEnvironmentKey(env, message);
        return this.success();
      } else return this.successJSON(out);
    } catch (err: any) {
      return this.customError(err.message);
    }
  },
});

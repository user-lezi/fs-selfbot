import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript";
import { FSSelfbot } from "../..";

export default new NativeFunction({
  name: "$setUserTyping",
  aliases: ["$triggerUserTyping"],
  version: "1.0.3",
  description:
    "Triggers the typing indicator as the saved user using its token.",
  brackets: true,
  args: [
    Arg.requiredString("name", "The saved name for the token to get."),
    Arg.optionalChannel("channel ID", "The channel to send this message to"),
  ],
  output: ArgType.String,
  unwrap: true,
  async execute(ctx, [name, channel]) {
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
      let res = await ctx.client.selfBotManager.requester.setUserTyping({
        channelId: channel.id,
        token,
      });
      return this.success(res ?? 0);
    } catch (err: any) {
      return this.customError(err.message);
    }
  },
});

import { Arg, ArgType, ErrorType, NativeFunction } from "@tryforge/forgescript";
import { FSSelfbot } from "../..";

export default new NativeFunction({
  name: "$createDM",
  version: "1.0.3",
  description: "Create DM channel with a user using the API.",
  brackets: true,
  args: [
    Arg.requiredString("name", "The saved name for the token to get."),
    Arg.requiredUser("recipient", "The recipient to open a DM channel with"),
  ],
  output: ArgType.TextChannel,
  unwrap: true,
  async execute(ctx, [name, recipient]) {
    let extension = ctx.client.getExtension(FSSelfbot, true);
    let token = extension.getTokenFromName(name);
    if (!token)
      return this.customError(`The token with name "${name}" not found.`);

    try {
      let channel = await ctx.client.selfBotManager.requester.createDM({
        recipient: recipient.id,
        token,
      });
      return this.success(channel?.id);
    } catch (err: any) {
      return this.customError(err.message);
    }
  },
});

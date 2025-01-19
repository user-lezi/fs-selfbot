import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript";
import { UserPremiumType } from "../../typings";

export default new NativeFunction({
  name: "$getUserNitroType",
  aliases: ["$getUserPremiumType"],
  version: "1.0.0",
  description: "Returns the user nitro type.",
  output: ArgType.String,
  unwrap: true,
  brackets: false,
  args: [Arg.optionalUser("user", "The user to get info of.")],
  async execute(ctx, [user]) {
    let id = user?.id ?? ctx.user!.id;
    try {
      let json = await ctx.client.selfBotManager.requester.getUserProfileInfo({
        id,
        force: false,
      });
      if (!json) return this.success(null);
      return this.success(UserPremiumType[json.premium_type]);
    } catch (err: any) {
      return this.customError(err.message);
    }
  },
});

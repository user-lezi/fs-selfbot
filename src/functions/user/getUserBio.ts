import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript";

export default new NativeFunction({
  name: "$getUserBio",
  aliases: ["$getUserAboutMe"],
  version: "1.0.0",
  description: "Returns the user's bio.",
  output: ArgType.String,
  unwrap: true,
  brackets: true,
  args: [Arg.requiredUser("user", "The user to get info of.")],
  async execute(ctx, [user]) {
    let id = user.id;
    try {
      let json = await ctx.client.selfBotManager.requester.getUserProfileInfo({
        id,
        force: false,
      });
      if (!json) return this.success(null);
      return this.success(json.user_profile.bio);
    } catch (err: any) {
      return this.customError(err.message);
    }
  },
});

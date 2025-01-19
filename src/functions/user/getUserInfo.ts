import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript";

export default new NativeFunction({
  name: "$getUserInfo",
  version: "1.0.0",
  description: "Returns the user info.",
  output: ArgType.String,
  unwrap: true,
  brackets: false,
  args: [
    Arg.optionalUser("user", "The user to get info of."),
    Arg.optionalBoolean(
      "force",
      "Force to fetch new info rather than using from cache",
    ),
    Arg.optionalString("env", "The env variable name to load info to."),
  ],
  async execute(ctx, [user, force, env]) {
    let id = user?.id ?? ctx.user!.id;
    try {
      let json = await ctx.client.selfBotManager.requester.getUserInfo({
        id,
        force: force ?? false,
      });
      if (!json) return this.success(null);
      if (env) {
        ctx.setEnvironmentKey(env, json);
        return this.success();
      } else return this.successJSON(json);
    } catch (err: any) {
      return this.customError(err.message);
    }
  },
});

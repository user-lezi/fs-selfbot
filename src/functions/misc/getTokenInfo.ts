import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript";
import { FSSelfbot } from "../..";

export default new NativeFunction({
  name: "$getTokenInfo",
  version: "1.0.2",
  description: "Get info about the token from the provided name.",
  brackets: true,
  args: [
    Arg.requiredString("name", "The saved name for the token to get info of."),
    Arg.optionalString("env", "The env variable name to load info to."),
  ],
  output: ArgType.String,
  unwrap: true,
  async execute(ctx, [name, env]) {
    let extension = ctx.client.getExtension(FSSelfbot, true);
    let token = extension.getTokenFromName(name);
    if (!token)
      return this.customError(`The token with name "${name}" not found.`);
    try {
      let json = await ctx.client.selfBotManager.getTokenInfo(token);
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

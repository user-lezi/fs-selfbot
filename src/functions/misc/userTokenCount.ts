import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript";

export default new NativeFunction({
  name: "$userTokenCount",
  version: "1.0.0",
  description: "Returns the amount of user tokens the extension has.",
  output: ArgType.Number,
  unwrap: false,
  execute(ctx) {
    return this.success(ctx.client.selfBotManager.userTokens.length);
  },
});

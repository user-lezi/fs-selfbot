import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript";
import { FSSelfbot } from "../..";

export default new NativeFunction({
  name: "$getUserToken",
  version: "1.0.2",
  description: "Get the token from the provided name.",
  brackets: true,
  args: [Arg.requiredString("name", "The saved name for the token to get.")],
  output: ArgType.String,
  unwrap: true,
  execute(ctx, [name]) {
    let extension = ctx.client.getExtension(FSSelfbot, true);
    let token = extension.getTokenFromName(name);
    if (!token)
      return this.customError(`The token with name "${name}" not found.`);
    return this.success(token);
  },
});

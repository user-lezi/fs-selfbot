import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript";
import { RequesterCacheType } from "../../typings";

export default new NativeFunction({
  name: "$clearRequesterCache",
  version: "1.0.0",
  description: "Clears the cache from the Requester class.",
  unwrap: true,
  brackets: true,
  args: [
    Arg.optionalEnum(RequesterCacheType, "type", "The type of cache to clear"),
  ],
  execute(ctx, [type]) {
    ctx.client.selfBotManager.requester.clearCache(type ?? "all");
    return this.success();
  },
});

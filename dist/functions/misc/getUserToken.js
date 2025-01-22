"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
    name: "$getUserToken",
    version: "1.0.2",
    description: "Get the token from the provided name.",
    brackets: true,
    args: [forgescript_1.Arg.requiredString("name", "The saved name for the token to get.")],
    output: forgescript_1.ArgType.String,
    unwrap: true,
    execute(ctx, [name]) {
        let extension = ctx.client.getExtension(__1.FSSelfbot, true);
        let token = extension.getTokenFromName(name);
        if (!token)
            return this.customError(`The token with name "${name}" not found.`);
        return this.success(token);
    },
});
//# sourceMappingURL=getUserToken.js.map
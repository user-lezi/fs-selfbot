"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
    name: "$createDM",
    version: "1.0.3",
    description: "Create DM channel with a user using the API.",
    brackets: true,
    args: [
        forgescript_1.Arg.requiredString("name", "The saved name for the token to get."),
        forgescript_1.Arg.requiredUser("recipient", "The recipient to open a DM channel with"),
    ],
    output: forgescript_1.ArgType.TextChannel,
    unwrap: true,
    async execute(ctx, [name, recipient]) {
        let extension = ctx.client.getExtension(__1.FSSelfbot, true);
        let token = extension.getTokenFromName(name);
        if (!token)
            return this.customError(`The token with name "${name}" not found.`);
        try {
            let channel = await ctx.client.selfBotManager.requester.createDM({
                recipient: recipient.id,
                token,
            });
            return this.success(channel?.id);
        }
        catch (err) {
            return this.customError(err.message);
        }
    },
});
//# sourceMappingURL=createDM.js.map
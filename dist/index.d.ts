import { ForgeClient, ForgeExtension } from "@tryforge/forgescript";
import { IFSSelfbotOptions } from "./typings";
import { Manager } from "./core/Manager";
export declare class FSSelfbot extends ForgeExtension {
    name: string;
    description: string;
    version: string;
    readonly options: Omit<IFSSelfbotOptions, "userTokens">;
    manager: Manager;
    constructor(opts?: Partial<IFSSelfbotOptions>);
    init(client: ForgeClient): Promise<void>;
}
export * from "./typings";
export * from "./core";
declare module "@tryforge/forgescript" {
    interface ForgeClient {
        selfBotManager: Manager;
    }
}
//# sourceMappingURL=index.d.ts.map
import { Requester } from "./Requester";
export declare class Manager {
    #private;
    cacheDuration: number;
    requester: Requester;
    constructor();
    get userTokens(): string[];
    addUserToken(token: string): this;
    validate(): Promise<[boolean, string, string][]>;
    validateToken(token: string): Promise<boolean>;
    getTokenInfo(token: string): Promise<any>;
    randomToken(): string;
}
//# sourceMappingURL=Manager.d.ts.map
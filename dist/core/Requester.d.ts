import { IUserInfo, IUserMessagePayload, IUserMessageResponse, IUserProfileInfo } from "../typings";
import { Manager } from "./Manager";
export declare class BaseRequester {
    _makeRequest(url: string, token: string, options?: RequestInit): Promise<Response>;
    GET(token: string, endpoint: string): Promise<Response>;
    POST(token: string, endpoint: string, body?: BodyInit): Promise<Response>;
}
export interface IBaseFetchOptions {
    force?: boolean;
    token?: string;
}
export interface ICacheData<Data> {
    data: Data;
    cachedAt: number;
}
export declare class Requester {
    #private;
    manager: Manager;
    base: BaseRequester;
    cache: {
        userInfo: Map<string, ICacheData<IUserInfo>>;
        userProfileInfo: Map<string, ICacheData<IUserProfileInfo>>;
    };
    constructor(manager: Manager);
    clearCache(data?: keyof Requester["cache"] | "all"): this;
    getUserInfo(opts?: {
        id?: string;
    } & IBaseFetchOptions): Promise<IUserInfo | null>;
    getUserProfileInfo(opts?: {
        id?: string;
    } & IBaseFetchOptions): Promise<IUserProfileInfo | null>;
    sendUserMessage(opts?: {
        payload?: IUserMessagePayload;
        channelId?: string;
    } & IBaseFetchOptions): Promise<IUserMessageResponse | null>;
}
//# sourceMappingURL=Requester.d.ts.map
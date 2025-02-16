import {
  BaseApiURL,
  IUserInfo,
  IUserMessagePayload,
  IUserMessageResponse,
  IUserProfileInfo,
} from "../typings";
import { Manager } from "./Manager";

/**
 * Handles basic HTTP requests to the API.
 */
export class BaseRequester {
  /**
   * Makes a generic HTTP request.
   * @param url - The target URL for the request.
   * @param token - Authorization token for the request.
   * @param options - Additional request options.
   */
  public _makeRequest(url: string, token: string, options: RequestInit = {}) {
    return fetch(url, {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      ...options,
    });
  }

  /**
   * Sends a GET request to the specified API endpoint.
   * @param token - Authorization token for the request.
   * @param endpoint - API endpoint to send the GET request to.
   */
  public GET(token: string, endpoint: string) {
    return this._makeRequest(BaseApiURL + endpoint, token, { method: "GET" });
  }

  /**
   * Sends a POST request to the specified API endpoint.
   * @param token - Authorization token for the request.
   * @param endpoint - API endpoint to send the POST request to.
   * @param body - The body for the request.
   */
  public POST(token: string, endpoint: string, body?: BodyInit) {
    return this._makeRequest(BaseApiURL + endpoint, token, {
      method: "POST",
      body: body ?? null,
    });
  }
}

/**
 * Options for fetching data with optional force and token.
 */
export interface IBaseFetchOptions {
  /** Force a fresh fetch, bypassing cache. */
  force?: boolean;

  /** Token to use for the request. */
  token?: string;
}

/**
 * Represents cached data with a timestamp.
 */
export interface ICacheData<Data> {
  /** The cached data. */
  data: Data;

  /** Timestamp when the data was cached. */
  cachedAt: number;
}

/**
 * Manages API requests and caching for user information.
 */
export class Requester {
  /** Instance of the BaseRequester for handling HTTP requests. */
  public base = new BaseRequester();

  /** Caches for all things needed. */
  public cache = {
    userInfo: new Map<string, ICacheData<IUserInfo>>(),
    userProfileInfo: new Map<string, ICacheData<IUserProfileInfo>>(),
  };

  /**
   * Creates an instance of the Requester.
   * @param manager - The Manager instance associated with this Requester.
   */
  public constructor(public manager: Manager) {}

  /**
   * Clears the cache for the specified data type or all cached data.
   * @param data - The type of data to clear from the cache (e.g., "userInfo" or "userProfileInfo"). Defaults to "all".
   * If "all" is specified, all cache entries are cleared.
   * @returns The current instance of the Requester for method chaining.
   */
  public clearCache(data: keyof Requester["cache"] | "all" = "all") {
    if (data == "all") {
      Object.keys(this.cache).forEach((key) =>
        this.cache[key as keyof Requester["cache"]].clear(),
      );
    } else {
      this.cache[data].clear();
    }
    return this;
  }

  /**
   * Internal method to fetch user info from the API.
   * @param id - User ID to fetch info for. Defaults to "@me".
   * @param token - Token to use for the request. Defaults to a random token.
   */
  #_getUserInfo(id: string = "@me", token?: string) {
    return this.base
      .GET(token ?? this.manager.randomToken(), `/users/${id}`)
      .then((res) => (res.ok ? (res.json() as unknown as IUserInfo) : null));
  }

  /**
   * Retrieves user info, utilizing cache if available.
   * @param opts - Options for fetching user info.
   */
  public async getUserInfo(
    opts: { id?: string } & IBaseFetchOptions = {},
  ): Promise<IUserInfo | null> {
    let info: IUserInfo | null = null;
    if (opts.force) {
      info = await this.#_getUserInfo(opts.id, opts.token);
      if (info)
        this.cache.userInfo.set(opts.id ?? "@me", {
          data: info,
          cachedAt: Date.now(),
        });
    } else {
      let cached = this.cache.userInfo.get(opts.id ?? "@me");
      if (cached) {
        if (Date.now() - cached.cachedAt >= this.manager.cacheDuration) {
          return await this.getUserInfo({ id: opts.id, force: true });
        } else {
          info = cached.data;
        }
      } else return await this.getUserInfo({ id: opts.id, force: true });
    }
    return info;
  }

  /**
   * Internal method to fetch user profile info from the API.
   * @param id - User ID to fetch profile info for. Defaults to "@me".
   * @param token - Token to use for the request. Defaults to a random token.
   */
  #_getUserProfileInfo(id: string = "@me", token?: string) {
    return this.base
      .GET(
        token ?? this.manager.randomToken(),
        `/users/${id}/profile?with_mutual_guilds=false`,
      )
      .then((res) =>
        res.ok ? (res.json() as unknown as IUserProfileInfo) : null,
      );
  }

  /**
   * Retrieves user profile info, utilizing cache if available.
   * @param opts - Options for fetching user profile info.
   */
  public async getUserProfileInfo(
    opts: { id?: string } & IBaseFetchOptions = {},
  ): Promise<IUserProfileInfo | null> {
    let info: IUserProfileInfo | null = null;
    if (opts.force) {
      info = await this.#_getUserProfileInfo(opts.id, opts.token);
      if (info)
        this.cache.userProfileInfo.set(opts.id ?? "@me", {
          data: info,
          cachedAt: Date.now(),
        });
    } else {
      let cached = this.cache.userProfileInfo.get(opts.id ?? "@me");
      if (cached) {
        if (Date.now() - cached.cachedAt >= this.manager.cacheDuration) {
          return await this.getUserProfileInfo({ id: opts.id, force: true });
        } else {
          info = cached.data;
        }
      } else return await this.getUserProfileInfo({ id: opts.id, force: true });
    }
    return info;
  }

  /**
   * Internal method to send an user message from the API.
   * @param channelId - The channel ID to send message to.
   * @param payload - The message payload
   * @param token - Token to use for the request. Defaults to a random token.
   */
  #_sendUserMessage(
    channelId: string,
    payload: IUserMessagePayload,
    token?: string,
  ) {
    return this.base
      .POST(
        token ?? this.manager.randomToken(),
        `/channels/${channelId}/messages`,
        JSON.stringify(payload),
      )
      .then((res) =>
        res.ok ? (res.json() as unknown as IUserMessageResponse) : null,
      );
  }

  /**
   * Sends a message as an user from one of the saved tokens.
   * @param opts - Options for sending the message.
   */
  public async sendUserMessage(
    opts: {
      payload?: IUserMessagePayload;
      channelId?: string;
    } & IBaseFetchOptions = {},
  ): Promise<IUserMessageResponse | null> {
    if (!opts.channelId) throw Error(`No Channel ID is provided.`);
    if (typeof opts.payload !== "object")
      throw Error("No Payload is provided.");
    return await this.#_sendUserMessage(
      opts.channelId,
      opts.payload,
      opts.token,
    );
  }
}

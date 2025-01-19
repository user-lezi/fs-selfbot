import { BaseApiURL, IUserInfo, IUserProfileInfo } from "../typings";
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
}

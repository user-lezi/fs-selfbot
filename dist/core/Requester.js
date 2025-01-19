"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Requester = exports.BaseRequester = void 0;
const typings_1 = require("../typings");
class BaseRequester {
    _makeRequest(url, token, options = {}) {
        return fetch(url, {
            headers: {
                "Content-Type": "application/json",
                authorization: token,
            },
            ...options,
        });
    }
    GET(token, endpoint) {
        return this._makeRequest(typings_1.BaseApiURL + endpoint, token, { method: "GET" });
    }
}
exports.BaseRequester = BaseRequester;
class Requester {
    manager;
    base = new BaseRequester();
    cache = {
        userInfo: new Map(),
        userProfileInfo: new Map(),
    };
    constructor(manager) {
        this.manager = manager;
    }
    #_getUserInfo(id = "@me", token) {
        return this.base
            .GET(token ?? this.manager.randomToken(), `/users/${id}`)
            .then((res) => (res.ok ? res.json() : null));
    }
    async getUserInfo(opts = {}) {
        let info = null;
        if (opts.force) {
            info = await this.#_getUserInfo(opts.id, opts.token);
            if (info)
                this.cache.userInfo.set(opts.id ?? "@me", {
                    data: info,
                    cachedAt: Date.now(),
                });
        }
        else {
            let cached = this.cache.userInfo.get(opts.id ?? "@me");
            if (cached) {
                if (Date.now() - cached.cachedAt >= this.manager.cacheDuration) {
                    return await this.getUserInfo({ id: opts.id, force: true });
                }
                else {
                    info = cached.data;
                }
            }
            else
                return await this.getUserInfo({ id: opts.id, force: true });
        }
        return info;
    }
    #_getUserProfileInfo(id = "@me", token) {
        return this.base
            .GET(token ?? this.manager.randomToken(), `/users/${id}/profile?with_mutual_guilds=false`)
            .then((res) => res.ok ? res.json() : null);
    }
    async getUserProfileInfo(opts = {}) {
        let info = null;
        if (opts.force) {
            info = await this.#_getUserProfileInfo(opts.id, opts.token);
            if (info)
                this.cache.userProfileInfo.set(opts.id ?? "@me", {
                    data: info,
                    cachedAt: Date.now(),
                });
        }
        else {
            let cached = this.cache.userProfileInfo.get(opts.id ?? "@me");
            if (cached) {
                if (Date.now() - cached.cachedAt >= this.manager.cacheDuration) {
                    return await this.getUserProfileInfo({ id: opts.id, force: true });
                }
                else {
                    info = cached.data;
                }
            }
            else
                return await this.getUserProfileInfo({ id: opts.id, force: true });
        }
        return info;
    }
}
exports.Requester = Requester;
//# sourceMappingURL=Requester.js.map
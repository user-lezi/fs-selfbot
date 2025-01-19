"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Manager = void 0;
const Requester_1 = require("./Requester");
class Manager {
    #userTokens = [];
    cacheDuration = 10 * 60 * 1000;
    requester = new Requester_1.Requester(this);
    constructor() { }
    get userTokens() {
        return this.#userTokens;
    }
    addUserToken(token) {
        this.#userTokens.push(token);
        return this;
    }
    async validate() {
        let promises = [];
        for (let i = 0; i < this.#userTokens.length; i++) {
            const token = this.#userTokens[i];
            promises.push(this.validateToken(token).then((valid) => [
                valid,
                token,
                `Token [${censorToken(token)}] is ${valid ? `valid` : `invalid`}`,
            ]));
        }
        return await Promise.all(promises);
    }
    async validateToken(token) {
        try {
            return this.getTokenInfo(token)
                .then(() => true)
                .catch(() => false);
        }
        catch {
            return false;
        }
    }
    async getTokenInfo(token) {
        let res = await this.requester.base.GET(token, `/users/@me`);
        if (!res.ok)
            throw new Error("Fetch failed");
        let json = await res.json();
        return json;
    }
    randomToken() {
        return this.#userTokens[Math.floor(Math.random() * this.#userTokens.length)];
    }
}
exports.Manager = Manager;
function censorToken(token) {
    let cover = 0.8;
    let length = token.length;
    let uncoverlength = length - Math.floor(cover * length);
    if (uncoverlength % 2 == 1)
        uncoverlength--;
    let half = uncoverlength / 2;
    return `${token.substring(0, half)}${"*".repeat(Math.floor(length * (cover - 0.1)))}${token.substring(length - half)}`;
}
//# sourceMappingURL=Manager.js.map
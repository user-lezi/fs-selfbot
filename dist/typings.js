"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPremiumType = exports.RequesterCacheType = exports.BaseApiURL = void 0;
exports.BaseApiURL = "https://discord.com/api/v10";
var RequesterCacheType;
(function (RequesterCacheType) {
    RequesterCacheType["All"] = "all";
    RequesterCacheType["UserInfo"] = "userInfo";
    RequesterCacheType["UserProfileInfo"] = "userProfileInfo";
})(RequesterCacheType || (exports.RequesterCacheType = RequesterCacheType = {}));
var UserPremiumType;
(function (UserPremiumType) {
    UserPremiumType[UserPremiumType["None"] = 0] = "None";
    UserPremiumType[UserPremiumType["NitroClassic"] = 1] = "NitroClassic";
    UserPremiumType[UserPremiumType["Nitro"] = 2] = "Nitro";
    UserPremiumType[UserPremiumType["NitroBoost"] = 3] = "NitroBoost";
})(UserPremiumType || (exports.UserPremiumType = UserPremiumType = {}));
//# sourceMappingURL=typings.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFlags = exports.UserPremiumType = exports.RequesterCacheType = exports.BaseApiURL = void 0;
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
var UserFlags;
(function (UserFlags) {
    UserFlags[UserFlags["Staff"] = 1] = "Staff";
    UserFlags[UserFlags["Partner"] = 2] = "Partner";
    UserFlags[UserFlags["HypeSquad"] = 4] = "HypeSquad";
    UserFlags[UserFlags["BugHunterLevel1"] = 8] = "BugHunterLevel1";
    UserFlags[UserFlags["HypeSquadOnlineHouse1"] = 64] = "HypeSquadOnlineHouse1";
    UserFlags[UserFlags["HypeSquadOnlineHouse2"] = 128] = "HypeSquadOnlineHouse2";
    UserFlags[UserFlags["HypeSquadOnlineHouse3"] = 256] = "HypeSquadOnlineHouse3";
    UserFlags[UserFlags["PremiumEarlySupporter"] = 512] = "PremiumEarlySupporter";
    UserFlags[UserFlags["TeamPseudoUser"] = 1024] = "TeamPseudoUser";
    UserFlags[UserFlags["BugHunterLevel2"] = 16384] = "BugHunterLevel2";
    UserFlags[UserFlags["VerifiedBot"] = 65536] = "VerifiedBot";
    UserFlags[UserFlags["VerifiedDeveloper"] = 131072] = "VerifiedDeveloper";
    UserFlags[UserFlags["CertifiedModerator"] = 262144] = "CertifiedModerator";
    UserFlags[UserFlags["BotHttpInteractions"] = 524288] = "BotHttpInteractions";
    UserFlags[UserFlags["ActiveDeveloper"] = 4194304] = "ActiveDeveloper";
})(UserFlags || (exports.UserFlags = UserFlags = {}));
//# sourceMappingURL=typings.js.map
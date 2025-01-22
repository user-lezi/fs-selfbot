export declare const BaseApiURL = "https://discord.com/api/v10";
export interface IFSSelfbotOptions {
    userTokens: Record<string, string>;
    cacheDuration: number;
}
export declare enum RequesterCacheType {
    All = "all",
    UserInfo = "userInfo",
    UserProfileInfo = "userProfileInfo"
}
export interface IUserInfo {
    id: string;
    username: string;
    bot?: boolean;
    avatar: string | null;
    discriminator: string;
    public_flags: number;
    flags: number;
    banner: string | null;
    accent_color: number;
    global_name: string;
    avatar_decoration_data: {
        asset: string;
        sku_id: string;
        expires_at: number | null;
    } | null;
    banner_color: string;
    clan: IClan | null;
    primary_guild: IClan | null;
}
export interface IClan {
    identity_guild_id: string;
    identity_enabled: boolean;
    tag: string;
    badge: string;
}
export declare enum UserPremiumType {
    None = 0,
    NitroClassic = 1,
    Nitro = 2,
    NitroBoost = 3
}
export interface IUserProfileInfo {
    user: IUserInfo & {
        bio: string;
    };
    connected_accounts: IUserConnectedAccount[];
    premium_since: string | null;
    premium_type: UserPremiumType;
    premium_guild_since: string;
    profile_themes_experiment_bucket: number;
    user_profile: IUserProfile;
    badges: IBadge[];
    legacy_username?: string;
}
export interface IBadge {
    id: string;
    description: string;
    icon: string;
    link: string;
}
export interface IUserProfile {
    bio: string;
    accent_color: number;
    pronouns: string;
    theme_colors?: [number, number];
}
export type UserConnectedAccountType = "amazon-music" | "battlenet" | "bungie" | "crunchyroll" | "domain" | "ebay" | "epicgames" | "facebook" | "github" | "instagram" | "leagueoflegends" | "paypal" | "playstation" | "reddit" | "riotgames" | "roblox" | "spotify" | "skype" | "steam" | "tiktok" | "twitch" | "twitter" | "xbox" | "youtube";
export interface IUserConnectedAccount {
    type: UserConnectedAccountType;
    id: string;
    name: string;
    verified: boolean;
    friend_sync?: boolean;
    show_activity?: boolean;
    two_way_link?: boolean;
    visibility?: 0 | 1;
}
export interface ITokenInfo extends IUserInfo {
    mfa_enabled: boolean;
    locale: string;
    premium_type: UserPremiumType;
    email: string | null;
    verified: boolean;
    phone: string | null;
    nsfw_allowed: boolean;
    bio: string;
}
//# sourceMappingURL=typings.d.ts.map
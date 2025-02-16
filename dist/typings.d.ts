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
    public_flags: UserFlags;
    flags: UserFlags;
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
    locale: ILocales;
    premium_type: UserPremiumType;
    email: string | null;
    verified: boolean;
    phone: string | null;
    nsfw_allowed: boolean;
    bio: string;
}
export type ILocales = "id" | "da" | "de" | "en-GB" | "en-US" | "es-ES" | "es-419" | "fr" | "hr" | "it" | "lt" | "hu" | "nl" | "no" | "pl" | "pt-BR" | "ro" | "fi" | "sv-SE" | "vi" | "tr" | "cs" | "el" | "bg" | "ru" | "uk" | "hi" | "th" | "zh-CN" | "ja" | "zh-TW" | "ko";
export declare enum UserFlags {
    Staff = 1,
    Partner = 2,
    HypeSquad = 4,
    BugHunterLevel1 = 8,
    HypeSquadOnlineHouse1 = 64,
    HypeSquadOnlineHouse2 = 128,
    HypeSquadOnlineHouse3 = 256,
    PremiumEarlySupporter = 512,
    TeamPseudoUser = 1024,
    BugHunterLevel2 = 16384,
    VerifiedBot = 65536,
    VerifiedDeveloper = 131072,
    CertifiedModerator = 262144,
    BotHttpInteractions = 524288,
    ActiveDeveloper = 4194304
}
export interface IUserMessagePayload {
    content: string;
}
export declare enum MessageType {
    Default = 0,
    RecipientAdd = 1,
    RecipientRemove = 2,
    Call = 3,
    ChannelNameChange = 4,
    ChannelIconChange = 5,
    ChannelPinnedMessage = 6,
    UserJoin = 7,
    GuildBoost = 8,
    GuildBoostTier1 = 9,
    GuildBoostTier2 = 10,
    GuildBoostTier3 = 11,
    ChannelFollowAdd = 12,
    GuildDiscoveryDisqualified = 14,
    GuildDiscoveryRequalified = 15,
    GuildDiscoveryGracePeriodInitialWarning = 16,
    GuildDiscoveryGracePeriodFinalWarning = 17,
    ThreadCreated = 18,
    Reply = 19,
    ChatInputCommand = 20,
    ThreadStarterMessage = 21,
    GuildInviteReminder = 22,
    ContextMenuCommand = 23,
    AutoModerationAction = 24,
    RoleSubscriptionPurchase = 25,
    InteractionPremiumUpsell = 26,
    StageStart = 27,
    StageEnd = 28,
    StageSpeaker = 29,
    StageTopic = 31,
    GuildApplicationPremiumSubscription = 32,
    GuildIncidentAlertModeEnabled = 36,
    GuildIncidentAlertModeDisabled = 37,
    GuildIncidentReportRaid = 38,
    GuildIncidentReportFalseAlarm = 39,
    PurchaseNotification = 44,
    PollResult = 46
}
export declare enum MessageFlag {
    Normal = 0,
    Crossposted = 1,
    IsCrosspost = 2,
    SuppressEmbeds = 4,
    SourceMessageDeleted = 8,
    Urgent = 16,
    HasThread = 32,
    Ephemeral = 64,
    Loading = 128,
    FailedToMentionSomeRolesInThread = 256,
    SuppressNotifications = 4096,
    IsVoiceMessage = 8192,
    HasSnapshot = 16384
}
export interface IUserMessageResponse {
    type: MessageType;
    content: string;
    timestamp: string;
    edited_timestamp: string | null;
    flags: MessageFlag;
    id: string;
    channel_id: string;
    author: IUserInfo;
    pinned: boolean;
    mention_everyone: boolean;
    tts: boolean;
    mentions: IUserInfo[];
    mention_roles: string[];
}
//# sourceMappingURL=typings.d.ts.map
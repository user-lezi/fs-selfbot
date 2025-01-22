/**
 * Base URL for the Discord API.
 */
export const BaseApiURL = "https://discord.com/api/v10";

/**
 * Options for configuring the selfbot.
 */
export interface IFSSelfbotOptions {
  /**
   * An array of user tokens for authentication.
   */
  userTokens: Record<string, string>;

  /**
   * Duration (in milliseconds) for caching data.
   */
  cacheDuration: number;
}

/**
 * Enum representing cache types for the Requester.
 */
export enum RequesterCacheType {
  All = "all",
  UserInfo = "userInfo",
  UserProfileInfo = "userProfileInfo",
}

/**
 * Represents detailed information about a Discord user.
 */
export interface IUserInfo {
  /** User ID as a string. */
  id: string;

  /** Username of the user. */
  username: string;

  /** Whether the user is a bot. */
  bot?: boolean;

  /** URL or null for the user's avatar. */
  avatar: string | null;

  /** Discriminator for the user (e.g., "1234"). */
  discriminator: string;

  /** Public flags associated with the user. */
  public_flags: UserFlags;

  /** Flags for the user. */
  flags: UserFlags;

  /** Hash fr the user's banner. */
  banner: string | null;

  /** Hexadecimal accent color for the user's profile. */
  accent_color: number;

  /** Global display name of the user. */
  global_name: string;

  /** Data about the user's avatar decorations. */
  avatar_decoration_data: {
    /** Asset URL for the decoration. */
    asset: string;

    /** SKU ID for the decoration. */
    sku_id: string;

    /** Expiration timestamp or null if it doesn't expire. */
    expires_at: number | null;
  } | null;

  /** Hexadecimal banner color of the user's profile. */
  banner_color: string;

  /** Information about the user's clan, if applicable. */
  clan: IClan | null;

  /** Information about the user's primary guild, if applicable. */
  primary_guild: IClan | null;
}

/**
 * Represents details about a clan or guild.
 */
export interface IClan {
  /** ID of the guild representing the clan. */
  identity_guild_id: string;

  /** Whether the clan identity feature is enabled. */
  identity_enabled: boolean;

  /** Tag associated with the clan. */
  tag: string;

  /** Badge hash for the clan. */
  badge: string;
}

/**
 * Type of premium subscription.
 */
export enum UserPremiumType {
  None = 0,
  NitroClassic = 1,
  Nitro = 2,
  NitroBoost = 3,
}

/**
 * Represents detailed profile information about a user.
 */
export interface IUserProfileInfo {
  /** User information with an additional bio field. */
  user: IUserInfo & { bio: string };

  /** Connected accounts of the user. */
  connected_accounts: IUserConnectedAccount[];

  /** Timestamp for when the user started premium subscription, or null if not applicable. */
  premium_since: string | null;

  /** Type of premium subscription. */
  premium_type: UserPremiumType;

  /** Timestamp for when the user boosted a guild. */
  premium_guild_since: string;

  /** Experiment bucket for profile themes. */
  profile_themes_experiment_bucket: number;

  /** User profile details. */
  user_profile: IUserProfile;

  /** Array of badges associated with the user. */
  badges: IBadge[];

  /** Legacy username of the user, if any. */
  legacy_username?: string;
}

/**
 * Represents a badge associated with a user.
 */
export interface IBadge {
  /** ID of the badge. */
  id: string;

  /** Description of the badge. */
  description: string;

  /** Icon URL for the badge. */
  icon: string;

  /** Link related to the badge. */
  link: string;
}

/**
 * Represents additional user profile details.
 */
export interface IUserProfile {
  /** Biography text of the user. */
  bio: string;

  /** Hexadecimal accent color for the user's profile. */
  accent_color: number;

  /** Pronouns used by the user. */
  pronouns: string;

  /** Theme colors for the user's profile. */
  theme_colors?: [number, number];
}

/**
 * Supported types for connected accounts.
 */
export type UserConnectedAccountType =
  | "amazon-music"
  | "battlenet"
  | "bungie"
  | "crunchyroll"
  | "domain"
  | "ebay"
  | "epicgames"
  | "facebook"
  | "github"
  | "instagram"
  | "leagueoflegends"
  | "paypal"
  | "playstation"
  | "reddit"
  | "riotgames"
  | "roblox"
  | "spotify"
  | "skype"
  | "steam"
  | "tiktok"
  | "twitch"
  | "twitter"
  | "xbox"
  | "youtube";

/**
 * Represents a connected account for a user.
 */
export interface IUserConnectedAccount {
  /** Type of the connected account. */
  type: UserConnectedAccountType;

  /** Unique identifier for the account. */
  id: string;

  /** Display name for the connected account. */
  name: string;

  /** Whether the account is verified. */
  verified: boolean;

  /** Whether friend sync is enabled for the account. */
  friend_sync?: boolean;

  /** Whether activity visibility is enabled for the account. */
  show_activity?: boolean;

  /** Whether the account has a two-way link. */
  two_way_link?: boolean;

  /** Visibility status of the account (0 for private, 1 for public). */
  visibility?: 0 | 1;
}

/**
 * Extended user information with additional token details.
 */
export interface ITokenInfo extends IUserInfo {
  /** Whether multi-factor authentication is enabled. */
  mfa_enabled: boolean;

  /** Locale of the user. */
  locale: ILocales;

  /** Premium type of the user. */
  premium_type: UserPremiumType;

  /** Email address of the user, or `null` if not set. */
  email: string | null;

  /** Whether the user's email is verified. */
  verified: boolean;

  /** Phone number of the user, or `null` if not set. */
  phone: string | null;

  /** Whether the user is allowed to view NSFW content. */
  nsfw_allowed: boolean;

  /** Biography of the user. */
  bio: string;
}

/**
 * Supported locales for users.
 */
export type ILocales =
  | "id" // Indonesian
  | "da" // Danish
  | "de" // German
  | "en-GB" // English, UK
  | "en-US" // English, US
  | "es-ES" // Spanish
  | "es-419" // Spanish, LATAM
  | "fr" // French
  | "hr" // Croatian
  | "it" // Italian
  | "lt" // Lithuanian
  | "hu" // Hungarian
  | "nl" // Dutch
  | "no" // Norwegian
  | "pl" // Polish
  | "pt-BR" // Portuguese, Brazilian
  | "ro" // Romanian, Romania
  | "fi" // Finnish
  | "sv-SE" // Swedish
  | "vi" // Vietnamese
  | "tr" // Turkish
  | "cs" // Czech
  | "el" // Greek
  | "bg" // Bulgarian
  | "ru" // Russian
  | "uk" // Ukrainian
  | "hi" // Hindi
  | "th" // Thai
  | "zh-CN" // Chinese, China
  | "ja" // Japanese
  | "zh-TW" // Chinese, Taiwan
  | "ko"; // Korean

/**
 * Enum representing various user flags and their corresponding bitwise values.
 */
export enum UserFlags {
  /** Discord Employee */
  Staff = 1 << 0,

  /** Partnered Server Owner */
  Partner = 1 << 1,

  /** HypeSquad Events Member */
  HypeSquad = 1 << 2,

  /** Bug Hunter Level 1 */
  BugHunterLevel1 = 1 << 3,

  /** House Bravery Member */
  HypeSquadOnlineHouse1 = 1 << 6,

  /** House Brilliance Member */
  HypeSquadOnlineHouse2 = 1 << 7,

  /** House Balance Member */
  HypeSquadOnlineHouse3 = 1 << 8,

  /** Early Nitro Supporter */
  PremiumEarlySupporter = 1 << 9,

  /** User is a team */
  TeamPseudoUser = 1 << 10,

  /** Bug Hunter Level 2 */
  BugHunterLevel2 = 1 << 14,

  /** Verified Bot */
  VerifiedBot = 1 << 16,

  /** Early Verified Bot Developer */
  VerifiedDeveloper = 1 << 17,

  /** Moderator Programs Alumni */
  CertifiedModerator = 1 << 18,

  /** Bot uses only HTTP interactions and is shown in the online member list */
  BotHttpInteractions = 1 << 19,

  /** User is an Active Developer */
  ActiveDeveloper = 1 << 22,
}

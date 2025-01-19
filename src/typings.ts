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
  userTokens: string[];

  /**
   * Duration (in milliseconds) for caching data.
   */
  cacheDuration: number;
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
  public_flags: number;

  /** Flags for the user. */
  flags: number;

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

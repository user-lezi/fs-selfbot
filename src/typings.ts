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

/**
 * The payload the send in user message request.
 */
export interface IUserMessagePayload {
  /** The message content */
  content: string;
}

/**
 * Enum representing message types with their corresponding numeric values.
 * Describes different types of messages, their availability across API versions, and deletable status.
 */
export enum MessageType {
  /** Default message */
  Default = 0,
  /** A user was added to the recipient list */
  RecipientAdd = 1,
  /** A user was removed from the recipient list */
  RecipientRemove = 2,
  /** A call message */
  Call = 3,
  /** Channel name change notification */
  ChannelNameChange = 4,
  /** Channel icon change notification */
  ChannelIconChange = 5,
  /** A pinned message notification */
  ChannelPinnedMessage = 6,
  /** A user joined notification */
  UserJoin = 7,
  /** Guild boost notification */
  GuildBoost = 8,
  /** Guild boost tier 1 achieved */
  GuildBoostTier1 = 9,
  /** Guild boost tier 2 achieved */
  GuildBoostTier2 = 10,
  /** Guild boost tier 3 achieved */
  GuildBoostTier3 = 11,
  /** Channel follow add */
  ChannelFollowAdd = 12,
  /** Guild discovery disqualified */
  GuildDiscoveryDisqualified = 14,
  /** Guild discovery requalified */
  GuildDiscoveryRequalified = 15,
  /** Initial warning for guild discovery grace period */
  GuildDiscoveryGracePeriodInitialWarning = 16,
  /** Final warning for guild discovery grace period */
  GuildDiscoveryGracePeriodFinalWarning = 17,
  /** A thread was created */
  ThreadCreated = 18,
  /** A reply to a message (API v8 and above) */
  Reply = 19,
  /** A chat input command (API v8 and above) */
  ChatInputCommand = 20,
  /** Thread starter message (API v9 and above) */
  ThreadStarterMessage = 21,
  /** Guild invite reminder */
  GuildInviteReminder = 22,
  /** Context menu command */
  ContextMenuCommand = 23,
  /** Auto moderation action */
  AutoModerationAction = 24,
  /** Role subscription purchase */
  RoleSubscriptionPurchase = 25,
  /** Interaction premium upsell */
  InteractionPremiumUpsell = 26,
  /** Stage event start */
  StageStart = 27,
  /** Stage event end */
  StageEnd = 28,
  /** Stage speaker event */
  StageSpeaker = 29,
  /** Stage topic change */
  StageTopic = 31,
  /** Guild application premium subscription */
  GuildApplicationPremiumSubscription = 32,
  /** Incident alert mode enabled */
  GuildIncidentAlertModeEnabled = 36,
  /** Incident alert mode disabled */
  GuildIncidentAlertModeDisabled = 37,
  /** Incident report for a raid */
  GuildIncidentReportRaid = 38,
  /** Incident report marked as a false alarm */
  GuildIncidentReportFalseAlarm = 39,
  /** Purchase notification */
  PurchaseNotification = 44,
  /** Poll result */
  PollResult = 46,
}
/**
 * Enum representing message flags and their corresponding bitwise values.
 * These flags describe specific properties of a message.
 */
export enum MessageFlag {
  Normal = 0,
  /** This message has been published to subscribed channels (via Channel Following) */
  Crossposted = 1 << 0,
  /** This message originated from a message in another channel (via Channel Following) */
  IsCrosspost = 1 << 1,
  /** Do not include any embeds when serializing this message */
  SuppressEmbeds = 1 << 2,
  /** The source message for this crosspost has been deleted (via Channel Following) */
  SourceMessageDeleted = 1 << 3,
  /** This message came from the urgent message system */
  Urgent = 1 << 4,
  /** This message has an associated thread with the same ID as the message */
  HasThread = 1 << 5,
  /** This message is only visible to the user who invoked the Interaction */
  Ephemeral = 1 << 6,
  /** This message is an Interaction Response and the bot is "thinking" */
  Loading = 1 << 7,
  /** This message failed to mention some roles and add their members to the thread */
  FailedToMentionSomeRolesInThread = 1 << 8,
  /** This message will not trigger push and desktop notifications */
  SuppressNotifications = 1 << 12,
  /** This message is a voice message */
  IsVoiceMessage = 1 << 13,
  /** This message has a snapshot (via Message Forwarding) */
  HasSnapshot = 1 << 14,
}
/**
 * Represents a response message sent by a user.
 */
export interface IUserMessageResponse {
  /**
   * The type of the message.
   * Uses the MessageType enum to represent different message types.
   */
  type: MessageType;

  /**
   * The actual content of the message as a string.
   */
  content: string;

  /**
   * The timestamp when the message was created (ISO 8601 format).
   */
  timestamp: string;

  /**
   * The timestamp when the message was last edited (ISO 8601 format), or null if it has not been edited.
   */
  edited_timestamp: string | null;

  /**
   * Bitfield flags representing message-specific properties.
   * Uses the MessageFlag enum for flag definitions.
   */
  flags: MessageFlag;

  /**
   * Unique identifier for the message.
   */
  id: string;

  /**
   * Unique identifier for the channel where the message was sent.
   */
  channel_id: string;

  /**
   * Information about the author of the message.
   */
  author: IUserInfo;

  /**
   * Indicates whether the message is pinned in the channel.
   */
  pinned: boolean;

  /**
   * Indicates if the message mentions @everyone.
   */
  mention_everyone: boolean;

  /**
   * Indicates if the message was sent using text-to-speech (TTS).
   */
  tts: boolean;

  /**
   * List of user information for each mentioned user in the message.
   */
  mentions: IUserInfo[];

  /**
   * List of role IDs mentioned in the message.
   */
  mention_roles: string[];
}

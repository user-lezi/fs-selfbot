import { ForgeClient, ForgeExtension, Logger } from "@tryforge/forgescript";
import { IFSSelfbotOptions } from "./typings";
import { Manager } from "./core/Manager";

/**
 * Represents the FSSelfbot extension.
 */
export class FSSelfbot extends ForgeExtension {
  /** Name of the extension. */
  public name: string = "FSSelfbot";

  /** Description of the extension, read from package.json. */
  public description: string = require("../package.json").description;

  /** Version of the extension, read from package.json. */
  public version: string = require("../package.json").version;

  /** Options for the selfbot, excluding user tokens. */
  public readonly options: Omit<IFSSelfbotOptions, "userTokens">;

  /** Custom Token names mapped to its token index. */
  public readonly tokenNames = new Map<string, number>();

  /** Manager instance for handling selfbot operations. */
  public manager = new Manager();

  /**
   * Creates an instance of the FSSelfbot.
   * @param opts - Partial options for configuring the selfbot.
   * @throws Will throw an error if user tokens are not provided or invalid.
   */
  public constructor(opts: Partial<IFSSelfbotOptions> = {}) {
    super();

    if (!opts.userTokens) throw new Error(`No user tokens are provided.`);

    if (typeof opts.userTokens !== "object" || Array.isArray(opts.userTokens)) {
      throw new TypeError(
        `Expected userTokens to be a non-array object. Got ${typeof opts.userTokens}`,
      );
    }

    for (const [key, token] of Object.entries(opts.userTokens)) {
      if (
        typeof key !== "string" ||
        typeof token !== "string" ||
        !token.trim()
      ) {
        throw new Error(
          `Invalid token entry: key and value must be non-empty strings. Got key: ${key}, value: ${token}`,
        );
      }
      this.tokenNames.set(key, this.tokenNames.size);
      this.manager.addUserToken(token);
    }

    if (!opts.cacheDuration) {
      opts.cacheDuration = 10 * 60 * 1000; // Default to 10 minutes.
    } else {
      if (
        !(
          typeof opts.cacheDuration === "number" &&
          Number.isInteger(opts.cacheDuration)
        )
      )
        throw new TypeError(`Expected cacheDuration to be an integer`);

      if (opts.cacheDuration < 1000)
        throw new Error("Please make cacheDuration more than a second");
    }

    this.options = {
      cacheDuration: opts.cacheDuration,
    };

    this.manager.cacheDuration = opts.cacheDuration;
  }

  /**
   * Initializes the FSSelfbot extension.
   * @param client - The ForgeClient instance.
   * @throws Will throw an error if any user token is invalid.
   */
  public async init(client: ForgeClient): Promise<void> {
    client.selfBotManager = this.manager;
    this.load(`${__dirname}/functions`);

    let results = await this.manager.validate();
    let err = "";

    for (let i = 0; i < results.length; i++) {
      const [valid, token, message] = results[i];
      let args: string[] = [message];

      if (valid) {
        let info = await this.manager.getTokenInfo(token);
        args.push(
          `\n\tName: ${this.getNameFromToken(token)}`,
          `\n\tUsername: ${info.username} | Email: ${info.email ? "Verified" : "Not verified"} | Phone: ${info.phone ? "Verified" : "Not verified"}`,
        );
      } else err = token;

      Logger[valid ? "info" : "warn"](...args);
    }

    if (err)
      throw new Error(
        `Found invalid token [${this.getNameFromToken(err)}: ${err}]\n` +
          (await this.manager
            .getTokenInfo(err)
            .then(() => ":p")
            .catch((e) => e.message)),
      );
  }

  /**
   * Retrieves a user token associated with a given name.
   * @param name - The name associated with the token.
   * @returns The user token if found, or `null` if the name is invalid or out of range.
   */
  public getTokenFromName(name: string) {
    let index = this.tokenNames.get(name) ?? -1;
    if (index < 0 || index >= this.tokenNames.size) return null;
    return this.manager.userTokens[index];
  }
  /**
   * Retrieves the name associated with a given user token.
   * @param token - The user token to find the name for.
   * @returns The name if found, or `null` if the token is invalid or out of range.
   */
  public getNameFromToken(token: string) {
    let index = this.manager.userTokens.indexOf(token);
    if (index < 0 || index >= this.tokenNames.size) return null;
    return Array.from(this.tokenNames.keys())[index];
  }
}

export * from "./typings";
export * from "./core";

/**
 * Extends the ForgeClient interface to include selfBotManager.
 */
declare module "@tryforge/forgescript" {
  interface ForgeClient {
    /** Manager instance for selfbot operations. */
    selfBotManager: Manager;
  }
}

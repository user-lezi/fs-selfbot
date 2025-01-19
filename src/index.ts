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

    if (
      !(
        Array.isArray(opts.userTokens) &&
        opts.userTokens.every((x) => typeof x == "string")
      )
    )
      throw new TypeError(
        `Expected userTokens value to be array of user tokens (string). Got ${typeof opts.userTokens}`,
      );

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
    opts.userTokens.forEach((token) => this.manager.addUserToken(token));
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
          `\n\tUsername: ${info.username} | Email: ${info.email ? "Verified" : "Not verified"} | Phone: ${info.phone ? "Verified" : "Not verified"}`,
        );
      } else err = token;

      Logger[valid ? "info" : "warn"](...args);
    }

    if (err)
      throw new Error(
        `Found invalid token [${err}]\n` +
          (await this.manager
            .getTokenInfo(err)
            .then(() => ":p")
            .catch((e) => e.message)),
      );
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

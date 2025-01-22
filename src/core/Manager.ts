import { ITokenInfo } from "../typings";
import { Requester } from "./Requester";

/**
 * Underhood class for selfbotting.
 */
export class Manager {
  /** Array of user tokens, managed privately. */
  #userTokens: string[] = [];

  /** Duration (in milliseconds) for caching data. Defaults to 10 minutes. */
  public cacheDuration = 10 * 60 * 1000;

  /** Instance of the Requester class for making API requests. */
  public requester = new Requester(this);

  /**
   * Creates an instance of the Manager.
   */
  public constructor() {}

  /**
   * Retrieves the list of user tokens.
   */
  public get userTokens() {
    return this.#userTokens;
  }

  /**
   * Adds a user token to the manager.
   * @param token - The user token to add.
   * @returns The current instance of the Manager for method chaining.
   */
  public addUserToken(token: string) {
    this.#userTokens.push(token);
    return this;
  }

  /**
   * Validates all stored user tokens.
   * @returns A promise that resolves to an array of validation results for each token.
   * Each result is a tuple containing:
   * - A boolean indicating whether the token is valid.
   * - The token itself.
   * - A message about the token's validity.
   */
  public async validate() {
    let promises: Promise<[boolean, string, string]>[] = [];
    for (let i = 0; i < this.#userTokens.length; i++) {
      const token = this.#userTokens[i];
      promises.push(
        this.validateToken(token).then((valid) => [
          valid,
          token,
          `Token [${censorToken(token)}] is ${valid ? `valid` : `invalid`}`,
        ]),
      );
    }
    return await Promise.all(promises);
  }

  /**
   * Validates a single user token.
   * @param token - The user token to validate.
   * @returns A promise that resolves to a boolean indicating whether the token is valid.
   */
  public async validateToken(token: string) {
    try {
      return this.getTokenInfo(token)
        .then(() => true)
        .catch(() => false);
    } catch {
      return false;
    }
  }

  /**
   * Retrieves information about a specific token.
   * @param token - The user token to retrieve information for.
   * @returns A promise that resolves to the token information as a JSON object.
   * @throws An error if the fetch fails.
   */
  public async getTokenInfo(token: string) {
    let res = await this.requester.base.GET(token, `/users/@me`);
    if (!res.ok) throw new Error("Fetch failed");
    let json = await res.json();
    return json as ITokenInfo;
  }

  /**
   * Retrieves a random user token from the list of stored tokens.
   * @returns A randomly selected user token.
   */
  public randomToken() {
    return this.#userTokens[
      Math.floor(Math.random() * this.#userTokens.length)
    ];
  }
}

/**
 * Censors a token by partially masking it for privacy.
 * @param token - The token to censor.
 * @returns The censored version of the token.
 */
function censorToken(token: string) {
  let cover = 0.8;
  let length = token.length;
  let uncoverlength = length - Math.floor(cover * length);
  if (uncoverlength % 2 == 1) uncoverlength--;
  let half = uncoverlength / 2;
  return `${token.substring(0, half)}${"*".repeat(Math.floor(length * (cover - 0.1)))}${token.substring(length - half)}`;
}

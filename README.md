# fs-selfbot
Get info from discord using user tokens! (against tos btw, for educational purpose btw)
> The use of the package is on you :3

## Example
```js
const { FSSelfbot } = require("fs-selfbot");
const { ForgeClient } = require("@tryforge/forgescript");

const client = new ForgeClient({
    intents: [
        "Guilds",
        "MessageContent",
        "GuildMessages",
    ],
    prefixes: ["!", "<@$botID>"],
    extensions: [
        new FSSelfbot({
          userTokens: ["user token", ...], // An array of user tokens
          cacheDuration: 600000 // Cache lifespan in ms
        })
    ],
})

client.login("bot token")
```
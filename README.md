# FSSelfbot
Effortlessly gather Discord information using user tokens. **(Disclaimer: This violates Discord's Terms of Service and is intended for educational purposes only.)**

---
## Disclaimer
**Important:** Use of this package is strictly at your own risk. Misuse may result in your account being banned or other repercussions. Always ensure compliance with applicable laws and platform rules.

---
## Features
- Simple integration with your existing bots.
- Highly configurable with caching options.
- Extendable via the ForgeScript library.

---
## Installation
```bash
npm install fs-selfbot @tryforge/forgescript
```

---
## Usage
Here is a quick example to get started:

```javascript
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

client.login("bot token");
```

---
## Options
### FSSelfbot Configuration
| Option         | Type     | Description                              |
|----------------|----------|------------------------------------------|
| `userTokens`   | `Array`  | List of user tokens to authenticate.    |
| `cacheDuration`| `Number` | Cache lifespan in milliseconds.         |

---
## Contributing
Contributions are welcome! Feel free to open issues or submit pull requests.

---
## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

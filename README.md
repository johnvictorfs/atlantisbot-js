# atlantisbot-js

TypeScript version of [atlantisbot](https://github.com/johnvictorfs/atlantisbot)

---

## Development

- Requirements
  - [Bun](https://bun.sh)
  - A [Discord Bot Application](https://discord.com/developers/docs/getting-started#step-1-creating-an-app)

- Environment variables

  ```bash
  # Fill env variables in .env file
  cp .env.example .env
  ```

- Install dependencies

  ```bash
  bun install
  ```

- Run Development server
  
    ```bash
    bun dev
    ```

---

## Creating commands

- Create a new file in `src/commands` folder (ex.: `src/commands/my-new-command.ts`)

- Export a definition for a command

  ```ts
  import { BotCommand } from "@/commands"

  export default new BotCommand({
    // Command definition
    data(builder) {
      return builder
        .setName('ping')
        .setDescription('Ping Pong')
    },
    // Command execution
    async execute(interaction) {
      await interaction.reply('Pong!')
    }
  })
  ```

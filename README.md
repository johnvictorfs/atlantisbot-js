# atlantisbot-js

TypeScript version of [atlantisbot](https://github.com/johnvictorfs/atlantisbot)

---

## Development

- Requirements
  - [Bun](https://bun.sh)
  - A [Discord Bot Application](https://discord.com/developers/docs/getting-started#step-1-creating-an-app)
  - A MySQL Database (local or remote)

- Environment variables

  ```bash
  # Fill env variables in .env file
  cp .env.example .env
  ```

- Install dependencies

  ```bash
  bun install
  ```

- Update database schema and install prisma client

  ```bash
  bun db:pull
  ```

- Run Development server

    ```bash
    bun dev
    ```

---

## Creating commands

- Create a new file in `packages/discord/commands` folder (ex.: `my-new-command.ts`)

- Export a definition for a command

  ```ts
  // packages/discord/commands/ping.ts
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

- Example with inputs:

  ```ts
  // packages/discord/commands/ping.ts
  import { BotCommand } from "@/commands"
  import { ChatInputCommandInteraction } from 'discord.js'

  export default new BotCommand({
    // Command definition
    data(builder) {
      return builder
        .setName('ping')
        .setDescription('Ping Pong')
        .addStringOption((option) =>
          option
            .setName('name')
            .setDescription('Name of the ping to pong')
            .setRequired(true),
        )
    },
    // Command execution
    async execute(interaction: ChatInputCommandInteraction) {
      const name = interaction.options.getString('name', true)
      await interaction.reply(`Pong ${name}!`)
    }
  })
  ```

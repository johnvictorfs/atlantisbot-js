import {
  ApplicationCommandDataResolvable,
  Client,
  Collection,
  CommandInteraction,
  REST,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
  Routes,
  SharedNameAndDescription,
  SlashCommandBuilder,
} from 'discord.js'
import fs from 'fs'
import path from 'path'

import { env } from '@/env'

export class BotCommand<
  TCommand extends SharedNameAndDescription = SharedNameAndDescription,
  TInteraction extends CommandInteraction = CommandInteraction,
> {
  data: SharedNameAndDescription
  execute: (interaction: TInteraction) => Promise<void>

  constructor({
    data,
    execute,
  }: {
    data: (builder: SlashCommandBuilder) => TCommand
    execute: (interaction: TInteraction) => Promise<void>
  }) {
    this.data = data(new SlashCommandBuilder())
    this.execute = execute
  }
}

/**
 * Read all commands from './src/commands' and return JSON definition for them
 * to register on Discord's API, and a Collection to execute the commands in the client
 */
export const getCommands = () => {
  const commands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = []
  const commandCollection = new Collection<string, BotCommand>()

  const commandFolders = path.join(__dirname)
  const commandFiles = fs
    .readdirSync(commandFolders)
    .filter((file) => file.endsWith('.ts') && file !== 'index.ts')

  for (const file of commandFiles) {
    const filePath = path.join(commandFolders, file)

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const command: BotCommand = require(filePath).default

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore - toJSON(): APIApplicationCommandBasicOption exists
    commands.push(command.data.toJSON())
    commandCollection.set(command.data.name, command)
  }

  return {
    commandsJson: commands,
    commandCollection,
  }
}

export const registerCommands = async (client: Client) => {
  if (!client.user) {
    throw new Error('Client user is undefined')
  }

  const { commandsJson, commandCollection } = getCommands()
  const rest = new REST().setToken(env.DISCORD_BOT_TOKEN)

  try {
    console.log(
      `Started refreshing ${commandsJson.length} application (/) commands.`,
    )

    // Refresh all commands
    const data = (await rest.put(Routes.applicationCommands(client.user.id), {
      body: commandsJson,
    })) as ApplicationCommandDataResolvable[]

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`,
    )
  } catch (error) {
    console.error(error)
  }

  return commandCollection
}

import { BotCommand } from '@/commands'
import { getPlayerWorld } from '@local/rs3/worlds'
import { ChatInputCommandInteraction } from 'discord.js'

export default new BotCommand({
  data(builder) {
    return builder
      .setName('world')
      .setDescription('Get the current world for a RuneScape 3 player')
      .addStringOption((option) =>
        option
          .setName('player')
          .setDescription('The player to get the world for')
          .setRequired(true),
      )
  },
  async execute(interaction: ChatInputCommandInteraction) {
    try {
      const playerName = interaction.options.getString('player', true)
      const playerWorld = await getPlayerWorld(playerName)

      await interaction.reply(playerWorld ? `World ${playerWorld}` : 'Off-line')
    } catch (error) {
      console.error(error) // TODO: Sentry
      await interaction.reply('Failed to get Player World')
    }
  },
})

import { BotCommand } from '@/commands'
import { getPlayerWorld } from '@local/rs3/worlds'

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
  async execute(interaction) {
    try {
      const playerName = interaction.options.get('player')

      // TODO: Validate options properly with zod
      if (!playerName?.value || typeof playerName.value !== 'string') {
        await interaction.reply('Invalid Player')
        return
      }

      const playerWorld = await getPlayerWorld(playerName.value)
      await interaction.reply(playerWorld ? `World ${playerWorld}` : 'Off-line')
    } catch (error) {
      console.error(error) // TODO: Sentry
      await interaction.reply('Failed to get Player World')
    }
  },
})

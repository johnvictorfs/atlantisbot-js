import { BotCommand } from '@/commands'

export default new BotCommand({
  data(builder) {
    return builder.setName('member').setDescription('Worlds stuff')
  },
  async execute(interaction) {
    await interaction.reply('Pong!')
  },
})

import { BotCommand } from '@/commands'
import { prisma } from '@local/prisma'

export default new BotCommand({
  data(builder) {
    return builder
      .setName('member')
      .setDescription('Autenticar como Membro do Clã')
  },
  async execute(interaction) {
    const existingUser = await prisma.atlantisbot_api_discorduser.findFirst({
      where: {
        discord_id: interaction.user.id,
      },
    })

    if (existingUser && !existingUser.disabled && !existingUser.warning_date) {
      await interaction.reply('Você já é um membro do clã!')
      return
    }

    // TODO: Auth
    await interaction.reply('Auth')
  },
})

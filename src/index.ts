import { Client, Events, GatewayIntentBits } from 'discord.js';
import { registerCommands } from './commands';
import { env } from './env';

const discordClient = new Client({ intents: [GatewayIntentBits.Guilds] });

discordClient.once(Events.ClientReady, async client => {
  console.log(`Ready! Logged in as ${client.user.tag}`);
  const commands = await registerCommands(client.user.client)

  discordClient.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = commands.get(interaction.commandName);

    if (!command) {
      console.error(`No command matching ${interaction.commandName} was found.`);
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
      } else {
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
      }
    }
  });
});

discordClient.login(env.DISCORD_BOT_TOKEN);

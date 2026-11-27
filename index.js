const {
  Client,
  GatewayIntentBits,
  Events
} = require('discord.js');

// LOBBY BOT
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildVoiceStates
  ]
});

// Bot startup
client.once(Events.ClientReady, (readyClient) => {
  console.log(`🤖 LOBBY Bot online as ${readyClient.user.tag}`);
});

// Slash commands & interactions
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('🏓 Pong! LOBBY Bot is online!');
  }
});

// Error handling
client.on(Events.Error, (error) => {
  console.error('Discord client error:', error);
});

// Login using a secure environment variable
client.login(process.env.DISCORD_TOKEN);

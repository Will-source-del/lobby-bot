const { Client, GatewayIntentBits, Events } = require('discord.js');

const loadCommands = require('./handlers/commandHandler');
const loadInteractions = require('./handlers/interactionHandler');

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

// Load commands
loadCommands(client);

// Load interaction handler
loadInteractions(client);

// Bot startup
client.once(Events.ClientReady, (readyClient) => {
  console.log(`LOBBY Bot online as ${readyClient.user.tag}`);
});

// Error handling
client.on(Events.Error, (error) => {
  console.error('Discord client error:', error);
});

// Login
client.login(process.env.DISCORD_TOKEN);

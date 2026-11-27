const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Check if LOBBY bot is responding'),

  async execute(interaction) {
    await interaction.reply('🏓 Pong! LOBBY bot is responding.');
  }
};

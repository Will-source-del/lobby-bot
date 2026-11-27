const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('level')
    .setDescription('Check your LOBBY level and XP'),

  async execute(interaction) {
    // Level data will be connected to the XP database later.
    await interaction.reply({
      content: `🎮 ${interaction.user}, your level profile will be available soon!`,
      ephemeral: true
    });
  }
};

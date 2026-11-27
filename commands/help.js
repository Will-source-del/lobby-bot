const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('View LOBBY bot commands'),

  async execute(interaction) {
    const helpMessage = [
      '🤖 **LOBBY BOT — COMMANDS**',
      '',
      '🎮 **Levels**',
      '`/rank` — View your level and XP',
      '`/level` — Check your level profile',
      '`/leaderboard` — View the top 10 members',
      '',
      '🛠️ **Utility**',
      '`/ping` — Check bot response',
      '`/help` — View this command list',
      '',
      '✨ More commands are coming soon!'
    ].join('\n');

    await interaction.reply({
      content: helpMessage,
      ephemeral: true
    });
  }
};

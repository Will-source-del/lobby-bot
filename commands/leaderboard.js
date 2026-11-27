const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

const xpFile = path.join(__dirname, '..', 'data', 'xp.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('leaderboard')
    .setDescription('View the top members ranked by XP'),

  async execute(interaction) {
    let data = {};

    try {
      data = JSON.parse(fs.readFileSync(xpFile, 'utf8'));
    } catch {
      data = {};
    }

    const guildPrefix = `${interaction.guild.id}:`;

    const entries = Object.entries(data)
      .filter(([key]) => key.startsWith(guildPrefix))
      .sort((a, b) => {
        if (b[1].level !== a[1].level) {
          return b[1].level - a[1].level;
        }
        return b[1].xp - a[1].xp;
      })
      .slice(0, 10);

    if (!entries.length) {
      return interaction.reply({
        content: '🏆 The leaderboard is empty for now!',
        ephemeral: true
      });
    }

    const leaderboard = entries.map(([key, userData], index) => {
      const userId = key.split(':')[1];
      const medals = ['🥇', '🥈', '🥉'];

      return `${medals[index] || `**${index + 1}.**`} <@${userId}> — Level **${userData.level}** (${userData.xp} XP)`;
    });

    await interaction.reply({
      content: `🏆 **LOBBY LEADERBOARD**\n\n${leaderboard.join('\n')}`
    });
  }
};

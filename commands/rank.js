const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

const xpFile = path.join(__dirname, '..', 'data', 'xp.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rank')
    .setDescription('View your level, XP and progress'),

  async execute(interaction) {
    let data = {};

    try {
      data = JSON.parse(fs.readFileSync(xpFile, 'utf8'));
    } catch {
      data = {};
    }

    const key = `${interaction.guild.id}:${interaction.user.id}`;
    const userData = data[key] || { xp: 0, level: 0 };

    const requiredXP = (userData.level + 1) * 100;

    await interaction.reply({
      content: [
        `🎮 **${interaction.user.username}'s Rank**`,
        `🏆 Level: **${userData.level}**`,
        `✨ XP: **${userData.xp}/${requiredXP}**`
      ].join('\n'),
      ephemeral: true
    });
  }
};

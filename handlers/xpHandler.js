const fs = require('fs');
const path = require('path');

const xpFile = path.join(__dirname, '..', 'data', 'xp.json');
const config = require('../config.json');

const cooldowns = new Map();

function loadXP() {
  try {
    return JSON.parse(fs.readFileSync(xpFile, 'utf8'));
  } catch {
    return {};
  }
}

function saveXP(data) {
  fs.writeFileSync(xpFile, JSON.stringify(data, null, 2));
}

module.exports = (client) => {
  client.on('messageCreate', (message) => {
    if (!message.guild || message.author.bot) return;
    if (!config.leveling.enabled) return;

    const key = `${message.guild.id}:${message.author.id}`;
    const now = Date.now();
    const cooldown = (config.leveling.cooldownSeconds || 60) * 1000;

    if (cooldowns.has(key) && now - cooldowns.get(key) < cooldown) return;

    cooldowns.set(key, now);

    const data = loadXP();

    if (!data[key]) {
      data[key] = { xp: 0, level: 0 };
    }

    const min = config.leveling.xpMin || 15;
    const max = config.leveling.xpMax || 25;
    const earnedXP = Math.floor(Math.random() * (max - min + 1)) + min;

    data[key].xp += earnedXP;

    const requiredXP = (data[key].level + 1) * 100;

    if (data[key].xp >= requiredXP) {
      data[key].xp -= requiredXP;
      data[key].level++;

      message.channel.send(
        `🎉 ${message.author} has reached **Level ${data[key].level}**!`
      ).catch(() => {});
    }

    saveXP(data);
  });
};

require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');

const client = new Client({ 
  intents: [GatewayIntentBits.Guilds] 
});

const TORN_API_KEY = process.env.TORN_API_KEY;

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'energy') {
    try {
      const response = await axios.get(
        `https://api.torn.com/user/?selections=bars&key=${TORN_API_KEY}`
      );

      const energy = response.data.bars.energy;
      await interaction.reply(`⚡ Current Energy: ${energy.current}/${energy.maximum}`);
    } catch (error) {
      await interaction.reply('Error fetching Torn data.');
    }
  }
});

client.login(process.env.DISCORD_TOKEN);

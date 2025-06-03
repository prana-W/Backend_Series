const { Client, Events, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.on('messageCreate', (message) => {
    if (message.author.bot) return;
    message.reply({
        content: `Hey there, ${message.author.username}! Did you just said, "${message.content}"`
    })
})

client.on('interactionCreate', (interaction) => {
    if(interaction.commandName === 'ping') {
        interaction.reply({
            content: 'Pong!'
        })
    }
})

client.login(process.env.DISCORD_TOKEN);
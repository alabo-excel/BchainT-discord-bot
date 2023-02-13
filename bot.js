require('dotenv').config()
const { Client, GatewayIntentBits } = require("discord.js");
const { ask } = require("./ai.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});

// client.on("ready", () => {
//     console.log(`Logged in as ${client.user.tag}!`)
// })

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    message.react('👍');
})

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    if (message.mentions.has(client.user.id) || message.content.endsWith("?")) {
        const answer = await ask(message.content);
        message.reply(answer)
    }
});

client.login(process.env.DISCORD_TOKEN);
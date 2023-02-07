require('dotenv').config()
const { Client, GatewayIntentBits } = require("discord.js");
const { ask } = require("./ai.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.DirectMessages
    ],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`)
})

client.on('messageCreate', async (message) => {
    message.react('👍');
});

setInterval(async function () {
    const answer = await ask("Generate a random blockchain word with detailed explanation, examples and use cases");
    const channel = client.channels.cache.get('1072522772204507238');
    channel.send(`@everyone \n\nWORD OF THE DAY 🎉🎉  ${answer} \n\nWAGMI  🚀🚀 `);
}, 10000);
// 86400000

client.login(process.env.DISCORD_TOKEN);
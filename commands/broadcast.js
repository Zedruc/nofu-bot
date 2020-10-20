const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'broadcast',
    description: 'sends a message to every server the bot is in',
    execute(message, args) {
        const prefix = "%";
        var messageArgs = message.content.slice(prefix.length + 9).trim().split(/ +/);
        if (message.author.id === "568729687291985930") {
            let guilds = client.guilds.cache.filter(g => g.memberCount > 15);
            guilds.send("siis");
        }
    }
}

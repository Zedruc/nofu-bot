const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'broadcast',
    description: 'sends a message to every server the bot is in',
    execute(message, args) {
        const prefix = "%";
        var guildList = client.guilds.array();
        var message = message.content.slice(prefix.length + 9).trim().split(/ +/);
        if (message.author.id === '568729687291985930') {
            try {
                let broadcastEmbed = new Discord.MessageEmbed()
                    .setTitle("__**Broadcast**__")
                    .setDescription(message)
                    .setTimestamp()
                guildList.forEach(guild => guild.defaultChannel.send(broadcastEmbed));
            } catch (err) {
                console.log("Could not send message to " + guild.name + "\n " + err);
            }
        }
    }
}
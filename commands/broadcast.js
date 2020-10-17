const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'broadcast',
    description: 'sends a message to every server the bot is in',
    execute(message, args) {
        const prefix = "%";
        var messageArgs = message.content.slice(prefix.length + 9).trim().split(/ +/);
        if (message.author.id === '568729687291985930') {
            client.guilds.forEach((guild) => { //for each guild the bot is in
                let defaultChannel = "";
                guild.channels.forEach((channel) => {
                    if (channel.type == "text" && defaultChannel == "") {
                        if (channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
                            defaultChannel = channel;
                        }
                    }
                })
                function send() {
                    let broadcastEmbed = new Discord.MessageEmbed()
                        .setTitle("__**Broadcast**__")
                        .setDescription(messageArgs)
                        .setTimestamp()
                    defaultChannel.send(broadcastEmbed)
                        .catch(err => {
                            console.log(err);
                        })
                        .then(console.log("broadcast sent!"))
                }
            });
        }
    }
}
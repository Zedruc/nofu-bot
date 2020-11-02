module.exports = {
    name: 'delete',
    description: 'Deletes messages',
    execute(message, args, client) {
        if (!message.author.id == "568729687291985930") {
            return;
        }

        let rawArgs = args;
        let argsString = rawArgs.toString();
        let msg = argsString.replace(/,/g, " ");

        client.guilds.cache.forEach((guild) => { //for each guild the bot is in
            let defaultChannel = "";
            const channel = member.guild.channels.cache.find(ch => ch.name === 'general');
            if (!channel) {
                guild.channels.cache.forEach((channel) => {
                    if (channel.type == "text" && defaultChannel == "") {
                        if (channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
                            defaultChannel = channel;
                        }
                    }
                });
            } else {
                let broadcastEmbed = new Discord.MessageEmbed()
                    .setTitle("**__Broadcast__**")
                    .setDescription(msg)
                channel.send(broadcastEmbed)
            }
            let broadcastEmbed = new Discord.MessageEmbed()
                .setTitle("**__Broadcast__**")
                .setDescription(msg)
            defaultChannel.send(broadcastEmbed) //send it to whatever channel the bot has permissions to send on
        });
    }
}
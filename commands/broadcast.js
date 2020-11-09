const Discord = require('discord.js')

module.exports = {
    name: 'broadcast',
    description: 'Sends message to every server the bot is in',
    execute(message, args, client) {

        if (!message.author.id == "568729687291985930") {
            return message.reply("Only the Bot owner is able to use this command!")
        }

        let rawArgs = args;
        let argsString = rawArgs.toString();
        let msg = argsString.replace(/,/g, " ");
        //

        client.guilds.cache.forEach((guild) => { //for each guild the bot is in
            let defaultChannel = "";
            guild.channels.cache.forEach((channel) => {
                //
                if (channel.type == "text" && defaultChannel == "") {
                    if (channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
                        defaultChannel = channel;
                    }
                }
                let broadcastEmbed = new Discord.MessageEmbed()
                    .setTitle("**__Broadcast__**")
                    .setDescription(msg)
                defaultChannel.send(broadcastEmbed)
            });

        });
    }
}
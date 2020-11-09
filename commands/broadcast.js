const Discord = require('discord.js')

module.exports = {
    name: 'broadcast',
    description: 'Sends message to every server the bot is in',
    execute(message, args, client) {
        if (!message.author.id == "568729687291985930") {
            return;
        }

        //        let rawArgs = args;
        //        let argsString = rawArgs.toString();
        //        let msg = argsString.replace(/,/g, " ");
        //        //
        //
        //        client.guilds.cache.forEach((guild) => { //for each guild the bot is in
        //            let defaultChannel = "";
        //            const channel = member.guild.channels.cache.find(ch => ch.name === 'general');
        //            if (!channel) {
        //                guild.channels.cache.forEach((channel) => {
        //                    if (channel.type == "text" && defaultChannel == "") {
        //                        if (channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
        //                            defaultChannel = channel;
        //                        }
        //                    }
        //                    let broadcastEmbed = new Discord.MessageEmbed()
        //                        .setTitle("**__Broadcast__**")
        //                        .setDescription(msg)
        //                    defaultChannel.send(broadcastEmbed)
        //                });
        //            } else {
        //                let broadcastEmbed = new Discord.MessageEmbed()
        //                    .setTitle("**__Broadcast__**")
        //                    .setDescription(msg)
        //                channel.send(broadcastEmbed)
        //            }
        //        });
        try {
            let toSay = args.toString().replace(/,/g, " ");
            this.client.guilds.map((guild) => {
                let found = 0
                guild.channels.map((c) => {
                    if (found === 0) {
                        if (c.type === "text") {
                            if (c.permissionsFor(this.client.user).has("VIEW_CHANNEL") === true) {
                                if (c.permissionsFor(this.client.user).has("SEND_MESSAGES") === true) {
                                    c.send(toSay);
                                    found = 1;
                                }
                            }
                        }
                    }
                });
            });
        }
        catch (err) {
            console.log("Could not send message to a (few) guild(s)!");
        }
    }
}
const Discord = require('discord.js');

module.exports = {
    name: "kick",
    description: "Kick a member",
    execute(message, args, client) {
        if (message.member.hasPermission("KICK_MEMBERS")) {
            if (message.mentions.members.first()) {
                try {
                    message.mentions.members.first().kick();
                    KickEmbed();
                } catch {
                    message.reply("I do not have permissions to kick " + message.mentions.members.first()).then(msg => {
                        setTimeout(() => {
                            msg.delete();
                        }, 3500);
                    });
                }
            } else {
                message.reply("You do not have permissions to kick " + message.mentions.members.first()).then(msg => {
                    setTimeout(() => {
                        msg.delete();
                    }, 3500);
                });
            }
        }

        function KickEmbed() {
            let embed = new Discord.MessageEmbed()
                .setTitle(message.mentions.members.first() + " was kicked!")
                .setColor("#90ee90")
            return message.channel.send(embed);
        }
    }
}
const Discord = require('discord.js'); // For a kind of "type annotations"

const fetch = require('node-fetch');

module.exports = {
    name: "activity",
    description: "",
    execute(message = new Discord.Message, args, client) {
        if (!args.length || !args.length > 1) return;

        var embed = new Discord.MessageEmbed();

        var hostRole = message.guild.roles.cache.find(fn => fn.name == "Event Host");
        if (!hostRole) {
            embed.setTitle("Could not find \"Event Host\" role.");
            embed.setColor("#ff0000");
            embed.setDescription("Please make sure your server has a role called \"Event Host\" (Case sensitive)\nThen try again");
            message.channel.send(embed);
            return;
        }

        if (!message.member.roles.cache.find(fn => fn.name == "Event Host")) {
            embed.setTitle("You need the \"Event Host\" role to start an event!");
            embed.setColor("#ff0000");
            message.channel.send(embed);
            return;
        }

        var channelName = message.content.substring(9 + args[0].length + 2);
        try {


            var channel = message.guild.channels.cache.find(t => t.name.toLowerCase() == channelName || t.name == channelName);
            if (!channel) channel = message.guild.channels.cache.find(t => t.id == channelName || t.name == channelName);
            if (!channel) return message.reply(`Unable to find channel ${channelName} by name or id.`);
            if (channel.type !== "voice") {
                embed.setTitle("Channel must be a voicechannel.");
                embed.setColor("#ff0000");
                message.channel.send(embed);
                return;
            }
        } catch (error) {
            embed.setTitle("Error finding channel.");
            embed.setDescription("Please try to type out the channel name 1:1 (Case sensitive)");
            embed.setColor("#ff0000");
            message.channel.send(embed);
            return;
        }

        var eventType = args[0];

        switch (eventType) {
            case "yt":
                fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
                    method: "POST",
                    body: JSON.stringify({
                        max_age: 86400,
                        max_uses: 2,
                        target_application_id: "755600276941176913",
                        target_type: 2,
                        temporary: false,
                        validate: null
                    }),
                    headers: {
                        "Authorization": `Bot ${client.token}`,
                        "Content-Type": "application/json"
                    }
                })
                    .then(res => res.json())
                    .then(invite => {
                        embed.setTitle("Activity added!")
                        embed.setDescription(`Added **YouTube Together** to [${channel.name}](https://discord.gg/${invite.code})\n> Click on the hyperlink to join.`)
                        embed.setFooter(`Requested by ${message.author.username + "#" + message.author.discriminator}`)
                        embed.setColor("#7289DA")
                        message.channel.send({
                            embed: embed
                        });
                    })
                break;

            case "pn":
                fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
                    method: "POST",
                    body: JSON.stringify({
                        max_age: 86400,
                        max_uses: 0,
                        target_application_id: "755827207812677713",
                        target_type: 2,
                        temporary: false,
                        validate: null
                    }),
                    headers: {
                        "Authorization": `Bot ${client.token}`,
                        "Content-Type": "application/json"
                    }
                })
                    .then(res => res.json())
                    .then(invite => {
                        embed.setTitle("Activity added!")
                        embed.setDescription(`Added **Poker Night** to [${channel.name}](https://discord.gg/${invite.code})\n> Click on the hyperlink to join.`)
                        embed.setFooter(`Requested by ${command.author.username + "#" + command.author.discriminator}`)
                        embed.setColor("#7289DA")
                        command.callback({
                            embed: embed
                        });
                    })

            case "bio":
                fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
                    method: "POST",
                    body: JSON.stringify({
                        max_age: 86400,
                        max_uses: 0,
                        target_application_id: "773336526917861400",
                        target_type: 2,
                        temporary: false,
                        validate: null
                    }),
                    headers: {
                        "Authorization": `Bot ${client.token}`,
                        "Content-Type": "application/json"
                    }
                })
                    .then(res => res.json())
                    .then(invite => {
                        embed.setTitle("Activity added!")
                        embed.setDescription(`Added **Betrayal.io** to [${channel.name}](https://discord.gg/${invite.code})\n> Click on the hyperlink to join.`)
                        embed.setFooter(`Requested by ${command.author.username + "#" + command.author.discriminator}`)
                        embed.setColor("#7289DA")
                        command.callback({
                            embed: embed
                        });
                    })

            case "fio":
                fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
                    method: "POST",
                    body: JSON.stringify({
                        max_age: 86400,
                        max_uses: 0,
                        target_application_id: "814288819477020702",
                        target_type: 2,
                        temporary: false,
                        validate: null
                    }),
                    headers: {
                        "Authorization": `Bot ${client.token}`,
                        "Content-Type": "application/json"
                    }
                })
                    .then(res => res.json())
                    .then(invite => {
                        embed.setTitle("Activity added!")
                        embed.setDescription(`Added **Fishington.io** to [${channel.name}](https://discord.gg/${invite.code})\n> Click on the hyperlink to join.`)
                        embed.setFooter(`Requested by ${command.author.username + "#" + command.author.discriminator}`)
                        embed.setColor("#7289DA")
                        command.callback({
                            embed: embed
                        });
                    })

            default:
                embed.setTitle("Invalid Event")
                embed.setDescription("A list of all available events:")
                    .addFields([
                        { name: "YouTube Together", value: "%activity  `yt` `<voicechannel_name> | <voicechannel_id>`", inline: true },
                        { name: "Poker Night", value: "%activity `pn` `<voicechannel_name> | <voicechannel_id>`", inline: true },
                        { name: "Betrayal.io", value: "%activity `bio` `<voicechannel_name> | <voicechannel_id>`", inline: true },
                        { name: "Fishington.io", value: "%activity `fio` `<voicechannel_name> | <voicechannel_id>`" },
                    ]);
                break;
        }
    }
}
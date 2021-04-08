const Discord = require("discord.js");
const https = require('https');
const { join } = require("path");

module.exports = {
    name: "kill",
    description: "In case of emergency (e.g. Being destroyed in an argument)",
    execute(message, args, client) {
        if (message.guild === null) return;

        var gifs = [
            "https://media.tenor.com/images/bef50761d75e855c95cb94139c8c292f/tenor.gif",
            "https://media.tenor.com/images/a5a49125c87a23d61bda212c1a455dda/tenor.gif",
            "https://media.tenor.com/images/b0604b9710161c1bac91ff8d47809835/tenor.gif",
            "https://media.tenor.com/images/0e4bef9aecf5efd0e2ecc3b5c69ca71a/tenor.gif",
            "https://media.tenor.com/images/c6635cfd8a49166f214a872d35da82c4/tenor.gif"
        ]

        const taggedUser = message.mentions.users.first();

        if (taggedUser) {

            if (taggedUser == message.author.id) {

                message.channel.send("...")

            } else if (taggedUser == "760905298990202901") {

                message.reply("Really?");

            }
        }

        let killEmbed = {
            title: `${message.member.displayName} killed ${taggedUser ? taggedUser.username : msgArgs[1]}!`,
            image: { url: gifs[Math.floor(Math.random() * gifs.length)] },
            color: "#9E1A1A",
            footer: {
                text: client.user.username,
                icon_url: client.user.displayAvatarURL({ format: "png" }),
            },
            timestamp: (new Date()).toISOString()
        };
        message.channel.send({ embed: killEmbed });
    }
}

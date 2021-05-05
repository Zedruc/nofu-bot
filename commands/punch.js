// yes I made this because I was bored lol

const Discord = require("discord.js");
const Client = new Discord.Client();
const https = require('https');

module.exports = {
    name: "punch",
    description: "Yes, you can slap others now xD",
    execute(message, args, client) {
        const talkedRecently = new Set();
        if (message.guild === null) return;
        if (!args[1]) return message.channel.send("You have to @ someone to punch!")
        var gifs = [
            "https://media.tenor.com/images/9c14d2d5dd918471954e5946166f3632/tenor.gif",
            "https://media.tenor.com/images/b11c79cf158d8c9bd6e721676b06ad73/tenor.gif",
            "https://media.tenor.com/images/7eb5ede6402a3fb97ab9fccc81640c2c/tenor.gif",
            "https://media.tenor.com/images/eb379f98c7ced6d43a16e78dc25ae864/tenor.gif",
            "https://media.tenor.com/images/8a79543998d6878be573aab94ae86456/tenor.gif",
            "https://media.tenor.com/images/04f62b7819a22210c0ba411ddb2636a5/tenor.gif",

        ]

        const taggedUser = message.mentions.users.first();

        let punchEmbed = {
            title: `${message.member.displayName} punched ${taggedUser ? taggedUser.username : args[1]}!`,
            image: { url: gifs[Math.floor(Math.random() * gifs.length)] },
            color: "#9E1A1A",
            footer: {
                text: client.user.username,
                icon_url: client.user.displayAvatarURL({ format: "png" }),
            },
            timestamp: (new Date()).toISOString()
        };
        message.channel.send(punchEmbed);

        setTimeout(() => {
            talkedRecently.delete(message.author.id);
        }, 6000);
    }
}

const Discord = require("discord.js");
const https = require('https');
const { join } = require("path");

module.exports = {
    name: "hug",
    description: "Since T H E   W O R L D W I D E   E V E N T is still a thing you now can hug others via discord :D!",
    execute(message, args, client) {
        if (message.guild === null) return;
        var gifs = [
            "https://media.tenor.com/images/8f44c083c55620c02f59c6bea378dca4/tenor.gif",
            "https://media.tenor.com/images/ca88f916b116711c60bb23b8eb608694/tenor.gif",
            "https://media.tenor.com/images/a9bb4d55724484be94d13dd94721a8d9/tenor.gif",
            "https://media.tenor.com/images/d7f6849b07da0532c7dc3aab538d42d4/tenor.gif",
            "https://media.tenor.com/images/15c39a7d6b03267941a87b24483ab696/tenor.gif",
            "https://media.tenor.com/images/2ad519eeb2d1f1158107f731779ee328/tenor.gif",

        ]
        const taggedUser = message.mentions.users.first();

        let hugEmbed = {
            title: `${message.member.displayName} hugged ${taggedUser ? taggedUser.username : msgArgs[1]}!`,
            image: { url: gifs[Math.floor(Math.random() * gifs.length)] },
            footer: {
                text: client.user.username,
                icon_url: client.user.displayAvatarURL({ format: "png" }),
            },
            timestamp: (new Date()).toISOString()
        };
        message.channel.send({ embed: hugEmbed });
    }
}

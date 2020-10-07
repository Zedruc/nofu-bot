const { RSA_NO_PADDING, SSL_OP_ALL } = require("constants");
// yes I made this because I was bored lol

const Discord = require("discord.js");
const https = require('https');
const { join } = require("path");

module.exports = {
    name: "slap",
    description: "yes, you now can slap others xD",
    execute(message, args) {
        const taggedUser = message.mentions.users.first();

        let prefix = "%";

        let key = process.env.tenorkey;
        let msgArgs = message.content.slice(prefix.length).trim().split(/ +/);
        let term = message.content.slice(prefix.length + 4).trim().split(/ +/);

        if (message.guild === null) return;

        https.get('https://api.tenor.com/v1/search?q=' + term + "&limit=50", res => {
            let body = '';

            res.on('data', chunk => {
                body += chunk;
            })

            res.on('end', () => {
                let bodyString = JSON.parse(body);
                let int = Math.floor(Math.random(1) * 50);

                let gifUrl = bodyString.results[int].url;

                let slapEmbed = new Discord.MessageEmbed()
                    .setTitle(message.author + " slapped " + taggedUser + "!")
                    .attachFiles([gifUrl])

                message.reply(slapEmbed);
            })
        })

        message.reply();
    }
}

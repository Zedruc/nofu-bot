const { RSA_NO_PADDING, SSL_OP_ALL } = require("constants");
// yes I made this because I was bored lol

const Discord = require("discord.js");
const https = require('https');
const { join } = require("path");

module.exports = {
    name: "slap",
    description: "yes, you can slap others now xD",
    execute(message, args) {
        const taggedUser = message.mentions.users.first();

        let prefix = "%";

        let key = process.env.tenorkey;
        let msgArgs = message.content.slice(prefix.length).trim().split(/ +/);

        if (message.guild === null) return;

        https.get('https://api.tenor.com/v1/search?q=anime+slap&limit=50&key=' + key, res => {

            let body = '';

            res.on('data', chunk => {
                body += chunk;
            })

            res.on('end', () => {
                let bodyString = JSON.parse(body);
                let int = Math.floor(Math.random(1) * 49);

                let gifUrl = bodyString.results[int].url;

                let slapEmbed = new Discord.MessageEmbed()
                    .setTitle(message.author + " slapped " + taggedUser + "!")
                    .setDescription("***S L A P*** \n" + gifUrl)

                message.reply(slapEmbed);
            })
        })

        message.reply();
    }
}

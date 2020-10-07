const { RSA_NO_PADDING, SSL_OP_ALL } = require("constants");
// yes I made this because I was bored lol

const Discord = require("discord.js");
const https = require('https');

module.exports = {
    name: "slap",
    description: "yes, you now can slap others xD",
    execute(message, args) {
        const taggedUser = message.mentions.users.first();
        let key = process.env.tenorkey;

        if (message.guild === null) return;

        https.get('https://api.tenor.com/v1/search?q=excited&key=' + key + "&limit=50", res => {
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

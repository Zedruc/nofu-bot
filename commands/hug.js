const Discord = require("discord.js");
const https = require('https');
const { join } = require("path");

module.exports = {
    name: "slap",
    description: "yes, you can slap others now xD",
    execute(message, args) {
        if (message.guild === null) return;

        const taggedUser = message.mentions.users.first();

        let prefix = "%";

        let key = process.env.tenorkey;
        let msgArgs = message.content.slice(prefix.length).trim().split(/ +/);



        https.get('https://api.tenor.com/v1/search?q=anime+hug&limit=50&key=' + key, res => {

            let body = '';

            res.on('data', chunk => {
                body += chunk;
            })

            res.on('end', () => {
                let bodyString = JSON.parse(body);
                let int = Math.floor(Math.random(1) * 49);

                let gifUrl = bodyString.results[int].url;

                if (taggedUser == message.author.id) {

                    message.channel.send("You must be lonely huh")

                } else if (taggedUser == 760905298990202901) {

                    message.reply("Wait what?");

                } else {

                    message.channel.send(message.member.displayName + " hugs <@" + taggedUser + "> :D! \n" + gifUrl)

                }
            })
        })
    }
}

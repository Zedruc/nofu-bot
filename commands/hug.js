const Discord = require("discord.js");
const https = require('https');
const { join } = require("path");

module.exports = {
    name: "hug",
    description: "Since T H E    W O R L D W I D E   E V E N T is still a thing you now can hug others via discord :D!",
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

                let gifUrl = bodyString.results[int].media[0].tinygif.url;

                if (taggedUser == message.author.id) {

                    message.channel.send("You must be lonely huh")

                } else if (taggedUser == 760905298990202901) {

                    message.reply("Wait what?");

                } else {

                    let hugEmbed = new Discord.MessageEmbed()
                        .setColor('#9E1A1A')
                        .setTitle(message.member.displayName + " hugged " + taggedUser.username + "! \n")
                        .setAuthor("%hug")
                        .setImage(gifUrl)
                    message.channel.send(hugEmbed)

                }
            })
        })
    }
}

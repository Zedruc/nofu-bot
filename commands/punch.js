const { RSA_NO_PADDING, SSL_OP_ALL } = require("constants");
// yes I made this because I was bored lol

const Discord = require("discord.js");
const Client = new Discord.Client();
const https = require('https');
const { join } = require("path");

module.exports = {
    name: "punch",
    description: "Yes, you can slap others now xD",
    execute(message, args) {
        if (message.guild === null) return;

        const taggedUser = message.mentions.users.first();

        let prefix = "%";

        let key = process.env.tenorkey;
        let msgArgs = message.content.slice(prefix.length).trim().split(/ +/);



        https.get('https://api.tenor.com/v1/search?q=anime%20punch&limit=50&key=' + key, res => {

            let body = '';

            res.on('data', chunk => {
                body += chunk;
            })

            res.on('end', () => {
                let bodyString = JSON.parse(body);
                let int = Math.floor(Math.random(1) * 49);

                let gifUrl = bodyString.results[int].media[0].gif.url;

                if (taggedUser) {

                    if (taggedUser == message.author.id) {

                        message.channel.send("How about we don\'t do that ;-;")

                    } else if (taggedUser == 760905298990202901) {

                        message.reply("no. :)");

                    } else {

                        const User = Client.users.fetch(taggedUser);
                        //
                        console.log(User);

                        let punchEmbed = new Discord.MessageEmbed()
                            .setColor('#9E1A1A')
                            .setTitle(message.member.displayName + " punched " + taggedUser.username + "! \n")
                            .setAuthor("%punch")
                            .setImage(gifUrl)
                        message.channel.send(punchEmbed);

                    }
                } else {

                    let punchEmbed = new Discord.MessageEmbed()
                        .setColor('#9E1A1A')
                        .setTitle(message.member.displayName + " punched " + msgArgs[1] + "! \n")
                        .setAuthor("%punch")
                        .setImage(gifUrl)
                    message.channel.send(punchEmbed);

                }
            })
        })
    }
}

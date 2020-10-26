const { RSA_NO_PADDING, SSL_OP_ALL } = require("constants");
// yes I made this because I was bored lol

const Discord = require("discord.js");
const Client = new Discord.Client();
const https = require('https');
const { join } = require("path");

module.exports = {
    name: "stare",
    description: "stare at someone (if they post cringe or smth like that)",
    execute(message, args) {
        if (message.guild === null) return;

        const taggedUser = message.mentions.users.first();

        let prefix = "%";

        let key = process.env.tenorkey;
        let msgArgs = message.content.slice(prefix.length).trim().split(/ +/);
        let noPing = message.content.slice(prefix.length + 5).trim().split(/ +/);



        https.get('https://api.tenor.com/v1/search?q=anime%20stare&limit=50&key=' + key, res => {

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

                        message.channel.send("I dont even want to know how you did that-")

                    } else if (taggedUser == 760905298990202901) {

                        message.reply(";-;");

                    } else {

                        const User = Client.users.fetch(taggedUser);
                        //
                        console.log(User);

                        let punchEmbed = new Discord.MessageEmbed()
                            .setColor('#610C98')
                            .setTitle(message.member.displayName + " stares intensely at " + taggedUser.username + "- \n")
                            .setAuthor("s t a r e")
                            .setImage(gifUrl)
                        message.channel.send(punchEmbed);

                    }
                } else {

                    let rawArgs = args;
                    let argsString = rawArgs.toString();
                    let noP = argsString.replace(/,/g, " ");

                    let punchEmbed = new Discord.MessageEmbed()
                        .setColor('#610C98')
                        .setTitle(message.member.displayName + " stares intensely at " + noP + "- \n")
                        .setAuthor("s t a r e")
                        .setImage(gifUrl)
                    message.channel.send(punchEmbed);

                }
            })
        })
    }
}

const Discord = require("discord.js");
const https = require('https');
const { join } = require("path");

module.exports = {
    name: "kill",
    description: "In case of emergency (e.g. Being destroyed in an argument)",
    execute(message, args) {
        if (message.guild === null) return;

        const taggedUser = message.mentions.users.first();

        let prefix = "%";

        let key = process.env.tenorkey;
        let msgArgs = message.content.slice(prefix.length).trim().split(/ +/);

        let decision = Math.floor(Math.random() * (3 - 1)) + 1

        if (decision == 1) {

            https.get('https://api.tenor.com/v1/search?q=anime%20gun&limit=50&key=' + key, res => {

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

                            message.channel.send("You must be lonely huh")

                        } else if (taggedUser == 760905298990202901) {

                            message.reply("Wait what?");

                        } else {

                            let hugEmbed = new Discord.MessageEmbed()
                                .setColor('#9E1A1A')
                                .setTitle(message.member.displayName + " killed " + taggedUser.username + "! \n")
                                .setAuthor("%kill")
                                .setImage(gifUrl)
                            message.channel.send(hugEmbed)

                        }
                    } else {

                        let hugEmbed = new Discord.MessageEmbed()
                            .setColor('#9E1A1A')
                            .setTitle(message.member.displayName + " killed " + msgArgs[1] + "! \n")
                            .setAuthor("%kill")
                            .setImage(gifUrl)
                        message.channel.send(hugEmbed)

                    }
                })
            })
        } else if (decision == 2) {
            https.get('https://api.tenor.com/v1/search?q=animegirl%20gun&limit=50&key=' + key, res => {

                let body = '';

                res.on('data', chunk => {
                    body += chunk;
                })

                res.on('end', () => {
                    let bodyString = JSON.parse(body);
                    let int = Math.floor(Math.random(1) * 49);

                    let gifUrl = bodyString.results[int].media[0].tinygif.url;
                    if (taggedUser) {

                        if (taggedUser == message.author.id) {

                            message.channel.send("Dude...")

                        } else if (taggedUser == 760905298990202901) {

                            message.reply("NO NO NO NO");

                        } else {

                            let hugEmbed = new Discord.MessageEmbed()
                                .setColor('#910f06')
                                .setTitle(message.member.displayName + " killed " + taggedUser.username + "! \n")
                                .setAuthor("%kill")
                                .setImage(gifUrl)
                            message.channel.send(hugEmbed)

                        }
                    } else {

                        let hugEmbed = new Discord.MessageEmbed()
                            .setColor('#910f06')
                            .setTitle(message.member.displayName + " killed " + msgArgs[1] + "! \n")
                            .setAuthor("%kill")
                            .setImage(gifUrl)
                        message.channel.send(hugEmbed)
                    }
                }
                );
            })
        }
    }
}

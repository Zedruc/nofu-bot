const https = require('https');
const Discord = require('discord.js');

//https://crafatar.com/avatars/uuid
//https://api.mojang.com/users/profiles/minecraft/<Spielername>

module.exports = {
    name: 'mcsearch',
    description: 'Searches for a Minecraft account',
    execute(message, args, client) {
        const toSearch = message.content.slice(1).trim().split(/ +/);

        https.get('https://api.mojang.com/users/profiles/minecraft/' + toSearch[1], res => {
            let body = '';

            res.on('data', (chunk) => {
                body += chunk;
            });

            res.on('end', () => {
                let bodyString = JSON.parse(body);

                let answerEmbed = new Discord.MessageEmbed()

                if (bodyString.length == 0) {
                    answerEmbed.setTitle("__Profile not found [404 NOT FOUND]__")
                    answerEmbed.setColor("red")
                    answerEmbed.setDescription("Nothing here :(")
                    answerEmbed.setFooter("404", client.user.displayAvatarURL({ format: "png" }))
                    message.channel.send(answerEmbed);
                } else {
                    answerEmbed
                        .setTitle("Profile found")
                        .setColor("green")
                        .setThumbnail(`https://crafatar.com/avatars/${bodyString.id}`)
                        .setDescription(`__ID: ${bodyString.id}`)
                        .setFooter("Success!", client.user.displayAvatarURL({ format: "png" }))
                    message.channel.send(answerEmbed);

                }

            });
        });
    }
}
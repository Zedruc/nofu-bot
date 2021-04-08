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
                let answerEmbed = new Discord.MessageEmbed()

                if (body.length == 0) {
                    answerEmbed.setTitle("__Profile not found__")
                    answerEmbed.setColor("#FF0000")
                    answerEmbed.setDescription("Nothing here :(")
                    answerEmbed.setFooter("404 Not Found", client.user.displayAvatarURL({ format: "png" }))
                    message.channel.send(answerEmbed);
                } else if (body.length !== 0) {
                    let bodyString = JSON.parse(body);
                    answerEmbed
                        .setTitle("Profile found")
                        .setColor("#008000")
                        .setThumbnail(`https://crafatar.com/avatars/${bodyString.id}`)
                        .setDescription(`__ID__ ${bodyString.id}`)
                        .setFooter("Success!", client.user.displayAvatarURL({ format: "png" }))
                    message.channel.send(answerEmbed);

                }

            });
        });
    }
}
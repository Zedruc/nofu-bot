const https = require('https');
const Discord = require('discord.js');

module.exports = {
    name: 'fox',
    description: 'Sends a random fox image :D',
    execute(message, args, client) {
        https.get('https://randomfox.ca/floof/', res => {
            let body = '';

            res.on('data', chunk => {
                body += chunk;
            });

            res.on('end', () => {
                let bodyString = JSON.parse(body);

                let foxEmbed = new Discord.MessageEmbed()
                    .setTitle('**__F o x__**')
                    .setColor('#FF521D')
                    .setImage(bodyString.image)
                    .setFooter("F l u f f y", client.user.displayAvatarURL({ format: "png" }))
                    .setTimestamp();

                message.channel.send(foxEmbed);
            });
        });
    }
}
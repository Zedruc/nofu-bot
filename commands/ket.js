//https://api.thecatapi.com/v1/images/search
const https = require('https');
const Discord = require('discord.js');

module.exports = {
    name: 'cat',
    description: 'C a t',
    execute(message, args, client) {
        https.get('https://api.thecatapi.com/v1/images/search', res => {
            let body = '';

            res.on('data', chunk => {
                body += chunk;
            });

            res.on('error', (error) => {
                message.channel.send(
                    "Something went wrong when getting an image :( " + error.message
                );
            });

            res.on('end', () => {
                const data = JSON.parse(body);

                let catEmbed = new Discord.MessageEmbed()
                    .setTitle("__**Cat**__")
                    .setImage(data[0].url)
                    .setFooter("Cute :D", client.user.displayAvatarURL({ format: "png" }))
                    .setTimestamp();

                message.channel.send(catEmbed);
            });
        });
    }
}
//https://dog.ceo/api/breeds/image/random
const https = require('https');
const Discord = require('discord.js');
module.exports = {
    name: "doggo",
    description: "Cute doggos :D",
    execute(message, args, client) {
        https.get('https://dog.ceo/api/breeds/image/random', res => {
            let body = '';

            res.on('data', chunk => {
                body += chunk;
            });

            res.on('end', () => {
                let data = JSON.parse(body);
                let doggoEmbed = new Discord.MessageEmbed()
                    .setTitle("**__DOGGO__**")
                    .setImage(data.message)
                    .setFooter(data.status, client.user.displayAvatarURL({ format: "png" }))

                message.channel.send(doggoEmbed);
            });
        });
    }
}
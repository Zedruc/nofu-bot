const Discord = require('discord.js');
const client = new Discord.Client();
const axios = require('axios');
const https = require('https');
const { image_links } = require("../resources.json");

module.exports = {
    name: 'joke',
    description: 'Sendet einen Flachewitz',
    execute(message, args) {
        https.get('https://official-joke-api.appspot.com/random_joke',
        res => {
            // console.log(res.statusCode);
            // console.log(res.headers);

            let data = '';

            res.on('data', chunk => {
                data += chunk;
            })

            res.on('end', () => {
                let answer = JSON.parse(data);

                let jokeEmbed = new Discord.MessageEmbed()
                .setTitle("**Flachwitz Incoming**")
                .setThumbnail(image_links.domtendo_face)
                .setDescription(answer.setup + "\n" + answer.punchline)
                .setFooter("\n\n Witze nur in Englisch da sie von einem Server zufällig geholt werden (Witz ID: " + answer.id + ")");

                message.channel.send(jokeEmbed);
            })
        });
    }
}
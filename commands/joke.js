const Discord = require('discord.js');
const client = new Discord.Client();
const axios = require('axios');
const https = require('https');
const { image_links } = require("../resources.json");
const talkedRecently = new Set();

module.exports = {
    name: 'joke',
    description: 'Sendet einen Flachewitz',
    execute(message, args) {
        if (talkedRecently.has(message.author.id)) {
            message.channel.send("Wait a bit before getting typing this again. - " + "<@" + message.author + ">");
        } else {

            // the user can type the command

            https.get('https://official-joke-api.appspot.com/random_joke',
                res => {
                    // console.log(res.statusCode);
                    // console.log(res.headers);

                    let data = '';

                    res.on('data', chunk => {
                        data += chunk;
                    });

                    res.on('end', () => {
                        let answer = JSON.parse(data);

                        let jokeEmbed = new Discord.MessageEmbed()
                            .setTitle("**Joke Incoming**")
                            .setThumbnail(image_links.domtendo_face)
                            .setDescription(answer.setup + "\n" + answer.punchline)
                            .setFooter("Joke ID: " + answer.id);

                        message.channel.send(jokeEmbed);
                    });


                    // Adds the user to the set so that they can't talk for a bit
                    talkedRecently.add(message.author.id);
                    setTimeout(() => {
                        // Removes the user from the set after a minute
                        talkedRecently.delete(message.author.id);
                    }, 4000);
                })
        }
    }
}
const Discord = require('discord.js');
const https = require('https');
const talkedRecently = new Set();

module.exports = {
    name: 'joke',
    description: 'Sends a bad joke',
    execute(message, args, client) {
        if (talkedRecently.has(message.author.id)) {
            message.channel.send(":mute: Wait a bit before getting typing this again. - " + "<@" + message.author + ">");
        } else {

            https.get('https://official-joke-api.appspot.com/random_joke',
                res => {

                    let data = '';

                    res.on('data', chunk => {
                        data += chunk;
                    });

                    res.on('end', () => {
                        let answer = JSON.parse(data);

                        let jokeEmbed = {
                            title: `Bad joke #${answer.id}`,
                            description: answer.setup + "\n" + answer.punchline,
                            footer: {
                                text: client.user.username,
                                icon_url: client.user.displayAvatarURL({ format: "png" }),
                            },
                            timestamp: (new Date()).toISOString()
                        };

                        message.channel.send({ embed: jokeEmbed });
                    });


                    // Adds the user to the set so that they can't talk for a bit
                    talkedRecently.add(message.author.id);
                    setTimeout(() => {
                        // Removes the user from the set after a minute
                        talkedRecently.delete(message.author.id);
                    }, 4000); // <- That's not a minute lmao
                })
        }
    }
}
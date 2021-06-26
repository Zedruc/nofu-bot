const Discord = require('discord.js');
const https = require('https');

module.exports = {
    name: 'findsongs',
    description: 'Searches songs of given artist',
    execute(message, args, client) {
        console.log(args);
        if (!args.length) return message.reply("You have to name an artist whose songs you want find");
        if (message.guild === null) return;

        let prefix = "%";
        let url = "https://itunes.apple.com/search?term=";
        let body = '';
        let term = message.content.slice(prefix.length + 9).trim().split(/ +/);
        console.log(term);
        https.get(url + term, res => {
            res.on('data', chunk => {
                body += chunk;
            })

            res.on('end', () => {
                let bodyString = JSON.parse(body);

                //let length = bodyString.results.length - 1;
                let allNames = [];
                //let i = 0;
                //do {
                //    i++
                //    allNames.push(bodyString.results[i].trackName);
                //} while (i < length);

                for (let i = 0; i < bodyString.results.length; i++) {
                    const element = bodyString.results[i];
                    allNames.push(element.trackName);
                }

                let songsEmbed = {
                    title: `Songs from ${term.join(" ")}`,
                    url: bodyString.results[0].artistViewUrl,
                    description: allNames.join(', '),
                    thumbnail: { url: bodyString.results[0].artworkUrl100 },
                    fields: [
                        {
                            name: "Main genre",
                            value: bodyString.results[0].primaryGenreName,
                        }
                    ],
                    footer: {
                        text: client.user.username,
                        icon_url: client.user.displayAvatarURL({ format: "png" }),
                    },
                    timestamp: (new Date()).toISOString()
                }

                message.author.send({ embed: songsEmbed });

                message.channel.send("<@" + message.author + ">, sent you the list in Direct Messages to prevent the bot spamming the chat with a huge list :)")

            })
        })
    }
}
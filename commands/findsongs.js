const Discord = require('discord.js');
const https = require('https');

module.exports = {
    name: 'findsongs',
    description: 'searches songs of given artist',
    execute(message, args) {
        let prefix = "%";
        let url = "https://itunes.apple.com/search?term=";
        let body = '';
        let msgArgs = message.content.slice(prefix.length).trim().split(/ +/);
        let term = message.content.slice(prefix.length + 9).trim().split(/ +/);

        https.get(url + term, res => {
            res.on('data', chunk => {
                body += chunk;
            })

            res.on('end', () => {
                let bodyString = JSON.parse(body);
                console.log(bodyString);

                let length = bodyString.results.length - 1;
                let allNames = [];
                let i = 0;
                do {
                    i++
                    allNames.push(bodyString.results[i].trackName);
                } while (i < length);

                let songsEmbed = new Discord.MessageEmbed()
                    .setTitle("**Songs from: __" + term + "__**")
                    .setDescription(allNames)
                    .setThumbnail(bodyString.results[0].artworkUrl100)

                message.reply(songsEmbed);
            })
        })
    }
}
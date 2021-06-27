//https://www.googleapis.com/youtube/v3/search?part=snippet&q=STRING_TO_SEARCH&key=process.env.youtube_api_key
const https = require('https');
const Discord = require('discord.js');

module.exports = {
    name: "ytsearch",
    description: "Search for content on youtube",
    execute(message, args, client) {
        if (!args.length) return message.channel.send("Please provide a term/sentence to search");
        var query = message.content.substring(message.content.indexOf(" "));
        https.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${process.env.youtube_api_key}`, (res) => {
            var data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                var json = JSON.parse(data);

                if (json.pageInfo.totalResults == 0) return message.channel.send("No results found.");

                var topResults = json.items;

                var embedMessage = new Discord.MessageEmbed()
                    .setColor("#FF0000")
                    .setTitle(`Top Searchresults for "${query}"`)
                    .addField(`${topResults[0].snippet.title} ${topResults[0].id.kind == "youtube#channel" ? "[Channel]" : "[Video]"}`, topResults[0].snippet.description)
                    .addField(`${topResults[1].snippet.title} ${topResults[1].id.kind == "youtube#channel" ? "[Channel]" : "[Video]"}`, topResults[1].snippet.description)
                    .addField(`${topResults[2].snippet.title} ${topResults[2].id.kind == "youtube#channel" ? "[Channel]" : "[Video]"}`, topResults[2].snippet.description)

                message.channel.send(embedMessage);
            });
        });
    }
}
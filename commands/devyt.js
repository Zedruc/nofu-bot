const https = require('https');
const Discord = require('discord.js');

module.exports = {
    name: 'devyt',
    description: 'Sendet einen Flachewitz',
    execute(message, args) {
        let key = process.env.yt_api;
        https.get('https://www.googleapis.com/youtube/v3/search?part=snippet&q=Tot%20Nofu&key=' + key, res => {

            let body = '';

            res.on('data', chunk => {
                body += chunk;
            });

            res.on('end', () => {
                let bodyString = JSON.parse(body);
                let channelId = bodyString.items[0].id.channelId;
                let channel = bodyString.items[0].snippet.title;
                let isLive = bodyString.items[0].snippet.liveBroadcastContent;
                console.log(channel);

                let ytEmbed = new Discord.MessageEmbed()
                    .setColor('	#FF0000')
                    .setTitle('**__The Developer\'s Channel: __**')
                    .addField('Channel ID: ', channelId, true)
                    .addField('Channel Name: ', channel, true)
                    .addField('isLive', isLive, true)

                message.channel.send(ytEmbed);

            });
        });
    }
}
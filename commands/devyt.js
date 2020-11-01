const https = require('https');
const Discord = require('discord.js');

module.exports = {
  name: 'devyt',
  description: 'Sends a bad joke',
  execute(message, args, client) {
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
      let isLiveCnt = bodyString.items[0].snippet.liveBroadcastContent;
      
      let ytEmbed = {
        title: "The developer's channel:",
        color: '#ff0000',
        fields:[
          {
            name: "Channel ID",
            value: channelId,
            inline: true
          },
          {
            name: "Channel Name",
            value: channel,
            inline: true
          },
          {
            name: "Currently streaming",
            value: isLiveCnt == "none" ? "No" : "Yes",
            inline: true
          },
        ],
        footer:{
          text: client.user.username,
          icon_url: client.user.displayAvatarURL({format: "png"}),
        },
        timestamp: (new Date()).toISOString()
      }
      message.channel.send({embed: ytEmbed});
      
    });
  });
}
}
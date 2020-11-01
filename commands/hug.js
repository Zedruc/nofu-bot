const Discord = require("discord.js");
const https = require('https');
const { join } = require("path");

module.exports = {
  name: "hug",
  description: "Since T H E   W O R L D W I D E   E V E N T is still a thing you now can hug others via discord :D!",
  execute(message, args, client) {
    if (message.guild === null) return;
    
    const taggedUser = message.mentions.users.first();
    
    let prefix = "%";
    
    let key = process.env.tenorkey;
    let msgArgs = message.content.slice(prefix.length).trim().split(/ +/);
    
    console.log({taggedUser, msgArgs})
    
    https.get('https://api.tenor.com/v1/search?q=anime+hug&limit=50&key=' + key, res => {
    
    let body = '';
    
    res.on('data', chunk => {
      body += chunk;
    })
    
    res.on('end', () => {
      let bodyString = JSON.parse(body);
      let int = Math.floor(Math.random(1) * 49);
      
      let gifUrl = bodyString.results[int].media[0].gif.url;
      if (taggedUser) {
        if (taggedUser == message.author.id) {
          return message.channel.send("You must be lonely huh")
        } else if (taggedUser == 760905298990202901) {
          return message.reply("Wait what?");
        }
      }
      let hugEmbed = {
        title: `${message.member.displayName} hugged ${taggedUser ? taggedUser.username : msgArgs[1]}!`,
        image: {url: gifUrl},
        footer:{
          text: client.user.username,
          icon_url: client.user.displayAvatarURL({format: "png"}),
        },
        timestamp: (new Date()).toISOString()
      };
      message.channel.send({embed: hugEmbed});
    })
  })
}
}

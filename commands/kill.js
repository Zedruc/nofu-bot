const Discord = require("discord.js");
const https = require('https');
const { join } = require("path");

module.exports = {
  name: "kill",
  description: "In case of emergency (e.g. Being destroyed in an argument)",
  execute(message, args, client) {
    if (message.guild === null) return;

    const taggedUser = message.mentions.users.first();

    let prefix = "%";

    let key = process.env.tenorkey;
    let msgArgs = message.content.slice(prefix.length).trim().split(/ +/);

    let decision = Math.floor(Math.random() * (3 - 1)) + 1

    if (decision == 1) {

      https.get('https://api.tenor.com/v1/search?q=anime+shooting+gun&limit=50&key=' + key, res => {

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
              return message.channel.send("... ;-;")
            } else if (taggedUser == 760905298990202901) {
              return message.reply("Nice try");
            }

          }
          let killEmbed = {
            title: `${message.member.displayName} killed ${taggedUser ? taggedUser.username : msgArgs.join(" ")}!`,
            image: { url: gifUrl },
            color: "#9E1A1A",
            footer: {
              text: client.user.username,
              icon_url: client.user.displayAvatarURL({ format: "png" }),
            },
            timestamp: (new Date()).toISOString()
          };
          message.channel.send({ embed: killEmbed });
        })
      })
    } else if (decision == 2) {
      https.get('https://api.tenor.com/v1/search?q=animegirl%20gun&limit=50&key=' + key, res => {

        let body = '';

        res.on('data', chunk => {
          body += chunk;
        })

        res.on('end', () => {
          let bodyString = JSON.parse(body);
          let int = Math.floor(Math.random(1) * 49);

          let gifUrl = bodyString.results[int].media[0].tinygif.url;
          if (taggedUser) {

            if (taggedUser == message.author.id) {

              message.channel.send("Dude...")

            } else if (taggedUser == 760905298990202901) {

              message.reply("NO NO NO NO");

            } else if (taggedUser == 568729687291985930) {
              message.reply("Oh... I'm not gonna let you kill my father.")

              let destructionEmbed = {
                title: message.member.displayName + " killed " + message.author + "! \n",
                color: "#910f06",
                description: '"Fatality"',
                image: { url: gifUrl },
                footer: {
                  text: client.user.username,
                  icon_url: client.user.displayAvatarURL({ format: "png" }),
                },
                timestamp: (new Date()).toISOString()
              };
              message.channel.send({ embed: destructionEmbed });
            }
          }
          let killEmbed = {
            title: `${message.member.displayName} killed ${taggedUser ? taggedUser.username : msgArgs[1]}!`,
            image: { url: gifUrl },
            color: "#9E1A1A",
            footer: {
              text: client.user.username,
              icon_url: client.user.displayAvatarURL({ format: "png" }),
            },
            timestamp: (new Date()).toISOString()
          };
          message.channel.send({ embed: killEmbed });
        }
        );
      })
    }
  }
}

const Discord = require("discord.js");
const client = new Discord.Client();
const { v4: uuidv4 } = require('uuid');

const owner = 568729687291985930;

module.exports = {
  name: "client",
  description: "will destroy the client",
  execute(message, args, client) {
    let prefix = "%";

    let msgArgs = message.content.slice(prefix.length).trim().split(/ +/);

    if (message.author.id === owner) {
      if (msgArgs[1] == "restart") {

        let bootEmbed = {
          title: "Restarting client",
          description: "Booting up automatically",
          color: '#8b0000',
          footer: {
            text: client.user.username,
            icon_url: client.user.displayAvatarURL({ format: "png" }),
          },
          timestamp: (new Date()).toISOString()
        }

        message.channel.send({ embed: bootEmbed })
          .then(msg => client.destroy())
          .then(() => client.login(process.env.token))

      } else if (msgArgs[1] == "shutdown") {
        //test

        let bootEmbed = {
          title: "Destroying client",
          description: "Will boot up again on `node main.js",
          color: '#8b0000',
          footer: {
            text: client.user.username,
            icon_url: client.user.displayAvatarURL({ format: "png" }),
          },
          timestamp: (new Date()).toISOString()
        }

        message.channel.send({ embed: bootEmbed })
          .then(msg => client.destroy())
          .then(() => client.login(process.env.token))

        const uuid = uuidv4();

        console.log("Client operation ID: " + uuid);

        client.destroy();

      }
    } else {
      return message.channel.send("__You're not allowed to use this command!__");
    }

  }
}
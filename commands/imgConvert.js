const Discord = require("discord.js");
var convertapi = require("convertapi")("DDysaqRl9AkMP5eL");

module.exports = {
  name: "convert",
  description: "Converts given file url to provided file-type",
  execute(message, args) {
    message.channel
      .awaitMessages((m) => m.author.id == message.author.id, {
        max: 1,
        time: 30000,
      })
      .then((collected) => {
        const prefix = "%";
        const args = message.content.slice(prefix.length).trim().split(' ');
        let url = args[1];
        console.log(url);
      });
  },
};

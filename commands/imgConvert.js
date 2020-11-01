const Discord = require("discord.js");
var convertapi = require("convertapi")("DDysaqRl9AkMP5eL");
const { image_links } = require("../resources.json");

module.exports = {
  name: "convert",
  description: "Converts given file url to provided file-type",
  execute(message, args, client) {

    if (message.guild === null) return;

    const prefix = "%";
    let msgArgs = message.content.slice(prefix.length).trim().split(' ');
    let fileType = msgArgs[1];
    let url = msgArgs[2];
    console.log(url);

    convertapi
      .convert(fileType, {
        File: url,
      })
      .then(function (result) {
        // get converted file url
        console.log("Converted file url: " + result.file.url);

        let downloadEmbed = {
          title: `Your Download link!`,
          url: result.file.url,
          footer:{
            text: client.user.username,
            icon_url: client.user.displayAvatarURL({format: "png"}),
          },
          timestamp: (new Date()).toISOString()
        } 
        message.channel.send({embed: downloadEmbed})
      })

      .catch(function (e) {
        message.channel.send(`:interrobang: An error occured whilst converting your file. Check if your file is valid and if the destination (*${fileType}*) is too.`);
      });
  }
};

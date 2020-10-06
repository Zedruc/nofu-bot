const Discord = require("discord.js");
var convertapi = require("convertapi")("DDysaqRl9AkMP5eL");
const { image_links } = require("../resources.json");

module.exports = {
  name: "convert",
  description: "Converts given file url to provided file-type",
  execute(message, args) {

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

        let downloadEmbed = new Discord.MessageEmbed()
          .setThumbnail(image_links.image_icon)
          .setTitle("Your Download link: ")
          .addField(result.file.url, `Your image converted to ${fileType}`)

        message.channel.send(downloadEmbed);
      })

      .catch(function (e) {
        console.error(e.toString());
      });
  }
};

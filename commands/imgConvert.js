const Discord = require("discord.js");
var convertapi = require("convertapi")("DDysaqRl9AkMP5eL");

module.exports = {
  name: "convert",
  description: "Converts given file url to provided file-type",
  execute(message, args) {
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
      })

      .catch(function (e) {
        console.error(e.toString());
      });
  }
};

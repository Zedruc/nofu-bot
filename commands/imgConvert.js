const Discord = require("discord.js");
var convertapi = require("convertapi")("DDysaqRl9AkMP5eL");

module.exports = {
  name: "convert",
  description: "Converts given file url to provided file-type",
  execute(message, args) {
    const prefix = "%";
    let msgArgs = message.content.slice(prefix.length).trim().split(' ');
    let url = msgArgs[2];
    console.log(url);

    convertapi
      .convert(args[1], {
        File: url,
      })
      .then(function (result) {
        // get converted file url
        console.log("Converted file url: " + result.file.url);
        // save to file
        return;
      });
  }
};

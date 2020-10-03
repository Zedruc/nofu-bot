const Discord = require("discord.js");
var convertapi = require("convertapi")("DDysaqRl9AkMP5eL");

module.exports = {
  name: "convert",
  description: "Converts given file url to provided file-type",
  execute(message, args) {
    const prefix = "%";
    let args = message.content.slice(prefix.length).trim().split(' ');
    let url = args[1];
    console.log(url);

    convertapi
      .convert("png", {
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

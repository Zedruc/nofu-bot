const { error } = require("console");
const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();

module.exports = {
  name: 'delete',
  description: 'löscht Nachrichten',
  execute(message, args) {

    if (message.guild === null) return;

    var args = message.content.slice(6).split(" ");

    const löschAnzahl = args[1];

    if (!löschAnzahl || löschAnzahl == 0 || löschAnzahl > 100) {

      message.reply("Please provide a number between 2 and 100!");

    } else if (message.member.hasPermission('ADMINISTRATOR')) {

      message.delete;

      return message.channel.bulkDelete(löschAnzahl);

    } else {
      message.reply("Youre not in the owner!");

      console.log("User " + message.author.id + " hat versucht den command `delete` zu benutzen");
    }
  }
}
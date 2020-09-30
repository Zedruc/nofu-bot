const { error } = require("console");
const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();

module.exports = {
  name: 'delete',
  description: 'löscht Nachrichten',
  execute(message, args) {

    var args = message.content.slice(6).split(" ");

    const löschAnzahl = args[1];

    if(!löschAnzahl || löschAnzahl == 0 || löschAnzahl > 100){

      message.reply("Gib bitte eine Zahl zwischen 0 und 100 an");

    } else if (message.author.id == message.guild.ownerID){

      message.delete;

      return message.channel.bulkDelete(löschAnzahl);

    } else{
      message.reply("Du bist nicht in der Adminliste eingetragen!");

      console.log("User " + message.author.id+ " hat versucht den command `delete` zu benutzen");
    }
  }
}
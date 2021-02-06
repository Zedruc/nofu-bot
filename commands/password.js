const { throws } = require('assert');
const Discord = require('discord.js');
const fs = require('fs');
const git = require('git');

module.exports = {
  name: 'password',
  description: 'Generates a password',
  execute(message, args) {
    const passwordLength = 15;
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz.;,$!';
    var charactersLength = characters.length;
    for (var i = 0; i < passwordLength; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    let passEmbed = new Discord.MessageEmbed()
      .setTitle("**Your personal generated password:**")
      .addField("There you go: ", result)
      .setFooter(`There are ${charactersLength ** 15}  different passwords this bot can generate :p`)
      .setTimestamp();

    message.author.send(passEmbed);
  }
}

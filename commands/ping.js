module.exports = {
  name: 'ping',
  description: "Ping command",
  execute(message, args) {
    const talkedRecently = new Set();
    if (talkedRecently.has(message.author.id)) {
      message.channel.send("Wait a bit before getting typing this again. - " + "<@" + message.author + ">");
    } else {
      const Discord = require('discord.js');
      message.channel.send("pinging...").then(m => {
        // The math thingy to calculate the user's ping
        var ping = m.createdTimestamp - message.createdTimestamp;

        // Basic embed
        var embed = new Discord.MessageEmbed()
          .setAuthor(`Ping: ${ping}ms`)
          .setColor(9384170)

        // Then It Edits the message with the ping variable embed that you created
        m.edit(embed)
          .catch(error => {
            console.error("Es ist folgender Fehler in help.js aufgetreten: ", error);
          });
      });
      talkedRecently.add(message.author.id);
      setTimeout(() => {
        // Removes the user from the set after a minute
        talkedRecently.delete(message.author.id);
      }, 4000);
    }
  }
}
const Discord = require('discord.js');
const moment = require('moment');
const client = new Discord.Client();
require("moment-duration-format");

require("moment-duration-format");
module.exports = {
  name: 'uptime',
  description: "Bot Stats",
  execute(message, args, bot) {

    let days = Math.floor(client.uptime / 86400000);
    let hours = Math.floor(client.uptime / 3600000) % 24;
    let minutes = Math.floor(client.uptime / 60000) % 60;
    let seconds = Math.floor(client.uptime / 1000) % 60;

    const statEmbed = new Discord.MessageEmbed()
      .setTitle("**  = STATISTICS =**")
      .addField("**Memory usage ::**", `**${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB**`)
      .addField("**Uptime (glitched, still trying to fix it ;-;)**", `__Uptime:__\n${days}d ${hours}h ${minutes}m ${seconds}s`);
    message.channel.send(statEmbed);
  }
}
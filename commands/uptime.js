const Discord = require('discord.js');
const moment = require('moment');
const client = new Discord.Client();
require("moment-duration-format");

require("moment-duration-format");
module.exports = {
    name: 'uptime',
    description: "Bot Stats",
    execute(message, args, bot){


          const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");

        //#region Testing different options of uptime
          const x = Date.now();
          const xy = x - Date.now();
          console.log(xy);
        //#endregion

          const statEmbed = new Discord.MessageEmbed()
          .setTitle("**  = STATISTICS =**")
          .addField("**Memory usage ::**", `**${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB**`)
          .addField("**Uptime (glitched, still trying to fix it ;-;)**", `**${duration}**`);

          message.channel.send(statEmbed)
        }
}
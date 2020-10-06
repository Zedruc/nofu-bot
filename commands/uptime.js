const Discord = require('discord.js');
const moment = require('moment');
const client = new Discord.Client();
require("moment-duration-format");

require("moment-duration-format");
module.exports = {
  name: 'uptime',
  description: "Bot Stats",
  execute(message, args, bot) {

    if (message.guild === null) return;

  }
}
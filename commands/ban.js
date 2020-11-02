const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
  name: "ban",
  description: "Bans a member",
  execute(message, args) {
    // Ban a user by ID (or with a user/guild member object)
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You dont have the permission to run this command")
    let User = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!args[0]) return message.channel.send('Please specify a user');

    if (!User) return message.channel.send('User not found');
    if (User.hasPermission("BAN_MEMBERS")) return message.reply("Can't ban user since their role is equal to or above mine")
    let banReason = args.join(" ").slice(22);
    if (!banReason) {
      banReason = "No reason given";
    }

    User.ban({ reason: banReason })

    let td = new Date();
    let dd = String(td.getDate()).padStart(2, '0');
    let mm = String(td.getMonth() + 1).padStart(2, '0');
    let yyyy = td.getFullYear();
    let date = dd + "/" + mm + "/" + yyyy; //European

    let banEmbed = new Discord.MessageEmbed()
      .setColor("#FF0000")
      .setTitle(User + " was banned by " + message.member.displayname)
      .setAuthor("Ban case", message.author.displayAvatarURL, message.author.displayAvatarUR)
      .setDescription("Ban reason: " + banReason + "\n Date of ban: " + date)
      .setThumbnail("https://emoji.gg/assets/emoji/2283_BongoCatBanHammer.gif")
      .setTimestamp();

    message.channel.send(banEmbed);

  }
}
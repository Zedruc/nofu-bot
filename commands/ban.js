const Discord = require('discord.js');

module.exports = {
  name: "ban",
  description: "Bans a member",
  execute(message, args) {
    // Ban a user by ID (or with a user/guild member object)
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You dont have the permission to run this command")
    let User = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
    if (!User) return message.channel.send("No user given to ban")
    if (User.hasPermission("BAN_MEMBERS")) return message.reply("Can't kick user since their role is equal to or above mine")
    let banReason = args.join(" ").slice(22);
    if (!banReason) {
      banReason = "No reason given";
    }

    User.ban({ reason: banReason })

    let banEmbed = new Discord.MessageEmbed()
      .setColor("#FF0000")
      .setTitle(User + " was banned by " + message.author.displayname)
      .setAuthor("__Ban case__", message.author.avatarURL, message.author.avatarURL, true)
      .setDescription("Ban reason: " + banReason + "\n Date of ban: " + Date.now())
      .setThumbnail("https://emoji.gg/assets/emoji/2283_BongoCatBanHammer.gif")
      .setTimestamp();

    message.channel.send(banEmbed);

  }
}
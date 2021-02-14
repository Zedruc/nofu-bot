const Discord = require("discord.js");

module.exports = {
    name: 'banreason',
    description: 'Shows ban reason for specified user',
    execute(message, args, client) {
        let id = args[0];
        if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply("To view ban reasons you must have the permission to ban users!");

        message.guild.fetchBans().then(bans => {
            let user = bans.filter(r => r.user.id == id);
            if (!user) return message.reply("user not found");

            let embed = new Discord.MessageEmbed()
                .setTitle(`Ban reason for case ${user.first().id}`)
                .addField("Ban Reason", user.first().reason)
            message.channel.send(embed)
        });
    }
}

/**
{
  "reason": "mentioning b1nzy",
  "user": {
    "username": "Mason",
    "discriminator": "9999",
    "id": "53908099506183680",
    "avatar": "a_bab14f271d565501444b2ca3be944b25"
  }
}
 */
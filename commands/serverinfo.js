const Discord = require('discord.js');

module.exports = {
    name: 'serverinfo',
    description: "Zeigt infos über den aktuellen Server an",
    execute(message, args) {

        if (message.guild === null) return;

        let infoEmbed = new Discord.MessageEmbed()
            .setColor(9384170)
            .setTitle("*Server Info*")
            .addField("**Server Name:**", `${message.guild.name}`, true)
            .addField("**Member Count:**", `${message.guild.memberCount}`, true)
            .addField("**Server Owner**", `${message.guild.owner}`, true)

        message.channel.send(infoEmbed);
    }
}
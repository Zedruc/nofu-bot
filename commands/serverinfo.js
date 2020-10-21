const Discord = require('discord.js');

module.exports = {
    name: 'serverinfo',
    description: "Zeigt infos über den aktuellen Server an",
    execute(message, args) {

        if (message.guild === null) return;

        let infoEmbed = new Discord.MessageEmbed()
            .setColor(9384170)
            .setTitle("*__Server Info__*")
            .setImage(message.guild.iconURL)
            .setDescription(`Information about ${message.guild}`)
            .addField("**Owner**: ", `The owner of this server is ${message.guild.owner}`)
            .addField("**Member Count**: ", ` ${message.guild.memberCount} members`)
            .addField("**Emoji Count**: ", ` ${message.guild.emojis.cache.size} emojis`)
            .addField("**Roles Count**: ", ` ${message.guild.roles.cache.size} roles`)

        message.channel.send(infoEmbed);
    }
}
const Discord = require('discord.js');

module.exports = {
    name: 'kick',
    description: 'Will kick the mentioned member // Wird den gepingten Member kicken',
    execute(message, args, member, mentions){
        if (member.hasPermission('ADMINISTRATOR') || member.hasPermission('BAN_MEMBERS')) {
            console.log("yes it works");
        }else {
            message.channel.send(`<@${member.id}> You don't have permissions to use %ban!`)
        }
    }
}
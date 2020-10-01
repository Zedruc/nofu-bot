const Discord = require('discord.js');
const { member, mentions } = message

module.exports = {
    name: 'kick',
    description: 'Will kick the mentioned member // Wird den gepingten Member kicken',
    execute(message, args){
        if (message.author.hasPermission('ADMINISTRATOR') || message.author.hasPermission('BAN_MEMBERS')) {
            console.log("yes it works");
        }else {
            message.channel.send(`<@${member.id}> You don't have permissions to use %ban!`)
        }
    }
}
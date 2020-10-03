const Discord = require('discord.js');
import { welcomeToggle } from "../main";
//export { welcomeToggle };

module.exports = {
    name: 'welcome',
    description: 'welcome toggle',
    execute(message, args) {
        if (message.member.roles.find(role => role.hasPermission('Administrator'))) {
            welcomeToggle = !welcomeToggle;


            let welcomeToggleEmbed = new Discord.MessageEmbed()
                .setTitle("Welcome Message Flag")
                .setDescription("the Flag `welcomeMessage` is now set to " + welcomeToggle)

            message.channel.send(welcomeToggleEmbed);
        }
    }
}
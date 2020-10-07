const Discord = require('discord.js');
//export { welcomeToggle };

let welcomeToggle = true;

module.exports = {
    name: 'welcome',
    description: 'welcome toggle',
    execute(message, args) {

        if (message.guild === null) return;

        if (message.member.hasPermission('Administrator')) {
            welcomeToggle = !welcomeToggle;


            let welcomeToggleEmbed = new Discord.MessageEmbed()
                .setTitle("Welcome Message Flag")
                .setDescription("the Flag `welcomeMessage` is now set to " + welcomeToggle)

            message.channel.send(welcomeToggleEmbed);
        }
    }
}
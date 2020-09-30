module.exports = {
    name: 'help',
    description: "Help Command",
    execute(message, args){
        const Discord = require('discord.js');
        const server = message.guild.name;
        const embed = new Discord.MessageEmbed()
                    .setTitle("Helpcenter >>")
                    .setColor(9384170)
                    .addField("Commands :", "-----------------------------------------")
                    .addField("**%help**", "that || ", true)
                    .addField("**%meme**", "sends a random meme || ", true)
                    .addField("**%ping**", "Connectiontest to current server (" + server +")", true)
                    .addField("**%delete <number>**", "deletes the provided amount of messages", true)
                    .addField("**%uptime**", "Shows bot stats (Still glitched)", true)
                    .addField("**%joke**", "Sends a random joke", true)
                    .addField("**%userinfo**", "Shows info about pinged user / about you")
                    .addField("**%mememan**", "sends a random ***mememan*** meme", true)
                    .addField("**%password**", "generates a random password and sends it to you", true)
                message.channel.send(embed).catch(error =>{
                    console.error("Es ist folgender Fehler in help.js aufgetreten:", error);
                });
    }
}
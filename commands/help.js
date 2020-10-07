module.exports = {
    name: 'help',
    description: "Help Command",
    execute(message, args) {

        if (message.guild === null) return;

        const Discord = require('discord.js');
        const server = message.guild.name;
        const embed = new Discord.MessageEmbed()
            .setTitle("Helpcenter >>")
            .setColor(9384170)
            .addField("Commands :", "-----------------------------------------")
            .addField("**%help**", "that || ", true)
            .addField("**%meme**", "`sends a random meme` || ", true)
            .addField("**%ping**", "`Connectiontest to current server (" + server + ")`", true)
            .addField("**%delete <number>**", "`deletes the provided amount of messages`", true)
            .addField("**%uptime**", "`Shows bot stats (Still glitched)`", true)
            .addField("**%joke**", "`Sends a random joke`", true)
            .addField("**%userinfo**", "`Shows info about pinged user / about you`")
            .addField("**%mememan**", "`sends a random` " + "***mememan***" + "` meme`", true)
            .addField("**%password**", "`generates a random password and sends it to you`", true)
            .addField("**%convert**", "`Allows you to provide a direct link to an image and convert it to the given file type` \n\n example: %convert png https://cdn.discordapp.com/attachments/583683143895220226/761889131034574858/20201002_101811.jpg", true)
            .addField("**%welcome**", "`If the user of the command is admin it toggles the welcoming message`", true)
            .addField("**%findanime <name>**", "`Will show you some information about the given anime // or do \`%findanime characters <name>\` to get a list of the characters in the given anime`", true)
            .addField("**%findsongs <band / artist name>**", "allows you to search up songs from the given band / artist \n will also give you a link to the artists itunes page", true)
            .addField("**%slap @user**", "`s l a p`")
            .setFooter("Also check out the bot\'s website:  https://Nofu-Bot.totnofu.repl.co")
        message.channel.send(embed).catch(error => {
            console.error("Es ist folgender Fehler in help.js aufgetreten:", error);
        });
    }
}
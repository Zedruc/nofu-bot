const Discord = require("discord.js");

module.exports = {
    name: "suggest",
    description: "Lets you suggest ideas/improvements for the Nofu Bot :D",
    execute(message, args, client) {
        var suggestionContent = {};
        if (message.guild) return message.reply("please use this command in my direct messages!");
        else {
            const filter = (m) => m.author.id === message.author.id;
            message.channel.send("What\'s your suggestion?");
            message.channel
                .awaitMessages(filter, { max: 1, time: 180000 })
                .then((collected) => {
                    suggestionContent["userID"] = collected.first().author.id;
                    suggestionContent["userName"] = collected.first().author;
                    suggestionContent["message"] = collected.first().content;

                    let suggestionEmbed = new Discord.MessageEmbed()
                        .setTitle("**New Suggestion!**")
                        .addField(`__Suggestion by: ${suggestionContent.userName} (${suggestionContent.userID})__`, `${suggestionContent.message}`)
                    client.users.get("568729687291985930").send(suggestionEmbed);
                }).catch((err) => {
                    message.channel.send("You took longer than 3 minutes!")
                    console.log(err);
                });

        }
    }
}
const Discord = require('discord.js');
const talkedRecently = new Set();

module.exports = {
    name: "8ball",
    description: "Ask 8ball some questions",
    execute(message, args, client) {
        if (talkedRecently.has(message.author.id)) {
            return message.channel.send(":mute: Wait a bit before using this again. - " + "<@" + message.author + ">");
            // Adds the user to the set so that they can't talk for a bit
        }
        const answers = [
            "***Yes***",
            "Lol, **no**",
            "Yeah, idc",
            "Sure why not",
            "Why though",
            "Yesn't",
            "Non't",
            "nerd"
        ];

        const question = message.content.slice(6).split(/ +/);

        const answer_index = Math.floor(Math.random() * (answers.length - 1 - 0)) + 0;

        let embed = new Discord.MessageEmbed()
            .setTitle(":8ball:")
            .addField("__:question: Question__", question.join(" "))
            .addField("__:white_check_mark: Answer__", answers[answer_index]);

        message.channel.send(embed);

        talkedRecently.add(message.author.id);
        setTimeout(() => {
            // Removes the user from the set after a minute
            talkedRecently.delete(message.author.id);
        }, 8000); // <- That's not a minute lmao
    }
}
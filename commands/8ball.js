const Discord = require('discord.js');

module.exports = {
    name: "8ball",
    description: "Ask 8ball some questions",
    execute(message, args, client) {
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
    }
}
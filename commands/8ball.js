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
            "Yesn't",
            "Non't",
            "Perhaps",
            "maybe, idk",
            "Error 420: 8Ball doesn't care",
            "Nope"
        ];
        const question = message.content.slice(6).split(/ +/);

        if (new RegExp("([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?").test(question.join(" ").toString())) {
            talkedRecently.add(message.author.id);
            setTimeout(() => {
                // Removes the user from the set after a minute
                talkedRecently.delete(message.author.id);
            }, 12000);
            return message.channel.send("A link isn't a question");
        }
        talkedRecently.add(message.author.id);
        setTimeout(() => {
            // Removes the user from the set after a minute
            talkedRecently.delete(message.author.id);
        }, 8000);

        // Pick random answer
        let answer_index = Math.floor(Math.random() * answers.length);

        function send() {
            let embed = new Discord.MessageEmbed()
                .setTitle(":8ball:")
                .addField("__:question: Question__", question.join(" "))
                .addField("__:white_check_mark: Answer__", answers[answer_index]);

            message.channel.send(embed);

            talkedRecently.add(message.author.id);
            setTimeout(() => {
                // Removes the user from the set after a minute
                talkedRecently.delete(message.author.id);
            }, 8000);
            return;
        }

        send();
    }
}
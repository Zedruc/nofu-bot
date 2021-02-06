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

        // Yoinked from stackoverflow lol
        //var substrings = ["one", "two", "three"];
        //var str;
        //
        //// Setup
        //console.log("Substrings: " + substrings.join(","));
        //
        //// Try it where we expect a match
        //str = "this has one";
        //if (new RegExp(substrings.join("|")).test(str)) {
        //    console.log("Match using '" + str + "'");
        //} else {
        //    console.log("No match using '" + str + "'");
        //}

        const answers = [
            "***Yes***",
            "Lol, **no**",
            "Yeah, idc",
            "Sure why not",
            "Yesn't",
            "Non't",
            "nerd",
            "maybe, idk",
            "8ball is currently on vacation, come back later...",
            "nope"
        ];

        const censoredStuffAnswers = [
            "I've heard Hentai... Hentai is a big ***no no***",
            "Lolis are illegal, calling the police" //1
        ]
        const question = message.content.slice(6).split(/ +/);

        if (new RegExp("([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?").test(question.join(" ").toString())) {
            talkedRecently.add(message.author.id);
            setTimeout(() => {
                // Removes the user from the set after a minute
                talkedRecently.delete(message.author.id);
            }, 12000); // <- That's not a minute lmao
            return message.channel.send("A link isn't a question");
        }
        talkedRecently.add(message.author.id);
        setTimeout(() => {
            // Removes the user from the set after a minute
            talkedRecently.delete(message.author.id);
        }, 8000);

        let answer_index = Math.floor(Math.random() * (answers.length - 1 - 0)) + 0;

        function sendCensored() {
            let embed = new Discord.MessageEmbed()
                .setTitle(":8ball:")
                .addField("__:question: Question__", question.join(" "))
                .addField("__:white_check_mark: Answer__", censoredStuffAnswers[answer_index]);

            message.channel.send(embed);

            talkedRecently.add(message.author.id);
            setTimeout(() => {
                // Removes the user from the set after a minute
                talkedRecently.delete(message.author.id);
            }, 8000); // <- That's not a minute lmao
            return;
        }

        for (let i = 0; i < question.length; i++) {
            if (question[i].toLowerCase().replace(/[^a-zA-Z ]/g, "") == "hentai") {
                answer_index = 1;
                sendCensored();
            }
            if (question[i].toLowerCase().replace(/[^a-zA-Z ]/g, "") == "loli") {
                answer_index = 0;
                sendCensored();
            }
            if (question[i].toLowerCase().replace(/[^a-zA-Z ]/g, "") == "lolis") {
                answer_index = 0;
                sendCensored();

            }
        }

        function sendNormal() {
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
            return;
        }

        sendNormal();
    }
}
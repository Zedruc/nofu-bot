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
            "I've heard Hentai... Hentai is a big ***no no***", //9
            "Lolis are illegal, calling the police"
        ];
        const question = message.content.slice(6).split(/ +/);

        console.log(question);

        if (new RegExp("([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?").test(question.join(" ").toString())) {
            return message.channel.send("URL detected, returned.");
        }

        let answer_index = Math.floor(Math.random() * (answers.length - 1 - 0)) + 0;

        for (let i = 0; i < question.length; i++) {
            if (question[i].toLowerCase().replace(/[^a-zA-Z ]/g, "") == "hentai") {
                answer_index = 9;
            }
        }

        for (let i = 0; i < question.length; i++) {
            if (question[i].toLowerCase().replace(/[^a-zA-Z ]/g, "") == "loli") {
                answer_index = 10;
            }
        }

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
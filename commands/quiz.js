const fs = require('fs');
const path = require('path');
const quizJSON = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'quiz.json')));

module.exports = {
    name: "quiz",
    description: "Asks a random question from the chosen topic. First one to answer wins.",
    execute: (message, args, client) => {
        var topics = ["geography", "history", "sports", "music", "celebrities", "tof"];
        if (!topics.includes(args[0])) return message.channel.send({
            embed: {
                title: "Error!",
                description: "Please choose one of the following quit topics with %quiz <topic>",
                fields: [
                    {
                        name: "geography",
                        value: "\u200b",
                        inline: true
                    },
                    {
                        name: "history",
                        value: "\u200b",
                        inline: true
                    },
                    {
                        name: "sports",
                        value: "\u200b",
                        inline: true
                    },
                    {
                        name: "music",
                        value: "\u200b",
                        inline: true
                    },
                    {
                        name: "celebrities",
                        value: "\u200b",
                        inline: true
                    },
                    {
                        name: "true or false (tof)",
                        value: "\u200b"
                    }
                ]
            }
        });

        if (args[0] == "tof") args[0] = "true_or_false";

        var topic = quizJSON[args[0]];
        var ans_ques_index = Math.floor(Math.random() * topic.questions.length);
        var correctResponse = topic.answers[ans_ques_index];
        const filter = m => m.content.includes(correctResponse) || m.content.includes(correctResponse.toLowerCase());
        var questionEmbed = {
            color: topic.color,
            title: `Question - ${args[0]}`,
            description: topic.questions[ans_ques_index],
            footer: {
                text: "First one to give the correct answer in 10 seconds wins!",
                icon_url: client.user.displayAvatarURL({ format: "png" }),
            },
            timestamp: (new Date()).toISOString()
        }
        var countdown = 10;
        message.channel.send({ embed: questionEmbed });
        const collector = message.channel.createMessageCollector(filter, { time: 10001 });
        var counter = setInterval(() => {
            countdown--;
            if (countdown === 0) {
                return message.channel.send({
                    embed: {
                        color: "#ff0000",
                        title: "TIMEOUT!",
                        description: `Nobody got the right answer in time.\nThe answer is: ${correctResponse}`
                    }
                });
            }
        }, 1001); // 1.001 seconds
        collector.on('collect', m => {
            clearInterval(counter);
            return message.channel.send({
                embed: {
                    color: "#3bd621",
                    title: `${m.author.username} got the answer!`
                }
            });
        });
    }
}
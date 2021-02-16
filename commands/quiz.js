// =============================================================================
// CONCEPT:
// - 7 Topics to choose from
// - 7 every topic has 10 questions, 5 random questions are selected
// - One question right = +2 Points
// - %join after someone started quiz queue with %quiz <topic> to take part
// - At the end, podium showing first 3 places
// --- Maybe more Questions on demand
//
// ORDER: [REQUIRED EVENT: USER USES %quiz]
// - Start queue with topic [  Topics with questions in Object: {"topic": {questions: ["1", "2"]}]}  ]
// - Make %join available to join queue
// - After every question wait 10 seconds (Or end question when everyone answered)
// - After all questions are done end quiz, show podium
//
// =============================================================================
const Discord = require('discord.js');
const fs = require('fs');
const { pathToFileURL } = require('url');

const topics = [
    "geography",
    "history",
    "sports",
    "music",
    "celebrities",
    "true_or_false"
]

module.exports = {
    name: "quiz",
    description: "%quiz <topic> to start a quiz, %join if a quiz is running",
    execute(message, args, client) {
        // get quiz starter
        const quizStarter = message.author.tag;

        const Qtopic = args[0];
        var pickedQuestions = [];
        var pickedAnswers = [];

        // =============================================================================
        // USER STARTS QUIZ
        // =============================================================================

        switch (args[0]) {
            case topics[0]:
                announceQuiz(quizStarter, topics[0])
                break;
            case topics[1]:
                announceQuiz(quizStarter, topics[1])
                break;
            case topics[2]:
                announceQuiz(quizStarter, topics[2])
                break;
            case topics[3]:
                announceQuiz(quizStarter, topics[3])
                break;
            case topics[4]:
                announceQuiz(quizStarter, topics[4])
                break;

            default:
                return message.reply("Couldn't find topic, list of topics:\ngeography, history, sports, music, clebrities, true or false");
        }

        // =====================================================================
        // ANNOUNCEMENT
        // =====================================================================

        function announceQuiz(quizStarter, quizTopic) {
            let embed = {
                title: `__NEW QUIZ [${quizTopic}]__`,
                fields: [
                    {
                        name: `New quiz started by ${quizStarter}`,
                        value: "Use %join to participate in the quiz before it's started! (Starts in 15 seconds)"
                    }
                ],
                footer: {
                    text: client.user.username,
                    icon_url: client.user.displayAvatarURL({ format: "png" }),
                },
                timestamp: (new Date()).toISOString()
            };
            message.channel.send({ embed: embed }).catch(error => {
                console.error(error);
            });

            startQueue();
        }

        function startQueue() {
            let queueIsOpen = true;
            let players = new Set();

            const filter = m => m.content.includes('%join');
            const collector = message.channel.createMessageCollector(filter, { time: 20000 });

            collector.on('collect', m => {
                if (m.author.tag == quizStarter) return message.reply("You're already in the quiz!");
                if (queueIsOpen == true) {
                    if (m.content == "%join") {
                        if (!players.has(m.author.tag)) {
                            players.add(m.author.tag);
                            message.reply("succesfully entered the quiz!");
                        } else if (players.has(m.author.tag)) {
                            message.reply("You're already in the quiz!")
                        }
                    }
                } else {
                    message.reply("The quiz already started, queue is closed!");
                }
            });

            collector.on('end', collected => {
                initializeQuiz(Qtopic);
            });
        }


        function initializeQuiz(QuizTopic) {
            if (QuizTopic == "true or false") {
                QuizTopic = "true_or_false";
            }

            fs.readFile(`${__dirname}\\quiz.json`, { encoding: 'utf8' }, (err, data) => {
                if (err) throw err;
                let quizContent = JSON.parse(data);
                let topicQuestions = quizContent[Qtopic]["questions"]; // array
                let topicAnswers = quizContent[Qtopic]["answers"]; // array

                for (let i = 0; i < 6; i++) {
                    var tempInt = Math.floor(Math.random() * topicQuestions.length);
                    pickedQuestions.push(topicQuestions[tempInt]);
                    pickedAnswers.push(topicAnswers[tempInt].toLowerCase());

                }

                Quiz(pickedQuestions, pickedAnswers);
            });
        }


        function Quiz(questions, answers) {
            const max = 5;
            var currentQuestionAnswerIndex = 0; // 0 - 4
            if (currentQuestionAnswerIndex == max) throw new Error("Finished all questions");

            ask(questions[currentQuestion], currentQuestionAnswerIndex, answers).then(() => {
                currentQuestion++;
            });
        }

        function ask(question, questionNumber, answer) {
            const filter = m => { m.content == answer };

            let questionEmbed = new Discord.MessageEmbed()
                .setTitle(`__Question number ${questionNumber}__!`)
                .setDescription(`${question} \n 10 seconds time!`);
            message.channel.send({ embed: questionEmbed }).then(() => {

                // wait for right answer
                message.channel.awaitMessages(filter, { time: 10000, errors: ['time'] })
                    .then(collected => {
                        message.channel.send(`${collected.first().author} got the correct answer!`);
                        setTimeout(() => {
                            Quiz(pickedQuestions, pickedAnswers);
                        }, 1000);
                    })
            });
        }
    }
}
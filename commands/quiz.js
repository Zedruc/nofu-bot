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
const path = require('path');

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

    }
}
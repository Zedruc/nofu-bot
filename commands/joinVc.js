const Discord = require("discord.js");

module.exports = {
    name: "joinvc",
    description: "makes the bot join your vc",
    execute(message, args) {

        if (message.guild === null) return;

        let channel = message.member.voice.channel;
        channel.join;
    }
}
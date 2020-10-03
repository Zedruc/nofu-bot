const Discord = require("discord.js");

module.exports = {
    name: "joinvc",
    description: "makes the bot join your vc",
    execute(message, args) {
        if (message.author.id !== 568729687291985930) {
            message.channel.send("This command is only aviable for the developer due to testing. \n...How did you even know??")
        } else {
            let channel = message.member.voice.channel;
            channel.join;
        }
    }
}
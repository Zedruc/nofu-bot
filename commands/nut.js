const Discord = require("discord.js");

module.exports = {
    name: "nut",
    description: "vc test",
    execute(message, args, client) {
        if (!message.member.voice.channel) return message.reply("You have to be in a voice channel!");
        try {

            let vc = message.member.voice.channel;
            let channel = message.channel;
            vc.join().then(connection => {
                message.react("🔊");
                let dispatcher = connection.play("../sounds/NUT.mp3") // N U T
                dispatcher.on('finish', end => {
                    vc.leave();
                });

            }).catch(err => {
                if (err) throw err;
            })
        } catch (error) {
            throw error
        }
    }
}
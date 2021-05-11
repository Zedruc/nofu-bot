// https://www.myinstants.com/media/sounds/its-in-the-game_TyOFKRF.mp3
const Discord = require("discord.js");

module.exports = {
    name: "E",
    description: "vc test",
    execute(message, args, client) {
        if (!message.member.voice.channel) return message.reply("You have to be in a voice channel!");
        try {

            let vc = message.member.voice.channel;
            let channel = message.channel;
            vc.join().then(connection => {
                message.react("🔊");
                let dispatcher = connection.play("https://www.myinstants.com/media/sounds/its-in-the-game_TyOFKRF.mp3") // E
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
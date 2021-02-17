const Discord = require("discord.js");

module.exports = {
    name: "vc",
    description: "vc test",
    execute(message, args, client) {
        let vc = message.member.voice.channel;
        let channel = message.channel;
        vc.join().then(connection => {
            let dispatcher = connection.play("https://www.myinstants.com/media/sounds/roblox-death-sound_1.mp3") // lul
            dispatcher.on('finish', end => {
                channel.send("oof");
            });

        }).catch(err => {
            if (err) throw err;
        })
    }
}
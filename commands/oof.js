const Discord = require("discord.js");

module.exports = {
    name: "oof",
    description: "vc test",
    execute(message, args, client) {
        if (!message.member.voice.channel) return message.reply("You have to be in a voice channel!");
        let vc = message.member.voice.channel;
        let channel = message.channel;
        vc.join().then(connection => {
            let dispatcher = connection.play("https://www.myinstants.com/media/sounds/roblox-death-sound_1.mp3") // lul
            dispatcher.on('finish', end => {
                channel.send("oof");
                vc.leave();
            });

        }).catch(err => {
            if (err) throw err;
        })
    }
}
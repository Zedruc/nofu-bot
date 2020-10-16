/**
 * This is just a test
 * You wont see this in the %help command
 */
const Discord = require("discord.js");
const ytdl = require("ytdl-core");

module.exports = {
    name: "play",
    description: "makes the bot join your vc",
    execute(message, args) {

        let msgArgs = message.content.slice(prefix.length).trim().split(' ');

        function play(connection, message) {
            let server = servers[message.guild.id];

            server.dispatcher = connection.play(ytdl(server.queue[0], { filter: "audioonly" }));

            server.queue.shift();

            server.dispatcher.on('end', function () {
                if (server.queue[0]) {
                    play(connection, message);
                } else {
                    connection.disconnect();
                }
            });

        }

        let servers = {};

        if (!msgArgs[1]) {
            message.reply('Please provide a link!');
            return;
        }

        if (!message.member.voiceChannel) {
            message.reply('You must be in a voice channel!');
            return;
        }

        if (!servers[message.guild.id]) servers[message.guild.id] = {
            queue: []
        }

        let server = server[message.guild.id];

        server.queue.push(msgArgs[1]);

        if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function (connection) {
            play(connection, message);
        })


    }
}
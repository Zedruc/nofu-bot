const ytdl = require("ytdl-core");
const ytSearch = require('yt-search');

const _Discord = require('discord.js');
const lyricsFinder = require('lyrics-finder');

const queue = new Map();
// queue(message.guild.id, queue_constructor object {voice channel, text channel, connection, songs[]})

module.exports = {
    name: "play",
    aliases: ['p', 'skip', 'next', , 's', 'stop', 'end', 'leave', 'queue', 'q', 'lyrics', 'songtext'],
    description: "All music controls",
    async execute(message, args, client, Discord, cmd) {
        var embed = new Discord.MessageEmbed();

        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) {
            embed.setTitle("You have to be in a voice chat!")
                .setColor("#ff0000")
            return message.channel.send(embed);
        }
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) {
            embed.setTitle("You dont have the right permissions to use this command.")
                .setColor("#ff0000")
            return message.channel.send(embed);
        }
        if (!permissions.has('SPEAK')) {
            embed.setTitle("You dont have the right permissions to use this command.")
                .setColor("#ff0000")
            return message.channel.send(embed);
        }

        const serverQueue = queue.get(message.guild.id);

        if (cmd === "play" || cmd === "p") {
            if (!args.length) {
                embed.setTitle("You have to provide the song to play!");
                return message.channel.send(embed);
            }
            let song = {};

            if (ytdl.validateURL(args[0])) {
                const song_info = await ytdl.getInfo(args[0]);
                song = { title: song_info.videoDetails.title, url: song_info.videoDetails.video_url, artist: song_info.videoDetails.author.name }
            } else {
                const video_finder = async (query) => {
                    const videoResult = await ytSearch(query);

                    return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
                }

                const video = await video_finder(args.join(' '));

                if (video.title == undefined) {
                    embed.setTitle("Unable to find video")
                        .setColor('#ff0000')
                    return message.channel.send(embed);
                }

                if (video) {
                    song = { title: video.title, url: video.url, artist: video.author.name }
                } else {
                    embed.setTitle("Unable to find video")
                        .setColor('#ff0000')
                    return message.channel.send(embed);
                }
            }

            if (!serverQueue) {
                const queue_constructor = {
                    voice_channel: voiceChannel,
                    text_channel: message.channel,
                    connection: null,
                    songs: []
                }
                queue.set(message.guild.id, queue_constructor)
                queue_constructor.songs.push(song);

                try {
                    const connection = await voiceChannel.join();
                    message.react('🔊');
                    queue_constructor.connection = connection;
                    video_player(message.guild, queue_constructor.songs[0]);
                } catch (error) {
                    queue.delete(message.guild.id);
                    embed.setTitle("Error whilst trying to connect")
                        .setColor('#ff0000')
                    message.channel.send(embed);
                    throw error;
                }
            } else {
                serverQueue.songs.push(song);
                embed.setDescription(`Song **${song.title}** added to queue!`)
                    .setColor('#00f507')
                return message.channel.send(embed);
            }
        }
        else if (cmd === "skip" || cmd === "s" || cmd === "next") skip_song(message, serverQueue);
        else if (cmd === "stop" || cmd === "end" || cmd === "leave") stop_song(message, serverQueue);
        else if (cmd === "queue" || cmd === "q") show_queue(message, serverQueue, client);
        else if (cmd === "lyrics" || cmd === "songtext") show_lyrics(message, serverQueue, client);

    }

}

const video_player = async (guild, song) => {
    const song_queue = queue.get(guild.id);

    if (!song) {
        song_queue.voice_channel.leave();
        queue.delete(guild.id);
        return;
    }

    const stream = ytdl(song.url, { filter: 'audioonly' });
    song_queue.connection.play(stream, { seek: 0, volume: 0.7 })
        .on('finish', () => {
            song_queue.songs.shift();
            video_player(guild, song_queue.songs[0]);
        });
    await song_queue.text_channel.send(`🎶 Now playing **${song.title}**`);
}

const skip_song = (message, serverQueue) => {
    var DjRole = message.guild.roles.cache.find(fn => fn.name == "DJ");
    if (DjRole) {
        embed.setTitle("DJ Role found!");
        embed.setColor("#ff0000");
        embed.setDescription("A DJ role was found, if this role exists it is required to have the role to use the skip/stop command.");
        message.channel.send(embed);
        return;
    }

    if (!message.member.voice.channel) {
        var embed = new _Discord.MessageEmbed()
            .setTitle("You must be in a voice channel to use this command")
            .setColor('#ff0000');
        return message.channel.send(embed);
    }
    if (!serverQueue) {
        var embed = new _Discord.MessageEmbed()
            .setTitle("The queue is empty :( Add some songs!")
            .setColor('#ff0000');
        return message.channel.send(embed);
    }
    serverQueue.connection.dispatcher.end();
}

const stop_song = (message, serverQueue) => {
    var DjRole = message.guild.roles.cache.find(fn => fn.name == "DJ");
    if (DjRole) {
        embed.setTitle("DJ Role found!");
        embed.setColor("#ff0000");
        embed.setDescription("A DJ role was found, if this role exists it is required to have the role to use the skip/stop command.");
        message.channel.send(embed);
        return;
    }

    if (!message.member.voice.channel) {
        var embed = new _Discord.MessageEmbed()
            .setTitle("You must be in a voice channel to use this command")
            .setColor('#ff0000');
        return message.channel.send(embed);
    }
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
    message.react('👋');
}

const show_queue = (message, serverQueue, client) => {
    if (!message.member.voice.channel) {
        var embed = new _Discord.MessageEmbed()
            .setTitle("You must be in a voice channel to use this command")
            .setColor('#ff0000');
        return message.channel.send(embed);
    }

    if (!serverQueue) {
        var embed = new _Discord.MessageEmbed()
            .setTitle("The queue is empty :( Add some songs!")
            .setColor('#ff0000');
        return message.channel.send(embed);
    }

    var songIndex = 1;
    var embed = new _Discord.MessageEmbed();
    embed.setTitle(`Current Queue`)
    for (const song of serverQueue.songs) {
        embed.addField(`${songIndex} - ${song.title}`, `${song.url}`);
        songIndex++;
    }
    embed.setFooter('Nofu Bot', client.user.displayAvatarURL({ format: "png" }));
    message.channel.send(embed);
}

// lyrics
const find_lyrics = async (artist, song) => {
    var lyrics = await lyricsFinder(artist, song) || "Lyrics not found.";
    return lyrics;
}

const show_lyrics = async (message, serverQueue, client) => {
    if (serverQueue.text_channel.id !== message.channel.id) return;
    if (!serverQueue) {
        var embed = new _Discord.MessageEmbed()
            .setTitle("There is no song currently playing")
            .setColor("#ff0000")
        return message.channel.send(embed);
    };
    const lyrics = await find_lyrics(serverQueue.songs[0].artist, serverQueue.songs[0].title);

    if (lyrics === "Lyrics not found.") {
        var embed = new _Discord.MessageEmbed()
            .setTitle("Could not find the song's lyrics.")
            .setColor("#ff0000")
        message.channel.send(embed);
    } else {
        var embed = new _Discord.MessageEmbed()
            .setTitle(`Lyrics for __${serverQueue.songs[0].title}__`)
            .setDescription(lyrics)
            .setColor("#406e6b")
        message.channel.send(embed);
    }
}
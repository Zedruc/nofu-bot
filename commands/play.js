const { OpusEncoder } = require('@discordjs/opus');

module.exports = {
    name: "play",
    description: "Makes the bot play music",
    async execute(message, args) {
        if (message.guild === null) return;

        if (message.member.voice.channel) {
            const connection = await message.member.voice.channel.join();
            connection.play('/audio/chikaVibes.mp3');
        } else {
            message.reply('You must be in a voice channel to use this command!');
        }
    }
}
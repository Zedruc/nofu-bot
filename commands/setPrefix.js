// setprefix
module.exports = {
    name: 'setprefix',
    aliases: ['prefix'],
    description: 'Sendet ein Mememan meme von Reddit',
    execute(message, args) {
        import { prefix } from '../main'

        let msgArgs = message.content.slice(prefix.length).trim().split(/ +/);

        prefix = msgArgs[1];
    }
}

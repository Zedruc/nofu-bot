module.exports = {
    name: 'report',
    description: 'allows you to report a member of the guild',
    execute(message, args) {
        let msgArgs = message.content.slice(prefix.length + 6).trim().split(' ');

        let target = message.mentions.users.first();

        client.fetchUser('568729687291985930', false).then((user) => {
            user.send('reported ' + target + ', report will be handled soon');
        });

    }
}
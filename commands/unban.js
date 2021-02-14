module.exports = {
    name: 'unban',
    description: 'Unbans specified user',
    execute(message, args, client) {
        if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You dont have the permission to run this command");
        let User = args[0];
        if (!args[0]) return message.channel.send('Please specify a user');

        if (!User) return message.channel.send('User not found');

        message.guild.members.cache.unban(User.id);
        message.reply("User unbanned!");
    }
}
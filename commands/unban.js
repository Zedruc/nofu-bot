module.exports = {
    name: 'unban',
    description: 'Unbans specified user',
    execute(message, args, client) {
        if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You dont have the permission to run this command");
        let User = args[0];
        if (!args[0]) return message.channel.send('Please specify a user');

        if (!User) return message.channel.send('User not found');

        message.guild.fetchBans().then(bans => {
            if (bans.size == 0) return;
            let bUser = bans.find(b => b.user.id == User)
            if (!bUser) return;
            msg.guild.members.unban(bUser.user)
            message.reply("User unbanned!");
        })
    }
}
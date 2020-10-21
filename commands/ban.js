module.exports = {
        name: "ban",
        description: "bans user",
        execute(message, args) {
            // Ban a user by ID (or with a user/guild member object)
            if(!message.member.hasPermission("BAN_MEMBERS")) message.channel.send("You need the Ban Members permission.");
            if (!message.guild.members.cache.get(message.mentions.users.first()) || message.guild.members.get(args[0])) message.channel.send("You need to provide a valid user.");

            guild.members.ban(message.mentions.users.first().id || message.guild.members.cache.get(args[0]))
                .then(user => console.log(`Banned ${user.username || user.id || user} from ${guild.name}`))
                .catch(console.error("error lol"));
            }
        }

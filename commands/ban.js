const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: "ban",
    description: "Bans a member",
    execute(message, args, client) {
        // Ban a user by ID (or with a user/guild member object)
        if (!message.member.hasPermission("BAN_MEMBERS")) PermissionError();
        let User = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!args[0]) return message.channel.send('Please specify a user');

        if (!User) UserError();
        if (User.hasPermission("BAN_MEMBERS")) return message.reply("Missing permissions to ban user!");
        let banReason = args.slice(2).join(" ");
        if (!banReason) {
            banReason = "No reason given";
        }

        User.ban({ reason: banReason })

        let td = new Date();
        let dd = String(td.getDate()).padStart(2, '0');
        let mm = String(td.getMonth() + 1).padStart(2, '0');
        let yyyy = td.getFullYear();
        let date = dd + "/" + mm + "/" + yyyy; //European

        let banEmbed = new Discord.MessageEmbed()
            .setColor("#90ee90")
            .setTitle(User + " was banned by " + message.member.displayname)
            .setAuthor("Ban case", message.author.displayAvatarURL, message.author.displayAvatarUR)
            .setDescription("Ban reason: " + banReason + "\n Date of ban: " + date)
            .setThumbnail("https://emoji.gg/assets/emoji/2283_BongoCatBanHammer.gif")
            .setTimestamp();

        message.channel.send(banEmbed);


        function PermissionError() {
            let embed = new Discord.MessageEmbed()
                .setTitle("Missing Permissions!")
                .setDescription("You dont have the permission to run this command")
                .setColor("#ff0000")
            return message.channel.send(embed);
        }

        function UserError() {
            let embed = new Discord.MessageEmbed()
                .setTitle("User not found!")
                .setColor("#ff0000")
            return message.channel.send(embed);
        }
    }
}
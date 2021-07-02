module.exports = {
    name: 'help',
    description: "Help Command",
    execute(message, args, client) {

        let prefix = "%";

        let msgArgs = message.content.slice(prefix.length + 4).trim().split(/ +/);

        const Discord = require('discord.js');
        const server = message.guild.name;

        //Currently thinking of a way to separate the help command because its getting more and more

        if (!msgArgs[0]) {

            const embed = new Discord.MessageEmbed()
                .setTitle("Helpcenter >>")
                .setColor(9384170)
                .addField("Commands :", "-----------------------------------------")
                .addFields(
                    { name: "__Uitility commands__", value: "%help utility" },
                    { name: "__Fun commands__", value: "%help fun" },
                    { name: "__Minecraft related__", value: "%help mc" },
                    { name: "__Administrative__", value: "%help admin" },
                    { name: "__Voice Chat__", value: "%help voice" }

                )
                .setFooter("More will be made!", client.user.displayAvatarURL({ format: "png" }))
                .setTimestamp();
            message.channel.send(embed).catch(error => {
                console.error("Es ist folgender Fehler in help.js aufgetreten:", error);
            });
        } else if (msgArgs[0] == "utility") {
            const embed = new Discord.MessageEmbed()
                .setTitle("Helpcenter >>")
                .setColor(9384170)
                .addField("Utility commands :", "-----------------------------------------")
                .addFields(
                    { name: "__%help__", value: "this`" },
                    { name: "__%ping__", value: "connection test to current serve`" },
                    { name: "__%uptime__", value: "shows uptime and some information about the bot" },
                    { name: "__%password__", value: "generates a safe password for you and sends it into your direct messages" },
                    { name: "__%convert__", value: "provide a link and a file format to convert to and the bot will do the job! \n `%convert <url> <file ext>`" },
                    { name: "__%findanime__", value: "will show you information about the given anime // you can also do `%findanime characters <name>` to get a list of all characters in the given anime" },
                    { name: "__%findsongs <band / artist>__", value: "will send you a list of all songs of the given band / artist in your direct messages" },
                    { name: "__%suggest__", value: "Suggest any ideas you have by simply using %suggest and answering the bot's question" },
                    { name: "__%serverinfo__", value: "Gives general information about the server the command was used in" },
                    { name: "__%ytsearch <query>__", value: "Searches youtube for content and shows you the top 3 results" },
                    { name: "__%activity <activity type> <channel name>__", value: "Starts an activity in the given channel. Only type `%activity` to see all activity types" }
                )
                .setFooter("More will be made!", client.user.displayAvatarURL({ format: "png" }))
                .setTimestamp();
            message.channel.send(embed).catch(error => {
                console.error("Es ist folgender Fehler in help.js aufgetreten:", error);
            });
        } else if (msgArgs[0] == "fun") {
            const embed = new Discord.MessageEmbed()
                .setTitle("Helpcenter >>")
                .setColor(9384170)
                .addField("Fun commands :", "-----------------------------------------")
                .addFields(
                    { name: "__%meme__", value: "sends a random meme from r/meme" },
                    { name: "__%joke__", value: "sends a completely random joke" },
                    { name: "__%mememan__", value: "same as %meme just from r/mememan" },
                    { name: "__%punch @user__", value: "a n g e r y" },
                    { name: "__%hug @user__", value: "since the   W O R L D W I D E   E V E N T  is still a thing you can now hug others via discord :>" },
                    { name: "__%stare @user__", value: "just in case someone posts   c r i n g e" },
                    { name: "__%cnf__", value: "random Chuck Norris fact" },
                    { name: "__%fox__", value: "sends fox images :D" },
                    { name: "__%doggo__", value: "sends images of doggos :)" },
                    { name: "__%8ball <question>__", value: "ask 8ball some questions (8ball's toxic)" },
                    { name: "__%quiz <topic>__", value: "Asks a random question from the chosen topic. First one to answer wins." }
                )
                .setFooter("More will be made!", client.user.displayAvatarURL({ format: "png" }))
                .setTimestamp();
            message.channel.send(embed).catch(error => {
                console.error("Es ist folgender Fehler in help.js aufgetreten:", error);
            });
        } else if (msgArgs[0] == "mc") {
            const embed = new Discord.MessageEmbed()
                .setTitle("Helpcenter >>")
                .setColor(9384170)
                .addField("Minecraft related commands :", "-----------------------------------------")
                .addFields(
                    { name: "__%mcregister <MC-UUID>__", value: "Register with your Minecraft UUID to use %mcstast" },
                    { name: "__%mcinfo__", value: "yet it only lists your name history but more will be added :D" },
                    { name: "__%mcss <Server Address>__", value: "e.g. %serverstatus hypixel.net will show information about the Minecraft server hypixel.net" },
                    { name: "__%hpstats <mode> <player name>__", value: "Shows Hypixel stats of player (Currently supported: SkyWars, Bedwars, Login informations)\nUUID Support will be added soon" }
                )
                .setFooter("More will be made!", client.user.displayAvatarURL({ format: "png" }))
                .setTimestamp();
            message.channel.send(embed).catch(error => {
                console.error("Es ist folgender Fehler in help.js aufgetreten:", error);
            });
        } else if (msgArgs[0] == "admin") {
            const embed = new Discord.MessageEmbed()
                .setTitle("Helpcenter >>")
                .setColor(9384170)
                .addField("Administrative commands :", "-----------------------------------------")
                .addFields(
                    { name: "__%delete <2 - 100>__", value: "deletes the given amount of messages in the chat" },
                    { name: "__%ban @user__", value: "bans the given user" },
                )
                .setFooter("More will be made!", client.user.displayAvatarURL({ format: "png" }))
                .setTimestamp();
            message.channel.send(embed).catch(error => {
                console.error("Es ist folgender Fehler in help.js aufgetreten:", error);
            });
        } else if (msgArgs[0] == "voice") {
            const embed = new Discord.MessageEmbed()
                .setTitle("Helpcenter >>")
                .setColor(9384170)
                .addField("Voicechat commands :", "-----------------------------------------")
                .addFields(
                    { name: "__%play <song name | YouTube URL>__", value: "Plays the given song / Adds it to the queue" },
                    { name: "__%skip__", value: "Skips the current song" },
                    { name: "__%stop__", value: "Stops the playback and makes the bot leave" },
                    { name: "__%queue__", value: "Show the current queue" },
                    { name: "__%lyrics__", value: "Shows you the lyrics of the currently playing song" }
                )
                .setFooter("More will be made!", client.user.displayAvatarURL({ format: "png" }))
                .setTimestamp();
            message.channel.send(embed).catch(error => {
                console.error("Es ist folgender Fehler in help.js aufgetreten:", error);
            });
        }
    }
}

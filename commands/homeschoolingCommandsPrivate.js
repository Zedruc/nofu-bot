// This is a command for my school server [time table]

const Discord = require('discord.js');

module.exports = {
    name: "stundenplan",
    description: "Stundenplan [german for timetable]",
    execute(message, args, client) {
        const arguments = message.content.slice(12).split(/ +/);
        console.log(arguments);

        if (!arguments[1]) return message.reply("Gib einen Wochentag an");

        if (arguments[1].toLowerCase() == "montag" || arguments[0].toLowerCase() == "mo") {
            const embed = new Discord.MessageEmbed()
                .setTitle("**__Stundenplan / Montag__**")
                .setThumbnail("https://img.icons8.com/ios/452/monday.png")
                .addFields(
                    { name: "__8:00 - 8:45 / 1. Stunde__", value: "Mathe" },
                    { name: "__8:45 - 9:30 / 2. Stunde__", value: "Englisch" },
                    { name: "__9:30 - 9:45 / Erste Pause", value: "---------" },
                    { name: "__9:45 - 10:30 / 3. Stunde__", value: "Deutsch" },
                    { name: "__10:30 - 11:15 / 4. Stunde__", value: "Deutsch" },
                    { name: "__11:15 - 11:30 / Zweite Pause__", value: "---------" },
                    { name: "__11:30 - 12:15 / 5. Stunde__", value: "Geographie" },
                    { name: "__12:15 - 13:00 / 6. Stunde__", value: "Französisch" }
                )
                .setColor("#800080")

            message.channel.send(embed);
        } else if (arguments[1].toLowerCase() == "dienstag" || arguments[0].toLowerCase() == "di") {
            const embed = new Discord.MessageEmbed()
                .setTitle("**__Stundenplan / Dienstag__**")
                .setThumbnail("https://img.icons8.com/ios/452/tuesday.png")
                .addFields(
                    { name: "__8:00 - 8:45 / 1. Stunde__", value: "Religion" },
                    { name: "__8:45 - 9:30 / 2. Stunde__", value: "Englisch" },
                    { name: "__9:30 - 9:45 / Erste Pause", value: "---------" },
                    { name: "__9:45 - 10:30 / 3. Stunde__", value: "Geschichte" },
                    { name: "__10:30 - 11:15 / 4. Stunde__", value: "Physik" },
                    { name: "__11:15 - 11:30 / Zweite Pause__", value: "---------" },
                    { name: "__11:30 - 12:15 / 5. Stunde__", value: "Biologie" },
                    { name: "__12:15 - 13:00 / 6. Stunde__", value: "IT" }
                )
                .setColor("#800080")

            message.channel.send(embed);
        } else if (arguments[1].toLowerCase() == "mittwoch" || arguments[0].toLowerCase() == "mi") {
            const embed = new Discord.MessageEmbed()
                .setTitle("**__Stundenplan / Mittwoch__**")
                .setThumbnail("https://img.icons8.com/ios/452/wednesday.png")
                .addFields(
                    { name: "__8:00 - 8:45 / 1. Stunde__", value: "Sport" },
                    { name: "__8:45 - 9:30 / 2. Stunde__", value: "Sport" },
                    { name: "__9:30 - 9:45 / Erste Pause", value: "---------" },
                    { name: "__9:45 - 10:30 / 3. Stunde__", value: "Mathe" },
                    { name: "__10:30 - 11:15 / 4. Stunde__", value: "Französisch" },
                    { name: "__11:15 - 11:30 / Zweite Pause__", value: "---------" },
                    { name: "__11:30 - 12:15 / 5. Stunde__", value: "Deutsch" },
                    { name: "__12:15 - 13:00 / 6. Stunde__", value: "Deutsch" }
                )
                .setColor("#800080")

            message.channel.send(embed);
        } else if (arguments[1].toLowerCase() == "donnerstag" || arguments[0].toLowerCase() == "do") {
            const embed = new Discord.MessageEmbed()
                .setTitle("**__Stundenplan / Donnerstag__**")
                .setThumbnail("https://img.icons8.com/ios/452/thursday.png")
                .addFields(
                    { name: "__8:00 - 8:45 / 1. Stunde__", value: "BWR" },
                    { name: "__8:45 - 9:30 / 2. Stunde__", value: "Englisch" },
                    { name: "__9:30 - 9:45 / Erste Pause", value: "---------" },
                    { name: "__9:45 - 10:30 / 3. Stunde__", value: "Biologie" },
                    { name: "__10:30 - 11:15 / 4. Stunde__", value: "Geographie" },
                    { name: "__11:15 - 11:30 / Zweite Pause__", value: "---------" },
                    { name: "__11:30 - 12:15 / 5. Stunde__", value: "Religion" },
                    { name: "__12:15 - 13:00 / 6. Stunde__", value: "Mathe" }
                )
                .setColor("#800080")

            message.channel.send(embed);
        } else if (arguments[1].toLowerCase() == "freitag" || arguments[0].toLowerCase() == "fr") {
            const embed = new Discord.MessageEmbed()
                .setTitle("**__Stundenplan / Freitag__**")
                .setThumbnail("https://img.icons8.com/ios/452/friday.png")
                .addFields(
                    { name: "__8:00 - 8:45 / 1. Stunde__", value: "Französisch" },
                    { name: "__8:45 - 9:30 / 2. Stunde__", value: "IT" },
                    { name: "__9:30 - 9:45 / Erste Pause", value: "---------" },
                    { name: "__9:45 - 10:30 / 3. Stunde__", value: "Geschichte" },
                    { name: "__10:30 - 11:15 / 4. Stunde__", value: "Physik" },
                    { name: "__11:15 - 11:30 / Zweite Pause__", value: "---------" },
                    { name: "__11:30 - 12:15 / 5. Stunde__", value: "BWR" },
                    { name: "__12:15 - 13:00 / 6. Stunde__", value: "Englisch" }
                )
                .setColor("#800080")

            message.channel.send(embed);
        }
    }
}
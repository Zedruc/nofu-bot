const https = require('https');
const Discord = require('discord.js');

module.exports = {
    name: 'hpstats',
    description: 'Show Hypixel stats for specific gamemodes',
    execute(message, args, client) {
        if (!args[0]) return message.reply("You have to provide a gamemode!\n%hpstats `skywars/bedwars` `player name`");
        if (!args[1]) return message.reply("You have to provide a player name!\n%hpstats `skywars/bedwars` `player name`");

        https.get(`https://api.hypixel.net/player?key=${process.env.hypixel_apikey}&name=${args[1]}`, res => {
            let body = '';

            res.on('data', (chunk) => {
                body += chunk;
            });

            res.on('end', () => {

                if (args[0] == "skywars" || args[0] == "sw") {
                    let stats = JSON.parse(body);

                    let firstLoginDay = new Date(stats.player.firstLogin).getDay();
                    let firstLoginMonth = new Date(stats.player.firstLogin).getMonth();
                    let firstLoginYear = new Date(stats.player.firstLogin).getFullYear();
                    //
                    let lastLoginDay = new Date(stats.player.lastLogin).getDay();
                    let lastLoginMonth = new Date(stats.player.lastLogin).getMonth();
                    let lastLoginYear = new Date(stats.player.lastLogin).getFullYear();
                    let SkyWarsGames = stats.player.stats.SkyWars.games_played_skywars;
                    let currentWinStreakSkyWars = stats.player.stats.SkyWars.win_streak;
                    let currentCoinsSkyWars = stats.player.stats.SkyWars.coins;
                    let killsSkyWars = stats.player.stats.SkyWars.kills;
                    let highestKillStreakSkyWars = stats.player.stats.SkyWars.killstreak;

                    let statsEmbed = new Discord.MessageEmbed()
                        .setTitle(`${args[1]}'s Hypixel SkyWars stats`)
                        .setColor("#05bdff")
                        .addFields(
                            { name: "__General information__", value: "\u200B" },
                            { name: `First ever login:`, value: `${firstLoginDay}/${firstLoginMonth + 1}/${firstLoginYear}`, inline: true },
                            { name: `Last login:`, value: `${lastLoginDay}/${lastLoginMonth + 1}/${lastLoginYear}`, inline: true },
                            { name: "__Skywars stats__", value: "\u200B" },
                            { name: `Total amount of played games:`, value: `${SkyWarsGames}`, inline: true },
                            { name: `Current winstreak:`, value: `${currentWinStreakSkyWars}`, inline: true },
                            { name: `Current balance (coins): `, value: `${currentCoinsSkyWars}`, inline: true },
                            { name: `Total kills:`, value: `${killsSkyWars}`, inline: true },
                            { name: `Highest ever killstreak:`, value: `${highestKillStreakSkyWars}`, inline: true },
                        )
                        .setFooter(client.user.username, client.user.displayAvatarURL({ format: "png" }))

                    message.channel.send(statsEmbed);
                }

                else if (args[0] == "bedwars" || args[0] == "bw") {
                    let stats = JSON.parse(body);

                    let firstLoginDay = new Date(stats.player.firstLogin).getDay();
                    let firstLoginMonth = new Date(stats.player.firstLogin).getMonth();
                    let firstLoginYear = new Date(stats.player.firstLogin).getFullYear();
                    //
                    let lastLoginDay = new Date(stats.player.lastLogin).getDay();
                    let lastLoginMonth = new Date(stats.player.lastLogin).getMonth();
                    let lastLoginYear = new Date(stats.player.lastLogin).getFullYear();

                    let gamesPlayed = stats.player.stats.Bedwars.games_played_bedwars_1;
                    let currentWinStreak = stats.player.stats.Bedwars.winstreak;
                    let currentCoins = stats.player.stats.Bedwars.coins;
                    let kills = x.player.stats.Bedwars.kills_bedwars;

                    let statsEmbed = new Discord.MessageEmbed()
                        .setTitle(`${args[1]}'s Hypixel SkyWars stats`)
                        .setColor("#05bdff")
                        .addFields(
                            { name: "__General information__", value: "\u200B" },
                            { name: `First ever login:`, value: `${firstLoginDay}/${firstLoginMonth + 1}/${firstLoginYear}`, inline: true },
                            { name: `Last login:`, value: `${lastLoginDay}/${lastLoginMonth + 1}/${lastLoginYear}`, inline: true },
                            { name: "__Skywars stats__", value: "\u200B" },
                            { name: `Total amount of played games:`, value: `${gamesPlayed}`, inline: true },
                            { name: `Current winstreak:`, value: `${currentWinStreak}`, inline: true },
                            { name: `Current balance (coins): `, value: `${currentCoins}`, inline: true },
                            { name: `Total kills:`, value: `${kills}`, inline: true }
                        )
                        .setFooter(client.user.username, client.user.displayAvatarURL({ format: "png" }))
                    message.channel.send(statsEmbed);
                }

            });
        });
    }
}
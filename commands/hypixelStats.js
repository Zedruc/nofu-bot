const https = require('https');
const Discord = require('discord.js');

module.exports = {
    name: 'hpstats',
    description: 'Show Hypixel stats for specific gamemodes',
    execute(message, args, client) {

        if (!args[1]) return message.reply("You have to provide a gamemode!\n%hpstats `skywars/bedwars` `player name`");
        if (!args[2]) return message.reply("You have to provide a player name!\n%hpstats `skywars/bedwars` `player name`");
        console.log(args);

        https.get(`https://api.hypixel.net/player?key=${process.env.hypixel_apikey}&name=${args[2]}`, res => {
            let body = '';

            res.on('data', (chunk) => {
                body += chunk;
            });

            res.on('end', () => {

                if (args[1] == "skywars" || args[1] == "sw") {
                    let stats = JSON.parse(body);

                    let firstLogin = new Date(stats.player.firstLogin);
                    let lastLogin = new Date(stats.player.lastLogin);
                    let SkyWarsGames = stats.player.stats.SkyWars.games_played_skywars;
                    let currentWinStreakSkyWars = stats.player.stats.SkyWars.win_streak;
                    let currentCoinsSkyWars = stats.player.stats.SkyWars.coins;
                    let killsSkyWars = stats.player.stats.SkyWars.kills;
                    let highestKillStreakSkyWars = stats.player.stats.SkyWars.killstreak;

                    let statsEmbed = new Discord.MessageEmbed()
                        .setTitle(`${args[2]}'s Hypixel SkyWars stats`)
                        .setColor("#05bdff")
                        .addFields(
                            { name: `First ever login:`, value: `${firstLogin}` },
                            { name: `Last login:`, value: `${lastLogin}`, inline: true },
                            { name: `Total amount of played games:`, value: `${SkyWarsGames}`, inline: true },
                            { name: `Current winstreak:`, value: `${currentWinStreakSkyWars}`, inline: true },
                            { name: `Current balance (coins): `, value: `${currentCoinsSkyWars}`, inline: true },
                            { name: `Total kills:`, value: `${killsSkyWars}`, inline: true },
                            { name: `Highest ever killstreak:`, value: `${highestKillStreakSkyWars}`, inline: true },
                        )
                        .setFooter(client.user.username, client.user.displayAvatarURL({ format: "png" }))

                    message.channel.send(statsEmbed);
                }

                else if (args[1] == "bedwars" || args[1] == "bw") {
                    let stats = JSON.parse(body);

                    let gamesPlayed = stats.player.stats.Bedwars.games_played_bedwars_1;
                    let currentWinStreak = stats.player.stats.Bedwars.winstreak;
                    let currentCoins = stats.player.stats.Bedwars.coins;
                    let kills = x.player.stats.Bedwars.kills_bedwars;

                    let statsEmbed = new Discord.MessageEmbed()
                        .setTitle(`${args[2]}'s Hypixel SkyWars stats`)
                        .setColor("#05bdff")
                        .addFields(
                            { name: `Total amount of played games:`, value: `${gamesPlayed}` },
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
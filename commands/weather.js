var weather = require('weather-js');
const _Discord = require('discord.js');

module.exports = {
    name: "weather",
    description: "Allows you to get the current weather from somewhere in the world in Discord!",
    execute(message, args, client, Discord, cmd) {
        if (!args.length) {
            var e = new _Discord.MessageEmbed()
                .setDescription("You must provide search terms. For example `%weather Berlin Germany`");
            return message.channel.send(e);
        }

        var query = message.content.slice(message.content.indexOf(" ") + 1);

        weather.find({ search: query, degreeType: 'C' }, (err, result) => {
            if (err) return console.error(err);

            var weatherInformation = result[0];
            var forecast = weatherInformation.forecast[2];
            var forecast1 = weatherInformation.forecast[3];

            var embed = new _Discord.MessageEmbed();

            embed.setColor("#87ceeb");
            embed.setTitle(`Weather in ${weatherInformation.location.name}`);
            embed.addField(`Current Weather (${weatherInformation.current.day})`, `${weatherInformation.current.temperature}°C, ${weatherInformation.current.skytext} with a windspeed of ${weatherInformation.current.windspeed}\nHumidity: ${weatherInformation.current.humidity}%.`);
            embed.addField(`Forecast for ${forecast.day}`, `Lowest temperature ${forecast.low}, highest temperature ${forecast.high}. ${forecast.skytextday} with a ${forecast.precip}% chance of precipitation.`);
            embed.addField(`Forecast for ${forecast1.day}`, `Lowest temperature ${forecast1.low}, highest temperature ${forecast1.high}. ${forecast1.skytextday} with a ${forecast1.precip}% chance of precipitation.`);

            message.channel.send(embed);
        });
    }
}
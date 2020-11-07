const https = require('https');
const Discord = require('discord.js');

module.exports = {
    name: 'pokedex',
    description: "Lists infos about the given pokémon",
    execute(message, args, client) {

        let prefix = "%";

        let pokémonName = message.content.slice(prefix.length + 7).trim().split(/ +/);

        https.get('https://pokeapi.co/api/v2/pokemon/' + pokémonName.toString().toLowerCase(), res => {
            let body = '';

            res.on('data', chunk => {
                body += chunk;
            });

            res.on('end', () => {
                let bodyString = JSON.parse(body);

                if (bodyString == "Not Found") {
                    let errorEmbed = new Discord.MessageEmbed()
                        .setTitle("**__Oops__**")
                        .setDescription("The pokémon you tried to searche for wasn't found :/")
                        .setFooter("Sorry.", client.user.displayAvatarURL({ format: "png" }))
                    return message.channel.send(errorEmbed);
                }

                let id = bodyString.id;
                let abilitypath = bodyString.abilities;

                let pokéInfoEmbed = new Discord.MessageEmbed()
                    .setTitle("**__Pokédex | " + bodyString.name + "__**")
                    .setImage('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + id + '.png')
                    .setFooter("More Info will be provided soon", client.user.displayAvatarURL({ format: "png" }))
                    .setTimestamp();
                for (let i = 0; i < bodyString.abilities.length; i++) {
                    //All abilities, name, add a image from the pokémon
                    pokéInfoEmbed.addField(`__Ability ${i + 1}__`, abilitypath[i].ability.name, true)
                    if (i == bodyString.abilities.length) {
                        break;
                    }
                }

                for (let i = 0; i < bodyString.forms.length; i++) {
                    pokéInfoEmbed.addField(`__Form ${i + 1}__`, bodyString.forms[i].name, true)
                    if (i == bodyString.forms) {
                        break;
                    }
                }

                message.channel.send(pokéInfoEmbed);
            });
        });
    }
}
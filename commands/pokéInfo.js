const https = require('https');
const Discord = require('discord.js');

module.exports = {
    name: 'pokedex',
    description: "Lists infos about the given pokémon",
    execute(message, args, client) {

        let prefix = "%";
        if (!args[0]) return message.channel.send("Please provide a pokémon to get info about!")

        let pokémonName = message.content.slice(prefix.length + 7).trim().split(/ +/);

        https.get('https://pokeapi.co/api/v2/pokemon/' + pokémonName.toString().toLowerCase(), res => {
            let body = '';

            res.on('data', chunk => {
                body += chunk;
            });

            res.on('end', () => {

                if (body == "Not Found") {
                    console.error("Error: Pokémon not found");
                    let errorEmbed = new Discord.MessageEmbed()
                        .setTitle("Pokémon not found")
                        .setDescription("The Pokémon you searched for (" + pokémonName + ") was not found")
                        .setFooter("Errorcode [404] NOT FOUND", client.user.displayAvatarURL({ format: "png" }))
                        .setTimestamp()
                    return message.channel.send(errorEmbed);
                }

                let bodyString = JSON.parse(body);

                let id = bodyString.id;
                let abilitypath = bodyString.abilities;

                let pokéInfoEmbed = new Discord.MessageEmbed()
                    .setTitle("**__Pokédex | " + bodyString.name + "__**")
                    .setImage('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + id + '.png')
                    .setFooter(".", client.user.displayAvatarURL({ format: "png" }))
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
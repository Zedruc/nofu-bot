const https = require('https');
const Discord = require('discord.js');

module.exports = {
    name: 'pokedex',
    description: "Lists infos about the given pokémon",
    execute(message, args) {

        let prefix = "%";

        let pokémonName = message.content.slice(prefix.length + 7).trim().split(/ +/);

        https.get('https://pokeapi.co/api/v2/pokemon/' + pokémonName, res => {
            let body = '';

            res.on('data', chunk => {
                body += chunk;
            });

            res.on('end', () => {
                let bodyString = JSON.parse(body);
                let abilitypath = bodyString.abilities;

                let pokéInfoEmbed = new Discord.MessageEmbed()
                    .setTitle("**__Pokédex__**")
                for (let i = 0; i < bodyString.abilities.length; i++) {
                    //All abilities, name, add a image from the pokémon
                    pokéInfoEmbed.addField(`Ability ${i + 1}`, abilitypath[i].ability.name)
                }

                message.channel.send(pokéInfoEmbed);
            });
        });
    }
}
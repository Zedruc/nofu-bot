const Discord = require('discord.js');
const { image_links } = require('../resources.json');

module.exports = {
    name: 'searchinfo',
    description: 'shows all genre the user can look up yet',
    execute(message, args) {
        let genreInfoEmbed = new Discord.MessageEmbed()
            .setTitle("__**Genre Search Center**__")
            .setThumbnail(image_links.anime_genre_center)
            .setDescription('Here are all Genres you can search: \n many more will be added :D \n')
            .addField(" Action  • Adventure  • Demons \n  Drama  • Horror  • Mecha \n  Romance  • School  • Shounen", "These are all genres you can search yet")

        message.channel.send(genreInfoEmbed);
    }
}
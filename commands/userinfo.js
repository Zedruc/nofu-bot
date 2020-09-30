const Discord = module.require('discord.js');

module.exports = {
    name: 'userinfo',
    description: 'Zeigt Infos über den command user / gepingten user',
    execute(message, args){

    let user = message.mentions.users.first();
    if(!user) user = message.author;
    let embed = new Discord.MessageEmbed()
        .setAuthor(user.username + '#' + user.discriminator, user.displayAvatarURL)
        .setDescription(`${user}`)
        .setImage(message.author.displayAvatarURL())
        .addField('Status:', user.presence.status, true)
        .setFooter(`ID: ${user.id}`)
        .setTimestamp()

    message.channel.send({ embed: embed }).catch(error => {
        console.error("Fehler in userinfo.js: ", error);
    });
    return;
    }
}
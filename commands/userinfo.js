const Discord = module.require('discord.js');
const flags = {
	DISCORD_EMPLOYEE: 'Discord Employee',
	DISCORD_PARTNER: 'Discord Partner',
	BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
	BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
	HYPESQUAD_EVENTS: 'HypeSquad Events',
	HOUSE_BRAVERY: 'House of Bravery',
	HOUSE_BRILLIANCE: 'House of Brilliance',
	HOUSE_BALANCE: 'House of Balance',
	EARLY_SUPPORTER: 'Early Supporter',
	TEAM_USER: 'Team User',
	SYSTEM: 'System',
	VERIFIED_BOT: 'Verified Bot',
	VERIFIED_DEVELOPER: 'Verified Bot Developer'
};

module.exports = {
    name: 'userinfo',
    description: 'Shows infos about you/the tagged user',
    execute(message, args) {

        if (message.guild === null) return;

        let user = message.mentions.users.first();
        if (!user) user = message.author;
        const userFlags = user.flags.toArray();
        let embed = new Discord.MessageEmbed()
            .setAuthor(user.username + '#' + user.discriminator, user.displayAvatarURL)
            .setDescription(`${user}`)
            .setImage(user.displayAvatarURL())
            .addField('Status:', user.presence.status, true)
            .addField('Badges:', userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None', true)
            .addField('Account creation:', user.createdAt, false)
            .setFooter(`ID: ${user.id}`)
            .setTimestamp()

        message.channel.send({ embed: embed }).catch(error => {
            console.error("Fehler in userinfo.js: ", error);
        });
        return;
    }
}
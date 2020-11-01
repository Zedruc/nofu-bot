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
  execute(message, args, client) {
    
    if (message.guild === null) return;
    
    let user = message.mentions.users.first();
    if (!user) user = message.author;
    const userFlags = user.flags.toArray();
    
    user.fetch();
    let embed = {
      title: `What do we know about ${user.username}?`,
      thumbnail: {"url" : user.displayAvatarURL({format: "png"})},
      fields:[
        {
          name: "Satus",
          value: user.presence.status,
          inline: true,
        },
        {
          name: "Full name",
          value: user.tag,
          inline: true,
        },
        {
          name: "Badges",
          value: userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None',
          inline: true,
        },
        {
          name: "ID",
          value: user.id,
          inline: true,
        },
        {
          name: "Account creation:",
          value: user.createdAt,
          inline: false
        }
      ],
      footer:{
        text: client.user.username,
        icon_url: client.user.displayAvatarURL({format: "png"}),
      },
      timestamp: (new Date()).toISOString()
    };

    message.channel.send({ embed: embed }).catch(error => {
      console.error("Fehler in userinfo.js: ", error);
    });
    return;
  }
}
const https = require('https');
const Discord = require('discord.js');
const { exitCode } = require('process');
const { Base64 } = require('js-base64');
const { error } = require('console');

module.exports = {
    name: 'mcstats',
    description: 'Shows player info (Minecraft info)',
    execute(message, args) {
        const sender = message.author;
        //https://api.mojang.com/user/profiles/uuid/names
        https.get('https://jsonblob.com/api/jsonBlob/' + process.env.json_regs, res => {
            let body = '';

            res.on('data', chunk => {
                body += chunk;
            });

            res.on('end', () => {
                let bodyString = JSON.parse(body);
                let sender = message.author.id;
                if (!(bodyString.regs.hasOwnProperty(sender))) {
                    message.reply("You first have to login to your account via uuid or name!\n`%mcregister <UUID> or <name>`");
                    return;
                }
                let user = bodyString.regs[sender];
                let UUID = Base64.decode(user[0])

                https.get('https://api.mojang.com/user/profiles/' + UUID + '/names', res => {
                    let body = '';

                    res.on('data', chunk => {
                        body += chunk;

                    });

                    res.on('end', () => {
                        let bodyString = JSON.parse(body);

                        let nameHistory = [];
                        let readableArr = nameHistory.join(" ");

                        let mcStatsEmbed = new Discord.MessageEmbed()
                            .setColor('#00ad00')
                            .setTitle(message.member.displayName + "\'s Minecraft name history")
                            .setAuthor(message.member.displayName, message.author.displayAvatarURL, message.author.displayAvatarURL)
                            .setDescription(readableArr)


                        for (let i = 0; i < bodyString.length; i++) {
                            nameHistory.push(bodyString[i].name)
                            mcStatsEmbed
                                .addField(i !== 0 ? "changed to at " + new Date(bodyString[i].changedToAt) + ":" : "Original name: ", bodyString[i].name);
                        }

                        let lastName = nameHistory.length - 1;

                        mcStatsEmbed.setThumbnail('https://mineskin.de/helm/' + nameHistory[lastName] + '/100.png');
                        message.channel.send(mcStatsEmbed);
                    });
                });

            })
        });
    }
}
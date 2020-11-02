const https = require('https');
const Discord = require('discord.js');
const { exitCode } = require('process');

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
                console.log(bodyString);
                let sender = message.author.tag;
                let user = bodyString.regs[sender];
                let UUID = user[0];
                console.log(UUID);
                if (user == null) {
                    message.reply("You first have to login to your account via uuid!\n`%mcregister <UUID>`");
                    return;
                }

            })
        });

        https.get('https://api.mojang.com/user/profiles/' + UUID + '/names', res => {
            let body = '';

            res.on('data', chunk => {
                body += chunk;

            });

            res.on('end', () => {
                let bodyString = JSON.parse(body);
                console.log(bodyString);
                console.log(bodyString[0].name);
                let nOn /*number of names*/ = bodyString.length;

                let nameHistory = [];

                let mcStatsEmbed = new Discord.MessageEmbed()
                    .setColor('#00ad00')
                    .setTitle(sender.name + "\'s Minecraft name history")
                    .setAuthor(sender.displayName, sender.displayAvatarURL, sender.displayAvatarURL)
                    .setDescription(readableArr)


                for (let i = 0; i < bodyString.length; i++) {
                    console.log(bodyString[i].name);
                    nameHistory.push(bodyString[i].name)
                    mcStatsEmbed
                        .addField(i !== 0 ? new Date(bodyString[i].changedToAt) : "Original name: ", bodyString[i].name, true);
                }
                console.log("Minecraft name history of " + message.member.displayName + "\n" + nameHistory);
                let readableArr = nameHistory.join(" ");
                message.channel.send(mcStatsEmbed);
            });
        });
    }
}
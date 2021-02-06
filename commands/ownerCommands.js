const https = require('https');
const Discord = require('discord.js');

module.exports = {
    name: 'admin',
    description: 'Only-owner commands',
    execute(message, args, client) {
        let prefix = "%";
        let msgArgs = message.content.slice(prefix.length + 5).trim().split(/ +/);
        if (message.author.id !== "568729687291985930") {
            return message.reply("Only the bot owner is able to use this command!");
        }
        if (msgArgs[0] == "mcregs" /*Lists all registrations*/) {
            https.get('https://jsonblob.com/api/nofu-bot/' + process.env.json_regs, res => {
                let body = '';

                res.on('data', chunk => {
                    body += chunk;
                });

                res.on('end', () => {
                    let totalRegs = 0;
                    let bodyString = JSON.parse(body);
                    let path = bodyString.regs;

                    let mcregsEmbed = new Discord.MessageEmbed()
                        .setTitle("**All Minecraft registrations**")

                    for (const [key, value] of Object.entries(path)) {
                        //console.log(key, " => ", value[0]);
                        mcregsEmbed.addField("DC_ID: " + key, "MC_UUID: " + value[0]);
                    }

                    for (const [key, value] of Object.entries(path)) {
                        totalRegs++;
                    }
                    mcregsEmbed.setFooter(`Total registrations: ${totalRegs}`);

                    message.author.send(mcregsEmbed);
                });
            });
        }
    }
}
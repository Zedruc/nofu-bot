//https://api.mcsrvstat.us/2/<address>
const https = require('https');
const Discord = require('discord.js');

module.exports = {
    name: 'mcserverstatus',
    description: 'Checks the Minecraft server status and gives information about the server',
    execute(message, args, client) {
        console.log("Is executed");
        const prefix = '%';
        let serverAddress = message.content.slice(prefix.length + 12).trim().split(/ +/);

        https.get('https://api.mcsrvstat.us/2/' + serverAddress, (res) => {
            let body = '';

            res.on('data', (chunk) => {
                body += chunk;
            });

            res.on('end', () => {
                let data = JSON.parse(body);
                let serverEmbed = new Discord.MessageEmbed()
                    .setTitle("__Minecraft Server Status | " + serverAddress + "__")
                    .setThumbnail('https://api.mcsrvstat.us/icon/' + serverAddress)
                    .setFooter("MSS", client.user.displayAvatarURL({ format: "png" }))
                    .setTimestamp()
                for (const [key, value] of Object.entries(data)) {
                    if (key.includes("ip")) {
                        serverEmbed.addField('__IP__', data.ip)
                    }

                    if (key.includes("motd")) {
                        serverEmbed.addField("__MOTD__", "\u200b")
                        for (let i = 0; i < data.motd.clean.length; i++) {
                            serverEmbed.addField(data.motd.clean[i], "\u200b")
                        }
                    }

                    if (key.includes("players")) {
                        serverEmbed.addField("__Online Players__", data.players.online + "\nMaximum: " + data.players.max)
                    }

                    if (key.includes("version")) {
                        serverEmbed.addField("__Server Version__", data.version)
                    }
                }
                message.channel.send(serverEmbed);
            });
        });
    }
}
const https = require('https');
const Discord = require('discord.js');

module.exports = {
    name: 'admin',
    description: 'Only-owner commands',
    execute(message, args, client) {
        require('discord-buttons')(client);
        const { MessageButton, MessageActionRow } = require('discord-buttons');

        if (message.author.id !== "568729687291985930") {
            return message.reply("Only the bot owner is able to use this command!");
        }

        /*Lists all registrations*/
        if (args[0] == "mcregs") {
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
        } else if (args[0] == "broadcast") {
            var timer = 10;

            var index = message.content.indexOf(" ");  // Gets the first index where a space occours
            var res = message.content.substr(index + 1 + "broadcast".length);  // Gets the text part

            var yesButton = new MessageButton()
                .setLabel("Yes")
                .setStyle("green")
                .setID(`yes_${res}`)
                .setEmoji("✅")

            var NoButton = new MessageButton()
                .setLabel("No")
                .setStyle("red")
                .setID("no")
                .setEmoji("❌")

            var buttonRow = new MessageActionRow()
                .addComponent(yesButton)
                .addComponent(NoButton)

            message.channel.send("Are you sure you want to send this message to all available servers?", { buttons: [yesButton, NoButton] });
            const filter = m => m.content.includes('yes');
            const collector = message.channel.createMessageCollector(filter, { time: 15000 });

            collector.on('collect', async m => {
                var broadcastMessage = message.content.substring(message.content.indexOf(" "), message.content.length);

                var channels = await client.channels.cache.filter(channel =>
                    channel.name.toLowerCase().includes('broadcast') &&
                    channel.type == 'text' &&
                    channel.guild.id != message.guild.id
                );
                for (const channel of channels.array()) {
                    var broadCastEmbed = new Discord.MessageEmbed()
                        .setTitle(`Message broadcasted by ${message.author.username}${message.author.discriminator} from ${message.guild.name} at ${new Date().toLocaleString()}`)
                        .setColor("#4248f5")
                        .setDescription(broadcastMessage)
                    channel.send(broadCastEmbed);
                }

                return message.reply('Message broadcasted successfully!');
            });

            collector.on('end', collected => {
                return message.reply("Message broacast ended.");
            });
        }
    }
}
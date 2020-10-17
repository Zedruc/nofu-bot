const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'broadcast',
    description: 'sends a message to every server the bot is in',
    execute(message, args) {
        const prefix = "%";
        var messageArgs = message.content.slice(prefix.length + 9).trim().split(/ +/);
        if (message.author.id === '568729687291985930') {
            if (message.author.id === "568729687291985930") {
                try {
                    let toSay = messageArgs;
                    this.client.guilds.map((guild) => {
                        let found = 0
                        guild.channels.map((c) => {
                            if (found === 0) {
                                if (c.type === "text") {
                                    if (c.permissionsFor(this.client.user).has("VIEW_CHANNEL") === true) {
                                        if (c.permissionsFor(this.client.user).has("SEND_MESSAGES") === true) {
                                            c.send(toSay);
                                            found = 1;
                                        }
                                    }
                                }
                            }
                        });
                    });
                }
                catch (err) {
                    console.log("Could not send message to a (few) guild(s)!");
                    console.log(err);
                }
            } else {
                message.reply("You cant do that!")
            }
        }
    }
}
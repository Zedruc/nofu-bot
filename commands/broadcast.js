module.exports = {
    name: 'findsongs',
    description: 'Searches songs of given artist',
    execute(message, args) {

        if (message.guild === null) return;


        if (message.author.id === "568729687291985930") {
            try {
                let toSay = "This is a test message!";
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
                console.log("Could not send message to a (few) guild(s)! \n error:" + err);
            }
        } else {
            message.reply("You cant do that!")
        }
    }
}
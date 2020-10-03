// First, this must be at the top level of your code, **NOT** in any event!
const Discord = require('discord.js');
const talkedRecently = new Set();

module.exports = {
    name: "delay",
    description: "delay/cooldown test",
    execute(message, args) {
        if (talkedRecently.has(msg.author.id)) {
            message.channel.send("Wait a bit before getting typing this again. - " + msg.author);
        } else {

            // the user can type the command ... your command code goes here :)

            message.channel.send("Ja es geht noch");

            // Adds the user to the set so that they can't talk for a minute
            talkedRecently.add(msg.author.id);
            setTimeout(() => {
                // Removes the user from the set after a minute
                talkedRecently.delete(msg.author.id);
            }, 4000);
        }
    }
}
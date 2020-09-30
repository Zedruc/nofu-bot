const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'joinvc',
    description: 'Joint dem Voicechannel',
    execute(message, args) {
        const channel = client.channels.get("723449019019559024");
        if (!channel) return console.error("The channel does not exist!");
        channel.join().then(connection => {
          // Yay, it worked!
          console.log("Successfully connected.");
        }).catch(e => {

          console.error(e);
        });
    }
}
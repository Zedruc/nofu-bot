const Discord = require("discord.js");

const owner = '568729687291985930';

module.exports = {
    name: "client",
    description: "will destroy the client",
    execute(message, args){
        let prefix = "%";
        let msgArgs = message.content.slice(prefix.length).trim().split(/ +/);
        
        if(message.author.id !== owner){
            message.reply("You have NO permissions to use owner commands! Attempt will be logged")
            return;
        } else {
            if(msgArgs[1] == "shutdown"){
                let embed = new Discord.MessageEmbed()
                .setTitle("**__Shutting down and sestroying client...__**")
                .setDescription("Will boot on console-command");
                message,channel.send(embed);
                client.destroy()
            } else if(msgArgs[1] == "restart"){
                 let embed = new Discord.MessageEmbed()
                .setTitle("**__Restarting client...__**")
                .setDescription("Will boot up automatically");
                message.channel.send(embed);
                client.destroy().then(() => {
                    client.login(process.env.token)
                })
            }
        }
    }
}

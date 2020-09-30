module.exports = {
    name: 'help',
    description: "Help Command",
    execute(message, args){
        const Discord = require('discord.js');
        const server = message.guild.name;
        const embed = new Discord.MessageEmbed()
                    .setTitle("Hilfecenter für Idioten")
                    .setColor(9384170)
                    .addField("Commands die bis jetzt verfügbar sind:", "-----------------------------------------")
                    .addField("**%help**", "das hier || ", true)
                    .addField("**%meme**", "sendet ein random meme || ", true)
                    .addField("**%ping**", "Verbindungtest zum aktuellen server (" + server +")", true)
                    .addField("**%delete <Zahl>**", "Löscht die angegebene Anzahl von Nachrichten", true)
                    .addField("**%uptime**", "Zeigt wie lange der Bot online ist seit dem letzten reboot", true)
                    .addField("**%joke**", "Spuckt einen zufälligen Flachwitz aus", true)
                    .addField("**%userinfo**", "Zeigt Infos über den gepingten user / über dich")
                    .addField("**%mememan**", "sendet ein random mememan meme", true)
                    .addField("**%password**", "generiert ein zufälliges passwort", true)
                message.channel.send(embed).catch(error =>{
                    console.error("Es ist folgender Fehler in help.js aufgetreten:", error);
                    message.channel.send("Es ist folgender Fehler in help.js aufgetreten: ", error);
                });
    }
}
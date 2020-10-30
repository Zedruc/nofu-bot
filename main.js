const Discord = require('discord.js');
const http = require('http');
const client = new Discord.Client();
let date_ob = new Date();


let prefix = '%';

const fs = require('fs');
const { info, timeStamp } = require('console');
const { join } = require('path');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}


client.on("ready", () => {
    console.info("Der Nofu-bot ist jetzt online!");
    client.user.setActivity('his master', { type: 'LISTENING' })

    //setInterval(() => {
    //
    //  let defaultChannel = "";
    //  client.guilds.channels.cache.forEach((channel) => {
    //      if (channel.type == "text" && defaultChannel == "") {
    //          if (channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
    //                defaultChannel = channel;
    //                defaultChannel.send("Don't forget to use `%idea` if you got an idea to improve the bot :D");
    //         }
    //        }
    //    })
    //}, 600000);

    http.get('http://worldtimeapi.org/api/timezone/Europe/Berlin',
        res => {

            let data = '';

            res.on('data', chunk => {
                data += chunk;
            })

            res.on('end', () => {
                let answer = JSON.parse(data);
                console.info("Gestartet um: " + answer.datetime + "// Zeitzone: Europe/Berlin");
            })
        });
});

client.on('guildDelete', guild => {
    console.log(`Bot wurde entfernt von ${guild.name} (id: ${guild.id})`)
});

client.on("guildCreate", guild => {
    console.log(`Wurde hinzugefügt ${guild.name} \n ${guild.id}`);
});



client.on('message', message => {

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'ping') {

        client.commands.get('ping').execute(message, args);

    } else if (command === 'help') {

        client.commands.get('help').execute(message, args);

    } else if (command === "meme") {

        client.commands.get('meme').execute(message, args);

    } else if (command === 'help') {

        client.commands.get('help').execute(message, args);

    } else if (command === 'delete') {

        client.commands.get('delete').execute(message, args);

    } else if (command === 'serverinfo') {

        client.commands.get('serverinfo').execute(message, args);

    } else if (command === 'userinfo') {

        client.commands.get('userinfo').execute(message, args);

    } else if (command === 'joke') {

        client.commands.get('joke').execute(message, args);

    } else if (command === 'uptime') {

        let time = Date.now() - date_ob;
        let seconds = time / 1000;
        let hours = seconds / 3600;
        let days = seconds / 86400;

        let ps = seconds.toFixed();
        let ph = hours.toFixed();
        let pd = days.toFixed();

        const statEmbed = new Discord.MessageEmbed()
            .setTitle("**  = STATISTICS =**")
            .addField("**Memory usage **", `**${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB**`)
            .addField("**Uptime **", `${pd} days \n ${ph} hours \n ${ps} seconds`);
        message.channel.send(statEmbed);

    } else if (command === 'mememan') {

        client.commands.get('mememan').execute(message, args);

    } else if (command === 'password') {

        client.commands.get('password').execute(message, args);

    } else if (command === 'convert') {

        client.commands.get('convert').execute(message, args);

    } else if (command === 'findanime') {

        client.commands.get('findanime').execute(message, args);

    } else if (command == 'findsongs') {

        client.commands.get('findsongs').execute(message, args);

    } else if (command == 'punch') {

        client.commands.get('punch').execute(message, args);

    } else if (command == 'client') {

        client.commands.get('client').execute(message, args);

    } else if (command == 'hug') {

        client.commands.get('hug').execute(message, args);

    } else if (command == 'ban') {

        client.commands.get('ban').execute(message, args);

    } else if (command == 'kill') {

        client.commands.get('kill').execute(message, args);

    } else if (command == "test") {

        const channel = client.channels.cache.find(channel => channel.name === "general")
        channel.send("Don't forget to use `%idea` if you got an idea to improve the bot :D")

    } else if (command == "devyt") {

        client.commands.get('devyt').execute(message, args);

    } else if (command == "stare") {

        client.commands.get('stare').execute(message, args);

    } else if (command == "mcregister") {

        client.commands.get("mcregister").execute(message, args);

    } else if (command == "cnf") {

        client.commands.get("chuckNorrisFacts").execute(message, args);

    } else if (command == "delete") {

        client.commands.get("delete").execute(message, args);

    }
});

client.login(process.env.token);

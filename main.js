const Discord = require('discord.js');
const http = require('http');
const client = new Discord.Client();

//import { welcomeToggle } from "../nofu-bot/commands/welcome";
let welcomeToggle = true;
let date_ob = new Date();


const prefix = '%';

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
    console.info("Der 018 ist jetzt online!");
    client.user.setActivity('his master', { type: 'LISTENING' })

    http.get('http://worldtimeapi.org/api/timezone/Europe/Berlin',
        res => {
            // console.log(res.statusCode);
            // console.log(res.headers);

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


client.on("guildMemberAdd", member => {
    if (welcomeToggle == true) {
        client.on('guildMemberAdd', (guildMember) => {
            guildMember.addRole(guildMember.guild.roles.find(role => role.name === "Member"));
        });

        if (member.guild.id == 761912789164883969) {
            let welcomeEmbed = new Discord.MessageEmbed()
                .setTitle("welcome " + member + "!")
                .setDescription("This is the official Support server for the Nofu Bot \n But you can also chat here :p")
                .setFooter(client.user.avatarURL());
            member.guild.channels.get('761912789765062658').send(welcomeEmbed)
        }
    } else {
        return;
    }
})



client.on('message', message => {

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'ping') {

        client.commands.get('ping').execute(message, args);

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

        const statEmbed = new Discord.MessageEmbed()
            .setTitle("**  = STATISTICS =**")
            .addField("**Memory usage ::**", `**${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB**`)
            .addField("**Uptime (glitched)**", `time: ${time}`);
        message.channel.send(statEmbed);

    } else if (command === 'mememan') {

        client.commands.get('mememan').execute(message, args);

    } else if (command === 'password') {

        client.commands.get('password').execute(message, args);

    } else if (command === 'convert') {

        client.commands.get('convert').execute(message, args);

    } else if (command === 'welcome') {

        client.commands.get('welcome').execute(message, args);
        welcomeToggle = !welcomeToggle;

    } else if (command === 'findanime') {

        client.commands.get('findanime').execute(message, args);

    } else if (command === 'join') {

        client.commands.get('joinvc').execute(message, args);

    } else if (command == 'searchinfo') {

        client.commands.get('searchinfo').execute(message, args);

    }
});

client.login(process.env.token);
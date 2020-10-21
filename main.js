const Discord = require('discord.js');
const http = require('http');
const client = new Discord.Client();

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
    console.info("Der Nofu-bot ist jetzt online!");
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


client.on("guildMemberAdd", guildMember => {
    if (welcomeToggle == true) {

        let welcomeEmbed = new Discord.MessageEmbed()
            .setTitle("welcome " + member + "!")
            .setDescription("Welcome to " + guild.name + " :P!")
            .setThumbnail(client.user.avatarURL());
        member.guild.channels.get('761912789765062658').send(welcomeEmbed)
    }
});

client.on("guildCreate", guild => {
    let defaultChannel = "";
    guild.channels.forEach((channel) => {
        if (channel.type == "text" && defaultChannel == "") {
            if (channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
                defaultChannel = channel;
            }
        }
    })
    //defaultChannel will be the channel object that it first finds the bot has permissions for
    let helloThereEmbed = new Discord.MessageEmbed()
        .setAuthor("General Kenobi", "https://pbs.twimg.com/profile_images/1074423168910155778/iwqG_GfY_400x400.jpg")
        .setTitle("**Hello There!**")
        .setColor("#42d7f5")
        .setDescription("Thanks for adding me to your server, to get started just do %help :D")
        .setFooter("If you want to ask something or whatever: Tot Nofu#4100 \n :p")
    defaultChannel.send(helloThereEmbed);
});



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

    } else if (command === 'welcome') {

        client.commands.get('welcome').execute(message, args);
        welcomeToggle = !welcomeToggle;

    } else if (command === 'findanime') {

        client.commands.get('findanime').execute(message, args);

    } else if (command == 'findsongs') {

        client.commands.get('findsongs').execute(message, args);

    } else if (command == 'slap') {

        client.commands.get('slap').execute(message, args);

    } else if (command == 'client') {

        client.commands.get('client').execute(message, args);

    } else if (command == 'hug') {

        client.commands.get('hug').execute(message, args);

    } else if (command == 'ban') {

        client.commands.get('ban').execute(message, args);

    }
});

client.login(process.env.token);

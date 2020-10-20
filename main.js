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

    } else if (command == 'broadcast') {

        client.commands.get('broadcast').execute(message, args);

    } else if (command == 'hug') {

        //client.commands.get('hug').execute(message, args);

        if (message.guild === null) return;

        const taggedUser = message.mentions.users.first();

        let prefix = "%";

        let key = process.env.tenorkey;
        let msgArgs = message.content.slice(prefix.length).trim().split(/ +/);



        https.get('https://api.tenor.com/v1/search?q=anime+hug&limit=50&key=' + key, res => {

            let body = '';

            res.on('data', chunk => {
                body += chunk;
            })

            res.on('end', () => {
                let bodyString = JSON.parse(body);
                let int = Math.floor(Math.random(1) * 49);

                let gifUrl = bodyString.results[int].media[0].tinygif.url;

                if (taggedUser == message.author.id) {

                    message.channel.send("You must be lonely huh")

                } else if (taggedUser == 760905298990202901) {

                    message.reply("Wait what?");

                } else {

                    let hugEmbed = new Discord.MessageEmbed()
                        .setColor('#9E1A1A')
                        .setTitle(message.member.displayName + " hugged " + `<@${taggedUser}>` + "! \n")
                        .setAuthor(message.member.displayName + " hugged " + msgArgs[1] + "! \n")
                        .setImage(gifUrl)
                    message.channel.send(hugEmbed)

                }
            })
        })

    } else if (command == 'ban') {

        client.commands.get('ban').execute(message, args);

    }
});

client.login(process.env.token);

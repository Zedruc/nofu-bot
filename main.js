require('dotenv').config();
const Discord = require('discord.js');
const { Timer } = require('easytimer.js');
var timerInstance = new Timer();

var usersInTimeout = new Set();

const activities =
{
    "1": {
        "type": "PLAYING",
        "msg": "with %help"
    },
    "2": {
        "type": "LISTENING",
        "msg": "chat"
    },
    "3": {
        "type": "PLAYING",
        "msg": "with the developers console"
    },
    "4": {
        "type": "COMPETING",
        "msg": "with the developer"
    },
    "5": {
        "type": "WATCHING",
        "msg": "the developer struggling"
    },
    "6": {
        "type": "PLAYING",
        "msg": "v.3.3.7"
    }
}

const client = new Discord.Client();

const disbut = require('discord-buttons')(client);

let prefix = '%';

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}


client.on("ready", () => {
    timerInstance.start();

    console.info("Der Nofu-bot ist jetzt online!");
    client.user.setActivity("getting ready...", { type: 'PLAYING' });
    setInterval(() => {
        const index = Math.floor(Math.random() * (6 - 1) + 1).toString();
        client.user.setActivity(activities[index.toString()].msg, { type: activities[index.toString()].type });
    }, 60000);

});

client.on("clickButton", async (button) => {
    if (button.id.startsWith("yes")) {
        var broadcastMessage = button.id.split("_")[1].substring(1);

        var channels = await client.channels.cache.filter(channel =>
            channel.name.toLowerCase().includes('broadcast') &&
            channel.type == 'text' &&
            channel.guild.id != button.message.guild.id
        );
        for (const channel of channels.array()) {
            var broadCastEmbed = new Discord.MessageEmbed()
                .setTitle(`Message broadcasted by ${button.clicker.user.username}${button.clicker.user.discriminator} from ${button.message.guild.name} at ${new Date().toLocaleString()}`)
                .setColor("#4248f5")
                .setDescription(broadcastMessage)
            channel.send(broadCastEmbed);
        }

        return button.reply.send('Message broadcasted successfully!');
    }

    if (button.id == "no")
        return button.reply.send('Message broadcast interrupted!');
});

client.on('guildDelete', guild => {
    console.log(`Bot wurde entfernt von ${guild.name}(id: ${guild.id})`)
});

client.on("guildCreate", guild => {
    console.log(`Wurde hinzugefügt ${guild.name} \n ${guild.id}`);
});


/**
 * Uptime command
 * Calculating times
 */

function getRemainingSecondsOrMinutes(n) {
    if (n <= 60) return n;
    if (n > 60) {
        var x = n - 60;
        if (x > 60) {
            return getRemainingSecondsOrMinutes(x);
        }
        return x;
    }
}

function getRemainingHours(n) {
    if (n <= 24) return n;
    if (n > 24) {
        var x = n - 24;
        if (x > 24) {
            return getRemainingHours(x);
        }
        return x;
    }
}

client.on('message', message => {
    var block_users = false;
    if (block_users) {
        if (message.author.id == "647445286695862292" || message.author.id == "646813777492312076" || message.author.id == "602267804288286736" || message.author.id == "733234312220246027") {
            return;
        }
    }
    // quick way to prevent my friends from using the bot.

    if (message.guild === null) return;
    if (message.author.id == client.user.id) return;

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

function setInTimeout() {
        if (usersInTimeout.has(message.author.id)) return message.channel.send("Please wait before using a command again. [Global timeout on all servers is 2 Seconds]");
    usersInTimeout.add(message.author.id);
    setTimeout(() => {
        usersInTimeout.delete(message.author.id);
    }, 2400);
}

    if (command === "meme") {
        setInTimeout();

        client.commands.get('meme').execute(message, args);

    } else if (command === 'help') {
        setInTimeout();
        message.react("⁉");
        client.commands.get('help').execute(message, args, client);
    } else if (command === 'delete') {

        client.commands.get('delete').execute(message, args);

    } else if (command === 'serverinfo') {
        setInTimeout();

        client.commands.get('serverinfo').execute(message, args);

    } else if (command === 'userinfo') {
        setInTimeout();

        client.commands.get('userinfo').execute(message, args, client);

    } else if (command === 'joke') {
        setInTimeout();

        client.commands.get('joke').execute(message, args, client);

    } else if (command === 'uptime') {
        setInTimeout();
        message.react("🕰");
        var times = timerInstance.getTotalTimeValues();

        const statEmbed = new Discord.MessageEmbed()
            .setTitle("**  = STATISTICS =**")
            .addField("**Memory usage **", `** ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB ** `)
            .addField("**Uptime **", `${times.days} days \n ${getRemainingHours(times.hours)} hours \n ${getRemainingSecondsOrMinutes(times.minutes)} minutes \n ${getRemainingSecondsOrMinutes(times.seconds)} seconds`);
        message.channel.send(statEmbed);

    } else if (command === 'mememan') {
        setInTimeout();

        client.commands.get('mememan').execute(message, args);

    } else if (command === 'password') {
        setInTimeout();

        client.commands.get('password').execute(message, args);

    } else if (command === 'findanime') {
        setInTimeout();

        client.commands.get('findanime').execute(message, args, client);

    } else if (command == 'findsongs') {
        setInTimeout();

        client.commands.get('findsongs').execute(message, args, client);

    } else if (command == 'punch') {
        setInTimeout();

        client.commands.get('punch').execute(message, args, client);

    } else if (command == 'hug') {
        setInTimeout();

        client.commands.get('hug').execute(message, args, client);

    } else if (command == 'ban') {
        setInTimeout();

        client.commands.get('ban').execute(message, args);

    } else if (command == 'kick') {
        setInTimeout();

        client.commands.get('kick').execute(message, args, client);

    } else if (command == 'kill') {
        setInTimeout();

        client.commands.get('kill').execute(message, args, client);

    } else if (command == "stare") {
        setInTimeout();

        client.commands.get('stare').execute(message, args, client);

    } else if (command == "mcregister") {
        setInTimeout();

        client.commands.get("mcregister").execute(message, args);

    } else if (command == "cnf") {
        setInTimeout();

        client.commands.get("chuckNorrisFacts").execute(message, args, client);

    } else if (command == "delete") {
        setInTimeout();

        client.commands.get("delete").execute(message, args);

    } else if (command == "mcinfo") {
        setInTimeout();

        client.commands.get("mcinfo").execute(message, args);

    } else if (command == "admin") {
        setInTimeout();

        client.commands.get("admin").execute(message, args);

    } else if (command == "fox") {
        setInTimeout();

        client.commands.get("fox").execute(message, args, client);

    } else if (command == "pokedex" || command == "pokédex") {
        setInTimeout();

        client.commands.get("pokedex").execute(message, args, client);

    } else if (command == "mcss") {
        setInTimeout();

        client.commands.get("mcserverstatus").execute(message, args, client);

    } else if (command == "mcsearch") {
        setInTimeout();

        client.commands.get("mcsearch").execute(message, args, client);

    } else if (command == "doggo") {
        setInTimeout();

        client.commands.get("doggo").execute(message, args, client);

    } else if (command == "cat") {
        setInTimeout();

        client.commands.get("cat").execute(message, args, client);

    } else if (command == "8ball") {
        setInTimeout();

        client.commands.get("8ball").execute(message, args, client);

    } else if (command == "stundenplan" || command == "stundnplan" || command == "sp") {
        setInTimeout();

        client.commands.get("stundenplan").execute(message, args, client);

    } else if (command == "megumeme") {
        setInTimeout();

        client.commands.get("megumeme").execute(message, args, client);

    } else if (command == "hpstats") {
        setInTimeout();

        client.commands.get("hpstats").execute(message, args, client);

    } else if (command == "suggest") {
        setInTimeout();

        client.commands.get("suggest").execute(message, args, client);

    } else if (command == "unban") {
        setInTimeout();

        client.commands.get("unban").execute(message, args, client);

    } else if (command == "banreason") {
        setInTimeout();

        client.commands.get("banreason").execute(message, args, client);

    } else if (command == "oof") {
        setInTimeout();

        client.commands.get("oof").execute(message, args, client);

    } else if (command == "nut") {
        setInTimeout();

        client.commands.get("nut").execute(message, args, client);

    } else if (command == "e") {
        setInTimeout();

        client.commands.get("e").execute(message, args, client);

    } else if (command == "quiz") {
        setInTimeout();

        client.commands.get("quiz").execute(message, args, client);

    } else if (command == "ytsearch") {
        setInTimeout();

        client.commands.get("ytsearch").execute(message, args, client);

    }




});

client.login(process.env.token);

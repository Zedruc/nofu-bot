const Discord = require('discord.js');
const client = new Discord.Client();

require('dotenv').config();

/* const { Timer } = require('easytimer.js');
var timerInstance = new Timer(); */

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
});

/* require('dotenv').config();
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
client.musicCommands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
const musicCommandFiles = fs.readdirSync('./commands/music').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

for (const file of musicCommandFiles) {
    const command = require(`./commands/music/${file}`);

    client.musicCommands.set(command.name, command);
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

function setInTimeout(message) {
    if (usersInTimeout.has(message.author.id)) {
        message.channel.send("Please wait before using a command again. [Global timeout on all servers is 2 Seconds]");
        return true;
    }
    usersInTimeout.add(message.author.id);
    setTimeout(() => {
        usersInTimeout.delete(message.author.id);
    }, 2400);

}

client.on('message', message => {
    var block_users = false;
    if (block_users) {
        if (message.author.id == "647445286695862292" || message.author.id == "646813777492312076" || message.author.id == "602267804288286736" || message.author.id == "733234312220246027") {
            return;
        }
    }

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
        if (setInTimeout(message)) return;

        client.commands.get('meme').execute(message, args);

    } else if (command === 'help') {
        if (setInTimeout(message)) return;
        message.react("⁉");
        client.commands.get('help').execute(message, args, client);
    } else if (command === 'delete') {
        if (setInTimeout(message)) return;

        client.commands.get('delete').execute(message, args);

    } else if (command === 'serverinfo') {
        if (setInTimeout(message)) return;

        client.commands.get('serverinfo').execute(message, args);

    } else if (command === 'userinfo') {
        if (setInTimeout(message)) return;

        client.commands.get('userinfo').execute(message, args, client);

    } else if (command === 'joke') {
        if (setInTimeout(message)) return;

        client.commands.get('joke').execute(message, args, client);

    } else if (command === 'uptime') {
        if (setInTimeout(message)) return;
        message.react("🕰");
        var times = timerInstance.getTotalTimeValues();

        const statEmbed = new Discord.MessageEmbed()
            .setTitle("**  = STATISTICS =**")
            .addField("**Memory usage **", `** ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB ** `)
            .addField("**Uptime **", `${times.days} days \n ${getRemainingHours(times.hours)} hours \n ${getRemainingSecondsOrMinutes(times.minutes)} minutes \n ${getRemainingSecondsOrMinutes(times.seconds)} seconds`);
        message.channel.send(statEmbed);

    } else if (command === 'mememan') {
        if (setInTimeout(message)) return;

        client.commands.get('mememan').execute(message, args);

    } else if (command === 'password') {
        if (setInTimeout(message)) return;

        client.commands.get('password').execute(message, args);

    } else if (command === 'findanime') {
        if (setInTimeout(message)) return;

        client.commands.get('findanime').execute(message, args, client);

    } else if (command == 'findsongs') {
        if (setInTimeout(message)) return;

        client.commands.get('findsongs').execute(message, args, client);

    } else if (command == 'punch') {
        if (setInTimeout(message)) return;

        client.commands.get('punch').execute(message, args, client);

    } else if (command == 'hug') {
        if (setInTimeout(message)) return;

        client.commands.get('hug').execute(message, args, client);

    } else if (command == 'ban') {
        if (setInTimeout(message)) return;

        client.commands.get('ban').execute(message, args);

    } else if (command == 'kick') {
        if (setInTimeout(message)) return;

        client.commands.get('kick').execute(message, args, client);

    } else if (command == 'kill') {
        if (setInTimeout(message)) return;

        client.commands.get('kill').execute(message, args, client);

    } else if (command == "stare") {
        if (setInTimeout(message)) return;

        client.commands.get('stare').execute(message, args, client);

    } else if (command == "mcregister") {
        if (setInTimeout(message)) return;

        client.commands.get("mcregister").execute(message, args);

    } else if (command == "cnf") {
        if (setInTimeout(message)) return;

        client.commands.get("chuckNorrisFacts").execute(message, args, client);

    } else if (command == "delete") {
        if (setInTimeout(message)) return;

        client.commands.get("delete").execute(message, args);

    } else if (command == "mcinfo") {
        if (setInTimeout(message)) return;

        client.commands.get("mcinfo").execute(message, args);

    } else if (command == "admin") {
        if (setInTimeout(message)) return;

        client.commands.get("admin").execute(message, args);

    } else if (command == "fox") {
        if (setInTimeout(message)) return;

        client.commands.get("fox").execute(message, args, client);

    } else if (command == "pokedex" || command == "pokédex") {
        if (setInTimeout(message)) return;

        client.commands.get("pokedex").execute(message, args, client);

    } else if (command == "mcss") {
        if (setInTimeout(message)) return;

        client.commands.get("mcserverstatus").execute(message, args, client);

    } else if (command == "mcsearch") {
        if (setInTimeout(message)) return;

        client.commands.get("mcsearch").execute(message, args, client);

    } else if (command == "doggo") {
        if (setInTimeout(message)) return;

        client.commands.get("doggo").execute(message, args, client);

    } else if (command == "cat") {
        if (setInTimeout(message)) return;

        client.commands.get("cat").execute(message, args, client);

    } else if (command == "8ball") {
        if (setInTimeout(message)) return;

        client.commands.get("8ball").execute(message, args, client);

    } else if (command == "stundenplan" || command == "stundnplan" || command == "sp") {
        if (setInTimeout(message)) return;

        client.commands.get("stundenplan").execute(message, args, client);

    } else if (command == "megumeme") {
        if (setInTimeout(message)) return;

        client.commands.get("megumeme").execute(message, args, client);

    } else if (command == "hpstats") {
        if (setInTimeout(message)) return;

        client.commands.get("hpstats").execute(message, args, client);

    } else if (command == "suggest") {
        if (setInTimeout(message)) return;

        client.commands.get("suggest").execute(message, args, client);

    } else if (command == "unban") {
        if (setInTimeout(message)) return;

        client.commands.get("unban").execute(message, args, client);

    } else if (command == "banreason") {
        if (setInTimeout(message)) return;

        client.commands.get("banreason").execute(message, args, client);

    } else if (command == "oof") {
        if (setInTimeout(message)) return;

        client.commands.get("oof").execute(message, args, client);

    } else if (command == "nut") {
        if (setInTimeout(message)) return;

        client.commands.get("nut").execute(message, args, client);

    } else if (command == "e") {
        if (setInTimeout(message)) return;

        client.commands.get("e").execute(message, args, client);

    } else if (command == "quiz") {
        if (setInTimeout(message)) return;

        client.commands.get("quiz").execute(message, args, client);

    } else if (command == "ytsearch") {
        if (setInTimeout(message)) return;

        client.commands.get("ytsearch").execute(message, args, client);

    } else if (command == "activity") {
        if (setInTimeout(message)) return;

        client.commands.get("activity").execute(message, args, client);

    } else if (command == "music") {
        if (setInTimeout(message)) return;

        var cmd = client.musicCommands.get("music") || client.commands.find(a => a.aliases && a.aliases.includes(command));
        cmd.execute(message, args, client);
    }
});
 */

client.login(process.env.token);
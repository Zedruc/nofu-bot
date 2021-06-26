require('dotenv').config();
const Discord = require('discord.js');
const { Timer } = require('easytimer.js');
var timerInstance = new Timer();

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
    }
}

const client = new Discord.Client();

let date_ob = new Date();


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
        const index = Math.floor(Math.random() * (5 - 1) + 1).toString();
        client.user.setActivity(activities[index.toString()].msg, { type: activities[index.toString()].type });
    }, 60000);

});



client.on('guildDelete', guild => {
    console.log(`Bot wurde entfernt von ${guild.name} (id: ${guild.id})`)
});

client.on("guildCreate", guild => {
    console.log(`Wurde hinzugefügt ${guild.name} \n ${guild.id}`);
});


client.on('message', message => {
    var block_users = false;
    if (block_users) {
        if (message.author.id == "647445286695862292" || message.author.id == "646813777492312076" || message.author.id == "602267804288286736" || message.author.id == "733234312220246027") {
            return;
        }
    }
    // quick way to prevent my friends spamming the bot.

    if (message.guild === null) return;

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === "meme") {

        client.commands.get('meme').execute(message, args);

    } else if (command === 'help') {
        message.react("⁉");
        client.commands.get('help').execute(message, args, client);
    } else if (command === 'delete') {

        client.commands.get('delete').execute(message, args);

    } else if (command === 'serverinfo') {

        client.commands.get('serverinfo').execute(message, args);

    } else if (command === 'userinfo') {

        client.commands.get('userinfo').execute(message, args, client);

    } else if (command === 'joke') {

        client.commands.get('joke').execute(message, args, client);

    } else if (command === 'uptime') {
        message.react("🕰");
        var times = timerInstance.getTotalTimeValues();

        const statEmbed = new Discord.MessageEmbed()
            .setTitle("**  = STATISTICS =**")
            .addField("**Memory usage **", `**${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB**`)
            .addField("**Uptime **", `${times.days} days \n ${times.hours} hours \n ${times.seconds} seconds`);
        message.channel.send(statEmbed);

    } else if (command === 'mememan') {

        client.commands.get('mememan').execute(message, args);

    } else if (command === 'password') {

        client.commands.get('password').execute(message, args);

    } else if (command === 'findanime') {

        client.commands.get('findanime').execute(message, args, client);

    } else if (command == 'findsongs') {

        client.commands.get('findsongs').execute(message, args, client);

    } else if (command == 'punch') {

        client.commands.get('punch').execute(message, args, client);

    } else if (command == 'hug') {

        client.commands.get('hug').execute(message, args, client);

    } else if (command == 'ban') {

        client.commands.get('ban').execute(message, args);

    } else if (command == 'kick') {

        client.commands.get('kick').execute(message, args, client);

    } else if (command == 'kill') {

        client.commands.get('kill').execute(message, args, client);

    } else if (command == "stare") {

        client.commands.get('stare').execute(message, args, client);

    } else if (command == "mcregister") {

        client.commands.get("mcregister").execute(message, args);

    } else if (command == "cnf") {

        client.commands.get("chuckNorrisFacts").execute(message, args, client);

    } else if (command == "delete") {

        client.commands.get("delete").execute(message, args);

    } else if (command == "mcinfo") {

        client.commands.get("mcinfo").execute(message, args);

    } else if (command == "admin") {

        client.commands.get("admin").execute(message, args);

    } else if (command == "fox") {

        client.commands.get("fox").execute(message, args, client);

    } else if (command == "pokedex" || command == "pokédex") {

        client.commands.get("pokedex").execute(message, args, client);

    } else if (command == "mcss") {

        client.commands.get("mcserverstatus").execute(message, args, client);

    } else if (command == "mcsearch") {

        client.commands.get("mcsearch").execute(message, args, client);

    } else if (command == "doggo") {

        client.commands.get("doggo").execute(message, args, client);

    } else if (command == "cat") {

        client.commands.get("cat").execute(message, args, client);

    } else if (command == "8ball") {

        client.commands.get("8ball").execute(message, args, client);

    } else if (command == "stundenplan" || command == "stundnplan" || command == "sp") {

        client.commands.get("stundenplan").execute(message, args, client);

    } else if (command == "megumeme") {

        client.commands.get("megumeme").execute(message, args, client);

    } else if (command == "hpstats") {

        client.commands.get("hpstats").execute(message, args, client);

    } else if (command == "suggest") {

        client.commands.get("suggest").execute(message, args, client);

    } else if (command == "unban") {

        client.commands.get("unban").execute(message, args, client);

    } else if (command == "banreason") {

        client.commands.get("banreason").execute(message, args, client);

    } else if (command == "oof") {

        client.commands.get("oof").execute(message, args, client);

    } else if (command == "nut") {

        client.commands.get("nut").execute(message, args, client);

    } else if (command == "e") {

        client.commands.get("e").execute(message, args, client);

    } else if (command == "quiz") {

        client.commands.get("quiz").execute(message, args, client);

    }



});

client.login(process.env.token);

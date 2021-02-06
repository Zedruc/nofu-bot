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

    //client.guilds.cache.forEach((guild) => { //for each guild the bot is in
    //    let defaultChannel = "";
    //    const channel = member.guild.channels.cache.find(ch => ch.name === 'general');
    //    if (!channel) {
    //        guild.channels.cache.forEach((channel) => {
    //            if (channel.type == "text" && defaultChannel == "") {
    //                if (channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
    //                    defaultChannel = channel;
    //                }
    //            }
    //        });
    //    }
    //}, 600000);
});

client.on('guildDelete', guild => {
    console.log(`Bot wurde entfernt von ${guild.name} (id: ${guild.id})`)
});

client.on("guildCreate", guild => {
    console.log(`Wurde hinzugefügt ${guild.name} \n ${guild.id}`);
});



client.on('message', message => {
    if (message.guild === null) return;

    if (message.guild.id == "688010097829478525" /*Homeschool Server*/) {
        function deletRole(role) {
            setTimeout(() => {
                member.roles.remove(role);
            }, 10000);
        }
        function muteDelete() {
            message.delete();
            member = message.member;
            var role = member.guild.roles.cache.find(role => role.id === "689074418168627205");
            member.roles.add(role);
            deletRole(role);
        }
        if (message.toString().toLowerCase().replace(/\s/g, '').includes("toradora")) {
            muteDelete();
        }
    }

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'ping') {
        message.react("🏓");
        client.commands.get('ping').execute(message, args);

    } else if (command === "meme") {

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

        client.commands.get('convert').execute(message, args, client);

    } else if (command === 'findanime') {

        client.commands.get('findanime').execute(message, args, client);

    } else if (command == 'findsongs') {

        client.commands.get('findsongs').execute(message, args, client);

    } else if (command == 'punch') {

        client.commands.get('punch').execute(message, args);

    } else if (command == 'client') {

        client.commands.get('client').execute(message, args, client);

    } else if (command == 'hug') {

        client.commands.get('hug').execute(message, args, client);

    } else if (command == 'ban') {

        client.commands.get('ban').execute(message, args);

    } else if (command == 'kill') {

        client.commands.get('kill').execute(message, args, client);

    } else if (command == "stare") {

        client.commands.get('stare').execute(message, args);

    } else if (command == "mcregister") {

        client.commands.get("mcregister").execute(message, args);

    } else if (command == "cnf") {

        client.commands.get("chuckNorrisFacts").execute(message, args, client);

    } else if (command == "delete") {

        client.commands.get("delete").execute(message, args);

    } else if (command == "broadcast") {

        client.commands.get("broadcast").execute(message, args, client);

    } else if (command == "mcstats") {

        client.commands.get("mcstats").execute(message, args);

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

    }
});

client.login(process.env.token);
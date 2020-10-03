const https = require('https');
const http = require('http');
const Discord = require('discord.js');

module.exports = {
    name: 'findmusic',
    description: 'lists songs of a given band',
    execute(message, args) {

        let msgArgs = message.content.slice(prefix.length).trim().split(' ');
        let Band = msgArgs[1];

        const axios = require("axios");

        axios({
            "method": "GET",
            "url": "https://deezerdevs-deezer.p.rapidapi.com/search",
            "headers": {
                "content-type": "application/octet-stream",
                "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
                "x-rapidapi-key": "6421b1b829msh2e5c14c75b565d1p10a830jsnae50b14af970",
                "useQueryString": true
            }, "params": {
                "q": Band
            }
        })
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })


        let musicInfoEmbed = new Discord.MessageEmbed()
            .setTitle("__The 5 most known songs from " + Band + "__")
            .addField("**1.**: ", response.data[0].title)
            .addField("**2.**: ", response.data[1].title)
            .addField("**3.**: ", response.data[2].title)
            .addField("**4.**: ", response.data[3].title)
            .addField("**5.**: ", response.data[4].title)

        message.channel.send(musicInfoEmbed);
    }

}
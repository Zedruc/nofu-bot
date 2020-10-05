const https = require('https');
const Discord = require('discord.js');

module.exports = {
    name: 'findanime',
    description: 'lists infos about the given anime',
    execute(message, args) {
        let prefix = "%";
        let msgArgs = message.content.slice(prefix.length).trim().split(/ +/);
        // let searchCriteria = msgArgs[1];
        let rawArgs = args;
        let argsString = rawArgs.toString();
        let animeName = argsString.replace(/,/g, " ");
        console.log(argsString);
        if (msgArgs[1] == "characters") {
            let animeNameGetID = message.content.slice(prefix.length + 21).trim().split(/ +/);

            https.get('https://api.jikan.moe/v3/search/anime?q=' + animeName, res => {

                let body = '';

                res.on('data', chunk => {
                    body += chunk;
                });

                res.on('end', () => {
                    let bodyString = JSON.parse(body);
                    console.log("getting chars from: " + animeNameGetID);
                    let topResult = bodyString.results[0];

                    let animeID = topResult.mal_id;
                    console.info(topResult.title + " ID: \n" + animeID);


                    https.get('https://api.jikan.moe/v3/anime/' + animeID + "/characters_staff", resp => {

                        let body = '';

                        resp.on('data', chunk => {
                            body += chunk;
                        });

                        resp.on('end', () => {
                            let bodyString = JSON.parse(body);
                            let chars = bodyString.characters;

                            let length = chars.length - 1;
                            console.log(length);

                            let allNames = [];
                            let i = 0;
                            do {
                                i++
                                allNames += chars[i].name;
                                allNames += " ";

                            } while (i < length);
                            console.log(allNames);
                            if (i === length) {
                                let string = JSON.stringify(allNames);

                                let String = allNames.trim().split(/ +/);
                                console.log(String);
                                let animeChars = new Discord.MessageEmbed()
                                    .setTitle("**All characters from __" + animeName + "__**")
                                    .setThumbnail(chars.image_url)
                                    .setDescription(String)

                                message.reply(animeChars);
                            }

                        });
                    })
                });
            })

        } else {

            https.get('https://api.jikan.moe/v3/search/anime?q=' + animeName, res => {

                let body = '';

                res.on('data', chunk => {
                    body += chunk;
                });

                res.on('end', () => {
                    let bodyString = JSON.parse(body);
                    console.log(bodyString.results[0].title);
                    let topResult = bodyString.results[0];;

                    let animeInfoEmbed = new Discord.MessageEmbed()
                        .setTitle("**Top search results for __" + animeNameGetIDNOCOMMA + "__**")
                        .setThumbnail(topResult.image_url)
                        .setDescription(topResult.synopsis)
                        .addField("Episodes:", topResult.episodes, true)
                        .addField("Release Date:", topResult.start_date)


                    message.channel.send(animeInfoEmbed);
                    console.log(msgArgs);
                });
            })


        }
    }
}
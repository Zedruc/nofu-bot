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
            let animeNameGetID = msgArgs[2];

            https.get('https://api.jikan.moe/v3/search/anime?q=' + animeNameGetID, res => {

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


                    https.get('https://api.jikan.moe/v3/anime/' + animeID + "/character_staff", resp => {

                        let body = '';

                        resp.on('data', chunk => {
                            body += chunk;
                        });

                        resp.on('end', () => {
                            let bodyString = JSON.parse(body);
                            let chars = bodyString.characters;

                            for (let i = 0; i < chars.length; i++) {
                                const element = array[i];
                                console.log(element);
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
                    let topResult = bodyString.results[0];

                    let animeInfoEmbed = new Discord.MessageEmbed()
                        .setTitle("**Top search results for __" + animeName + "__**")
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
const https = require('https');
const Discord = require('discord.js');

module.exports = {
    name: 'findanime',
    description: 'lists infos about the given anime',
    execute(message, args) {

        let prefix = "%";
        let msgArgs = message.content.slice(prefix.length).trim().split(/ +/);

        const searchScripts = fs.readdirSync('../commands/animeSearch').filter(file => file.endsWith('.js'));
        for (const file of searchScripts) {
            const command = require(`./commands/animeSearch/${file}`);

            client.commands.set(command.name, command);
        }


        // let searchCriteria = msgArgs[1];
        let rawArgs = args;
        let argsString = rawArgs.toString();
        let animeName = argsString.replace(/,/g, " ");
        console.log(argsString);

        if (args.length > 1) {
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
        } else {
            //huge genre check...
            switch (args[1]) {
                case 'action':
                    https.get('https://api.jikan.moe/v3/search/anime?genre=1', res => {

                        let body = '';

                        res.on('data', chunk => {
                            body += chunk;
                        });

                        res.on('end', () => {
                            let bodyString = JSON.parse(body);
                            console.log(bodyString.results[0].title);
                            let topResult = bodyString.results[0];

                            let animeInfoEmbed = new Discord.MessageEmbed()
                                .setTitle("**Top search results for __Action__**")
                                .setThumbnail(topResult.image_url)
                                .setDescription(topResult.synopsis)
                                .addField("Episodes:", topResult.episodes, true)
                                .addField("Release Date:", topResult.start_date)


                            message.channel.send(animeInfoEmbed);
                            console.log(msgArgs);
                        });
                    })
                    break;

                case 'adventure':
                    https.get('https://api.jikan.moe/v3/search/anime?genre=2', res => {

                        let body = '';

                        res.on('data', chunk => {
                            body += chunk;
                        });

                        res.on('end', () => {
                            let bodyString = JSON.parse(body);
                            console.log(bodyString.results[0].title);
                            let topResult = bodyString.results[0];

                            let animeInfoEmbed = new Discord.MessageEmbed()
                                .setTitle("**Top search results for __Action__**")
                                .setThumbnail(topResult.image_url)
                                .setDescription(topResult.synopsis)
                                .addField("Episodes:", topResult.episodes, true)
                                .addField("Release Date:", topResult.start_date)


                            message.channel.send(animeInfoEmbed);
                            console.log(msgArgs);
                        });
                    })
                    break;

                case 'demons':
                    https.get('https://api.jikan.moe/v3/search/anime?genre=6', res => {

                        let body = '';

                        res.on('data', chunk => {
                            body += chunk;
                        });

                        res.on('end', () => {
                            let bodyString = JSON.parse(body);
                            console.log(bodyString.results[0].title);
                            let topResult = bodyString.results[0];

                            let animeInfoEmbed = new Discord.MessageEmbed()
                                .setTitle("**Top search results for __Action__**")
                                .setThumbnail(topResult.image_url)
                                .setDescription(topResult.synopsis)
                                .addField("Episodes:", topResult.episodes, true)
                                .addField("Release Date:", topResult.start_date)


                            message.channel.send(animeInfoEmbed);
                            console.log(msgArgs);
                        });
                    })
                    break;

                case 'drama':
                    https.get('https://api.jikan.moe/v3/search/anime?genre=8', res => {

                        let body = '';

                        res.on('data', chunk => {
                            body += chunk;
                        });

                        res.on('end', () => {
                            let bodyString = JSON.parse(body);
                            console.log(bodyString.results[0].title);
                            let topResult = bodyString.results[0];

                            let animeInfoEmbed = new Discord.MessageEmbed()
                                .setTitle("**Top search results for __Action__**")
                                .setThumbnail(topResult.image_url)
                                .setDescription(topResult.synopsis)
                                .addField("Episodes:", topResult.episodes, true)
                                .addField("Release Date:", topResult.start_date)


                            message.channel.send(animeInfoEmbed);
                            console.log(msgArgs);
                        });
                    })
                    break;

                case 'horror':
                    https.get('https://api.jikan.moe/v3/search/anime?genre=14', res => {

                        let body = '';

                        res.on('data', chunk => {
                            body += chunk;
                        });

                        res.on('end', () => {
                            let bodyString = JSON.parse(body);
                            console.log(bodyString.results[0].title);
                            let topResult = bodyString.results[0];

                            let animeInfoEmbed = new Discord.MessageEmbed()
                                .setTitle("**Top search results for __Action__**")
                                .setThumbnail(topResult.image_url)
                                .setDescription(topResult.synopsis)
                                .addField("Episodes:", topResult.episodes, true)
                                .addField("Release Date:", topResult.start_date)


                            message.channel.send(animeInfoEmbed);
                            console.log(msgArgs);
                        });
                    })
                    break;

                case 'mecha':
                    https.get('https://api.jikan.moe/v3/search/anime?genre=18', res => {

                        let body = '';

                        res.on('data', chunk => {
                            body += chunk;
                        });

                        res.on('end', () => {
                            let bodyString = JSON.parse(body);
                            console.log(bodyString.results[0].title);
                            let topResult = bodyString.results[0];

                            let animeInfoEmbed = new Discord.MessageEmbed()
                                .setTitle("**Top search results for __Action__**")
                                .setThumbnail(topResult.image_url)
                                .setDescription(topResult.synopsis)
                                .addField("Episodes:", topResult.episodes, true)
                                .addField("Release Date:", topResult.start_date)


                            message.channel.send(animeInfoEmbed);
                            console.log(msgArgs);
                        });
                    })
                    break;

                case 'romance':
                    https.get('https://api.jikan.moe/v3/search/anime?genre=22', res => {

                        let body = '';

                        res.on('data', chunk => {
                            body += chunk;
                        });

                        res.on('end', () => {
                            let bodyString = JSON.parse(body);
                            console.log(bodyString.results[0].title);
                            let topResult = bodyString.results[0];

                            let animeInfoEmbed = new Discord.MessageEmbed()
                                .setTitle("**Top search results for __Action__**")
                                .setThumbnail(topResult.image_url)
                                .setDescription(topResult.synopsis)
                                .addField("Episodes:", topResult.episodes, true)
                                .addField("Release Date:", topResult.start_date)


                            message.channel.send(animeInfoEmbed);
                            console.log(msgArgs);
                        });
                    })
                    break;

                case 'school':
                    https.get('https://api.jikan.moe/v3/search/anime?genre=23', res => {

                        let body = '';

                        res.on('data', chunk => {
                            body += chunk;
                        });

                        res.on('end', () => {
                            let bodyString = JSON.parse(body);
                            console.log(bodyString.results[0].title);
                            let topResult = bodyString.results[0];

                            let animeInfoEmbed = new Discord.MessageEmbed()
                                .setTitle("**Top search results for __Action__**")
                                .setThumbnail(topResult.image_url)
                                .setDescription(topResult.synopsis)
                                .addField("Episodes:", topResult.episodes, true)
                                .addField("Release Date:", topResult.start_date)


                            message.channel.send(animeInfoEmbed);
                            console.log(msgArgs);
                        });
                    })
                    break;

                case 'shounen':
                    https.get('https://api.jikan.moe/v3/search/anime?genre=27', res => {

                        let body = '';

                        res.on('data', chunk => {
                            body += chunk;
                        });

                        res.on('end', () => {
                            let bodyString = JSON.parse(body);
                            console.log(bodyString.results[0].title);
                            let topResult = bodyString.results[0];

                            let animeInfoEmbed = new Discord.MessageEmbed()
                                .setTitle("**Top search results for __Action__**")
                                .setThumbnail(topResult.image_url)
                                .setDescription("**" + topResult.title + "** \n" + topResult.synopsis)
                                .addField("Episodes:", topResult.episodes, true)
                                .addField("Release Date:", topResult.start_date)


                            message.channel.send(animeInfoEmbed);
                            console.log(msgArgs);
                        });
                    })
                    break;
            }
        }



    }

}
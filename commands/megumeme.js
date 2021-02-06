// =============================================================================
// REQUESTED BY A SERVER MEMBER
// =============================================================================
const https = require('https');
module.exports = {
    name: "megumeme",
    description: "random megumin gifs from tenor yay",
    execute(message, args, client) {
        const key = process.env.tenor;
        https.get('https://api.tenor.com/v1/search?q=megumin&limit=50&key=' + key, res => {

            let body = '';

            res.on('data', chunk => {
                body += chunk;
            })

            res.on('end', () => {
                let bodyString = JSON.parse(body);
                let int = Math.floor(Math.random(1) * 49);

                let gifUrl = bodyString.results[int].media[0].gif.url;
                let meguEmbed = {
                    title: `Megumeme ladies and gents!`,
                    image: { url: gifUrl },
                    color: "#FF5359",
                    footer: {
                        text: client.user.username,
                        icon_url: client.user.displayAvatarURL({ format: "png" }),
                    },
                    timestamp: (new Date()).toISOString()
                };
                message.channel.send({ embed: meguEmbed });
            })
        })
    }
}
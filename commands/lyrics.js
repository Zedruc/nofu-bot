const fetch = require('node-fetch');

module.exports = {
    name: 'lyrics',
    description: 'Searches for the lyrics of given song',
    execute(message, args, client) {
        const api = "api.genius.com";
        let query = args.join(" ");

        fetch(`${api}/search?q=${encodeURI(query)}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${process.env.genius_token}`
            },
        }).then(res => {
            let json = res.json();
            console.log(json);
        })
    }
}
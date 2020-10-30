const { put } = require("request")

//https://jsonblob.com/api/jsonBlob/deae33dc-1ac5-11eb-84f5-2120f48a02f5
module.exports = {
    name: "mcregister",
    description: "register with your minecraft uuid with /mcregister <uuid>",
    execute(message, args) {
        const fetch = require("node-fetch");
        const https = require('https');

        let prefix = "%";
        let uuid = message.content.slice(prefix.length + 10).trim().split(/ +/);
        let user = message.author.name;
        let example_uuid = "1c0211121b6442a989fff16ed0272ce3"; //yes thats mine

        if (uuid.length < example_uuid) {
            message.reply("Please use your uuid to register! (registering with name is currently in developement)");
            throw new Error("UUID Invalid");
        }

        https.get('https://jsonblob.com/api/jsonBlob/deae33dc-1ac5-11eb-84f5-2120f48a02f5', res => {
            let body = '';

            res.on('data', chunk => {
                body += chunk;
            });

            res.on('end', () => {
                let bodyString = JSON.parse(body);
                console.log(String);

                fetch("https://jsonblob.com/api/jsonBlob/deae33dc-1ac5-11eb-84f5-2120f48a02f5", {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: body + JSON.stringify({
                        "users": uuid
                    }),
                })
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data);
                    })
                    .catch((err) => console.log(err));

            });

        });

    }
}
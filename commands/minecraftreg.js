const { throws } = require("assert");
const { put } = require("request")

//https://jsonblob.com/api/jsonBlob/deae33dc-1ac5-11eb-84f5-2120f48a02f5
module.exports = {
    name: "mcregister",
    description: "Register with your minecraft uuid with /mcregister <uuid>",
    execute(message, args) {
        const fetch = require("node-fetch");
        const https = require('https');

        let prefix = "%";
        let uuid = message.content.slice(prefix.length + 10).trim().split(/ +/);
        let user = message.member.displayName;
        let example_uuid = "1c0211121b6442a989fff16ed0272ce3";

        if (uuid[0].length !== example_uuid.length) {
            message.channel.send("Please use your uuid to register! (registering with name is currently in developement)");
            console.log("Invalid UUID");
            return;
        }

        https.get('https://jsonblob.com/api/jsonBlob/' + process.env.json_regs, res => {
            let body = '';

            res.on('data', chunk => {
                body += chunk;
            });

            res.on('end', () => {
                let bodyString = JSON.parse(body);
                console.log(bodyString);

                let data = {
                    "counter": 0,
                    "regs": {}
                }

                let num = data.counter;
                let nextUser = num++;

                var newReg = message.author.id;

                for (const [key, value] of Object.entries(bodyString.regs)) {

                    console.log("-----------");
                    console.log({ value, uuid });
                    console.log("-----------");

                    if (value.includes(uuid)) {
                        message.reply("this UUID is already registered!");
                        return;
                    }
                }

                bodyString["counter"] = Object.keys(bodyString.regs).length;
                bodyString["regs"][newReg] = uuid;

                console.log("--------------------------");
                console.log(bodyString);

                fetch("https://jsonblob.com/api/jsonBlob/" + process.env.json_regs, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(bodyString),
                })
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data);
                    })
                    .then(message.reply("Succesfully logged in as " + message.author.tag + " with MC-UUID " + uuid))
                    .catch((err) => console.log(err));

            });

        });

    }
}
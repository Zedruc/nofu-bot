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
        let user = message.author;
        let example_uuid = "1c0211121b6442a989fff16ed0272ce3"; //yes thats mine

        if (uuid[0].length < example_uuid.length) {
            message.channel.send("Please use your uuid to register! (registering with name is currently in developement)");
            throw new Error("UUID Invalid");
        }

        https.get('https://jsonblob.com/api/jsonBlob/72e08016-1acf-11eb-84f5-99c14ac486d4', res => {
            let body = '';

            res.on('data', chunk => {
                body += chunk;
            });

            res.on('end', () => {
                let bodyString = JSON.parse(body);
                console.log(bodyString);

                let data = {
                    regs: {

                    }
                }

                for (let i = 0; i < data.length; i++) {
                    var newReg = "User" + i;
                    var newVal = uuid;
                    data.regs["siis"] = "1c0211121b6442a989fff16ed0272ce3";
                }
                console.log(data);

                fetch("https://jsonblob.com/api/jsonBlob/72e08016-1acf-11eb-84f5-99c14ac486d4", {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
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
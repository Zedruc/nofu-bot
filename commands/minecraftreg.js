const { throws } = require("assert");
const { put } = require("request");
const { Base64 } = require('js-base64');
module.exports = {
    name: "mcregister",
    description: "Register with your minecraft uuid with /mcregister <uuid> or <name>",
    execute(message, args) {

        //https://api.mojang.com/user/profile/agent/minecraft/name/<name>

        const fetch = require("node-fetch");
        const https = require('https');

        let prefix = "%";
        let uuid = message.content.slice(prefix.length + 10).trim().split(/ +/);
        let uuString = uuid[0];
        let encodedUUID = [Base64.encode(uuString)];
        let user = message.member.displayName;
        let example_uuid = "1c0211121b6442a989fff16ed0272ce3";

        if (uuid[0].length !== example_uuid.length) {


            let name = message.content.slice(prefix.length + 10).trim().split(/ +/);
            https.get('https://api.mojang.com/user/profile/agent/minecraft/name/' + name, res => {
                let body = '';

                res.on('data', chunk => {
                    body += chunk;
                });

                res.on('end', () => {
                    let bodyString = JSON.parse(body);

                    let UUIDofName = bodyString.id;
                    console.log(UUIDofName);
                    let encUUID = [Base64.encode(UUIDofName)];

                    https.get('https://jsonblob.com/api/jsonBlob/' + process.env.json_regs, res => {
                        let body = '';

                        res.on('data', chunk => {
                            body += chunk;
                        });

                        res.on('end', () => {
                            let bodyString = JSON.parse(body);
                            console.log(bodyString);

                            let dataTemplate = {
                                "counter": 0,
                                "regs": {}
                            }

                            var newReg = message.author.id;

                            for (const [key, value] of Object.entries(bodyString.regs)) {
                                console.log("-----------");
                                console.log({ value, uuString });
                                console.log("-----------");

                                if (value.includes(UUIDofName)) {
                                    message.reply("this UUID is already registered!");
                                    return;
                                }
                            }

                            bodyString["counter"] = Object.keys(bodyString.regs).length;
                            bodyString["regs"][newReg] = encUUID;

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
                                .then(message.reply("Succesfully logged in as __" + message.author.tag + "__ with MC-UUID __" + UUIDofName + "__"))
                                .catch((err) => console.log(err));
                            return;

                        });

                    });

                });
            });




            //message.channel.send("Please use your uuid to register! (registering with name is currently in developement)");
            //console.log("Invalid UUID");
            //return;
        } else {

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

                    var newReg = message.author.id;

                    for (const [key, value] of Object.entries(bodyString.regs)) {
                        console.log("-----------");
                        console.log({ value, uuString });
                        console.log("-----------");

                        if (value.includes(encodedUUID[0]) || key.includes(message.author.id)) {
                            message.reply("this account is already registered!");
                            return;
                        }
                    }

                    bodyString["counter"] = Object.keys(bodyString.regs).length;
                    bodyString["regs"][newReg] = encodedUUID;

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
                        .then(message.reply("Succesfully logged in as __" + message.author.tag + "__ with MC-UUID __" + uuString + "__"))
                        .catch((err) => console.log(err));

                });

            });
        }

    }
}

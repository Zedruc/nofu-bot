const { SSL_OP_COOKIE_EXCHANGE } = require('constants');
const https = require('https');

module.exports = {
    name: 'mcstats',
    description: 'Shows player info (Minecraft info)',
    execute(message, args) {
        //https://api.mojang.com/user/profiles/uuid/names
        https.get('https://jsonblob.com/api/jsonBlob/' + process.env.json_regs, res => {
            let body = '';

            res.on('data', chunk => {
                body += chunk;
            });

            res.on('end', () => {
                let bodyString = JSON.parse(body);
                let sender = message.author.tag;
                let user = bodyString.regs[sender];
                let UUID = user[0];
                if (user == null) {
                    message.reply("You first have to login to your account via uuid!\n`%mcregister <UUID>`");
                    return;
                }

                https.get('https://api.mojang.com/user/profiles/' + UUID + '/names', res => {
                    let body = '';
                    res.on('data', chunk => {
                        body += chunk;
                    });

                    res.on('end', () => {
                        bodyString2 = JSON.parse(body);
                    });
                });

            });
        });
    }
}
const { SSL_OP_COOKIE_EXCHANGE } = require('constants');
const https = require('https');
const MojangAPI = require('mojang-api');

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
                console.log(bodyString);
                let sender = message.author.tag;
                let user = bodyString.regs[sender];
                let UUID = user[0];
                console.log(UUID);
                if (user == null) {
                    message.reply("You first have to login to your account via uuid!\n`%mcregister <UUID>`");
                    return;
                }

                MojangAPI.nameHistory(UUID, function (err, res) {
                    if (err)
                        console.log(err);
                    else {
                        if (res.length == 1) {
                            message.reply(res[0].name + " is very content with their existing username, because they didn't change it. Excellent job.");
                        } else {
                            var lastChange = res[res.length - 1];
                            var at = new Date(lastChange.changedToAt);
                            message.reply(lastChange.name + " wasn't so content with their username. They last changed their username at " + at + ".");
                        }
                    }
                });

            })
        }
            //
            //        https.get('https://api.mojang.com/user/profiles/' + UUID + '/names', res => {
            //            let body = '';
            //            res.on('data', chunk => {
            //                body += chunk;
            //
            //                /**Error:
            //                 * <!DOCTYPE html>
            //                 * ^
            //                 * SyntaxError: Unexpected token < in JSON at position 0
            //                 * at JSON.parse (<anonymous>)
            //                 * 
            //                 * still todo
            //                 * */
            //
            //            });
            //
            //            res.on('end', () => {
            //                console.log(body[0]);
            //                let a = body.replace(/ \[/g, "");
            //                let b = console.log(a.replace(/ \]/g, ""));
            //            });
            //        });
            //
            //    });
            //});
        )
    }
}
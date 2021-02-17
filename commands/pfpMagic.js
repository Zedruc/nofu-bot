const Jimp = require("jimp");
const path = require("path");
const fs = require('fs');

module.exports = {
    name: 'pfpmagic',
    description: 'm a g i c',
    execute(message, args, client) {
        Jimp.read(message.author.avatarURL({ format: "png" }), (err, image) => {
            if (err) return message.channel.send("Something went wrong :(");

            image
                .contrast(1)
                .write(path.resolve(`../images/${message.author.id}`));

            message.channel.send(":,)", { files: [path.resolve(`../images${message.author.id}`)] });

            fs.unlink(path.resolve(`../images${message.author.id}`), (err) => {
                if (err) throw err;
            });
        });
    }
}
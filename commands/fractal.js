const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

module.exports = {
    name: "fractal",
    description: "Generate fractals",
    async execute(message, args, client, Discord, cmd) {
        if (!args[0]) {
            return;
        }

        message.channel.startTyping();
        var myCanvas = createCanvas(800, 800)
        var ctx = myCanvas.getContext("2d");
        function draw(startX, startY, len, angle, branchWidth) {
            ctx.lineWidth = branchWidth;

            ctx.beginPath();
            ctx.save();

            ctx.strokeStyle = "blue";
            ctx.fillStyle = "red";

            ctx.translate(startX, startY);
            ctx.rotate(angle * Math.PI / 180 * parseInt(args[0]));
            ctx.moveTo(0, 0);
            ctx.lineTo(0, -len);
            ctx.stroke();

            ctx.shadowBlur = 15;
            ctx.shadowColor = "rgba(0,0,0,0.4)";

            if (len < 10) {
                ctx.restore();
                return;
            }

            draw(0, -len, len * 0.8, angle - 15, branchWidth * 0.8);
            draw(0, -len, len * 0.8, angle + 15, branchWidth * 0.8);

            ctx.restore();
        }
        draw(400, 600, 120, 0, 10)

        const out = fs.createWriteStream(path.resolve('./generated', `${message.author.id}.png`));
        const stream = myCanvas.createPNGStream();
        stream.pipe(out);
        out.on('finish', () => {
            message.channel.stopTyping();

            var msg = message.channel.send('Your fractal!', { files: [path.resolve('./generated', `${message.author.id}.png`)] });
            msg.then(msg => {
                fs.unlink(path.resolve('./generated', `${message.author.id}.png`), (err) => {
                    if (err) throw err;
                });
            });
        });

    }
}
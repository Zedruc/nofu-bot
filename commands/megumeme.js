module.exports = {
    name: "megumeme",
    description: "m e g u m e m e",
    execute(message, args, client) {
        if (message.guild === null) return;

        var gifs = [
            "https://media.tenor.com/images/4120d16997c24cec8fa505349a6dbdbc/tenor.gif",
            "https://media.tenor.com/images/90d6ece71198f8f87db0dd9189748a25/tenor.gif",
            "https://media.tenor.com/images/99f717481aba9088ddee4d98893016da/tenor.gif",
            "https://media.tenor.com/images/55a4a48359c1677b4392ea63cc82c02f/tenor.gif"
        ]

        let stareEmbed = {
            title: `Megumeme.`,
            image: { url: gifs[Math.floor(Math.random() * gifs.length)] },
            color: "#9E1A1A",
            footer: {
                text: client.user.username,
                icon_url: client.user.displayAvatarURL({ format: "png" }),
            },
            timestamp: (new Date()).toISOString()
        };

        message.channel.send({ embed: stareEmbed });
    }
}
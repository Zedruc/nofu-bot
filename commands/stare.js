module.exports = {
    name: "stare",
    description: "Stare at someone (if they post cringe or smth like that)",
    execute(message, args, client) {
        if (message.guild === null) return;

        var gifs = [
            "https://media.tenor.com/images/c3f0b2ce02489b7a64d0c51ec92f02d5/tenor.gif",
            "https://media.tenor.com/images/c6501221a2995e2cca8ecc23cf124a24/tenor.gif",
            "https://media.tenor.com/images/f56bc9a14b1b1a7d8df2ea7b2c33f148/tenor.gif",
            "https://media.tenor.com/images/82b74068ad8e9be8c3a6678b11259c6a/tenor.gif",
            "https://media.tenor.com/images/aae673f94098dd48c0b827e9a7c28149/tenor.gif",
            "https://media.tenor.com/images/1fddac67c1f014378d8f35d443efe9a1/tenor.gif",
            "https://media.tenor.com/images/b3573dbe2ef0d8dabcec0fc8ffa8154e/tenor.gif"
        ]

        const taggedUser = message.mentions.users.first();

        let stareEmbed = {
            title: `${message.member.displayName} stares at ${taggedUser ? taggedUser.username : msgArgs[1]}!`,
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
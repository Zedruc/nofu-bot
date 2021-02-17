module.exports = {
    name: "filter",
    description: "wordfilters",
    execute(message, args, client) {

        if (message.guild.id == "704285475791437844") {

            const slurs = [
                "nigga",
                "nigger",
                "ching chong", // server owner chose this, idk why lul
                "asshole",
                "bitch",
                "twat",
                "slut",
                "whore",
                "hoe",
                "cunt",
                "blowjob",
                "pussy",
                "cock",
                "dick",
                "bussy",
                "faggot",
                "nut",
                "cum",
                "sloot",
                "cont",
                "puthay",
                "peg",
                "motherfucker",
                "retard",
                "tits",
                "boobs"
            ];

            if (message.author.id == "701150875871346809") {
                if (message.content.includes("%slurlist")) {
                    let response = slurs.join(", ");
                    message.author.send(response);
                }
            }

            let text = message.content;
            let stemmedText = stemmer.tokenizeAndStem(text, true);

            for (let x = 0; x < slurs.length; x++) {

                if (stemmedText.indexOf(slurs[x]) > -1) {
                    try {
                        message.delete({ timeout: 200, reason: "Detected word in filer, autodeleted." });
                        return;
                    } catch (err) {
                        message.channel.send("Critical error while deleting message, shutting down.");
                        throw new Error(err);
                    }
                }

            }

        }
    }
}
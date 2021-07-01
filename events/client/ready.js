module.exports = (_null, client, Discord) => {
    console.log('Bot is online');

    const activities =
    {
        "1": {
            "type": "PLAYING",
            "msg": "with %help"
        },
        "2": {
            "type": "LISTENING",
            "msg": "chat"
        },
        "3": {
            "type": "PLAYING",
            "msg": "with the developers console"
        },
        "4": {
            "type": "COMPETING",
            "msg": "with the developer"
        },
        "5": {
            "type": "WATCHING",
            "msg": "the developer struggling"
        },
        "6": {
            "type": "PLAYING",
            "msg": "v.3.5"
        }
    }
    client.user.setActivity("Getting ready... | v3.5", { type: 'PLAYING' });
    setInterval(() => {
        const index = Math.floor(Math.random() * (6 - 1) + 1).toString();
        client.user.setActivity(activities[index.toString()].msg, { type: activities[index.toString()].type });
    }, 60000);
}
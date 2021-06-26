module.exports = {
    name: 'delete',
    description: 'Deletes messages',
    execute(message, args) {

        if (message.guild === null) return;

        var msgArgs = message.content.slice(6).split(" ");

        const toDelete = msgArgs[1];
        if (message.member.hasPermission('MANAGE_MESSAGES')) {

            if (!toDelete || toDelete == 0 || toDelete > 100) {

                message.reply("Please provide a number between 2 and 100!");

            } else {

                message.delete;

                try {
                    return message.channel.bulkDelete(toDelete);
                } catch (err) {
                    return message.channel.send(err.message);
                }

            }

        } else {
            message.reply("Youre not allowed to use this command! \n`Missing Permissions`");
        }
    }
}
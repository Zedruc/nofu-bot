const fetch = require('node-fetch');
module.exports = {
  name: 'chuckNorrisFacts',
  description: "Sends a random Chuck Norris fact from the CNfDB",
  async execute(message, args, client) {
    // Sends a request to the icndb for a joke, excluding the explicit jokes.
    let x = await fetch("http://api.icndb.com/jokes/random?exclude=[explicit]&escape=javascript");
    x.json().then(body => {
      let cnEmbed = {
        title: `Chuck Norris fact #${body.value.id}:`,
        description: body.value.joke,
        footer:{
          text: client.user.username,
          icon_url: client.user.displayAvatarURL({format: "png"}),
        },
        timestamp: (new Date()).toISOString()
      }
      message.channel.send({embed: cnEmbed});
    });
  }
}
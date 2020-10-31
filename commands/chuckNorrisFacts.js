const fetch = require('node-fetch');
module.exports = {
  name: 'chuckNorrisFacts',
  description: "Sends a random Chuck Norris fact from the CNfDB",
  async execute(message, args) {
    // Sends a request to the icndb for a joke, excluding the explicit jokes.
    let x = await fetch("http://api.icndb.com/jokes/random?exclude=[explicit]&escape=javascript");
    x.json().then(body => {
      message.channel.send(body.value.joke);
    });
  }
}
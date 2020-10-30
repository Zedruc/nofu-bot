const fetch = require('node-fetch');
module.exports = {
  name: 'chuckNorrisFacts',
  description: "Sends a random Chuck Norris fact from the CNfDB",
  async execute(message, args) {
    //Sends a request to the icndb for a joke. I should probably exclude the explicit ones but I don't really care atm
    let x = await fetch("http://api.icndb.com/jokes/random?exclude=[explicit]");
    x.json().then(body => {
      message.channel.send(body.value.joke);
    });
    //By the actuall way, sometimes, the joke sent by the API contains something like "&quot;"
    //which is the special HTML character for ". As I am not sure it does it for other things,
    //I will probably add a String.prototype.replace("&quot;", '"')
  }
}
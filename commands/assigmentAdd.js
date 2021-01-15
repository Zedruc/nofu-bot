const https = require('https');

module.exports = {
    name: 'addAssignment',
    description: "Homeschool command, adding assignments and sending them to a jsonblob to save them",
    execute(message, args, client) {
        let blobURL = "https://jsonblob.com/api/91aea15e-5716-11eb-9d21-5db5e6c55bda"; //not  hiding it because its a test command

        let assignment = message.content.toString().replace(/,/g, " ");

        https.get(blobURL, res => {
            let body = '';

            res.on('data', (chunk) => {
                body += chunk;
            });

            res.on('end', () => {
                let data = JSON.parse(body);

                data[`assignment-${(new Date).toISOString()}-${message.author.id}`][assignment];

                fetch(blobURL, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                })
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data);
                    })
                    .then(message.reply("Assignment added"))
                    .catch((err) => console.log(err));
            });
        });
    }
}
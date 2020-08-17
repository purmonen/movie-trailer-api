const handler = require('./index')

const clientEvent = {
    body: JSON.stringify({
        movieResourceLink: `http://content.viaplay.se/pc-se/film/fargo-1996`
    })
};

handler.handler(clientEvent, null, function(err, response)  {
    if (err) {
        console.log(err)
    } else {
        console.log(response)
    }
})

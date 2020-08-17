import { lambdaHandler } from "./index";

// This allows you to call the lambda function locally by providing the movie resource link as a command line argument

if (process.argv.length < 3) {
    console.log('Please provide a movie resource link')
} else {
    const clientEvent = {
        body: JSON.stringify({movieResourceLink: process.argv[2]})
    };

    lambdaHandler(clientEvent as any, null as any, function(err, response)  {
        if (err) {
            console.log(err)
        } else {
            console.log(response)
        }
    })
}
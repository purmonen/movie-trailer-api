# Movie Trailers
This repo consists of a Typescript api for fetching trailer urls using TMDb (themoviedb.org) from Viaplay movie resource links and some glue code to use this as a serverless application on AWS Lambda. The AWS Lambda function is called from a rest api provided by AWS API Gateway.

## MovieTrailerApi
Takes a `tmdbApiKey` as constructor argument and has a single public function `trailerForMovieResourceLink(movieResourceLink: string)` for retrieving the trailer. This api can easily be used within any kind of application such as an Express app, a command line application or a serverless function.

## AWS Lambda
`lambdaHandler.ts` contains a handler for an AWS Lambda request that will be invoked when the lambdda function is called.

## AWS API Gateway
The rest api is deployed at https://us0grdmio5.execute-api.eu-north-1.amazonaws.com/default/viaplay-trailers and contains a single endpoint expecting a post requst.

```
POST /viaplay-trailers
Body definition: {"movieResourceLink": "string"}

Example using curl:
curl --data '{"movieResourceLink":"http://content.viaplay.se/pc-se/film/fargo-1996"}' -X POST https://us0grdmio5.execute-api.eu-north-1.amazonaws.com/default/viaplay-trailers

Response:
{"movieTrailerUrl":"https://www.youtube.com/watch?v=h2tY82z3xXU"}
```

## How to run locally
I do not provide a way to spin up a local web server, but the lambda response handler can be called through the command line.
```bash
git clone https://github.com/purmonen/movie-trailer-api
cd movie-trailer-api
npm install
npm run build
node dist/cli.js http://content.viaplay.se/pc-se/film/fargo-1996
```

## Test
Tests are written using Jest.
```bash
npm test
```

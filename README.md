# Viaplay Trailers
This repo consists of a Typescript api for fetching trailer urls using TMDb (themoviedb.org) from Viaplay movie resource links and some glue code to use this as a serverless application on AWS Lambda.

## MovieTrailerApi
Takes a tmdbApiKey as constructor argument and has a single public function trailerForMovieResourceLink(movieResourceLink: string) for retrieving the trailer. This api can easily be used within any kind of application such as an Express app, a command line application or a serverless function.

## AWS Lambda
index.ts contains a handler for a AWS Lambda request that will be invoked when the lambda function is called.

## AWS API Gateway
Rest api with a single post request.

POST /viaplay-trailers
{
    "movieResourceLink": "string"
}

Example using curl:
curl --data '{"movieResourceLink":"http://content.viaplay.se/pc-se/film/fargo-1996"}' -X POST https://us0grdmio5.execute-api.eu-north-1.amazonaws.com/default/viaplay-trailers

Response:
{"movieTrailerUrl":"https://www.youtube.com/watch?v=h2tY82z3xXU"}
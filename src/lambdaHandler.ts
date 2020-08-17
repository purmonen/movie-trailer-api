require('dotenv').config();
import { MovieTrailerApi } from './MovieTrailerApi';
import { ALBEvent, ALBEventRequestContext, ALBCallback } from "aws-lambda"

export async function lambdaHandler(event: ALBEvent, context: ALBEventRequestContext, callback: ALBCallback) {
    try {
        if (!process.env.tmdbApiKey) {
            throw new Error(`Could not read tmdbApiKey from .env file`);
        }
        if (event.body === null) {
            throw new Error("Event body should not be null")
        }
        const movieResourceLink = JSON.parse(event.body).movieResourceLink;
        if (movieResourceLink === undefined) {
            throw new Error("No movie resource link provided");
        }
        const movieTrailerApi = new MovieTrailerApi(process.env.tmdbApiKey);
        const trailer = await movieTrailerApi.trailerForMovieResourceLink(movieResourceLink);
        const response = {
            statusCode: 200,
            body: JSON.stringify({ movieTrailerUrl: trailer })
        };
        callback(null, response);
    } catch (e) {
        const response = {
            statusCode: 400,
            body: JSON.stringify({ error: e.message })
        };
        callback(null, response);
    }   
}

// AWS Lambda handler - will be called from a POST-request
exports.handler = lambdaHandler;

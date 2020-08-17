require('dotenv').config();
import { MovieTrailerApi } from './MovieTrailerApi';

// AWS Lambda handler - will be called from a POST-request
exports.handler = async (event: any, context: any, callback: any) => {
    try {
        const movieResourceLink = JSON.parse(event.body).movieResourceLink;
        if (!process.env.tmdbApiKey) {
            throw new Error(`Could not read tmdbApiKey from .env file`);
        }
        const movieTrailerApi = new MovieTrailerApi(process.env.tmdbApiKey);
        const trailer = await movieTrailerApi.trailerForMovieResourceLink(movieResourceLink);
        const response = {
            statusCode: 200,
            body: JSON.stringify({ movieTrailerUrl: trailer })
        };
        callback(null, response);
    } catch (e) {
        callback(e);
    }   
}

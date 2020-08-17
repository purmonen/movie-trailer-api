import fetch from "node-fetch";

async function defaultFetchJson(url: string): Promise<any> {
    return (await fetch(url)).json();
}

export class MovieTrailerApi {

    // tmdbApiKey is the api key for https://www.themoviedb.org/documentation/api
    constructor(private tmdbApiKey: string, private fetchJson: (url: string) => Promise<any> = defaultFetchJson) {}

    private parseImdbIdFromMovieResourceJson(movieResourceJson: any) {
        try {
            return movieResourceJson._embedded[`viaplay:blocks`][0]._embedded[`viaplay:product`].content.imdb.id;
        } catch (e) {
            throw new Error(`Invalid movie resource json`);
        }
    }

    private async imdbIdFromMovieResourceLink(movieResourceLink: string) {
        const movieResourceJson = await this.fetchJson(movieResourceLink);
        return this.parseImdbIdFromMovieResourceJson(movieResourceJson);
    }

    private youtubeUrlForVideoKey(videoKey: string) {
        return `https://www.youtube.com/watch?v=${videoKey}`;
    }

    private async fetchVideosForImdbId(imdbId: string) {
        return this.fetchJson(`https://api.themoviedb.org/3/movie/${imdbId}/videos?api_key=${this.tmdbApiKey}`)
    }
    
    // Imdb id example: tt0116282
    private async trailerFromImdbId(imdbId: string) {
        const videosJson = await this.fetchVideosForImdbId(imdbId);

        // I am making the assumption that all trailers are on youtube
        const youtubeTrailers = videosJson.results
            .filter((video: any) => video.type === `Trailer` && video.site === `YouTube`)
            .map((video: any) => this.youtubeUrlForVideoKey(video.key));
        if (youtubeTrailers.length === 0) {
            throw new Error(`No trailer found`)
        }

        // I am making the assumption that we only care about the first trailer as there can be multiple ones for example with different resolutions
        return youtubeTrailers[0] as string;
    }

    // Movie resource link example: http://content.viaplay.se/pc-se/film/fargo-1996
    public async trailerForMovieResourceLink(movieResourceLink: string) {
        const imdbId = await this.imdbIdFromMovieResourceLink(movieResourceLink);
        return this.trailerFromImdbId(imdbId);
    }
}
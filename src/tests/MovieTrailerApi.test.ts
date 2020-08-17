import { MovieTrailerApi } from "../MovieTrailerApi";
import { viaplayJson } from "./viaplay-content";
import { themoviedbJson } from "./themoviedb-content";

describe("Dummy test", () => {
    it("expects the obvious", async () => {

        const mockFetchJson = async (url: string) => {
            if (url.includes('api.themoviedb.org')) {
                return themoviedbJson;
            } else if (url.includes('content.viaplay.se')) {
                return viaplayJson;
            }
            throw new Error('Do not have a mock for this url?!')
        };

        const api = new MovieTrailerApi("dummyApiKey", mockFetchJson);
        api.trailerForMovieResourceLink("http://content.viaplay.se/pc-se/film/fargo-1996")
        expect(await api.trailerForMovieResourceLink("http://content.viaplay.se/pc-se/film/fargo-1996")).toBe("https://www.youtube.com/watch?v=h2tY82z3xXU");
    });
});

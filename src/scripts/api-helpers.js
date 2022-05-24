const API_KEY_MOVIEDB = process.env.API_KEY_MOVIEDB;

export const ACTIONS_LIST = {
    SEARCH_FOR_MOVIES: 'SEARCH_FOR_MOVIES',
    SEARCH_FOR_MOVIE_DETAILS: 'SEARCH_FOR_MOVIE_DETAILS',
    SEARCH_FOR_MOVIE_CREDITS: 'SEARCH_FOR_MOVIE_CREDITS',
    SEARCH_TRENDS: 'SEARCH_TRENDS',
    GET_FEATURING_MOVIES: 'GET_FEATURING_MOVIES',
    GET_ARTIST_DATA: 'GET_ARTIST_DATA',
    SEARCH_FOR_ARTIST: 'SEARCH_FOR_ARTIST'
}

export const getImgEndpoint = (img_path) => 'https://image.tmdb.org/t/p/w500' + img_path;

const fetchFunctionGET = async(endpoint) => {
    const response = await fetch(endpoint);
    return await response.json();
}

export const getAPIdata = async(action) => {
    let endpoint
    switch (action.type) {
        case ACTIONS_LIST.SEARCH_FOR_MOVIES:
            endpoint = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY_MOVIEDB}&language=en-US&page=1&include_adult=false&query=${action.searchedMovie}`
            return await fetchFunctionGET(endpoint);
        case ACTIONS_LIST.SEARCH_FOR_MOVIE_DETAILS:
            endpoint = `https://api.themoviedb.org/3/movie/${action.movieId}?api_key=${API_KEY_MOVIEDB}`
            return await fetchFunctionGET(endpoint);
        case ACTIONS_LIST.SEARCH_FOR_MOVIE_CREDITS:
            endpoint = `https://api.themoviedb.org/3/movie/${action.movieId}/credits?api_key=${API_KEY_MOVIEDB}`
            return await fetchFunctionGET(endpoint);
        case ACTIONS_LIST.SEARCH_TRENDS:
            endpoint = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY_MOVIEDB}`
            return await fetchFunctionGET(endpoint);
        case ACTIONS_LIST.GET_FEATURING_MOVIES:
            endpoint = `https://api.themoviedb.org/3/person/${action.artistId}/movie_credits?api_key=${API_KEY_MOVIEDB}&language=en-US`
            return await fetchFunctionGET(endpoint);
        case ACTIONS_LIST.GET_ARTIST_DATA:
            endpoint = `https://api.themoviedb.org/3/person/${action.artistId}?api_key=${API_KEY_MOVIEDB}&language=en-US`
            return await fetchFunctionGET(endpoint);
        case ACTIONS_LIST.SEARCH_FOR_ARTIST:
            endpoint = `https://api.themoviedb.org/3/search/person?api_key=${API_KEY_MOVIEDB}&language=en-US&page=1&include_adult=false&query=${action.searchedArtist}`
            return await fetchFunctionGET(endpoint);
        default:
            throw new Error('Nothing to fetch: no match for action.type');
    }

}
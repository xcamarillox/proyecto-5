const API_KEY_MOVIEDB = process.env.API_KEY_MOVIEDB;

export const ACTIONS_LIST = {
    SEARCH_FOR_MOVIES: 'SEARCH_FOR_MOVIES'
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
        default:
            throw new Error('Nothing to fetch: no match for action.type');
    }

}
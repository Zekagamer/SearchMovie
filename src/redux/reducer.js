const initialState = {
    movies: [],
    favorites: [],
    listID: '',
    title: '',
    listMovies: [],
    listMovieDetails: []
}

function reducer(state = initialState, action) {
    switch(action.type) {
        case 'FIND_MOVIES':
            return {
                ...state,
                movies: action.payload.movies
            }
        case 'ADD_MOVIE_TO_FAVORITES':
            const newState = { ...state };
            const chosenMovie = newState.movies.find((item) => {
                return item.imdbID === action.payload.imdbID;
            });
            if (chosenMovie) {
                newState.favorites = [...newState.favorites, {...chosenMovie}];
            }
            return newState;
        
        case 'REMOVE_MOVIE_FROM_FAVORITES':
            const newStateInFavorites = { ...state };
            const updatedFavorites = newStateInFavorites.favorites.filter((item) => 
                item.imdbID !== action.payload.imdbID
            );
            if (updatedFavorites) {
                newStateInFavorites.favorites = updatedFavorites;
            }
            return newStateInFavorites;
        case 'REGISTER_FAVORITES_ID':
            return {
                ...state,
                listID: action.payload.listID
            }
        case 'GET_LIST_TO_STATE':
            return {
                ...state,
                title: action.payload.title,
                listMovies: action.payload.listMovies
            }
        case 'GET_MOVIE_INFO_TO_STATE':
            return {
                ...state,
                listMovieDetails: action.payload.listMovieDetails,
            }
        default:
            return state;
    }
}

export default reducer;
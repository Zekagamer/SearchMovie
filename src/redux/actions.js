export function findMovies(movies) {
    return {
        type: 'FIND_MOVIES',
        payload: {
            movies: movies
        }
    }
}
export function fetchMovieQuery(searchLine) {
    return function (dispatch) {
        let searchQuery = encodeURIComponent(searchLine);
        fetch(`http://www.omdbapi.com/?s=${searchQuery}&apikey=bfa19603`)
        .then(res => res.json())
        .then(data => {
            dispatch(findMovies(data.Search));
        })
        .catch((error) => {
            alert('Ошибка запроса');
        }); 
    }
}
export function addMovieToFavorites(imdbID) {
    return {
        type: 'ADD_MOVIE_TO_FAVORITES',
        payload: {
            imdbID: imdbID
        }
    }
}
export function removeMovieFromFavorites(imdbID) {
    return {
        type: 'REMOVE_MOVIE_FROM_FAVORITES',
        payload: {
            imdbID: imdbID
        }
    }
}
export function registerFavoritesId(listID) {
    return {
        type: 'REGISTER_FAVORITES_ID',
        payload: {
            listID: listID
        }
    }
}
export function postFavorites(listName, favouritesIDArray) {
    return function (dispatch) {
        let savedList = {
            title: listName,
            movies: favouritesIDArray
        }
        fetch('https://acb-api.algoritmika.org/api/movies/list', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(savedList)
        })
        .then(res => res.json())
        .then(data => {
            dispatch(registerFavoritesId(data.id));
        })
    }
}

export function getListToState(title, movies) {
    return {
        type: 'GET_LIST_TO_STATE',
        payload: {
            title: title,
            listMovies: movies
        }
    }
}
export function getList(id) {
    return function (dispatch) {
        fetch(`https://acb-api.algoritmika.org/api/movies/list/${id}`)
        .then(res => res.json())
        .then(data => {
            dispatch(getListToState(data.title, data.movies));
            dispatch(getMovieInfoByImdbID(data.movies));
        })
    }
}

export function getMovieInfoToState(movieDetailsArray) {
    return {
        type: 'GET_MOVIE_INFO_TO_STATE',
        payload: {
            listMovieDetails: movieDetailsArray,
        }
    }
}
export function getMovieInfoByImdbID(movies) {
    return function (dispatch) {
        let movieDetailsArray = [];
        movies.forEach(element => {
            fetch(`http://www.omdbapi.com/?i=${element}&apikey=bfa19603`)
            .then(res => res.json())
            .then(data => {
                movieDetailsArray = [...movieDetailsArray, {...data}]
                dispatch(getMovieInfoToState(movieDetailsArray));
            })
        })
    }
} 
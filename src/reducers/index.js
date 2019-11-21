import { combineReducers } from "redux";

export const movieReducer = (state = { movie: null }, action) => {
    switch (action.type) {
        case 'MOVIE_FETCH_SUCCEEDED':
            return { ...state, movie: action.movie };
        case 'MOVIE_FETCH_FAILED':
            return { ...state, movie: null };
        default:
            return state;
    }
}

export const moviesReducer = (state = {
    items: [],
    page: 1,
    totalResults: 0,
}, action) => {
    switch (action.type) {
        case 'MOVIES_FETCH_SUCCEEDED':
            if (action.payload.page > 1) {
                return {
                    ...state,
                    ...action.payload,
                    items: [...state.items, ...action.payload.items],
                }
            }
            return { ...state, ...action.payload };
        case 'MOVIES_FETCH_FAILED':
            return { ...state, items: [] };
        default:
            return state;
    }
}

export const favoritesReducer = (state = [], action) => {
    switch (action.type) {
        case 'MOVIE_ADD_FAVORITE':
            if (state.some((movie) => movie.imdbID === action.movie.imdbID)) return state;
            return [...state, action.movie];
        case 'MOVIE_REMOVE_FAVORITE':
            return state.filter((movie) => movie.imdbID !== action.id);
        default:
            return state;
    }
}

export default combineReducers({ movieReducer, moviesReducer, favoritesReducer });

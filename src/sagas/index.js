import { call, put, takeLatest, all } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import Api from '../api';
import {
    MOVIE_FETCH_SUCCEEDED, MOVIE_FETCH_FAILED, MOVIE_FETCH_REQUESTED,
    MOVIES_FETCH_SUCCEEDED, MOVIES_FETCH_FAILED, MOVIES_FETCH_REQUESTED
} from '../constants';

function* fetchMovie(action) {
    try {
        const id = action.payload.id || action.payload.movie.imdbID
        const movie = action.payload.movie || (yield call(Api.fetchMovie, id));

        yield put({ type: MOVIE_FETCH_SUCCEEDED, movie });
        yield put(push(`/movie/${id}`))
    } catch ({ message }) {
        yield put({ type: MOVIE_FETCH_FAILED, message });
    }
}

function* fetchMovies(action) {
    try {
        const { search, page = 1 } = action.payload;
        const { Search: items, totalResults } = yield call(Api.fetchMovies, search, page);

        yield put({ type: MOVIES_FETCH_SUCCEEDED, payload: { items, totalResults, page } });
        yield put(push('/'))
    } catch ({ message }) {
        yield put({ type: MOVIES_FETCH_FAILED, message });
    }
}

function* movieSaga() {
    yield takeLatest(MOVIE_FETCH_REQUESTED, fetchMovie);
}

function* moviesSaga() {
    yield takeLatest(MOVIES_FETCH_REQUESTED, fetchMovies);
}

export default function* rootSaga() {
    yield all([
        movieSaga(),
        moviesSaga(),
    ]);
}

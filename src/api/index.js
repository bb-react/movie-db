const apiURL = '//www.omdbapi.com/?apikey=cb5da875';

export default {
    fetchMovie: async (id) => {
        const response = await fetch(`${apiURL}&i=${id}`);
        const movie = await response.json();

        return movie;
    },
    fetchMovies: async (search, page) => {
        const response = await fetch(`${apiURL}&s=${search}&page=${page}`);
        const movie = await response.json();

        return movie;
    },
}

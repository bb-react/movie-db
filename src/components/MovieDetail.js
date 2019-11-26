import React, { useEffect } from 'react';
import { useDispatch, shallowEqual, useSelector } from 'react-redux';
import { Card, CardContent, CardMedia, IconButton, Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { StarBorder as InactiveStarIcon, Star as ActiveStarIcon} from '@material-ui/icons';
import { MOVIE_FETCH_REQUESTED, MOVIE_ADD_FAVORITE, MOVIE_REMOVE_FAVORITE } from '../constants';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'block',
        [theme.breakpoints.up('sm')]: {
            display: 'flex',
        },
    },
    image: {
        width: 'initial',
        flexGrow: 1,
    },
    content: {
        flexGrow: 1,
    },
    box: {
        display: 'block',
    }
}));

export default (props) => {
    const dispatch = useDispatch();
    const classes = useStyles();

    
    const movie = useSelector((state) => state.movieReducer.movie, shallowEqual);
    const favorites = useSelector((state) => state.favoritesReducer, shallowEqual);
    
    const { id } = props.match.params;
    const isFavoriteMovie = favorites.some((movieItem) => movieItem.imdbID === movie.imdbID);
    
    const handleFavorite = (item) => {
        if (isFavoriteMovie) dispatch({ type: MOVIE_REMOVE_FAVORITE, id: item.imdbID });
        else dispatch({ type: MOVIE_ADD_FAVORITE, movie: item });
    }

    useEffect(() => {
        const loadMovie = (id) => dispatch({ type: MOVIE_FETCH_REQUESTED, payload: { id } });
        !movie && loadMovie(id)
    }, [dispatch, id, movie])

    return movie && (
        <Card>
            <Box className={classes.root}>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    image={movie.Poster}
                    title="Contemplative Reptile"
                    className={classes.image}
                />
                <CardContent className={classes.content}>
                    <Typography gutterBottom variant="h5" component="h2">
                        <IconButton
                            edge="start"
                            color="secondary"
                            aria-label="open drawer"
                            onClick={() => handleFavorite(movie)}
                        >
                            {isFavoriteMovie ? <ActiveStarIcon /> : <InactiveStarIcon />}
                        </IconButton>
                        {movie.Title}
                    </Typography>
                    <Typography>
                        {movie.Actors}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {movie.Plot}
                    </Typography>
                </CardContent>
            </Box>
        </Card>
    )
}

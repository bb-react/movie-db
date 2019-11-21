import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { CardActionArea, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { MOVIE_FETCH_REQUESTED, MOVIES_FETCH_REQUESTED } from '../constants';

const useStyles = makeStyles(theme => ({
    card: {
        display: 'flex',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 151,
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    playIcon: {
        height: 38,
        width: 38,
    },
}));

export default (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const isFavoritesPage = props.match.path === '/favorites';

    const loadMovie = (id) => dispatch({ type: MOVIE_FETCH_REQUESTED, payload: { id } });
    const setMovie = (movie) => dispatch({ type: MOVIE_FETCH_REQUESTED, payload: { movie } });

    const handleScroll = (e) => {
        if (props.items && props.items.length >= props.totalResults || window.innerHeight + document.documentElement.scrollTop < document.documentElement.offsetHeight) return;

        dispatch({ type: MOVIES_FETCH_REQUESTED, payload: { search: props.search, page: props.page + 1 } })
    }

    !isFavoritesPage && useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        !props.items ? <></> :props.items.map((movie) => (
            <CardActionArea key={movie.imdbID} onClick={() => isFavoritesPage ? setMovie(movie) : loadMovie(movie.imdbID)}>
                <Card className={classes.card}>
                    <CardMedia
                        className={classes.cover}
                        image={movie.Poster}
                        title={movie.Title}
                    />
                    <CardContent className={classes.content}>
                        <Typography component="h3" variant="h5">
                            {movie.Title}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            {movie.Type}
                        </Typography>
                        <Typography>
                            {movie.Year}
                        </Typography>
                    </CardContent>
                </Card>
                <Divider />
            </CardActionArea>
        ))
    )
}

import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import StarIcon from '@material-ui/icons/Star';
import { Route, Link } from "react-router-dom";
import MovieDetail from './components/MovieDetail';
import MovieList from './components/MovieList';
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { MOVIES_FETCH_REQUESTED } from './constants';
import { Badge } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(6),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    starIcon: {
        color: theme.palette.primary.contrastText,
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    },
}));

export default () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');

    const movies = useSelector((state) => state.moviesReducer, shallowEqual);
    const favorites = useSelector((state) => state.favoritesReducer, shallowEqual) || [];

    const loadMovies = (search) => dispatch({ type: MOVIES_FETCH_REQUESTED, payload: { search } });

    return (
        <div className={classes.root}>
            <AppBar position="sticky">
                <Toolbar>
                    <Link to={'/favorites'}>
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="open drawer"
                        >
                            <Badge
                                color="secondary"
                                badgeContent={favorites.length}
                                anchorOrigin={{
                                    horizontal: 'right',
                                    vertical: 'bottom',
                                }}
                                className={classes.margin}
                            >
                                <StarIcon className={classes.starIcon} />
                            </Badge>
                        </IconButton>
                    </Link>
                    <Typography className={classes.title} variant="h6" noWrap>
                        Movie database
                        </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search movies…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            onKeyDown={(e) => {
                                if (e.keyCode === 13) {
                                    setSearch(e.target.value);
                                    loadMovies(e.target.value);
                                }
                            }}
                        />
                    </div>
                </Toolbar>
            </AppBar>
            <Route path="/" exact component={(props) => <MovieList {...props} search={search} {...movies} />} />
            <Route path="/movie/:id" exact component={MovieDetail} />
            <Route path="/favorites" exact component={(props) => <MovieList {...props} items={favorites} search={''} />} />
        </div>
    );
}

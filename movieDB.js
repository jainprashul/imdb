/**
 * MovieDB router
 */
const router = require('express').Router();
const Movie = require('./db/models/Movies');

// Fetch a list of movies (id, name, genre)
// Fetch details of specific movie by id (id, name, details, genre, release date, reviews)
// Search movies (Should filter by genre, sort by release date)
// Upvote / downvote a movie
// Fetch top 10 movies based on upvotes

router.post('/add', (req, res) => {

    const movie = new Movie({
        ...req.body,
        id: req.body.id || parseInt(Date.now() * Math.random()),
        date: new Date(req.body.date) || new Date(),
        votes: req.body.votes || 0
    });

    movie.save().then(() => {
        res.status(201).send(movie);
    }).catch((e) => {
        res.status(400).send(e);
    });
});

router.get('/', (req, res) => {
    // send movie list
    
});

router.get('/:id', (req, res) => {
    // send movie details

});

router.get('/search', (req, res) => {
    // send movie list
});

router.get('/:id/upvote', (req, res) => {
    // upvote movie
});

router.get('/:id/downvote', (req, res) => {
    // downvote movie
});

router.get('/top', (req, res) => {
    // send top 10 movies
});



module.exports = router;
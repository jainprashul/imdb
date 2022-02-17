/**
 * MovieDB router
 */
const router = require('express').Router();

// Fetch a list of movies (id, name, genre)
// Fetch details of specific movie by id (id, name, details, genre, release date, reviews)
// Search movies (Should filter by genre, sort by release date)
// Upvote / downvote a movie
// Fetch top 10 movies based on upvotes

router.get('/', (req, res) => {
    // send movie list
    res.json([
        {
            id: 1,
            name: 'The Shawshank Redemption',
            genre: 'Drama',
            releaseDate: '14 October 1994',
            votes: 0
        },
        {
            id: 2,
            name: 'The Godfather',
            genre: 'Crime',
            releaseDate: '24 March 1972',
            votes: 0
        },
    ])
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
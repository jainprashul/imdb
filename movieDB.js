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

    Movie.findOne({
        id: req.body.id
    }).then((result)=> {
        if(result) {
          return  res.status(400).send('Movie ID already exists');
        } 

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

    }).catch(err => {
        console.log(err);
    });
    
});

router.get('/', (req, res) => {
    // send movie list
    Movie.find({}).then((movies) => {
        // throw new Error('Error');
        res.send(movies);
    }).catch((e) => {
        res.status(500).send(e);
    });
});

router.get('/:id', (req, res) => {
    // send movie details
    const id = req.params.id;
    Movie.find({
        id : id
    }).then((movies) => {
        // throw new Error('Error');
        res.send(movies);
    }).catch((e) => {
        res.status(500).send(e);
    });

});

router.get('/search', (req, res) => {
    // send movie list
        // send movie details
        Movie.find({
            name : {
                $regex: req.query.q,
                $options: 'i'
            }
        }).then((movies) => {
            // throw new Error('Error');
            res.send(movies);
        }).catch((e) => {
            res.status(500).send(e);
        });
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
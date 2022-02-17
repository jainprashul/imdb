/**
 * MovieDB router
 */
const router = require('express').Router();
const Movies = require('./db/models/Movies');
const Movie = require('./db/models/Movies');

// Fetch a list of movies (id, name, genre) -- done
// Fetch details of specific movie by id (id, name, details, genre, release date, reviews) --done
// Search movies (Should filter by genre, sort by release date) --done
// Upvote / downvote a movie --done
// Fetch top 10 movies based on upvotes -- done 

router.post('/add', (req, res) => {

    Movie.findOne({
        id: req.body.id,
        name: req.body.name
    }).then((result) => {
        if (result) {
            return res.status(400).send('Movie ID already exists');
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

router.post('/bulkAdd', (req, res) => {
    const movies = req.body;
    const moviesToAdd = [];
    movies.forEach(movie => {
        moviesToAdd.push({
            ...movie,
            id: movie.id || parseInt(Date.now() * Math.random()),
            date: new Date(movie.date) || new Date(),
            votes: movie.votes || 0
        });
    });

    Movie.insertMany(moviesToAdd).then(() => {
        res.status(201).send(movies);
    }).catch(err => {
        res.status(400).send(err);
    });
});

router.get('/', (req, res) => {
    let maxLimit = req.query.limit || 10;
    let skip = req.query.skip || 0;
    // send movie list
    Movie.find({}).skip(skip).limit(maxLimit).then((result) => {
        res.send(result);
    }).catch((e) => {
        res.status(400).send(e);
    });
});


router.get('/search', (req, res) => {

    let sortBy = req.query.sortBy || 'releaseDate';
    let genreQ = req.query.genre
    let query = req.query.q;

    console.log(req.query);
    // send movie list
    // send movie details
    Movie.find({
        name: {
            $regex: query,
            $options: 'i'
        },
        genre: {
            $regex: genreQ,
            $options: 'i'
        }
    }).sort({
        [sortBy]: -1
    })
    .then((movies) => {
        // throw new Error('Error');
        res.send(movies);
    }).catch((e) => {
        res.status(500).send({
            error: "Please send a valid query"
        });
    });
});

router.get('/top', (req, res) => {
    // send top 10 movies
    let limitMax = req.query.limit || 10;
    Movie.find({}).sort({
        votes: -1
    }).limit(limitMax).then((movies) => {
        res.send(movies);
    }).catch((e) => {
        res.status(500).send(e);
    });
});


router.get('/:id', (req, res) => {
    // send movie details
    const id = req.params.id;

    if (isNaN(id)) {
        return res.status(400).send('Invalid ID');
    }

    Movie.find({
        id: id
    }).then((movies) => {
        // throw new Error('Error');
        res.send(movies);
    }).catch((e) => {
        res.status(500).send(e);
    });

});

router.get('/:id/upvote', (req, res) => {
    // upvote movie
    const id = req.params.id;
    if (isNaN(id)) {
        return res.status(400).send('Invalid ID');
    }
    searchAndUpvote(id , 1).then((movie) => {
        res.send(movie);
    }).catch((e) => {
        res.status(500).send(e);
    });
});

router.get('/:id/downvote', (req, res) => {
    // downvote movie
    const id = req.params.id;
    if (isNaN(id)) {
        return res.status(400).send('Invalid ID');
    }
    searchAndUpvote(id , -1).then((movie) => {
        res.send(movie);
    }).catch((e) => {
        res.status(500).send(e);
    });
});


function searchAndUpvote( id, voteInc=1) {
    return Movies.findOneAndUpdate({
        id: id
    }, {
        $inc: {
            votes: voteInc
        }
    }, {
        new: true
    });
}


module.exports = router;
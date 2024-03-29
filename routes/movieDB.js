/**
 * MovieDB router
 */
const router = require('express').Router();
const Movies = require('../db/models/Movies');
const Movie = require('../db/models/Movies');

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
        res.status(201).send(moviesToAdd);
    }).catch(err => {
        res.status(400).send(err);
    });
});

router.get('/search', (req, res) => {

    let sortBy = req.query.sortBy || 'releaseDate';
    let genreQ = req.query.genre || '';
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
    .then(async (movies) => {
        // throw new Error('Error');
        res.json({
            query,
            total: movies.length,
            result: movies
        });
    }).catch((e) => {
        res.status(500).send({
            error: "Please send a valid query"
        });
    });
});

router.get('/', (req, res) => {
    let maxLimit = Number(req.query.limit) || 10;
    let page = Number(req.query.page) || 1;
    let skip = (page - 1) * maxLimit;
    const query = Movies.find({});
    const count = Movies.countDocuments().exec();
    
    // send movie list
    query.sort({
        id : 1
    }).skip(skip).limit(maxLimit).then(async (result) => {
        res.status(200).json({
            total: await count,
            limit: maxLimit,
            totalPages: Math.ceil(await count / maxLimit),
            page: page,
            pageSize : result.length,
            result,
        });
    }).catch((e) => {
        res.status(400).send(e);
    });
});

router.get('/top', (req, res) => {
    // send top 10 movies by votes
    let limitMax = Number(req.query.limit) || 10;
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

    Movie.findOne({
        id: id
    }).then((movies) => {
        if (!movies) {
            return res.status(404).send('Movie not found');
        }
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
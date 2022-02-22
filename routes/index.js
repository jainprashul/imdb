const router = require('express').Router();
const { default: axios } = require('axios');
const Marks = require('../db/models/Marks');


router.get('/', (req, res) => {
    axios.get(`http://${req.headers.host}/api/movies/top`).then(response => {
        res.render('index', {
            movies: response.data
        });
    }).catch(err => {
        res.status(500).send(err);
    });
});

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/movies', (req, res) => {
    let maxLimit = Number(req.query.limit) || 10;
    let page = Number(req.query.page) || 1;

    axios.get(`http://${req.headers.host}/api/movies?limit=${maxLimit}&page=${page}`).then(response => {
        res.render('movies', {
            ...response.data,
            movies: response.data.result
        });
    }).catch(err => {
        res.status(500).send(err);
    });
});

router.get('/search', (req, res) => {
    let search = req.query.q.trim();
    let sortBy = req.query.sortBy || 'releaseDate';
    let genreQ = req.query.genre || '';

    axios.get(`http://${req.headers.host}/api/movies/search?q=${search}&sortBy=${sortBy}&genre=${genreQ}`).then(response => {
        res.render('search', {
            ...response.data,
            movies: response.data.result
        });
    }).catch(err => {
        res.status(500).send(err);
    });
});

router.get('/movies/:id', (req, res) => {
    axios.get(`http://${req.headers.host}/api/movies/${req.params.id}`).then(response => {
        res.render('movie', {
            movie: response.data[0]
        });
    }).catch(err => {
        res.status(500).send(err);
    });
});

// router.get('/marks', (req, res) => {
//     Marks.distinct('marks').then(async marks => {
//        const a =  marks.map(mark => Marks.find({ marks: mark }).countDocuments().then(count => {
//                 return {
//                     mark,
//                     count
//                 };
//             }));

//         res.json(await Promise.all(a));
//     }).catch(err => {
//         res.status(500).send(err);
//     });

// });

// router.post('/marks', (req, res) => {
//     let list = req.body;
//     let marks = [];
//     list.forEach(movie => {
//         marks.push({
//            ...movie,
//         });
//     });
//     Marks.insertMany(req.body).then(() => {
//         res.status(201).send(req.body);
//     }).catch(err => {
//         res.status(400).send(err);
//     });

// });

module.exports = router;
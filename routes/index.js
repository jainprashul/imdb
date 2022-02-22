const router = require('express').Router();
const { default: axios } = require('axios');



router.get('/', (req, res) => {
    axios.get(`http://${req.headers.host}/api/movies/top`).then(response => {
        res.render('index', {
            movies: response.data
        });
    }).catch(err => {
        res.status(500).render('404');
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
        res.status(500).render('404');
    });
});

router.get('/search', (req, res) => {
    let search = req.query.q?.trim();
    let sortBy = req.query.sortBy || 'releaseDate';
    let genreQ = req.query.genre || '';

    axios.get(`http://${req.headers.host}/api/movies/search?q=${search}&sortBy=${sortBy}&genre=${genreQ}`).then(response => {
        res.render('search', {
            ...response.data,
            movies: response.data.result
        });
    }).catch(err => {
        res.status(500).render('404');
    });
});

router.get('/movies/:id', (req, res) => {
    axios.get(`http://${req.headers.host}/api/movies/${req.params.id}`).then(response => {
        res.render('movie', {
            movie: response.data
        });
    }).catch(err => {
        res.status(500).render('404');
    });
});

router.get('/add', (req, res) => {
    res.render('add');
});

router.post('/movies', (req, res) => {
    axios.post(`http://${req.headers.host}/api/movies/add`, req.body).then(response => {
        console.log(response.data);
        res.redirect(`/movies/${response.data.id}`);
    }).catch(err => {
        res.status(500).render('404');
    });
});

router.get('*', (req, res) => {
    res.render('404');
});

module.exports = router;  


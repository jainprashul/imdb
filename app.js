const express = require('express');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

require('./db/mongoose');
// const db = require('./db');
const movieRouter = require('./routes/movieDB');
const router = require('./routes/');

const app = express();

app.set('view engine', 'pug');

// parse application/json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api/movies', movieRouter);

app.use('/', router); 
app.listen(port, () => {
    console.log('Server started on port ', port);
});

module.exports = app;




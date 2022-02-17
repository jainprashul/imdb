const express = require('express');
const bodyParser = require('body-parser');

require('./db/mongoose');
// const db = require('./db');
const movieRouter = require('./movieDB');

const app = express();

// parse application/json
app.use(bodyParser.json())


app.get('/', (req, res) => {
    const name = req.query.name;
    res.send('<h1>Hello ' + name + '</h1>');
});

app.use('/api/movies', movieRouter);

app.listen(3000, () => {
    console.log('Server started on port 3000');
});




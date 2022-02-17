const express = require('express');

require('./mongoose');
// const db = require('./db');
const movieRouter = require('./movieDB');

const app = express();


app.get('/', (req, res) => {
    const name = req.query.name;
    res.send('<h1>Hello ' + name + '</h1>');
});

app.use('/movies', movieRouter);


app.get('/users', (req, res) => {
    res.json([
        {
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
        }
    ]);
});


app.listen(3000, () => {
    console.log('Server started on port 3000');
});



const express = require('express');
// const db = require('./db');

const app = express();


app.get('/', (req, res) => {
    const name = req.query.name;
    res.send('<h1>Hello ' + name + '</h1>');
});

app.get('/',(req,res) => { 

})


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




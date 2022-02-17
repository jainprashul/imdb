const mongoose = require('mongoose');

let dbURL = `mongodb+srv://test:test1234@cluster0.kpceb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(dbURL, {
    useNewUrlParser: true,
}).then(() => {
    console.log('Connected to database');
}).catch(err => {
    console.log('Could not connect to database');
    console.log(err);
});
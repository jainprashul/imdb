const Schema = require('mongoose').Schema;

// {
//     id: 1,
//     name: 'The Shawshank Redemption',
//     genre: 'Drama',
//     releaseDate: '14 October 1994',
//     votes: 0

const Movie = new Schema({  
    id: Number,
    name: String,
    genre: String,
    releaseDate: Date,
    votes: Number
})





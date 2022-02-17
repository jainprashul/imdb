const { Schema, model} = require('mongoose')

const Movie = new Schema({  
    id: {
        type: Number,
    },
    name : {
        type: String,
        required: true
    },
    genre : {
        type: String,
        required: true
    },
    releaseDate : {
        type: Date,
        default : new Date(),
    },
    votes: {
        type: Number,
        default: 0
    }
});

module.exports = model('Movie', Movie);




const { Schema, model} = require('mongoose')

const Movie = new Schema({  
    id: {
        type: Number,
        unique: true, 
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
    description : {
        type: String,
    },
    votes: {
        type: Number,
        default: 0
    }
});

module.exports = model('Movie', Movie);




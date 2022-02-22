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
    },
    imgUrl: {
        type: String,
        default: 'https://via.placeholder.com/150'
    },
});

module.exports = model('Movie', Movie);




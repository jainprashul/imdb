const { Schema, model } = require('mongoose');

const Marks = new Schema({
    _id: {
        type: Number,
        required: true,
        unique: true,
    },
    marks : {
        type: Number,
        required: true
    },
});


module.exports = model('Marks', Marks);


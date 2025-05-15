const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    userRating: {
        type: Number,
        required: true
    },
    reviews: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    genre: {
        type: String,
        required: true
    }
})

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
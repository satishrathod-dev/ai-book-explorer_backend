const router = require('express').Router();
const Book = require('../models/book.model');
const mongoose = require('mongoose');


// Create a new book
router.post('/createBook', async (req, res) => {
    const {name, author, userRating, reviews, price, year, genre} = req.body;

    const newBook = new Book({
        name,
        author,
        userRating,
        reviews,
        price,
        year,
        genre
    });

    const exists = await Book.findOne({ name: name, author: author });

    if(exists) {
        return res.status(400).json({ message: "Book already exists" });
    }

    try {
        const savedBook = await newBook.save();
        res.status(201).json(savedBook);
    } catch (err) {
        res.status(500).json(err);
    }


})

router.get('/getBooks', async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;



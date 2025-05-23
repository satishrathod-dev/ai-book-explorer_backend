const router = require('express').Router();
const Book = require('../models/book.model');
const mongoose = require('mongoose');
const axios = require('axios');


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

router.post('/chat', async (req, res) => {
    const { prompt } = req.body;
  
    const systemPrompt = `
  You are a helpful book recommendation AI. 
  Respond ONLY in this JSON format:
  {
    "books": [
      {
        "title": "string",
        "author": "string",
        "description": "string"
      },
      ...
    ]
  }
  Only include book recommendations that match the user query. No extra explanation. No markdown.
    `;
  
    try {
      const response = await axios.post(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          model: 'llama-3.3-70b-versatile', // use any Groq model you want
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: prompt }
          ],
          temperature: 0.7,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
          },
        }
      );
      console.log("response from groq", response.data.choices);
  
      const replyText = response.data.choices[0].message.content;
  
      try {
        const parsed = JSON.parse(replyText);
        res.json(parsed);
      } catch (err) {
        console.error("Failed to parse LLM response as JSON");
        res.status(200).json({ raw: replyText });
      }
  
    } catch (error) {
      console.error('Error from Groq:', error.response?.data || error.message);
      res.status(500).json({ error: 'Failed to fetch response from Groq' });
    }
  });
  

module.exports = router;



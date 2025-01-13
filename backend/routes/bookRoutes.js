// backend/routes/bookRoutes.js
const express = require('express');
const Book = require('../models/book');
const router = express.Router();

// Add a new book
router.post('/add', async (req, res) => {
  const { isbn, title, author, quantity } = req.body;
  try {
    const newBook = new Book({ isbn, title, author, quantity });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all books
router.get('/', async (req, res) => {
  try {
    // const books = await Book.find();
    res.send("hello");
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Borrow a book
router.post('/borrow', async (req, res) => {
  const { bookId } = req.body;
  try {
    const book = await Book.findById(bookId);
    if (book && book.borrowed < book.quantity) {
      book.borrowed++;
      await book.save();
      res.json({ message: `"${book.title}" borrowed successfully!` });
    } else {
      res.status(400).json({ message: 'Book not available' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Return a book
router.post('/return', async (req, res) => {
  const { bookId } = req.body;
  try {
    const book = await Book.findById(bookId);
    if (book && book.borrowed > 0) {
      book.borrowed--;
      await book.save();
      res.json({ message: `"${book.title}" returned successfully!` });
    } else {
      res.status(400).json({ message: 'This book was not borrowed or not available.' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;

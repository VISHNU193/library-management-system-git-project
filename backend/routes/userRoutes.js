// backend/routes/userRoutes.js
const express = require('express');
const User = require('../models/user');
const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  const { userId, name, email } = req.body;
  try {
    const newUser = new User({ userId, name, email });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Borrow a book
router.post('/borrow/:userId', async (req, res) => {
  const { userId } = req.params;
  const { bookId } = req.body;
  try {
    const user = await User.findById(userId);
    const book = await Book.findById(bookId);
    if (user && book) {
      user.borrowedBooks.push({ bookId: book._id });
      await user.save();
      res.json({ message: `"${book.title}" borrowed by ${user.name}` });
    } else {
      res.status(404).json({ message: 'User or Book not found' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;

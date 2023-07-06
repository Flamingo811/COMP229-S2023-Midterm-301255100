// modules required for routing
const express = require('express');
const router = express.Router();

// define the book model
const Book = require('../models/book');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('content/index', {
    title: 'Home',
    books: '',
  });
});

// GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {
  res.render('books/details', {
    title: 'Add Book',
    book: {},
  });
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {
  const newBook = new Book({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    author: req.body.author,
    genre: req.body.genre,
  });

  newBook.save((err) => {
    if (err) {
      console.error(err);
      res.end(err);
    } else {
      res.redirect('/books');
    }
  });
});

// GET the Book Details page to view a specific Book
router.get('/:id', (req, res, next) => {
  const id = req.params.id;

  Book.findById(id, (err, book) => {
    if (err) {
      console.error(err);
      res.end(err);
    } else {
      res.render('books/details', {
        title: 'Book Details',
        book: book,
      });
    }
  });
});

// POST process the Book Details page to update a specific Book
router.post('/:id', (req, res, next) => {
  const id = req.params.id;

  Book.findByIdAndUpdate(
    id,
    {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      author: req.body.author,
      genre: req.body.genre,
    },
    (err) => {
      if (err) {
        console.error(err);
        res.end(err);
      } else {
        res.redirect('/books');
      }
    }
  );
});

// POST process the Book Details page to delete a specific Book
router.post('/:id/delete', (req, res, next) => {
  const id = req.params.id;

  Book.findByIdAndRemove(id, (err) => {
    if (err) {
      console.error(err);
      res.end(err);
    } else {
      res.redirect('/books');
    }
  });
});

module.exports = router;

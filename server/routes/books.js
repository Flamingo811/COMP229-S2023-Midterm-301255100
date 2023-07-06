// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let Book = require('../models/book');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  Book.find((err, books) => {
    if (err) {
      return console.error(err);
    } else {
      res.render('books/index', {
        title: 'Books',
        books: books,
      });
    }
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
  let newBook = new Book({
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
  });

  Book.create(newBook, (err, book) => {
    if (err) {
      console.error(err);
      res.end(err);
    } else {
      res.redirect('/books');
    }
  });
});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {
  let id = req.params.id;

  Book.findById(id, (err, book) => {
    if (err) {
      console.error(err);
      res.end(err);
    } else {
      res.render('books/details', {
        title: 'Edit Book',
        book: book,
      });
    }
  });
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {
  let id = req.params.id;

  let updatedBook = new Book({
    _id: id,
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
  });

  Book.updateOne({ _id: id }, updatedBook, (err) => {
    if (err) {
      console.error(err);
      res.end(err);
    } else {
      res.redirect('/books');
    }
  });
});

// GET - process the delete by book id
router.get('/delete/:id', (req, res, next) => {
  let id = req.params.id;

  Book.deleteOne({ _id: id }, (err) => {
    if (err) {
      console.error(err);
      res.end(err);
    } else {
      res.redirect('/books');
    }
  });
});

module.exports = router;

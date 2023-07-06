// modules required for routing
let express = require('express');
let router = express.Router();
const mongoose = require('mongoose');
// import mongoose and connect to the database
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mylibrary', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));


// define the game model
let book = require('../models/books');

/* GET home page. wildcard */
router.get('/', (req, res, next) => {
  res.render('content/index', {
    title: 'Home',
    books: ''
   });
});

module.exports = router;

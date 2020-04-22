var express = require('express');
var shortid = require('shortid');

var router = express.Router();

var db = require('../db.js');

router.get("/", (req, res) => {
  res.render('books/index', {
    books: db.get('books').value()
  });
});

router.post('/create', (req, res) => {
  var book = req.body;
  book.id = shortid.generate();
  db.get('books').push(book).write();
  res.redirect('/books');
})

router.get('/:id/title', (req, res) => {
  var id = req.params;
  var book = db.get('books').find(id).value();
  res.render('books/modify', {book: book});
});

router.post('/:id/title', (req, res) => {
  var id = req.params;
  var book = db.get('books').find(id).value();
  book.title = req.body.title;
  db.get('books').find({id: id}).assign(book).write();
  res.redirect('/books');
});

router.get('/:id/delete', (req, res) => {
  var id = req.params;
  db.get('books').remove(id).write();
  res.redirect('/books');
})

module.exports = router;
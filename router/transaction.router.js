var express = require('express');
var shortid = require('shortid');

var router = express.Router();

var db = require('../db');

router.get('/', function(req, res) {
  var listTrans = db.get('transaction').value().map(function(tr) {
    return {
      id: tr.id,
      bookId: tr.bookId,
      userId: tr.userId,
      book: db.get('books').find({id: tr.bookId}).value(),
      user: db.get('users').find({id: tr.userId}).value()
    }
  });
  console.log(listTrans);
  res.render('transaction/index', {
    transactions: listTrans
  })
})

router.get('/create', function(req, res) {
  var books = db.get('books').value();
  var users = db.get('users').value();
  res.render('transaction/create', {
    users: users,
    books: books
  });
})

router.post('/create', function(req, res) {
  var trans = req.body;
  trans.id = shortid.generate();
  db.get('transaction').push(trans).write();
  res.redirect('/transaction');
})

module.exports = router;
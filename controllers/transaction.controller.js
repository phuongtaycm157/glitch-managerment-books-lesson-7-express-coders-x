var shortid = require('shortid');
var db = require('../db');

var controllers = {};

controllers.index = function(req, res) {
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
  // res.json(listTrans);
  res.render('transaction/index', {
    transactions: listTrans
  })
}

controllers.create = function(req, res) {
    var books = db.get('books').value();
    var users = db.get('users').value();
    res.render('transaction/create', {
      users: users,
      books: books
    });
}

controllers.postCreate = function(req, res) {
    var trans = req.body;
    trans.id = shortid.generate();
    db.get('transaction').push(trans).write();
    res.redirect('/transaction');
}

module.exports = controllers;
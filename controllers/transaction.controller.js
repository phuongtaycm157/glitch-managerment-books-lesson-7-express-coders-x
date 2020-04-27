var shortid = require('shortid');
var db = require('../db');

var controllers = {};

controllers.index = function(req, res) {
  var listTrans = db.get('transaction').value().map(function(tr) {
    return {
      id: tr.id,
      level: 'root',
      isComplete: tr.isComplete,
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
    users = users.filter(x => {
      return x.level !== 'root';
    });
    res.render('transaction/create', {
      users: users,
      books: books
    });
}

controllers.postCreate = function(req, res) {
    var trans = req.body;
    trans.id = shortid.generate();
    trans.isComplete = false;
    db.get('transaction').push(trans).write();
    res.redirect('/transaction');
}

controllers.complete = function(req, res) {
  var id = req.params;
  var transaction = db.get('transaction').find(id).value();
  if (transaction) {
    transaction.isComplete = true;
    db.get('transaction')
      .find(id)
      .assign(transaction)
      .write();
    res.redirect('/transaction')
  }else {
    res.redirect('/transaction')
  }
}

controllers.user = function(req, res) {
  var user = db.get('users').find({id: req.cookies.userId}).value();
  if (user.level === 'root') {
    controllers.index(req, res);
  }
  var listUserTrans = db.get('transaction').value().filter(x => {
    return x.userId == req.cookies.userId;
  }).map(x => {
    return {
      id: x.id,
      isComplete: x.isComplete,
      book: db.get('books').find({id: x.bookId}).value(),
      user: db.get('users').find({id: x.userId}).value()
    }
  });
  res.render('transaction/index', {
    transactions: listUserTrans
  })
}

module.exports = controllers;
var shortid = require('shortid');
// var db = require('../db');
var Transaction = require('../models/transaction.model')
var Book = require('../models/books.model')
var User = require('../models/users.model')

var controllers = {};


controllers.index = async function(req, res) {
  var listTrans = await Transaction.find()
  var books = await Book.find()
  var users = await User.find()
  console.log(listTrans, books, users)
  var list = listTrans.map(function(x) {
    let result = {
      id: x.id,
      level: 'root',
      isComplete: x.isComplete,
      book: books.find(y => y._id.toString() == x.bookId),
      user: users.find(y => y._id.toString() == x.userId),
      numberBook: x.numberBook
    }
    return result
  });
  console.log(list);
  res.render('transaction/index', {
    transactions: list
  })
}

controllers.create = async function(req, res) {
    var books = await Book.find();
    var users = await User.find();
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
    // trans.id = shortid.generate();
    trans.isComplete = false;
    Transaction.create(trans, function(err, book){
      if (err) return console.log(err);
    })
    res.redirect('/transaction');
}

controllers.complete = async function(req, res) {
  var id = req.params.id;
  var transaction = await Transaction.findOne({_id: id});
  if (transaction) {
    await Transaction.updateOne({_id: id}, {isComplete: true})
    res.redirect('/transaction')
  }else {
    res.redirect('/transaction')
  }
}

controllers.user = async function(req, res) {
  var id = req.signedCookies.userId
  // var user = db.get('users').find({id: req.signedCookies.userId}).value();
  var user = await User.findOne({_id: id})
  if (user.level === 'root') {
    controllers.index(req, res);
  }
  var listUserTrans = await Transaction.find().filter(x => {
    return x.userId == req.signedCookies.userId;
  }).map(async function(x){
    return {
      id: x.id,
      isComplete: x.isComplete,
      book: await Book.findOne({_id: x.bookId}),
      user: await User.findOne({_id: x.userId}),
      numberBook: x.numberBook
    }
  });
  res.render('transaction/index', {
    transactions: listUserTrans
  })
}

module.exports = controllers;
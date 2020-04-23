var shortid = require('shortid');
var db = require('../db.js');

var controllers = {};

controllers.index = (req, res) => {
    res.render('books/index', {
        books: db.get('books').value()
    });
};

controllers.postCreate = (req, res) => {
    var book = req.body;
    book.id = shortid.generate();
    db.get('books').push(book).write();
    res.redirect('/books');
}

controllers.title = (req, res) => {
    var id = req.params;
    var book = db.get('books').find(id).value();
    res.render('books/modify', {book: book});
}

controllers.postTitle = (req, res) => {
    var id = req.params;
    var book = db.get('books').find(id).value();
    book.title = req.body.title;
    db.get('books').find({id: id}).assign(book).write();
    res.redirect('/books');
}

controllers.delete = (req, res) => {
    var id = req.params;
    db.get('books').remove(id).write();
    res.redirect('/books');
}

module.exports = controllers;
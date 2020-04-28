var shortid = require('shortid');
var db = require('../db.js');

var controllers = {};

controllers.index = (req, res) => {
    var page = req.query.page || 1;
    var numberItemInAPage = 7;
    var start = (page - 1) * numberItemInAPage;
    var end = numberItemInAPage * page;
     
    var books = db.get('books').value();
    var sendBooks = books.slice(start, end);
    var endPage = Math.ceil(books.length/numberItemInAPage);
    res.render('books/index', {
        books: sendBooks,
        page: page,
        endPage: endPage,
        numberItem: res.locals.numberItem || 0
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
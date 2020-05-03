var shortid = require('shortid');
var Book = require('../models/books.model')

var controllers = {};

controllers.index = async function(req, res) {
    var page = req.query.page || 1;
    var numberItemInAPage = 7;
    var start = (page - 1) * numberItemInAPage;
    var end = numberItemInAPage * page;
     
    var books = await Book.find();
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
    book.cover = 'https://cdn.glitch.com/368de421-7fd9-4602-849e-b8752f5af992%2Fcoverbook.jpg?v=1588096771010';
    Book.create(book, function(err, book){
      if (err) return console.log(err);
    })
    res.redirect('/books');
}

controllers.title = async function(req, res) {
    var id = req.params.id;
    var book = await Book.findOne({_id: id})
    console.log(book)
    res.render('books/modify', {book: book});
}

controllers.postTitle = async function(req, res) {
    var id = req.params.id;
    var r = await Book.updateOne({_id: id}, {title: req.body.title})
    console.log(r.n, r.nModified)
    res.redirect('/books');
}

controllers.delete = (req, res) => {
    var id = req.params.id;
    // db.get('books').remove(id).write();
    Book.deleteOne({_id: id}, function(err) {
      if (err) return console.log(err);
    })
    res.redirect('/books');
}

module.exports = controllers;
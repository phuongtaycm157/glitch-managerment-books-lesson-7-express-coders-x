var Book = require('../../models/books.model')
var controllers = {}

controllers.index = async function(req, res, next) {
  var books = await Book.find();
  res.json(books)
  try {
    var a; 
    a.b();
  } catch {
    res.render('error/error500')
  }
}

module.exports = controllers
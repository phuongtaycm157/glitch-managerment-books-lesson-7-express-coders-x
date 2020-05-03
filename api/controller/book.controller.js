var Book = require('../../models/books.model')
var controllers = {}

controllers.index = async function(req, res, next) {
  var books = await Book.find();
  res.json(books)
}

module.exports = controllers
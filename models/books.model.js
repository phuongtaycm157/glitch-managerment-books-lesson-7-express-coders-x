const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
  title: String,
  discription: String,
  cover: String
})

const Book = mongoose.model('Book', bookSchema, 'books')

module.exports = Book
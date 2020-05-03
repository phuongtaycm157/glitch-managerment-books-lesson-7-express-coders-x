const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
  userId: String,
  bookId: String,
  isComplete: Boolean,
  numberBook: Number
})

const Transaction = mongoose.model('Transaction', transactionSchema, 'transaction')

module.exports = Transaction
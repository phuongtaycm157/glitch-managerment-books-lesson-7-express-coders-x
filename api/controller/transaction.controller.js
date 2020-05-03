var Transaction = require('../../models/transaction.model')
var controllers = {}

controllers.index = async function(req, res, next) {
  var transaction = await Transaction.find();
  res.json(transaction)
}

module.exports = controllers
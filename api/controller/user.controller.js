var User = require('../../models/users.model')
var controllers = {}

controllers.index = async function(req, res, next) {
  var users = await User.find();
  
  res.json(users)

}

module.exports = controllers
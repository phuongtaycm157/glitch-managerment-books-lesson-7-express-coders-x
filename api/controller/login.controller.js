const bcrypt = require('bcrypt');
var User = require('../../models/users.model')
var controllers = {}

controllers.login = async function(req, res, next) {
  var user = await User.findOne({email: req.body.email});
  bcrypt.compare(req.body.password, user.password, function(err, result) {
    if (!result) {
      res.json({error: "Not Found User!!"})
    }
    res.json(user)
  })
}

module.exports = controllers
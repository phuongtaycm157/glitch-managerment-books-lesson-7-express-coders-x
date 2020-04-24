var validate = {};

validate.postCreate = function(req, res, next) {
  var user = req.body;
  var err = [];
    if (!user.name) {
      err.push('Enter user name, please!!!');
    } else if (user.name.length > 30) {
      err.push('User name must be less than 30 characters!!!');
    }
    if (err.length) {
      res.render('users/create', {
        err: err
      });
      return;
    }
  next();
}

module.exports = validate;
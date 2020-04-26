const db = require('../db');

let auth = {};

auth.checkNotLogin = (req, res, next) => {
  let user = db.get('users').find({id: req.cookies.userId}).value();
  if (!user) {
    res.redirect('/auth/login');
  }
  res.locals.user = user;
  next();
}

auth.checkIsRoot = (req, res, next) => {
  if (res.locals.user.level !== "root") {
    res.redirect('/');
    return;
  }
  next();
}

module.exports = auth;
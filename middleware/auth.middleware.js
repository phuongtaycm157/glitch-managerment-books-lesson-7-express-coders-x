// const db = require('../db');
const User = require('../models/users.model')

let auth = {};

auth.checkNotLogin = async function(req, res, next) {
  let id = req.signedCookies.userId;
  // let user = db.get('users').find({id: req.signedCookies.userId}).value();
  let user = await User.findOne({_id: id});
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
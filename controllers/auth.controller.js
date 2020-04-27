const md5 = require('md5');

const db = require('../db');
let authControl = {};

authControl.login = (req, res) => {
  res.render('auth/login');
}

authControl.postLogin = (req, res) => {
  let user = db.get('users').find({email: req.body.email}).value();
  if (!user) {
    res.render('auth/login', {
      error: ['User does not exist!!!']
    })
    return;
  }
  let hashPassword = md5(req.body.password);
  if (user.password !== hashPassword) {
    res.render('auth/login', {
      error: ['Wrong password!!!']
    })
    return;
  }
  res.cookie('userId', user.id);
  res.redirect('/transaction');
}

module.exports = authControl;
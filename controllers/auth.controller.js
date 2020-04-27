// const md5 = require('md5');
const bcrypt = require('bcrypt');

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
  if (user.wrongLoginCount >= 4) {
    res.render('auth/login', {
      error: ['You are logining wrong too much!!!']
    })
    return;
  }
  bcrypt.compare(req.body.password, user.password, function(err, result) {
    if (!result) {
      user.wrongLoginCount++;
      res.render('auth/login', {
        error: ['Wrong password!!!']
      })
      return;
    }
    res.cookie('userId', user.id, {signed: true});
    res.redirect('/transaction');
  })
}

module.exports = authControl;
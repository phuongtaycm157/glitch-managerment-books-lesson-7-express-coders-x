const sgMail = require('../sendGridAPI');
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
  if (user.wrongLoginCount >= 3) {
    // const msg = {
    //   to: 'ngudai999@gmail.com',
    //   from: 'tayb1709566@student.ctu.edu.vn',
    //   subject: 'Security warning!!!',
    //   text: 'there maybe be someone try to login by your accout!!!'
    // };
    // sgMail.send(msg);
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
const shortid = require('shortid')
const mongoose = require('mongoose')
// const db = require('../db')
const Session = require('../models/session.model')

module.exports = function(req, res, next) {
  const sessionId = req.signedCookies.sessionId
  if (!sessionId) {
    var id = new mongoose.Types.ObjectId();
    var se = new Session ({
      _id: id
    });
    res.cookie('sessionId', id.toString(), { signed: true})
    se.save(function(err, se){
      if (err) console.log(err)
    })
  }
  next()
}
module.exports.checkNumberItem = async function(req, res, next) {
  const sessionId = req.signedCookies.sessionId;
  const session = await Session.findOne({_id: sessionId});
  let numberItem = 0;
  
  if (session.cart) {
    for (var key in session.cart) {
      numberItem += session.cart[key]
    }
  }
  res.locals.numberItem = numberItem;
  // console.log(sessionId, session.cart, numberItem)
  next()
}
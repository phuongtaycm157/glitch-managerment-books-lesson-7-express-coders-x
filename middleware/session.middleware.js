const shortid = require('shortid')
const db = require('../db')

module.exports = (req, res, next) => {
  const sessionId = req.signedCookies.sessionId
  if (!sessionId) {
    const id = shortid.generate();
    res.cookie('sessionId', id, { signed: true})
    db.get('session').push({id: id}).write()
  }
  next()
}
module.exports.checkNumberItem = (req, res, next) => {
  const sessionId = req.signedCookies.sessionId;
  const session = db.get('session').find({id: sessionId}).value();
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
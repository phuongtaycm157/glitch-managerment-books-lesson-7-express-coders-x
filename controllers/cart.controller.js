const shortid = require('shortid')
const db = require('../db')
var controller = {};

controller.index = (req, res, next) => {
  const sessionId = req.signedCookies.sessionId;
  const session = db.get('session').find({id: sessionId}).value();
  console.log(session)
  if (!session.cart) {
    res.redirect('/books');
    return;
  }
  
  let books = [];
  for(var key in session.cart) {
    let book = db.get('books').find({id: key}).value();
    books.push({
      coverUrl: book.cover,
      bookName: book.title,
      numberBook: session.cart[key]
    })
  }
  res.render('cart/index', { books: books});
}

controller.addToCart = (req, res, next) => {
  const sessionId = req.signedCookies.sessionId;
  const bookId = req.params.bookId;
  if (!sessionId) {
    res.redirect('/books')
  }
  var count = db.get('session')
                .find({id: sessionId})
                .get('cart.' + bookId, 0)
                .value();
  db.get('session')
    .find({id: sessionId})
    .set('cart.' + bookId, 1)
    .write();
  // console.log('Content session:',db.get('session').value())
  res.redirect('/books')
}

controller.cartTransaction = (req, res, next) => {
  if (!req.signedCookies.userId) {
    res.redirect('/auth/login');
    return;
  }
  const userId = req.signedCookies.userId;
  const sessionId = req.signedCookies.sessionId;
  const session = db.get('session').find({id: sessionId}).value();
  // {
  //   "userId": "HbPuFq3kC",
  //   "bookId": "5Z93L1f52",
  //   "id": "hmzj3yAmb",
  //   "isComplete": true
  // }
  for (var key in session.cart) {
    let tran = {};
    tran.userId = userId;
    tran.bookId = key;
    tran.id = shortid.generate();
    tran.isComplete = false;
    tran.numberBook = session.cart[key];
    db.get('transaction').push(tran).write();
  }
  db.get('session').find({id: sessionId}).set('cart', {}).write();
  res.redirect('/transaction');
}

module.exports = controller;
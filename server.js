// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
var cloudinary = require('cloudinary').v2

const booksRouter = require('./router/books.router');
const usersRouter = require('./router/users.router');
const transactionRouter = require('./router/transaction.router');
const cart = require('./router/cart.router');
const auth = require('./router/auth.router');
const authMid = require('./middleware/auth.middleware');
const session = require('./middleware/session.middleware');

app.set('views', './views');
app.set('view engine','pug');

app.use('/static', express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser('signed'));
app.use(session);
// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.render('index');
});


app.use('/books', session.checkNumberItem, booksRouter);
app.use('/users', authMid.checkNotLogin, authMid.checkIsRoot, usersRouter);
app.use('/transaction', authMid.checkNotLogin, transactionRouter);
app.use('/auth', auth);
app.use('/cart', cart);

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

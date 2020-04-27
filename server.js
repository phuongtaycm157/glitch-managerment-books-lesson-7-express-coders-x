// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const booksRouter = require('./router/books.router');
const usersRouter = require('./router/users.router');
const transactionRouter = require('./router/transaction.router');
const auth = require('./router/auth.router');
const authMid = require('./middleware/auth.middleware');


app.set('views', './views');
app.set('view engine','pug');

app.use('/static', express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser('signed'));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.render('index');
});

app.use('/books',authMid.checkNotLogin, authMid.checkIsRoot, booksRouter);
app.use('/users', authMid.checkNotLogin, authMid.checkIsRoot, usersRouter);
app.use('/transaction', authMid.checkNotLogin, transactionRouter);
app.use('/auth', auth);

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

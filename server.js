// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
const bodyParser = require('body-parser');

const booksRouter = require('./router/books.router');
const usersRouter = require('./router/users.router');
const transactionRouter = require('./router/transaction.router');

// our default array of dreams
const dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

app.set('views', './views');
app.set('view engine','pug');

app.use('/static', express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.render('index');
});

app.use('/books', booksRouter);
app.use('/users', usersRouter);
app.use('/transaction', transactionRouter);

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

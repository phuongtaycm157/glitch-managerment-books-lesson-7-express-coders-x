// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);
const shortid = require('shortid');

db.defaults({books: []}).write();

// our default array of dreams
const dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

app.set('views', './views');
app.set('view engine','pug');

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

// send the default array of dreams to the webpage
app.get("/dreams", (request, response) => {
  // express helps us take JS objects and send them as JSON
  response.json(dreams);
});

app.get("/books", (req, res) => {
  res.render('books/index', {
    books: db.get('books').value()
  });
});

app.post('/books/create', (req, res) => {
  var book = req.body;
  book.id = shortid.generate();
  db.get('books').push(book).write();
  res.redirect('/books');
})

app.get('/books/:id/title', (req, res) => {
  var id = req.params;
  var book = db.get('books').find(id).value();
  res.render('books/modify', {book: book});
});

app.post('/books/:id/title', (req, res) => {
  var id = req.params;
  var book = db.get('books').find(id).value();
  book.title = req.body.title;
  db.get('books').find({id: id}).assign(book).write();
  res.redirect('/books');
});

app.get('/books/:id/delete', (req, res) => {
  var id = req.params;
  db.get('books').remove(id).write();
  res.redirect('/books');
})

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

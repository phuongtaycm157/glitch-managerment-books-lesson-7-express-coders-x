var express = require('express');
var shortid = require('shortid');

var router = express.Router();

var db = require('../db');

router.get('/', function(req, res) {
  res.render('users/index', {
    users: db.get('users').value()
  })
})

router.get('/create', function(req, res) {
 res.render('users/create'); 
})

router.post('/create', function(req, res) {
  var user = req.body;
  user.id = shortid.generate();
  db.get('users').push(user).write();
  res.redirect('/users');
})

router.get('/:id/delete', function(req, res) {
  var id = req.params;
  db.get('users').remove(id).write();
  res.redirect('/users');
})

router.get('/:id/modify', function(req, res) {
  var id = req.params;
  var user = db.get('users').find(id).value();
  res.render('users/modify', {user: user});
})

router.post('/:id/modify', function(req, res) {
  var user = req.body;
  user.id = req.params.id;
  db.get('users').find({id: user.id}).assign(user).write();
  res.redirect('/users');
})

router.get('/search', function(req, res) {
  var q = req.query.q;
  var matchUsers = db.get('users').value().filter(x => {
    return x.name.toLocaleLowerCase().indexOf(q.toLocaleLowerCase()) !== -1;
  })
  res.render('users/index', {
    users: matchUsers,
    q: q
  })
})

module.exports = router;
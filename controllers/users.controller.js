var shortid = require('shortid');
var db = require('../db');

var controllers = {};

controllers.index = function(req, res) {
    res.render('users/index', {
      users: db.get('users').value()
    })
}

controllers.create = function(req, res) {
    var users = db.get('users').value();
    var books = db.get('books').value();
    res.render('users/create', {
      users: users,
      books: books
    }); 
}

controllers.postCreate = function(req, res) {
    var user = req.body;
    user.id = shortid.generate();
    db.get('users').push(user).write();
    res.redirect('/users');
}

controllers.delete = function(req, res) {
    var id = req.params;
    db.get('users').remove(id).write();
    res.redirect('/users');
}

controllers.modify = function(req, res) {
    var id = req.params;
    var user = db.get('users').find(id).value();
    res.render('users/modify', {user: user});
}

controllers.postModify = function(req, res) {
    var user = req.body;
    user.id = req.params.id;
    db.get('users').find({id: user.id}).assign(user).write();
    res.redirect('/users');
}

controllers.search = function(req, res) {
    var q = req.query.q;
    var matchUsers = db.get('users').value().filter(x => {
      return x.name.toLocaleLowerCase().indexOf(q.toLocaleLowerCase()) !== -1;
    })
    res.render('users/index', {
      users: matchUsers,
      q: q
    })
}

module.exports = controllers;
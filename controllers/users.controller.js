var shortid = require('shortid');
var db = require('../db');

var controllers = {};

controllers.index = function(req, res) {
    res.render('users/index', {
      users: db.get('users').value()
    })
}

controllers.create = function(req, res) {
    res.render('users/create'); 
}

controllers.postCreate = function(req, res) {
    var user = req.body;
    var err = [];
    if (!user.name) {
      err.push('Enter user name, please!!!');
    } else if (user.name.length > 30) {
      err.push('User name less than 30 characters!!!');
    }
    if (err.length) {
      res.render('users/create', {
        err: err
      });
      return;
    }
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
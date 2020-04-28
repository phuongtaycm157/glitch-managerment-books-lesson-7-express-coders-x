var shortid = require('shortid');
var db = require('../db');
var cloudinary = require('cloudinary').v2

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
    var id = req.params.id;
    var originUser = db.get('users').find({id: id}).value();
    originUser.name = req.body.name;
    cloudinary.uploader.upload(req.file.path, (err, result) => {
      originUser.avatar = result.secure_url;
      db.get('users').find({id: id}).assign(originUser).write();
      res.redirect('/users');
    })
    
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
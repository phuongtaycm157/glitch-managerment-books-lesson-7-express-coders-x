var shortid = require('shortid');
// var db = require('../db');
var cloudinary = require('cloudinary').v2
var User = require('../models/users.model')

var controllers = {};

controllers.index = async function(req, res) {
    res.render('users/index', {
      users: await User.find()
    })
}

controllers.create = function(req, res) {
    res.render('users/create'); 
}

controllers.postCreate = function(req, res) {
    var user = req.body;
    // user.id = shortid.generate();
    // db.get('users').push(user).write();
    user.avatar = 'https://cdn.glitch.com/7c1f9161-758d-486f-be86-03e44e2d47d2%2Fimg_avatar.png?v=1588086138048';
    User.create(user, function(err) {
      if (err) return console.log(err);
    })
    res.redirect('/users');
}

controllers.delete = function(req, res) {
    var id = req.params.id;
    User.deleteOne({_id: id},function(err) {
      if (err) return console.log(err);
    })
    res.redirect('/users');
}

controllers.modify = async function(req, res) {
    var id = req.params.id;
    var user = await User.findOne({_id: id});
    res.render('users/modify', {user: user});
}

controllers.postModify = function(req, res) {
    var id = req.params.id;
    // var originUser = await User.findOne({_id: id});
    // originUser.name = req.body.name;
    cloudinary.uploader.upload(req.file.path, async function(err, result) {
      // originUser.avatar = result.secure_url;
      // db.get('users').find({id: id}).assign(originUser).write();
      var r = await User.updateOne({_id: id},{name: req.body.name, avatar: result.secure_url})
      res.redirect('/users');
    })
    
}

controllers.search = async function(req, res) {
    var q = req.query.q;
    var users = User.find()
    var matchUsers = users.filter(x => {
      return x.name.toLocaleLowerCase().indexOf(q.toLocaleLowerCase()) !== -1;
    })
    res.render('users/index', {
      users: matchUsers,
      q: q
    })
}

module.exports = controllers;
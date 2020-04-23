var express = require('express');
var router = express.Router();
var db = require('../db');
var controllers = require('../controllers/transaction.controller');

router.get('/', controllers.index)

router.get('/create', controllers.create)

router.post('/create', controllers.postCreate)

module.exports = router;
var express = require('express');
var router = express.Router();

var db = require('../db');
var controllers = require('../controllers/transaction.controller');
var authMid = require('../middleware/auth.middleware');

router.get('/', controllers.index)

router.get('/create', authMid.checkIsRoot, controllers.create)

router.post('/create', authMid.checkIsRoot, controllers.postCreate)

router.get('/:id/complete', controllers.complete)

// router.get('/user', controllers.user)

module.exports = router;
var express = require('express');
var router = express.Router();
var controllers = require('../controller/user.controller');

router.get('/', controllers.index)

module.exports = router;
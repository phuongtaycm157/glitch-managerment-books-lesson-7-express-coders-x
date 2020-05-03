var express = require('express');
var router = express.Router();
var controllers = require('../controller/book.controller');

router.get('/', controllers.index)

module.exports = router;
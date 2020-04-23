var express = require('express');
var router = express.Router();

var controllers = require('../controllers/books.controller');

router.get("/", controllers.index);

router.post('/create', controllers.postCreate);

router.get('/:id/title', controllers.title);

router.post('/:id/title', controllers.postTitle);

router.get('/:id/delete', controllers.delete);

module.exports = router;
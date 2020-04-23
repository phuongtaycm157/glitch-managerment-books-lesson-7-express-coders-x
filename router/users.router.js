var express = require('express');
var router = express.Router();

var controllers = require('../controllers/users.controller');

router.get('/', controllers.index)

router.get('/create', controllers.create)

router.post('/create', controllers.postCreate)

router.get('/:id/delete', controllers.delete)

router.get('/:id/modify', controllers.modify)

router.post('/:id/modify', controllers.postModify)

router.get('/search', controllers.search)

module.exports = router;
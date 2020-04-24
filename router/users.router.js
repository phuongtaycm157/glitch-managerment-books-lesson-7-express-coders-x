var express = require('express');
var router = express.Router();

var controllers = require('../controllers/users.controller');
var validate = require('../validate/users.validate');

router.get('/', controllers.index)

router.get('/create', controllers.create)

router.post('/create', validate.postCreate, controllers.postCreate)

router.get('/:id/delete', controllers.delete)

router.get('/:id/modify', controllers.modify)

router.post('/:id/modify', controllers.postModify)

router.get('/search', controllers.search)

module.exports = router;
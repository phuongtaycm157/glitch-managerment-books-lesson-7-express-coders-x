var express = require('express');
const multer = require('multer')

var router = express.Router();

var controllers = require('../controllers/users.controller');
var validate = require('../validate/users.validate');

const upload = multer({ dest: './public' })

router.get('/', controllers.index)

router.get('/create', controllers.create)

router.post('/create', validate.postCreate, controllers.postCreate)

router.get('/:id/delete', controllers.delete)

router.get('/:id/modify', controllers.modify)

router.post('/:id/modify', upload.single('avatar'), controllers.postModify)

router.get('/search', controllers.search)

module.exports = router;
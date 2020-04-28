var express = require('express');

var router = express.Router();

var controller = require('../controllers/cart.controller');

router.get('/', controller.index);

router.get('/:bookId/add', controller.addToCart);

router.get('/transaction', controller.cartTransaction);

module.exports = router;
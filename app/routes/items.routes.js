const products = require('../controllers/products.controller');
var router = require('express').Router();

router.get('/find/:s', products.findProduct)

module.exports = router
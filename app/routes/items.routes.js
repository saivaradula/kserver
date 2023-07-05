const products = require('../controllers/products.controller');
var router = require('express').Router();

router.get('/find/:s', products.findProduct)
router.get('/scanned', products.getScanned)

module.exports = router
const products = require('../controllers/products.controller');
var router = require('express').Router();
router.get('/:p', products.getAllProducts);
router.get('/:p/:s', products.getAllProducts);

module.exports = router;

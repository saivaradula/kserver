const products = require('../controllers/products.controller');
var router = require('express').Router();
router.get('/:p', products.getAllProducts);
router.get('/:p/:a', products.getAllProducts);
router.get('/:p/:a/:s', products.getAllProducts);

module.exports = router;

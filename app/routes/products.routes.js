const products = require('../controllers/products.controller');
var router = require('express').Router();
router.get('/:p', products.getAllProducts);
router.get('/:p/:archieve', products.getAllProducts);
router.get('/:p/:archieve/:damaged', products.getAllProducts);
router.get('/:p/:archieve/:damaged/:s', products.getAllProducts);

module.exports = router;

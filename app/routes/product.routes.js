const products = require('../controllers/products.controller');
var router = require('express').Router();
router.get('/:p', products.getAllProducts);
router.post('/add', products.addProduct);
router.post('/update', products.updateProduct);
router.get('/details/:id', products.getProductDetails);
router.post('/consumed', products.getConsumed);

module.exports = router;

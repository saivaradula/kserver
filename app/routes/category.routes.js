const category = require('../controllers/category.controller');
var router = require('express').Router();
router.get('/', category.getActiveCategories);
router.get('/:p', category.getAllCategories);
router.post('/add', category.addCategory);
router.post('/delete', category.deleteCategory);
router.post('/check', category.checkCategory);
router.post('/products', category.products);
module.exports = router;

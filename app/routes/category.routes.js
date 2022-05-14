const category = require('../controllers/category.controller');
var router = require('express').Router();
router.get('/', category.getActiveCategories);
router.get('/:p', category.getAllCategories);
router.post('/add', category.addCategory);

module.exports = router;

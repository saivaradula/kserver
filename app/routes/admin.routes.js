var router = require('express').Router();
const invoice = require('../controllers/admin.controller');
router.get('/resetcodes', invoice.resetProductCodes);

module.exports = router;
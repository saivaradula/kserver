const routes = require('express').Router();
const products = require('./product.routes');
const category = require('./category.routes');
const invoice = require('./invoice.routes');

routes.use('/products', products);
routes.use('/category', category);
routes.use('/invoice', invoice);

module.exports = routes;

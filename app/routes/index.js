const routes = require('express').Router();
const products = require('./product.routes');
const category = require('./category.routes');
const invoice = require('./invoice.routes');
const admin = require('./admin.routes');

routes.use('/products', products);
routes.use('/category', category);
routes.use('/invoice', invoice);

routes.use('/admin', admin)

module.exports = routes;

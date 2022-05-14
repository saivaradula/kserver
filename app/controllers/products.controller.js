const products = require('../services/product.services');

exports.create = (req, res) => { };

exports.getAllProducts = (req, res) => {
	products.getAllProducts(req).then(async (p) => {
		let products = {};
		products.total = await getTotalProducts().then((total) => total);
		products.data = p;
		return res.send({ products }).status(200);
	});
};

const getTotalProducts = () =>
	products.getTotalProducts().then((p) => p.length);

exports.addProduct = (req, res) => {
	products.add(req).then((response) => {
		return res.send(response).status(200);
	});
};

exports.updateProduct = (req, res) => {
	products.updateProduct(req).then((response) => {
		return res.send(response).status(200);
	});
};

exports.getConsumed = (req, res) => {
	products
		.getConsumed(req.body.code, req.body.sdate, req.body.edate)
		.then((product) => {
			let consumed = product.length ? product[0].consumed : 0;
			return res.send(consumed.toString()).status(200)
		})
		.catch((error) => {
			console.log(error)
			return res.status(404).send(error);
		});
}

exports.getProductDetails = (req, res) => {
	products
		.getProductDetails(req.params.id)
		.then((product) => {
			return res.send(product).status(200);
		})
		.catch((error) => {
			console.log(error)
			return res.status(404).send(error);
		});
};

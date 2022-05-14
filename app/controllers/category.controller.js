const category = require('../services/category.services');

exports.getAllCategories = (req, res) => {
	category.getAllCategories(req).then(async (p) => {
		let categories = {};
		categories.total = await getTotalCategories(req).then((total) => total);
		categories.data = p;
		return res.send({ categories }).status(200);
	});
};

exports.getActiveCategories = (req, res) => {
	category.getTotalCategories().then(async (c) => {
		return res.send(c).status(200);
	});
};

const getTotalCategories = () =>
	category.getTotalCategories().then((p) => p.length);

exports.addCategory = (req, res) => {
	category.add(req).then((response) => {
		return res.send(response).status(200);
	});
};

const { now } = require('sequelize/dist/lib/utils');
const db = require('../models');
const category = db.category;
const Op = db.Sequelize.Op;

exports.add = (req) => {
	const sql = `INSERT INTO categories ( name ) VALUES ('${req.body.name}');`;
	return db.sequelize.query(sql, {
		type: db.sequelize.QueryTypes.INSERT,
	});
};

exports.checkCategory = (req) => {
	const sql = `SELECT name FROM categories WHERE LOWER(name) = '${req.body.name.toLowerCase()}'`;
	return db.sequelize.query(sql, {
		type: db.sequelize.QueryTypes.SELECT,
	});
}

exports.getName = (req) => {
	const sql = `SELECT name FROM categories WHERE id = '${req.body.id}'`;
	return db.sequelize.query(sql, {
		type: db.sequelize.QueryTypes.SELECT,
	});
}

exports.getProductByCategory = (name) => {
	const sql = `SELECT count(id) as products FROM products WHERE LOWER(category) = '${name.toLowerCase()}'`;
	return db.sequelize.query(sql, {
		type: db.sequelize.QueryTypes.SELECT,
	});
}

exports.deleteCategory = (req) => {
	const sql = `UPDATE categories SET status = 0 WHERE id = ${req.body.id}`;
	return db.sequelize.query(sql, {
		type: db.sequelize.QueryTypes.DELETE,
	});
}

exports.getAllCategories = (req) => {
	let page = req.params.p;
	let ofst = 0;
	ofst = page > 1 ? (ofst = (page - 1) * 10) : 0;
	try {
		return category.findAll({
			offset: ofst,
			limit: 10,
			where: {
				status: 1
			},
			order: [['id', 'desc']],
		});
	} catch (e) {
		console.log(e.getMessage());
	}

};

exports.getTotalCategories = () => {
	return category.findAll({
		where: {
			status: 1
		},
	}
	);
};

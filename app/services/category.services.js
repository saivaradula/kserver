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

exports.getAllCategories = (req) => {
	let page = req.params.p;
	let ofst = 0;
	ofst = page > 1 ? (ofst = (page - 1) * 10) : 0;
	return category.findAll({
		offset: ofst,
		limit: 10,
		order: [['id', 'desc']],
	});
};

exports.getTotalCategories = () => {
	return category.findAll();
};

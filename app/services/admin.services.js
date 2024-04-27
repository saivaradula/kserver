// const { now } = require('sequelize/dist/lib/utils');
const db = require("../models");
const products = db.products;

exports.clearCodes = () => {
	const sql = `UPDATE products SET code = ''`;
	return db.sequelize.query(sql, {
		type: db.sequelize.QueryTypes.UPDATE,
	});
};

exports.getDetails = async () => {
	const sql = `SELECT id, code, name, category, subcategory FROM products`;
	return await db.sequelize.query(sql, {
		type: db.sequelize.QueryTypes.SELECT,
	});
};

exports.updateCodes = async (id, code) => {
	const sql = `UPDATE products SET code = '${code}' WHERE id = '${id}'`;
	return await db.sequelize.query(sql, {
		type: db.sequelize.QueryTypes.UPDATE,
	});
};

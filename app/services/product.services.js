const { now } = require('sequelize/dist/lib/utils');
const db = require('../models');
const products = db.products;
const Op = db.Sequelize.Op;

exports.getTotalProducts = () => {
	return products.findAll();
};

exports.getAllProducts = (req) => {
	let page = req.params.p;
	let ofst = 0;
	ofst = page > 1 ? (ofst = (page - 1) * 10) : 0;
	return products.findAll({
		offset: ofst,
		limit: 10,
		order: [['id', 'desc']],
	});
};

exports.getConsumed = (id, sdate, edate) => {
	try {
		let sql = `SELECT SUM(ip.quantity) AS consumed FROM 
					invoice_products ip, invoice i
					WHERE code = '${id}' AND 
					i.invoice_id = ip.invoice_id AND ( i.type = 'invoice' OR i.type = 'draft')
					AND
					( ( '${sdate}' BETWEEN ip.startDate AND ip.endDate )
					OR ( '${edate}' BETWEEN ip.startDate AND ip.endDate ) )
					GROUP BY ip.code`;
		return db.sequelize.query(sql, {
			type: db.sequelize.QueryTypes.SELECT,
		});
	} catch (err) {
		return null;
	}
};

exports.getProductDetails = (id) => {
	try {
		let sql = `SELECT * FROM products WHERE code = '${id}'`;
		return db.sequelize.query(sql, {
			type: db.sequelize.QueryTypes.SELECT,
		});
	} catch (err) {
		return null;
	}
};

exports.updateProduct = req => {
	const sql = `UPDATE products SET 
				name = '${req.body.name}',
				image = '${req.body.prodimage}',
				category = '${req.body.category}',
				subcategory = '${req.body.subcategory}',
				brand = '${req.body.brand}',
				cost = '${req.body.cost}',
				price = '${req.body.price}',
				quantity = '${req.body.quantity}',
				alert = '${req.body.alertnum}',
				model = '${req.body.model}',
				unit = '${req.body.unit}',
				prtype = '${req.body.prtype}',
				nickname = '${req.body.sname}'
				WHERE id = ${req.body.id}
	`;
	return db.sequelize.query(sql, {
		type: db.sequelize.QueryTypes.UPDATE,
	});
}

exports.add = (req) => {
	const sql = `INSERT INTO products (name, code, image, category, brand, cost, price, quantity, 
		alert, model, subcategory, unit, prtype, nickname)
		VALUES ('${req.body.name}', '${req.body.code}', '${req.body.prodImage}', '${req.body.category}',
		'${req.body.brand}', '${req.body.cost}', '${req.body.price}', '${req.body.quantity}', 
		'${req.body.alertNum}', '${req.body.model}', '${req.body.subcategory}', 
		'${req.body.unit}', '${req.body.prtype}', '${req.body.sname}');
	`;
	return db.sequelize.query(sql, {
		type: db.sequelize.QueryTypes.INSERT,
	});
};

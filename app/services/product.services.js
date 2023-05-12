const { now } = require('sequelize/dist/lib/utils');
const db = require('../models');
const products = db.products;
const Op = db.Sequelize.Op;

const escape = s => {
	let lookup = {
		'&': "&amp;",
		'"': "&quot;",
		'\'': "&apos;",
		'<': "&lt;",
		'>': "&gt;"
	};
	return s.replace(/[&"'<>]/g, c => lookup[c]);
}

exports.getTotalProducts = (req) => {
	let ss = req.params.s;
	let archieved = req.params.archieve;
	let damaged = req.params.damaged;
	if (ss === '' || ss === 'undefined' || ss === undefined) {
		if (damaged > 0) {
			return products.findAll({
				where: { is_fully_damaged: damaged },
			});
		}
		if (archieved > 0) {
			return products.findAll({
				where: { status: !archieved, is_fully_damaged: '0' },
			});
		} else {
			return products.findAll({
				where: { status: '1' },
			});
		}
	} else {
		return products.findAll({
			where: {
				[Op.and]: { status: archieved },
				[Op.or]: [
					{
						name: {
							[Op.like]: `%${ss.toLowerCase()}%`
						}
					},
					{
						model: {
							[Op.like]: `%${ss.toLowerCase()}%`
						}
					},
					{
						category: {
							[Op.like]: `%${ss.toLowerCase()}%`
						}
					},
					{
						code: {
							[Op.like]: `%${ss.toLowerCase()}%`
						}
					},
					{
						prtype: {
							[Op.like]: `%${ss.toLowerCase()}%`
						}
					},
					{
						subcategory: {
							[Op.like]: `%${ss.toLowerCase()}%`
						}
					},
					{
						nickname: {
							[Op.like]: `%${ss.toLowerCase()}%`
						}
					}
				],
			},
		});
	}

};

exports.getAllProducts = (req) => {
	let page = req.params.p;
	let ss = req.params.s;
	let archieved = req.params.archieve;
	let damaged = req.params.damaged;
	// active = archieved ? 1 : 0
	let ofst = 0;
	ofst = page > 1 ? (ofst = (page - 1) * 25) : 0;
	console.clear()
	console.log("ss", req.params);
	if (ss === '' || ss === 'undefined' || ss === undefined) {
		if (damaged > 0) {
			console.log('ss')
			return products.findAll({
				offset: ofst,
				limit: 25,
				where: { is_fully_damaged: damaged },
				order: [['id', 'desc']],
			});
		}
		if (archieved > 0) {
			return products.findAll({
				offset: ofst,
				limit: 25,
				where: { status: !archieved, is_fully_damaged: '0' },
				order: [['id', 'desc']],
			});
		} else {
			return products.findAll({
				offset: ofst,
				limit: 25,
				where: { status: '1' },
				order: [['id', 'desc']],
			});
		}

	} else {
		const sql = `SELECT * 
					FROM products 
					WHERE 
						status = ${!archieved} AND 
						( 
							LOWER(name) LIKE '%${ss.toLowerCase()}%' 
							OR
							LOWER(model) LIKE '%${ss.toLowerCase()}%'
							OR
							LOWER(category) LIKE '%${ss.toLowerCase()}%'
							OR
							LOWER(code) LIKE '%${ss.toLowerCase()}%'
							OR
							LOWER(prtype) LIKE '%${ss.toLowerCase()}%'
							OR
							LOWER(subcategory) LIKE '%${ss.toLowerCase()}%' 
							OR
							LOWER(nickname) LIKE '%${ss.toLowerCase()}%' 
						)
						ORDER BY id desc
						LIMIT ${ofst}, 10
					`;
		return db.sequelize.query(sql, {
			type: db.sequelize.QueryTypes.SELECT,
		});
	}
};

exports.findProduct = (req) => {
	let sql = `SELECT p.name, p.code, i.invoice_id, i.prop_receiver_name, i.to_name,
					  i.content_type, i.startDate, i.endDate, ip.rstatus, i.isBlocked
				FROM
				invoice_products ip, products p, invoice i
				WHERE
				i.status = 1 AND
				i.invoice_id = ip.invoice_id AND
				ip.status = 1 AND
				ip.code = p.code AND 
					( 
						LOWER(p.name) LIKE '%${req.params.s}%' OR
						LOWER(p.nickname) LIKE '%${req.params.s}%' OR
						LOWER(p.code) LIKE '%${req.params.s}%'
					)
				`;
	return db.sequelize.query(sql, {
		type: db.sequelize.QueryTypes.SELECT,
	});
}

exports.getConsumed = (id, sdate, edate) => {
	try {
		let sql = `SELECT SUM(ip.quantity) AS Q
				FROM 
				invoice_products ip, invoice i 
				WHERE ip.code = '${id}' AND ip.status = 1 AND i.status = 1 AND
				i.invoice_id = ip.invoice_id AND ( i.type = 'invoice' OR i.type = 'draft')
				AND rstatus = 'NR' AND ip.is_damaged = 0
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

exports.getNextCode = code => {
	const sql = `SELECT code AS C FROM products 
		WHERE code LIKE '${code}%' ORDER BY code ASC`;
	return db.sequelize.query(sql, {
		type: db.sequelize.QueryTypes.SELECT,
	});
}

exports.deleteCode = req => {
	const sql = `UPDATE products SET status = 0 WHERE code = '${req.params.id}'`;
	return db.sequelize.query(sql, {
		type: db.sequelize.QueryTypes.UPDATE,
	});
}

exports.updateProduct = req => {
	req.body.brand = escape(req.body.brand)
	const sql = `UPDATE products SET 
				name = '${req.body.name}',
				code = '${req.body.code}',
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
				nickname = '${req.body.sname}',
				godawan = '${req.body.godawan}'
				WHERE id = ${req.body.id}
	`;
	return db.sequelize.query(sql, {
		type: db.sequelize.QueryTypes.UPDATE,
	});
}

exports.add = (req) => {
	console.log(req)
	const sql = `INSERT INTO products (name, code, image, category, brand, cost, price, quantity, 
		alert, model, subcategory, unit, prtype, nickname, godawan)
		VALUES ('${req.body.name}', '${req.body.code}', '${req.body.prodImage}', '${req.body.category}',
		'${req.body.brand}', '${req.body.cost}', '${req.body.price}', '${req.body.quantity}', 
		'${req.body.alertNum}', '${req.body.model}', '${req.body.subcategory}', 
		'${req.body.unit}', '${req.body.prtype}', '${req.body.sname}', '${req.body.godawan}');
	`;
	return db.sequelize.query(sql, {
		type: db.sequelize.QueryTypes.INSERT,
	});
};

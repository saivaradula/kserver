const { now } = require('sequelize/dist/lib/utils');
const db = require('../models');
const invoice = db.invoice;
const Op = db.Sequelize.Op;

exports.updateInvoice = req => {
	const sql = `UPDATE invoice SET 
		to_name = '${req.body.toName}', 
		to_address = '${req.body.address}',
		to_phone = '${req.body.companyPhone}',
		contactname = '${req.body.contactName}',
		contactphone = '${req.body.contactPhone}',
		art_phone = '${req.body.artPhone}',
		art_director_name = '${req.body.artDirector}',
		content_type = '${req.body.contentType}',
		prop_receiver = '${req.body.receiver}',
		gst = '${req.body.gst}',		 
		totalCost = '${req.body.totalCost}',		 
		discount = '${req.body.discount}',
		gstpercentage = '${req.body.gstpercentage}',
		finalamount = '${req.body.finalamount}',
		herodirector = '${req.body.isWhat}',
		name = '${req.body.isWhatName}',
		vendoraddress = '${req.body.vendoraddress}',
		payableamount = '${req.body.payableamount}',
		prop_receiver_name = '${req.body.receiverName}'
		WHERE invoice_id = '${req.body.invoice_id}'
	`;
	return db.sequelize.query(sql, {
		type: db.sequelize.QueryTypes.UPDATE,
	});
}

const getFirstLetter = (words) => {
	let matches = words.match(/\b(\w)/g);
	return matches.join('').toUpperCase();
}


exports.findInvoiceById = invid => {
	const sqlCheck = `SELECT count(invoice_id) AS Ids
						FROM invoice WHERE invoice_id LIKE '%${invid}%'`;
	return db.sequelize.query(sqlCheck, {
		type: db.sequelize.QueryTypes.SELECT,
	});
}


exports.addNewInvoice = async (req) => {
	let invoiceStatus = 1;
	let itype = 'draft';
	if (req.body.payment_type === 4) {
		invoiceStatus = 2;
		itype = 'invoice'; // As advanced is paid.
	}


	const sql = `INSERT INTO invoice(
		invoice_id, type, to_name, to_address, to_phone,
		contactname, contactphone, art_phone,
		art_director_name, content_type, prop_receiver,
		startDate, endDate, gst, invoice_payment, totalCost,
		invoice_status, discount, gstpercentage, finalamount,
		herodirector, name, vendoraddress, payableamount, prop_receiver_name)
	VALUES(
		'${req.body.invoice_id}', '${itype}', '${req.body.toName}', '${req.body.address}', '${req.body.companyPhone}',
		'${req.body.contactName}', '${req.body.contactPhone}', '${req.body.artPhone}',
		'${req.body.artDirector}', '${req.body.contentType}', '${req.body.receiver}',
		'${req.body.startDate}', '${req.body.endDate}', '${req.body.gst}', '${req.body.payment_type}', '${req.body.totalCost}',
		'${invoiceStatus}', '${req.body.discount}', '${req.body.gstpercentage}', '${req.body.finalamount}',
		'${req.body.isWhat}', '${req.body.isWhatName}', 
		'${req.body.vendoraddress}', '${req.body.payableamount}', '${req.body.receiver_name}'
	); `;

	return db.sequelize.query(sql, {
		type: db.sequelize.QueryTypes.INSERT,
	});
};

exports.addPayment = (req) => {
	const sql = `INSERT INTO invoice_payments(
		invoice_id, payment_type, amount, method, transaction_id, cheque_no, bank)
	VALUES(
		'${req.body.invoice_id}',
		'${req.body.payment_type}',
		'${req.body.amt}',
		'${req.body.method}',
		'${req.body.transId}',
		'${req.body.chequeno}',
		'${req.body.bank}'
	); `;

	return db.sequelize.query(sql, {
		type: db.sequelize.QueryTypes.INSERT,
	});
};

exports.changePaymentType = (ptype, id) => {
	const sql = `UPDATE invoice SET invoice_payment = ${ptype} WHERE invoice_id = '${id}' `;
	return db.sequelize.query(sql, {
		type: db.sequelize.QueryTypes.UPDATE,
	});
};

exports.addAddress = (req) => {
	const sql = `UPDATE invoice
	SET
	to_name = '${req.body.toName}', to_address = '${req.body.address}',
		to_phone = '${req.body.city}', gst = '${req.body.gst}'
					WHERE invoice_id = '${req.params.id}' `;
	return db.sequelize.query(sql, {
		type: db.sequelize.QueryTypes.UPDATE,
	});
};

exports.addDraft = (req) => {
	const sql = `INSERT INTO invoice_products(invoice_id, code, days, cost, startDate, endDate, quantity)
	VALUES(
		'${req.body.invoice_id}', '${req.body.code}', '${req.body.days}', '${req.body.cost}',
		'${req.body.startDate}', '${req.body.endDate}', '${req.body.quantity}'
	); `;
	return db.sequelize.query(sql, {
		type: db.sequelize.QueryTypes.INSERT,
	});
};

exports.getDrafts = (end) => {
	try {
		const sql = `SELECT i.invoice_id AS invoice,
		COUNT(p.code) AS totalProducts,
		i.createdOn AS CreatedOn,
		i.startDate AS startDate,
		i.endDate AS endDate,
		i.contactName, i.contactPhone,
		i.name, i.herodirector, i.totalCost,
		i.finalamount, i.gstpercentage, i.discount,
		i.payableamount, i.to_name, i.to_phone, i.prop_receiver_name
				FROM invoice i, invoice_products p
				WHERE type = 'draft' 
				AND i.invoice_id = p.invoice_id
				AND i.status = 1 AND p.status = 1
				GROUP BY i.invoice_id ORDER BY i.id DESC LIMIT 0, ${end} `;
		return db.sequelize.query(sql, {
			type: db.sequelize.QueryTypes.SELECT,
		});
	} catch (e) {
		console.log(e.getMessage());
	}

};

exports.markInvoiceAsPrint = (id) => {
	const sql = `UPDATE invoice 
				SET isPrinted = 1
				WHERE invoice_id = '${id}' `;
	return db.sequelize.query(sql, {
		type: db.sequelize.QueryTypes.UPDATE,
	});
};

exports.getAddressOfInvoice = (id) => {
	const sql = `SELECT
	i.to_name, i.to_address, i.to_city, i.gst
				FROM invoice i
				WHERE i.invoice_id = '${id}' `;
	return db.sequelize.query(sql, {
		type: db.sequelize.QueryTypes.SELECT,
	});
};

exports.getInvoicePayments = (invoiceId) => {
	const sql = `SELECT
	i.amount, i.method, i.transaction_id, i.cheque_no,
		i.bank, i.paid_on, p.value AS paidby
				FROM invoice_payments i, invoice_payments_types p
	WHERE
	i.payment_type = p.id AND
	i.invoice_id = '${invoiceId}' 
	ORDER BY i.id DESC
	`;
	return db.sequelize.query(sql, {
		type: db.sequelize.QueryTypes.SELECT,
	});
};

exports.getDetails = (id) => {
	const sql = `SELECT
				i.invoice_id,
				p.id AS product_id,
				p.name AS product_name,
				p.category AS product_category,
				p.model AS product_model,
				p.createdAt AS created_on,
				p.updatedAt AS updated_on,
				p.code AS product_code,
				p.brand AS product_brand,
				p.prtype AS product_type,
				ip.cost AS cost,
				ip.quantity AS quantity,
				i.type AS invoice_type,
				ip.days AS rent_days,
				i.startDate AS rents_start_on,
				p.subcategory AS product_subcategory,
				p.image AS product_image,
				i.to_name, i.to_address, i.to_phone, i.gst,
				ist.value AS is_value,
				ipt.value AS ip_value,
				i.invoice_status,
				i.startDate AS startDate,
				i.endDate AS endDate,
				i.contactName, i.contactPhone,
				i.art_director_name, i.content_type, i.prop_receiver, i.art_phone,
				ip.startDate AS pStartDate, ip.endDate AS pEndDate,
				i.paid_on, i.transaction_id, i.payment_method,
				i.name, i.herodirector, i.totalCost,
				i.finalamount, i.gstpercentage, i.discount, i.gst,
				i.herodirector AS isWhat, i.name AS isWhatName,
				i.payableamount, i.vendoraddress, i.gst,
				i.prop_receiver_name
				FROM invoice i, products p, invoice_products ip, invoice_status ist, invoice_payments_types ipt
				WHERE i.invoice_id = '${id}'
				AND p.code = ip.code 
				AND i.invoice_id = ip.invoice_id
				AND ist.id = i.invoice_status
				AND ipt.id = i.invoice_payment
				AND i.status = 1 AND p.status = 1 AND ip.status = 1`;
	return db.sequelize.query(sql, {
		type: db.sequelize.QueryTypes.SELECT,
	});
};

exports.getInvoiceAmounts = (id) => {
	const sql = `SELECT
					i.totalCost,
					i.finalamount, i.gstpercentage, i.discount,					
					i.payableamount
				FROM invoice i
				WHERE i.invoice_id = '${id}'
	`;
	return db.sequelize.query(sql, {
		type: db.sequelize.QueryTypes.SELECT,
	});
}

exports.deleteInvoice = async (id) => {
	const sql = `UPDATE invoice SET status = 0
				WHERE invoice_id = '${id}'`;
	return db.sequelize.query(sql, {
		type: db.sequelize.QueryTypes.UPDATE,
	});
}

exports.removeItem = async (id, code, price) => {

	let p = await this.getInvoiceAmounts(id);
	let { totalCost, finalamount, gstpercentage, discount, payableamount } = p[0];

	totalCost = parseFloat(totalCost - price);
	finalamount = totalCost;
	payableamount = totalCost;

	if (discount) {
		let d = parseFloat(totalCost * (discount / 100));
		finalamount = parseFloat(totalCost - d);
		payableamount = finalamount;
	}

	if (gstpercentage > 0) {
		let gst = parseFloat(finalamount * (gstpercentage / 100))
		payableamount = parseFloat(finalamount + gst);
	}

	const sql = `UPDATE invoice SET 
					totalCost = ${totalCost.toFixed(2)},
					finalamount = ${finalamount.toFixed(2)},
					payableamount = ${payableamount.toFixed(2)}
				WHERE invoice_id = '${id}'
				`;

	await db.sequelize.query(sql, {
		type: db.sequelize.QueryTypes.UPDATE,
	});

	const sqlD = `UPDATE invoice_products
					SET status = 0
				WHERE code = '${code}'
				AND invoice_id = '${id}'`;

	return db.sequelize.query(sqlD, {
		type: db.sequelize.QueryTypes.DELETE,
	});
};

exports.invoicePayment = (req) => {
	let d = new Date();
	let nd =
		d.getFullYear() +
		'-' +
		(d.getMonth() + 1) +
		'-' +
		d.getDate() +
		' ' +
		d.getHours() +
		':' +
		d.getMinutes() +
		':' +
		d.getSeconds();
	const sql = `UPDATE invoice 
				SET payment_method = '${req.body.payMethod}',
		transaction_id = '${req.body.transId}',
		invoice_payment = 2,
		paid_on = '${nd}'
				WHERE invoice_id = '${req.params.id}' `;
	return db.sequelize.query(sql, {
		type: db.sequelize.QueryTypes.UPDATE,
	});
};

exports.markIt = (id) => {
	const sql = `UPDATE invoice SET type = 'invoice' WHERE invoice_id = '${id}' `;
	return db.sequelize.query(sql, {
		type: db.sequelize.QueryTypes.UPDATE,
	});
};

exports.markAsPaid = (id) => {
	const sql = `UPDATE invoice SET type = 'paid', invoice_payment = 2 WHERE invoice_id = '${id}' `;
	return db.sequelize.query(sql, {
		type: db.sequelize.QueryTypes.UPDATE,
	});
};

exports.markStatusChange = (id, statusId) => {
	const sql = `UPDATE invoice SET invoice_status = ${statusId} WHERE invoice_id = '${id}' `;
	return db.sequelize.query(sql, {
		type: db.sequelize.QueryTypes.UPDATE,
	});
};

exports.getPrintedList = (to) => {
	const sql = `SELECT i.invoice_id AS invoice,
				COUNT(p.code) AS totalProducts,
				SUM(p.cost) AS totalCost,
				i.startDate AS CreatedOn,
				i.to_name, i.to_address, i.to_phone,
				ist.value AS is_value,
				ipt.value AS ip_value,
				i.prop_receiver_name,
				i.paid_on, i.transaction_id, i.payment_method, i.payableamount
				FROM invoice i,
		invoice_products p,
			invoice_status ist,
				invoice_payments_types ipt
				WHERE type = 'paid' 
				AND i.invoice_id = p.invoice_id
				AND i.status = 1 AND p.status = 1
				AND ist.id = i.invoice_status
				AND ipt.id = i.invoice_payment
				AND i.isPrinted = 1
				GROUP BY i.invoice_id ORDER BY i.id DESC LIMIT 0, ${to} `;

	return db.sequelize.query(sql, {
		type: db.sequelize.QueryTypes.SELECT,
	});
};

exports.getInvoiceList = (to) => {
	const sql = `SELECT i.invoice_id AS invoice,
		COUNT(p.code) AS totalProducts,
		SUM(p.cost) AS totalCost,
		i.startDate AS CreatedOn,
		i.to_name, i.to_address, i.to_phone,
		ist.value AS is_value,
		ipt.value AS ip_value,
		i.prop_receiver_name,
		i.payableamount
				FROM invoice i,
		invoice_products p,
			invoice_status ist,
				invoice_payments_types ipt
				WHERE type = 'invoice' 
				AND i.invoice_id = p.invoice_id
				AND i.status = 1 AND p.status = 1
				AND ist.id = i.invoice_status
				AND ipt.id = i.invoice_payment
				AND i.invoice_payment <> 2
				GROUP BY i.invoice_id ORDER BY i.id DESC LIMIT 0, ${to} `;

	return db.sequelize.query(sql, {
		type: db.sequelize.QueryTypes.SELECT,
	});
};

exports.searchInvoices = (ss, to) => {
	ss = ss.toLowerCase();
	const sql = `SELECT i.invoice_id AS invoice,
				COUNT(p.code) AS totalProducts,
				SUM(p.cost) AS totalCost,
				i.startDate AS CreatedOn,
				i.to_name, i.to_address, i.to_phone,
				ist.value AS is_value,
				ipt.value AS ip_value,
				i.prop_receiver_name,
				i.paid_on, i.transaction_id, i.payment_method, i.payableamount
				FROM invoice i,
		invoice_products p,
			invoice_status ist,
				invoice_payments_types ipt
				WHERE i.invoice_id = p.invoice_id
				AND i.status = 1 AND p.status = 1
				AND ist.id = i.invoice_status
				AND ipt.id = i.invoice_payment
				AND type != 'draft' 
				AND (
					LOWER(i.invoice_id) LIKE '%${ss}%'
					OR
					LOWER(to_name) LIKE '%${ss}%'
					OR 
					LOWER(art_director_name) LIKE '%${ss}%'
					OR 
					LOWER(prop_receiver_name) LIKE '%${ss}%'
				)
				GROUP BY i.invoice_id ORDER BY i.id DESC LIMIT 0, ${to} `;

	return db.sequelize.query(sql, {
		type: db.sequelize.QueryTypes.SELECT,
	});
}

exports.getPaidInvoiceList = (to) => {
	const sql = `SELECT i.invoice_id AS invoice,
				COUNT(p.code) AS totalProducts,
				SUM(p.cost) AS totalCost,
				i.startDate AS CreatedOn,
				i.to_name, i.to_address, i.to_phone,
				ist.value AS is_value,
				ipt.value AS ip_value,
				i.prop_receiver_name,
				i.paid_on, i.transaction_id, i.payment_method, i.payableamount
				FROM invoice i,
		invoice_products p,
			invoice_status ist,
				invoice_payments_types ipt
				WHERE type = 'paid' 
				AND i.invoice_id = p.invoice_id
				AND i.status = 1 AND p.status = 1
				AND ist.id = i.invoice_status
				AND ipt.id = i.invoice_payment
				GROUP BY i.invoice_id ORDER BY i.id DESC LIMIT 0, ${to} `;

	return db.sequelize.query(sql, {
		type: db.sequelize.QueryTypes.SELECT,
	});
};

exports.validateReturnProduct = (id, pid) => {
	const sql = `SELECT id, quantity
					FROM invoice_products ip 
					WHERE code = '${pid}'
					AND invoice_id = '${id}'
					`;
	return db.sequelize.query(sql, {
		type: db.sequelize.QueryTypes.SELECT,
	});
}

module.exports = (sequelize, Sequelize) => {
	const Invoice = sequelize.define('invoice', {
		invoice_id: {
			type: Sequelize.STRING,
		},
		type: {
			type: Sequelize.STRING,
		},
		code: {
			type: Sequelize.STRING,
		},
		// days: {
		// 	type: sequelize.INTEGER,
		// },
	});
	return Invoice;
};

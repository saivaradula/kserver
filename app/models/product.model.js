module.exports = (sequelize, Sequelize) => {
	const Products = sequelize.define('products', {
		// id: {
		// 	type: Sequelize.INTEGER,
		// 	primaryKey: true,
		// },
		image: {
			type: Sequelize.STRING,
		},
		code: {
			type: Sequelize.STRING,
		},
		name: {
			type: Sequelize.STRING,
		},
		nickname: {
			type: Sequelize.STRING,
		},
		category: {
			type: Sequelize.STRING,
		},
		model: {
			type: Sequelize.STRING,
		},
		subcategory: {
			type: Sequelize.STRING,
		},
		brand: {
			type: Sequelize.STRING,
		},
		cost: {
			type: Sequelize.FLOAT,
		},
		price: {
			type: Sequelize.FLOAT,
		},
		quantity: {
			type: Sequelize.INTEGER,
		},
		alert: {
			type: Sequelize.INTEGER,
		},
		unit: {
			type: Sequelize.STRING,
		},
		prtype: {
			type: Sequelize.STRING,
		},
	});
	return Products;
};

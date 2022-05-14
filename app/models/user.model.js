module.exports = (sequelize, Sequelize) => {
	const Users = sequelize.define('users', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
		},
		login: {
			type: Sequelize.STRING,
		},
		password: {
			type: Sequelize.STRING,
		},
		name: {
			type: Sequelize.STRING,
		},
	});
	return Users;
};

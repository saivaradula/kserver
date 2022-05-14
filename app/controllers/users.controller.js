const db = require('../models');
const users = db.users;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {};

exports.findOne = (req, res) => {
	const login = req.params.login;
	const pswd = req.params.password;

	users
		.findbylogin(id)
		.then((data) => {
			if (data) {
				res.send(data);
			} else {
				res.status(404).send({
					message: `Cannot find Tutorial with id=${id}.`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: 'Error retrieving Tutorial with id=' + id,
			});
		});
};

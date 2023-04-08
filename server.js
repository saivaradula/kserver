const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./app/models');
const routes = require('./app/routes');

var corsOptions = {
	// origin: "http://localhost:3002"
	origin: 'http://3.135.195.88/',
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));


const dbConfig = require('./app/config/db.config.js');
const Sequelize = require('sequelize');


app.get('/', (req, res) => {
	res.json({ message: "Welcome to Kadali's store backend application." });
});

app.get('/connect', (req, res) => {
	let sequelize = '';
	try {
		sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
			host: dbConfig.HOST,
			port: dbConfig.PORT,
			dialect: dbConfig.dialect,
			operatorsAliases: false,
			pool: {
				max: dbConfig.pool.max,
				min: dbConfig.pool.min,
				acquire: dbConfig.pool.acquire,
				idle: dbConfig.pool.idle,
			},
		});

		res.json({ message: "Connected to DB" });

	} catch (e) {
		res.json({ message: e });
	}
});


app.use('/', routes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
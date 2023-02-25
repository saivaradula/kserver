const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./app/models');
const routes = require('./app/routes');

var corsOptions = {
	// origin: process.env.FEURL
	origin: 'http://ec2-3-234-250-196.compute-1.amazonaws.com',
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

// db.sequelize.sync();
// Below is for development only
// db.sequelize.sync({ force: true }).then(() => {
// 	console.log('Drop and re-sync db.');
// });

app.get('/', (req, res) => {
	res.json({ message: "Welcome to Kadali's store backend application." });
});

app.use('/', routes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
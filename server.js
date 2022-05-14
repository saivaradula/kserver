const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./app/models');
const routes = require('./app/routes');

var corsOptions = {
	origin: 'http://localhost:3001',
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

// db.sequelize.sync();
// Below is for development only
// db.sequelize.sync({ force: true }).then(() => {
// 	console.log('Drop and re-sync db.');
// });

app.get('/moralis', (req, res) => {
	console.log("Request raised from Moralis Server...")
});

app.get('/', (req, res) => {
	res.json({ message: "Welcome to Kadali's store backend application." });
});

app.use('/', routes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});

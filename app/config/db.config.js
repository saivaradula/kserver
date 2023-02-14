module.exports = {
	HOST: 'kadalis-do-user-4737240-0.b.db.ondigitalocean.com',
	USER: 'doadmin',
	PASSWORD: 'AVNS_Vi9cDQ_Jl7UhMf2',
	DB: 'kadalis',
	dialect: 'mysql',
	PORT: 25060,
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
};

// Local DB.
// module.exports = {
// 	HOST: 'localhost',
// 	USER: 'root',
// 	PASSWORD: '',
// 	DB: 'kadalis',
// 	dialect: 'mysql',
// 	PORT: 3306,
// 	pool: {
// 		max: 5,
// 		min: 0,
// 		acquire: 30000,
// 		idle: 10000,
// 	},
// };

/**
* ALTER TABLE `invoice` 
* 	ADD `is_pending_archieved` TINYINT(2) NOT NULL DEFAULT '0' AFTER `isBlocked`, 
* 	ADD `is_received_archieved` TINYINT(2) NULL DEFAULT '0' AFTER `is_pending_archieved`, 
* 	ADD `is_damaged_archieved` TINYINT(2) NOT NULL DEFAULT '0' AFTER `is_received_archieved`;
*  
* */
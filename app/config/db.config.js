module.exports = {
	HOST: 'rcdbinstance.c418ddmyspkz.us-east-1.rds.amazonaws.com',
	USER: 'admin',
	PASSWORD: 'RightCh0ice',
	DB: 'rcdatabase',
	dialect: 'mysql',
	PORT: 3306,
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
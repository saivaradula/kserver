// module.exports = {
// 	HOST: "68.178.159.99",
// 	USER: "kadali_dbuser",
// 	PASSWORD: "q1w2e3R$T%Y^",
// 	DB: "kadalis",
// 	dialect: "mysql",
// 	PORT: 3306,
// 	pool: {
// 		max: 5,
// 		min: 0,
// 		acquire: 30000,
// 		idle: 10000,
// 	},
// };

// Local DB.
module.exports = {
	HOST: "localhost",
	USER: "root",
	PASSWORD: "root",
	DB: "kadalis",
	dialect: "mysql",
	PORT: 3306,
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
};

/**
* ALTER TABLE `invoice` 
* 	ADD `is_pending_archieved` TINYINT(2) NOT NULL DEFAULT '0' AFTER `isBlocked`, 
* 	ADD `is_received_archieved` TINYINT(2) NULL DEFAULT '0' AFTER `is_pending_archieved`, 
* 	ADD `is_damaged_archieved` TINYINT(2) NOT NULL DEFAULT '0' AFTER `is_received_archieved`;
*  

ALTER TABLE `invoice` ADD `serial_no` VARCHAR(100) NULL AFTER `is_damaged_archieved`;
ALTER TABLE `invoice` ADD `pickupDate` DATETIME NULL AFTER `type`;
ALTER TABLE `invoice_products` ADD `pickupDate` DATE NULL AFTER `added_on`;
ALTER TABLE `products` ADD `prsize` VARCHAR(50) NULL AFTER `subcategory`;

-- 28/06/23
DROP TABLE IF EXISTS `scanned_items`;
CREATE TABLE IF NOT EXISTS `scanned_items` (
  `id` bigint(21) NOT NULL AUTO_INCREMENT,
  `items` text NOT NULL,
  `added_by` bigint(21) NOT NULL,
  `added_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` tinyint(2) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
COMMIT;

ALTER TABLE `scanned_items` ADD `company` VARCHAR(150) NOT NULL AFTER `items`;

* */

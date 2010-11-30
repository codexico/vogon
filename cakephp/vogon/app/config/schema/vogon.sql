#App sql generated on: 2010-11-28 20:09:48 : 1290982188

DROP TABLE IF EXISTS `alerts`;
DROP TABLE IF EXISTS `produtos`;
DROP TABLE IF EXISTS `sites`;
DROP TABLE IF EXISTS `users`;


CREATE TABLE `alerts` (
	`id` int(10) NOT NULL AUTO_INCREMENT,
	`price` float(9,2) NOT NULL,
	`produto_id` int(10) NOT NULL,
	`user_id` int(10) NOT NULL,
	`active` tinyint(1) DEFAULT NULL,
	`created` datetime DEFAULT NULL,
	`modified` datetime DEFAULT NULL,	PRIMARY KEY  (`id`))
	ENGINE=InnoDB;

CREATE TABLE `produtos` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`code` varchar(40) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
	`url` varchar(90) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
	`site_id` int(11) NOT NULL,
	`created` datetime DEFAULT NULL,
	`modified` datetime DEFAULT NULL,
	`user_count` int(11) DEFAULT NULL,	PRIMARY KEY  (`id`))
	ENGINE=InnoDB;

CREATE TABLE `sites` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`name` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
	`url` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
	`active` tinyint(1) DEFAULT 0 NOT NULL,
	`created` datetime DEFAULT NULL,
	`modified` datetime DEFAULT NULL,	PRIMARY KEY  (`id`))
	ENGINE=InnoDB;

CREATE TABLE `users` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`name` varchar(90) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
	`email` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
	`password` int(40) DEFAULT NULL,
	`active` int(11) DEFAULT 1 NOT NULL,
	`created` datetime DEFAULT NULL,
	`modified` datetime DEFAULT NULL,	PRIMARY KEY  (`id`))
	ENGINE=InnoDB;


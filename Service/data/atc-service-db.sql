
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

USE 

CREATE DATABASE IF NOT EXISTS `atc-service`;

USE `atc-service`;

# Dump of table AccessToken
# ------------------------------------------------------------

DROP TABLE IF EXISTS `AccessToken`;

CREATE TABLE `AccessToken` (
  `id` varchar(255) NOT NULL,
  `ttl` int(11) DEFAULT NULL,
  `scopes` varchar(255) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table ACL
# ------------------------------------------------------------

DROP TABLE IF EXISTS `ACL`;

CREATE TABLE `ACL` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `model` varchar(255) DEFAULT NULL,
  `property` varchar(255) DEFAULT NULL,
  `accesstype` varchar(255) DEFAULT NULL,
  `permission` varchar(255) DEFAULT NULL,
  `PrincipalType` varchar(255) DEFAULT NULL,
  `principalId` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table address
# ------------------------------------------------------------

DROP TABLE IF EXISTS `address`;

CREATE TABLE `address` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `contact_name` varchar(120) NOT NULL,
  `adddress` varchar(255) NOT NULL,
  `suite` float NOT NULL,
  `city` varchar(45) NOT NULL,
  `state` varchar(45) NOT NULL,
  `zipcode` mediumint(9) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_id` int(11) NOT NULL,
  `modified_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_address_1_idx` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table atc_category
# ------------------------------------------------------------

DROP TABLE IF EXISTS `atc_category`;

CREATE TABLE `atc_category` (
  `id` mediumint(9) NOT NULL AUTO_INCREMENT,
  `cat_id` smallint(6) NOT NULL,
  `product_id` mediumint(9) NOT NULL,
  `service_id` mediumint(9) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_id` int(11) NOT NULL,
  `modified_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_atc_category_1_idx` (`cat_id`),
  KEY `fk_atc_category_2_idx` (`service_id`),
  KEY `fk_atc_category_3` (`product_id`),
  CONSTRAINT `fk_atc_category_2` FOREIGN KEY (`service_id`) REFERENCES `service` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table bulkupload
# ------------------------------------------------------------

DROP TABLE IF EXISTS `bulkupload`;

CREATE TABLE `bulkupload` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(120) NOT NULL,
  `details` text NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table category
# ------------------------------------------------------------

DROP TABLE IF EXISTS `category`;

CREATE TABLE `category` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `parent_id` smallint(6) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_id` int(11) NOT NULL,
  `modified_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;

INSERT INTO `category` (`id`, `name`, `parent_id`, `image_url`, `created_at`, `created_id`, `modified_at`, `modified_id`)
VALUES
	(1,'fashion',0,NULL,'2018-10-08 07:14:50',0,'2018-10-08 07:14:50',0),
	(5,'electronics',0,'test','2018-10-08 07:34:10',0,'2018-10-08 07:34:10',0),
	(6,'home',0,NULL,'2018-10-08 07:34:45',0,'2018-10-08 07:34:45',0),
	(8,'Mobile',5,'test','2018-10-08 08:33:11',0,'2018-10-08 08:33:11',0),
	(9,'refrigrator',5,'test','2018-10-08 08:33:48',0,'2018-10-08 08:33:48',0),
	(10,'Air Conditioner',5,'test','2018-10-08 08:34:26',0,'2018-10-08 08:34:26',0),
	(11,'samsung',7,'test','2018-10-08 08:56:36',0,'2018-10-08 08:56:36',0),
	(12,'vu',7,'test','2018-10-08 08:57:12',0,'2018-10-08 08:57:12',0),
	(13,'videocon',7,'test','2018-10-08 08:57:37',0,'2018-10-08 08:57:37',0),
	(14,'redmi',8,'test','2018-10-08 08:58:45',0,'2018-10-08 08:58:45',0),
	(15,'Honor',8,'test','2018-10-08 08:58:54',0,'2018-10-08 08:58:54',0),
	(16,'iphone',8,'test','2018-10-08 08:59:04',0,'2018-10-08 08:59:04',0);

/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table favorite
# ------------------------------------------------------------

DROP TABLE IF EXISTS `favorite`;

CREATE TABLE `favorite` (
  `id` mediumint(9) NOT NULL AUTO_INCREMENT,
  `user_id` mediumint(9) NOT NULL,
  `store` text NOT NULL,
  `product` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table product
# ------------------------------------------------------------

DROP TABLE IF EXISTS `product`;

CREATE TABLE `product` (
  `id` mediumint(9) NOT NULL AUTO_INCREMENT,
  `store_id` mediumint(9) NOT NULL,
  `title` varchar(150) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `description` varchar(5000) DEFAULT NULL,
  `category` varchar(120) DEFAULT NULL,
  `image` varchar(120) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_product_1_idx` (`store_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table Role
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Role`;

CREATE TABLE `Role` (
  `id'` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id'`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table RoleMapping
# ------------------------------------------------------------

DROP TABLE IF EXISTS `RoleMapping`;

CREATE TABLE `RoleMapping` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `PrincipalType` varchar(45) NOT NULL,
  `principalId` varchar(45) NOT NULL,
  `roleid` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_role_mapping_1_idx` (`roleid`),
  CONSTRAINT `fk_role_mapping_1` FOREIGN KEY (`roleid`) REFERENCES `Role` (`id'`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table service
# ------------------------------------------------------------

DROP TABLE IF EXISTS `service`;

CREATE TABLE `service` (
  `id` mediumint(9) NOT NULL AUTO_INCREMENT,
  `business_id` mediumint(9) NOT NULL,
  `tile` varchar(120) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `description` text,
  `image` varchar(120) NOT NULL,
  `status` enum('available','hide') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_id` int(11) NOT NULL,
  `modified_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_service_1_idx` (`business_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table socialUser
# ------------------------------------------------------------

DROP TABLE IF EXISTS `socialUser`;

CREATE TABLE `socialUser` (
  `id` mediumint(9) NOT NULL AUTO_INCREMENT,
  `userId` mediumint(9) NOT NULL,
  `provider` varchar(255) NOT NULL,
  `externalId` varchar(1000) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table store
# ------------------------------------------------------------

DROP TABLE IF EXISTS `store`;

CREATE TABLE `store` (
  `id` mediumint(9) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `shop_name` varchar(120) NOT NULL,
  `name` varchar(120) NOT NULL,
  `tax_id` varchar(120) NOT NULL,
  `deactivate_account` tinyint(2) DEFAULT '1',
  `store_url` varchar(255) NOT NULL,
  `site_status` tinyint(2) DEFAULT '0',
  `business_type` varchar(120) NOT NULL,
  `service` varchar(120) NOT NULL,
  `timezone` varchar(120) NOT NULL,
  `workinghours` text NOT NULL,
  `image` varchar(120) DEFAULT NULL,
  `tagline` varchar(255) NOT NULL,
  `description` text,
  `neighbourhood` varchar(512) DEFAULT NULL,
  `latitude` double DEFAULT '0',
  `longitude` double DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_id` int(11) NOT NULL,
  `modified_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_business_profile_1_idx` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table StoreCategory
# ------------------------------------------------------------

DROP TABLE IF EXISTS `StoreCategory`;

CREATE TABLE `StoreCategory` (
  `id` mediumint(9) NOT NULL AUTO_INCREMENT,
  `store_id` mediumint(9) NOT NULL,
  `categoty_id` mediumint(9) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table Uploadinformation
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Uploadinformation`;

CREATE TABLE `Uploadinformation` (
  `id` mediumint(9) NOT NULL AUTO_INCREMENT,
  `store_id` mediumint(9) NOT NULL,
  `name` varchar(120) NOT NULL,
  `type` varchar(32) NOT NULL,
  `message` varchar(255) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0 = Failure, 1 = Success',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table User
# ------------------------------------------------------------

DROP TABLE IF EXISTS `User`;

CREATE TABLE `User` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `realm` varchar(255) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `emailVerified` tinyint(4) NOT NULL,
  `verificationToken` varchar(255) DEFAULT NULL,
  `active` tinyint(4) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;

INSERT INTO `User` (`id`, `realm`, `username`, `email`, `password`, `emailVerified`, `verificationToken`, `active`, `created_at`, `modified_at`)
VALUES
	(1,'string','sherwyn','sherwyn@enqos.com','$2a$10$J.EL0WYwMnuyrW.N/f8h6uSAy82m4Tgk.XRrWPw03G1G0fg9kzikq',0,NULL,0,'2018-12-11 01:43:07','2018-12-11 01:43:07');

/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

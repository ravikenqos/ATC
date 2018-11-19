-- MySQL dump 10.13  Distrib 8.0.13, for Linux (x86_64)
--
-- Host: localhost    Database: atc
-- ------------------------------------------------------
-- Server version	8.0.13

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8mb4 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ACL`
--

DROP TABLE IF EXISTS `ACL`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ACL`
--

LOCK TABLES `ACL` WRITE;
/*!40000 ALTER TABLE `ACL` DISABLE KEYS */;
/*!40000 ALTER TABLE `ACL` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AccessToken`
--

DROP TABLE IF EXISTS `AccessToken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `AccessToken` (
  `id` varchar(255) NOT NULL,
  `ttl` int(11) DEFAULT NULL,
  `scopes` varchar(255) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AccessToken`
--

LOCK TABLES `AccessToken` WRITE;
/*!40000 ALTER TABLE `AccessToken` DISABLE KEYS */;
INSERT INTO `AccessToken` VALUES ('06vDhXW6JT9mnuopUkRxE6H3FeuXpixCjXR5I9B89JcT1l1geFf0Rc0hHzaIyEMU',1209600,NULL,'2018-11-03 16:41:01',15),('0RcmZ09GfwRes3oCt0u2iSqLAPyVCCrmmY3ivT8hWJ2TDwXTFLwfPbyD18Sgf1EX',1209600,NULL,'2018-10-27 13:39:20',1),('1mmPSYpMBtWtTk0392ABXtaud3zrirI9aJ9R3lr0YTeZmnSHCLJzRce1b9YkQD7K',1209600,NULL,'2018-10-27 13:44:30',2),('1oTalhVToyxSfPHBWxbOKyvjQwYzS6L75fOXW0YU1v1BFXjEflBUvENJt605dHSg',1209600,NULL,'2018-10-25 15:46:04',1),('1tugCBDGFFSQO7Ph2x9DiIMeEVBC2eRvpISp3KZ5CpRCpPyq127EOddjWgDhnfpx',1209600,NULL,'2018-11-05 15:45:08',7),('39k8mnIVTe22RBwCa8AHzgCo4kZx3dtYZXjzrtMXjMMjVaET1PfFhBPHUTTcCCly',1209600,NULL,'2018-10-28 11:05:08',1),('3yFujJyRnlYrUTrFkTJEjLSF7AelCOKgTsO8lO5kFTOkjVTqh5KaC86HpofzIs3r',1209600,NULL,'2018-10-26 19:30:12',1),('4DlD7Oa2rG2sN9nLEIpEXSm8FgyCAnbspIOCp9SrAtGbo72qxxod9oEwZtwLGRKM',1209600,NULL,'2018-11-05 12:28:35',1),('4E7ZSdTZItzE8CRHJZNaAxodp2nkEV7HK6gak86GqVBgUHMgYJ5N5Bj1CCRVA2h0',1209600,NULL,'2018-10-29 16:24:16',10),('59mypOOubZrGROOM8DuC9laaRCZdfSgND9JvoCgJ2kb2t6vLTl7aABj2H5uVFBWw',1209600,NULL,'2018-11-05 17:20:41',26),('5RpdOjQpwNsE3dM5W441E0pC0hTUb8t16BvCtpdTPmZsIA3Tedj0Owzhz32gUdfT',1209600,NULL,'2018-10-26 15:49:24',1),('68zR4IPmeXHoYAFz7um79qw3CP3U08UL5cn35QGAWVS1oxmpDZD02TFWaGYoAsey',1209600,NULL,'2018-11-05 12:20:19',19),('6TmaVtm6pKA9dUPUC2CWJEPhINMBPHjJxAfA1wblOLXUoj2IOtzzEfDAVfHUMUws',1209600,NULL,'2018-11-01 19:02:23',7),('70WGNBoECT5piiX48bOyPNVB1MJzMJdjJwxx1oSD3rWUDuJilPVJFD6vneQclor6',1209600,NULL,'2018-11-03 16:50:35',3),('8SFqEdRc2IBs9pA9n2VVshAeTTFwV90JgvwkMDQG6LWaa0whcMBVdtKsPfeYSPKk',1209600,NULL,'2018-11-01 18:38:37',12),('8YgZN8tBK4JGFc67BAzNZ3qEX8EBr6reYcKHa3GOD7XHutPNhQhnNYEC3VQFDxjY',1209600,NULL,'2018-11-05 07:19:34',1),('999YyaWBMiIMROGXaJZdXjPKWL0q6oyuHjywIbQpbJzS3m8q9bjPgPf9gomaoFhZ',1209600,NULL,'2018-11-01 19:17:01',3),('9jzUEueEAXeGcxVEvtbuGAKXqLGHZP9vUolJih08VIOpsLfOFVPgBBRwqwqIv1en',1209600,NULL,'2018-10-28 10:29:33',1),('Ac9xgnsZovL4gpwEs93QbFEQFyvYHzD6mRXWAvH1ATVSoDhQL3Bx2dWs6XsZLGAy',1209600,NULL,'2018-11-10 05:06:43',1),('B93SgpOPdef5uwdtjP0pnWAJhzTvmktFL4ABneA8k5sjIjPEUfFDiUR1nQIjqMsj',1209600,NULL,'2018-10-29 03:19:15',7),('bCVTSdNmC9sShPIXv57F6Uu7WjDXjUlkQ0TvcbzhjAyxBEi17VVtulWy6dKoSDXv',1209600,NULL,'2018-11-05 17:53:34',26),('Behx7NZsBVDH10uvlslJu89yDzVM7nUvGqum75PptfVigKi7U8UFUGwcDphRGVSG',1209600,NULL,'2018-10-28 11:50:29',1),('BeTQCqxoQbrSBtAJtd3KXnJFNWhEGOM7QD36hfsUwa7n2n8ZIvGK9Po76Ya8Y01X',1209600,NULL,'2018-10-28 20:59:34',2),('BLAC86kYXqMlUcCp1bQkBsEfanyFzACzhmgCxYVOkd9aAaUEEZlOZSlHvOt3DCMU',1209600,NULL,'2018-10-26 19:29:42',1),('BocDUHGcjVoQmgtvGcnfSv7oq9HZ1ZrqqkEKcsFcnTYLVs3aqmi28c0cKbMn9fYi',1209600,NULL,'2018-11-02 18:35:40',3),('ceMrlq7Kt8nqnFv3wda5ldqqF5x84IhiW6ZnpuTxke3UrmCguCPoFqpIEZRAfNOJ',1209600,NULL,'2018-11-03 18:31:56',1),('cKnABYC5t1vSeEgM8coaTpOI69wEQ68wYxpRGgnID5e40TNmiaY3jlq0XkwAw1dQ',1209600,NULL,'2018-10-31 20:29:39',3),('cPt817lGUDigAyScHv6NKbZCuQ6Q4BJwPeYSWTFFac3hJFRklFb53DZLMESnK1PI',1209600,NULL,'2018-11-05 05:52:41',1),('cxckFeRJCw8NgePzkgyMLHbBU4UCbDqFpq5taSWpMGXXFqAhANOBsVXCZVTLO0Bj',1209600,NULL,'2018-11-05 17:15:51',25),('dpdJgbQcWO9i4IhxD8PYzWJtQ50U08mIi4btlCRUbqJGntkBhOpXSB5HDtEOdMZU',1209600,NULL,'2018-10-28 11:38:40',1),('DQonasrGUDJDizzYnZqAQx5s3IKDYwM1QWpsztyDWbaPkvLlPJoMSYHh0kUAPT2L',1209600,NULL,'2018-10-27 13:57:42',3),('eLhfDHRbtcDzbYzUGocrbpeTOqjtdHn2O2EOi1VW9THeySXxyuHPpcygxog1IRQM',1209600,NULL,'2018-11-02 04:01:58',7),('EnI99W7d5iCM7rtUd7OarWKtkoWkxJt9UWLJ2PBoxhNjngoynUpvVHLfXO4YFiIh',1209600,NULL,'2018-11-05 11:44:18',1),('Eq8KDAIOGYz4AZQEZF0jDeRTPifplB7uFNP9ziHQNE84c7cx76Ar01kqXUDRGbc4',1209600,NULL,'2018-10-28 11:49:44',1),('f8FXgKtiuApU1gNmO0TYF0tx65eJNUk9eDdgPpTzqn3PbYQXZR9UDCOyZFaCZhPv',1209600,NULL,'2018-10-27 13:39:40',1),('Fbj8iCUEaalT53oKbZR6IaQzKazHgA2AAtrJP0EgHoXFW0OMh9DsKGlZ3GbR02Fs',1209600,NULL,'2018-10-28 20:59:59',2),('fJZ87g9RGlbuoCahMLG28m6Say1EWxc38xFeRt0Gr2PAFFfsqonLPtfMD8apTnwV',1209600,NULL,'2018-10-28 20:59:39',2),('fkJx79WkPNdd37UQaqUGxJeGJVwCt9zmrMEuSyteI8Tz8ECWnH2CTjUi5IrhwaEX',1209600,NULL,'2018-10-27 13:25:54',2),('Fv6CqQzEQahCHJm8NvVgUFtgT0EUvylYYGPDCC5ziuFn9NDs9cEBGB2HoDTN9yMv',1209600,NULL,'2018-11-10 06:13:00',1),('gQcVSYAt2JDsm3ANvPeJPkQuTyPnL9VqkNBCeZlhGQqztNGNn7J5dopiyoJfi0Eh',1209600,NULL,'2018-11-12 06:26:32',1),('haatL6mid1EL9SdAaQtks8VwWcA2RULtDhRpaE8byoeKgspI2YJgzDgPC6DWioy7',1209600,NULL,'2018-10-28 20:59:48',2),('HpPEDtJ0cpVSJEF8Rs40JO1YYwBlJVGK6MBnAd10C0BHvJhljkDVEFAzVikPAMbP',1209600,NULL,'2018-11-03 16:48:30',15),('hsEapqvGAbZIFLjZ8jWVnkh5EuFWnDLPXRpCwlvvhUyuEbj8gqQ4cRsvhcFIYvDg',1209600,NULL,'2018-11-05 11:24:50',1),('hUFpQ7s8Jr8JFwAg7x7GU3nFLOVJniFbArVndOAfCaAFkKogqXjWcTxZKrHfZa4T',1209600,NULL,'2018-11-05 12:32:26',23),('Hvd3QDAHCKLkvsEBygK7p4DbGkiyWIfjV89AxKNkSZAZthR2wgHlUDcc6qwmCNc3',1209600,NULL,'2018-11-08 06:34:18',1),('HyDXhhECyl6MsSu1XIxpbXoDLMLAABBOoI0XuSIS7otFDogolHbLPItHioO6TMVO',1209600,NULL,'2018-11-05 11:53:51',1),('io01A8G67ntgkEiDnLusEaPrFXc1CcDU3pk2xkQhbOjX3gEKHjr9Dx1C4BogJgIt',1209600,NULL,'2018-11-15 18:14:38',3),('jGPd51twDCkuTkDotzWDTgbNRg8Y4K293tfBETS12KMvRvIeJztyUyjy9pHaNMyH',1209600,NULL,'2018-11-01 19:03:16',3),('JL1Vhr5Ij1lEpb8BkNH6trCo1CSUMqrpogl2UGlP5114vPiSazFqHDttUMI4OWfx',1209600,NULL,'2018-10-23 11:15:43',1),('jvYLfOwxarukqd8Goqh0jSZu7iXC4cOHQ2oclwU6CNdq5bAjaB7hfVPivYCjorCp',1209600,NULL,'2018-10-26 18:14:38',1),('kIvgCPBaA507pybnz1bRfkkk1dQR6u6pT9N98oRHiMAcOsX0kWHqJFKt8oMiiQ6H',1209600,NULL,'2018-11-05 12:11:59',19),('KQrLdoMjOe5VcBB8QnVe9SECfOYs6uhkkqT7xTNFgOmocX8uPt4O3pjnOyuwjy9d',1209600,NULL,'2018-11-13 08:28:08',1),('me2ZZ5xpOT5tXvhy0YTA2tJfyMACvmVx7I6JK6V8PZOZsn6PCSPH63j7Avz2ZTtU',1209600,NULL,'2018-10-27 14:00:56',3),('mF460CvEoX8db7Z88q2o9zjBf41HZZ5hior20SyHFckZQ2Q5errAO1AhInotcgb0',1209600,NULL,'2018-11-05 17:45:47',25),('MnJFHc6VDeNJqE4qLE8wvCO4DsbCR55bnnGb9gMO891FxRszJH1oWLzTLZVveXFo',1209600,NULL,'2018-10-29 07:47:20',1),('MROMHTbVN6oHrtJczsFGfLiZqG3CmG7lnT6IXYHbUpQHwJ5EAs3EJ9KJN8kzQ4px',1209600,NULL,'2018-11-03 15:22:28',15),('mVoJNm0I7HF4hKepHF93zuVANN47b1fhPb8hxlNEmecoC4ltolMqzEroCE2nSPnT',1209600,NULL,'2018-10-25 15:41:17',1),('MxaXg28AvLA5cvEAqwI7mH3sjEeP3aYnGssaObqHtzk0hz3ot8uVpfQFFoEco75c',1209600,NULL,'2018-11-01 18:44:58',7),('N01ZVcmKqi3EIVgqveaypg6dNEZySOr5KAn99D9H5oDtfKual6yZEBLP4pLnUIEv',1209600,NULL,'2018-11-05 16:29:47',19),('ncE2edWCXzd6CDVscODWu797yaDsCbwDFPjjV3dsFcDf8MRYH3KFnvGbptgf84YD',1209600,NULL,'2018-11-05 05:53:23',1),('OBk1yiFBTVpA5QTUPAlhnwPS1AzmVVrxJivrf7zVd1jHJ2tfQAA9JXFWMqGVIPXn',1209600,NULL,'2018-11-05 17:45:02',19),('of6t7AzQDudPEQ7ngMR6TCxi2CbXEZJDK4d6kTyj3fbsBoH6k3rBrR8bWwW1yBJF',1209600,NULL,'2018-11-15 18:18:24',28),('ogOJXVT4nO0h2D0p4t3stFs7H4WMFPe79uEH6CG6l6mBGBJ6shXXTWDBXFma2uTB',1209600,NULL,'2018-10-28 21:00:05',2),('OIBCUFxviPLeGp4oJovFBBIW2HXqMULoqgUMy7SbuabpeGSWAvLj5A4apTDZgXnH',1209600,NULL,'2018-10-28 21:00:01',2),('oJtgqAAkMYBEtGvzizO0lgkEX89y6dZq0vIznpd9jc8jcWOxlrBNzroPBn9jwHLT',1209600,NULL,'2018-10-26 19:30:05',1),('opFNjlCjixhFtOGA5VmGVgsfNVEfZnmg8uoB4D434sge58ckOahyGeIgb8Ski9G8',1209600,NULL,'2018-11-05 12:19:40',19),('pgBVzLoHwDIwBaB6a0oRrCUEwjknxDv9ruyMtSHCDVcg2sIxvOTzbeAIDonY8ltf',1209600,NULL,'2018-10-27 17:38:33',3),('Pi0YVXkyzzeVoY5kKqOrmZsvHPGKrnIDiJzGIMTYzzCwNojQVh8PdWoFm28M1eqq',1209600,NULL,'2018-11-03 15:23:22',15),('pJQDCR3iIwNFDQTDLAp1obIhg79VgA6qKmCMlOsQNGJ8GziUUkeL4tJGtlyJ6nAj',1209600,NULL,'2018-10-28 11:46:41',1),('Pxd3Dt8hskQVPO3ZpwItZPPQQ4SBEyaBQwxh5ukhuDGw3M7zmXjfF3uEJAjVwdGN',1209600,NULL,'2018-11-05 16:28:56',25),('Q2ioG62YWRzGOFGl1iRYzE2IWt6Q8w2ktvQQWZs4vXyWXVv0gHEVu0XUYtDHyYpD',1209600,NULL,'2018-10-28 21:36:20',6),('Qn8ieRozJpvBUsEaZIRajghIhmTfyi91p9tMbhaJL9UmVtp9WUimWicU3BKZVHq0',1209600,NULL,'2018-11-05 08:46:38',1),('QpDCie2cH6Ml79nvSGN0TjVWmHj14RMEB9xnrBfLOEpNOHyqUKDJmM0gKxSzs9gI',1209600,NULL,'2018-10-28 20:59:41',2),('qTCOiSvujGGX9W9NTyMGRzkW5NtguNt4BRJgdIZbgF0HHwcrt5EgPPAihSztW9Co',1209600,NULL,'2018-11-01 18:36:01',7),('QyHEWCB0i4XJMyeGECr3cuHoNPIlAHpD4cJu8SInWyPDprVDU4DmD7ZP7UBP4CIg',1209600,NULL,'2018-11-05 17:16:43',1),('Qyvy5qnCILaWWVWOCE344xotnxYiVrjRea6PIAMNpQWjnWVggwwEW449Y2HrrFpu',1209600,NULL,'2018-10-28 20:59:50',2),('QZraG5ww4yYn7r0RFY2C2hbXHz1VOmBnkQfm9YYLgQjjd600POhNVQTAz9Lnr1HX',1209600,NULL,'2018-10-26 19:30:07',1),('R8PX2XS0PkQZuvsRWmXT4D6CzUy1HjZxMutBwpL023ooBMqmgd0G3wpTqW6WcEEU',1209600,NULL,'2018-10-29 06:49:01',1),('sQCfvrYWoCz9h3LZSmCucySTuPtHoCC2uA8HbCoQNODPwA87EgDFdgpkoDvjFafA',1209600,NULL,'2018-10-29 07:24:49',1),('STM1uH46HcqLxEg4IIsyUUY3E1NaBsOZxcqSbxLsOJURtm3IH9MDKNrRxBEaKViE',1209600,NULL,'2018-11-05 17:12:02',19),('t3O7xCfcPkZeaM2xDU9vkon0b6AC43DBUS7gvS9FzqWSoatcooODNUlmhq7Ljse1',1209600,NULL,'2018-10-28 21:00:07',2),('TuFdYxkZevDIKDtIRkVmQ2IT9ZwmxbE3oO3xPHpRBRPRB5cfg8N8qEa6pqX9PBNW',1209600,NULL,'2018-11-09 17:02:28',1),('tVjrp3qUDtDKcnBLH5ld8NUbvkXPHZaKBGXE4lPqb1NzaXqkOhmXNujtuL2FHabe',1209600,NULL,'2018-11-05 12:46:55',1),('U8kK6ALztpNM7FBmW08kGTXs0nCwVon2547NaPYksWQFfIWvJuA9AUKBhy8gBNoY',1209600,NULL,'2018-10-28 21:40:46',6),('ufG8T5hR7nhPBnEr2ewMnDX2ugXOpaNyMNsRiKJKdupxTCHUjfcIQAhTQjV7MRW3',1209600,NULL,'2018-11-13 08:31:02',1),('uhiKB1MHYgqU0GeQq7M6w0jl3YO43v7992zlmLFYwJwmub1JCNbTdRBXUGrFZecU',1209600,NULL,'2018-11-05 17:00:46',1),('UnIil2Ua8tTPfBwsRFDyo5PkXMbnWSUtpE0rvnVEPYVlgoP8U3Qq7mtGbXBVQQ4m',1209600,NULL,'2018-10-27 14:00:27',3),('UoG378fZv5Ltx1N9zR7WtIm56f31FNt4DVGJ6n4zsOijHYPQdH7z7LLAiGSxHiHp',1209600,NULL,'2018-11-05 12:04:01',19),('uSOxJHCif1vXtA7nAQ18hsqhjte1pjQfVHuCALl9PrwuppY3STD3aA0oiEo8BxDB',1209600,NULL,'2018-10-31 20:16:44',7),('VbFQeSFiakwXbijC1p4dgV1lvysS8lGdqdYJ53stvgx8kk5lfHwuHMfquNNC5NHu',1209600,NULL,'2018-11-05 17:16:57',1),('VV74BZRgW4HnTvoFnn4EI4kEvvSkMoDYuXfAB2STByWWEQQMEHTw6A9u2DOT5tLK',1209600,NULL,'2018-11-05 13:04:42',1),('VWBrf6xeS1NcFD3kJ2mwhLBxbvgiEmCkfzSlq1mzI96dv9YJw2gLsDFDfG81Eucl',1209600,NULL,'2018-11-05 17:12:34',19),('WCs94Q24iQcVNb6QFDnoDx475gs7RlAzfdKpnDrGMeRlqGZBQcp5zgEP8KeErcwg',1209600,NULL,'2018-11-05 16:17:28',3),('WJOJXc5wkIz7KWZ2gXka8noavP70cDERCFEHK8gVJhyiDGHFuBm4Pqw16H7357q7',1209600,NULL,'2018-11-05 12:34:48',1),('WkZPUFQP2JBc5KMwy8ZiKlBZZOJACVPmTj6IEFuBFmtOwpPz9XVWtBffhjjK5gDU',1209600,NULL,'2018-10-26 19:30:11',1),('WoZP4reT52Yky8wFiHUWw4mO8yAMNYL9SeY7froR9fui1BjfEC9uDaBWL6JxHxjC',1209600,NULL,'2018-11-05 07:59:24',1),('WRYZ1qs7ROk5PZ4gbP6x1JgZ352EqDnIDzvJNRvOZS6ymQw6tcA4PMPTlIONxLra',1209600,NULL,'2018-10-29 17:19:21',11),('X1h2xbzfAtVcIwl3wIVmwD5fEhf4jdLRvclU7W3VJwUnYbi1xidO131qaIwbo7AW',1209600,NULL,'2018-10-27 19:14:32',3),('XCmbJZeqNlIAas5tcHCnEwvx5ifkMWiYnTR8J5IitNFKQCcRUTT0s0SWHRecSjwJ',1209600,NULL,'2018-11-05 08:01:04',1),('xk7J6JBDWA80r1f5yIv4i0mHC9UQD6EZsGnElEEsVCcSkevgDxjTaOqu9cmXV1Gv',1209600,NULL,'2018-10-22 11:09:22',1),('XlRW3T9S0E2D1EOmIOOYrJAuEi3MqCiE0Ij65fs8cXByBvwJ0jXsAkKU6wq28y1H',1209600,NULL,'2018-11-05 12:03:12',18),('XYTrd9Ks3yl8iWGbF1bzAjN8OrebFqg8NUjCDdk2cSB3vYIoflozeMBSMJPwlQWG',1209600,NULL,'2018-11-01 18:37:48',7),('YknuYuBdATARkTubo1J2NCQ7KRf6YjgLK1Btx2w3MXV5NhzLLVnNrc0yYzYjcI2D',1209600,NULL,'2018-11-05 11:23:30',1),('yvIu2ZaA4xj1KC33sc2tXVXHrdVd5cRkjLic95E4F78P0bRKoyMSAt6AYNBGxPif',1209600,NULL,'2018-11-05 13:58:26',7),('yxapezHgDiOw59vWnwdsGaFgf6r5l9qFYHu5GhzYz4WCOEpIEBiZaRCJ4bk3Qc6q',1209600,NULL,'2018-10-25 15:47:10',1),('ZIRNRCoRTFVGpJyaEwWBilBzoT51osT2dWcmvXRrIYke8urtw9rMFwMV3cIzJWFY',1209600,NULL,'2018-10-26 19:30:13',1);
/*!40000 ALTER TABLE `AccessToken` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Role`
--

DROP TABLE IF EXISTS `Role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Role` (
  `id'` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id'`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Role`
--

LOCK TABLES `Role` WRITE;
/*!40000 ALTER TABLE `Role` DISABLE KEYS */;
/*!40000 ALTER TABLE `Role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `RoleMapping`
--

DROP TABLE IF EXISTS `RoleMapping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RoleMapping`
--

LOCK TABLES `RoleMapping` WRITE;
/*!40000 ALTER TABLE `RoleMapping` DISABLE KEYS */;
/*!40000 ALTER TABLE `RoleMapping` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `StoreCategory`
--

DROP TABLE IF EXISTS `StoreCategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `StoreCategory` (
  `id` mediumint(9) NOT NULL AUTO_INCREMENT,
  `store_id` mediumint(9) NOT NULL,
  `categoty_id` mediumint(9) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `StoreCategory`
--

LOCK TABLES `StoreCategory` WRITE;
/*!40000 ALTER TABLE `StoreCategory` DISABLE KEYS */;
INSERT INTO `StoreCategory` VALUES (1,7,6),(2,6,6),(3,6,5);
/*!40000 ALTER TABLE `StoreCategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Uploadinformation`
--

DROP TABLE IF EXISTS `Uploadinformation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Uploadinformation` (
  `id` mediumint(9) NOT NULL AUTO_INCREMENT,
  `store_id` mediumint(9) NOT NULL,
  `name` varchar(120) NOT NULL,
  `type` varchar(32) NOT NULL,
  `message` varchar(255) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0 = Failure, 1 = Success',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Uploadinformation`
--

LOCK TABLES `Uploadinformation` WRITE;
/*!40000 ALTER TABLE `Uploadinformation` DISABLE KEYS */;
INSERT INTO `Uploadinformation` VALUES (1,110,'csvfile_1541413291938.csv','product','Success',1,'2018-11-05 10:22:50'),(2,210,'csvfile_1541413573108.csv','product','Success',1,'2018-11-05 10:26:13'),(3,210,'csvfile_1541418295675.csv','product','Success',1,'2018-11-05 11:44:55'),(4,210,'csvfile_1541418500789.csv','product','Success',1,'2018-11-05 11:48:20'),(5,210,'csvfile_1541423091744.csv','product','Success',1,'2018-11-05 13:04:52'),(6,210,'csvfile_1541437302083.csv','product','Image url is inavlid at row:1',0,'2018-11-05 17:01:42'),(7,210,'csvfile_1541450779367.csv','product','Success',1,'2018-11-05 20:46:19'),(8,210,'csvfile_1541665784394.csv','product','Success',1,'2018-11-08 08:29:44'),(9,210,'csvfile_1541665795561.csv','product','Success',1,'2018-11-08 08:29:55'),(10,210,'csvfile_1541669820757.csv','product','Success',1,'2018-11-08 09:37:00'),(11,210,'csvfile_1541669894467.csv','product','Success',1,'2018-11-08 09:38:14'),(12,210,'csvfile_1541677920953.csv','product','Success',1,'2018-11-08 11:52:01'),(13,210,'csvfile_1541677953825.csv','product','Success',1,'2018-11-08 11:52:33'),(14,210,'csvfile_1541678036941.csv','product','Success',1,'2018-11-08 11:53:57'),(15,210,'csvfile_1541678090497.csv','product','Success',1,'2018-11-08 11:54:50'),(16,210,'csvfile_1541678395192.csv','product','Success',1,'2018-11-08 11:59:55'),(17,210,'csvfile_1541782967436.csv','product','Success',1,'2018-11-09 17:02:47'),(18,0,'string','string','string',0,'2018-11-13 08:30:03');
/*!40000 ALTER TABLE `Uploadinformation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
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
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (1,'string','Ravikumar','ravik@enqos.com','$2a$10$bCQY5l0GLkIqVTJuxL6cuO84RMVBxfVxb7trZWVN4FTZ1Xomz3tnW',0,NULL,0,'2018-10-22 11:08:00','2018-10-22 11:08:00'),(2,NULL,'testme','testme@enqos.com','$2a$10$wCoRIS5cEJ2G07LMdHLXju/f0Fw7pJm1zGMCjZnkNuCJDPT39xAiy',0,NULL,0,'2018-10-27 13:25:53','2018-10-27 13:25:53'),(3,NULL,'vinothl@enqos.com','vinothl@enqos.com','$2a$10$jLbb/NptvaWXcKdXSYFr8OwqlTik4cvrVj0PMFMJa.kruyO4owqF2',0,NULL,0,'2018-10-27 13:56:54','2018-10-27 13:56:54'),(4,'','testx','testx1@enqos.com','$2a$10$X4EYM4hwDMke/8otH8WTg.EcogKiqX14zQogsB6yhDoHf2nSSzwA6',0,NULL,0,'2018-10-28 21:28:50','2018-10-28 21:28:50'),(5,'','testx1','test21@enqos.com','$2a$10$OHe0RBfM4Nuu74nvYrErtOvlR777Gknfb/dpvjRs.MQiswc64oXp2',0,NULL,0,'2018-10-28 21:29:44','2018-10-28 21:29:44'),(6,'','dhandapanicegian@gmail.com','dhandapanicegian@gmail.com','$2a$10$4Z2EcnI9MJJGI/8H0VtPpOJjO05GxL8HvAjb3rkxJzt3IOXqwEb3m',0,NULL,0,'2018-10-28 21:33:06','2018-10-28 21:33:06'),(7,NULL,'vinotrt46@gmail.com','vinotrt46@gmail.com','$2a$10$TVa6u3zkOh3OKGMoqb1rrOihcFe94obOgh9higZGu8I1Ln8vN06we',0,NULL,0,'2018-10-29 03:19:15','2018-10-29 03:19:15'),(8,'','dptest@enqos.com','dptest@enqos.com','$2a$10$GSei7BiwMivdN4nIXAqbQuEky9VWZuo90fhow1uSCoECXmtO.v5IW',0,NULL,0,'2018-10-29 16:18:41','2018-10-29 16:18:41'),(9,'','testlogin@enqos.com','testlogin@enqos.com','$2a$10$jdT6uXJ.hbxLiLd31QszNOyZb3obCCNsCg0UxuDDWjYtBVM5GpiT2',0,NULL,0,'2018-10-29 16:20:22','2018-10-29 16:20:22'),(10,'','testsignup@enqos.com','testsignup@enqos.com','$2a$10$.5OtPlYMx4rsZ6V8KeYIouMdOssbvByKNebPIbrtTYiSi6QrbhJdm',0,NULL,0,'2018-10-29 16:23:48','2018-10-29 16:23:48'),(11,NULL,'leons@gmail.com','leons@gmail.com','$2a$10$jzfowK8cEjzxgc0kWKckrebqeBnZKOqtxiEKfoVZg3HNYy9Y0ruWi',0,NULL,0,'2018-10-29 17:18:55','2018-10-29 17:18:55'),(12,NULL,'vino@gmail.com','vino@gmail.com','$2a$10$n00j.my.s7KEke5ZDeLnK.P1Sd8Sf4cyt6xiKMP9vuNZpytvVcALO',0,NULL,0,'2018-11-01 18:25:20','2018-11-01 18:25:20'),(13,NULL,'leons@enqos.com','leons@enqos.com','$2a$10$co8kUOz8gDT2y2O7SUqmje6YuISSytHyY0nsZXdNOOJbcKOl4hyPa',0,NULL,0,'2018-11-01 19:04:21','2018-11-01 19:04:21'),(14,NULL,'vlenin@gmail.com','vlenin@gmail.com','$2a$10$wmmG4cgwBivUD40.lT1bSukyROEezAJplQVK91mMaWa/ZAZMGLbGC',0,NULL,0,'2018-11-02 04:09:21','2018-11-02 04:09:21'),(15,NULL,'joycekishta@gmail.com','joycekishta@gmail.com','$2a$10$f3Lv2OLmabTyFN3C1NrKNOSfsHAAF.bduW8T6VQntHev.yHf06hEe',0,NULL,0,'2018-11-03 15:22:27','2018-11-03 15:22:27'),(16,NULL,'vinoth@enqos.com','vinoth@enqos.com','$2a$10$PTwI9kW/D4DMQVb3Dcctx.wEANUuEbJu14NjqskNPMZtiWdrtbjxi',0,NULL,0,'2018-11-03 17:00:21','2018-11-03 17:00:21'),(17,NULL,'test1@gmail.com','test1@gmail.com','$2a$10$X2VbGO8qR05x3hRh22z8juNs.rKQjSkD8h1jXvwvrsO1EoTyiKa16',0,NULL,0,'2018-11-05 12:01:44','2018-11-05 12:01:44'),(18,NULL,'_','raviktry@enqos.com','$2a$10$Ibcyc/VEz1nr4yUNLJ84Qua3pNep/fSHPKXC3Yd74dS7yMeOSnRAW',0,NULL,0,'2018-11-05 12:02:53','2018-11-05 12:02:53'),(19,NULL,'enqtestingdevice@enqos.com','enqtestingdevice@enqos.com','$2a$10$zWF/.miZYZG5/rCflLIDrO62TjFRJE3LWB93KQaee3aDhc/lFwnSe',0,NULL,0,'2018-11-05 12:04:00','2018-11-05 12:04:00'),(20,'string','raviyu','testtryu@enqos.com','$2a$10$mgEDotQmNh.oxzYTS/tZfuraW2W2LcPVsVmSi2ci4KQWJSp6HSsYG',0,NULL,0,'2018-11-05 12:15:18','2018-11-05 12:15:18'),(21,NULL,'rt','testtryu12@enqos.com','$2a$10$aOpYUGSPvblFMyeizwCUkOchdVv3BI71k6SXeSwYyj.weDYt9RMqi',0,NULL,0,'2018-11-05 12:16:18','2018-11-05 12:16:18'),(22,NULL,'sad','santry@enqos.com','$2a$10$gAQwEcww2XgFsZC0G4SN4.CWJRDpIwBHtJxIi2R5yw8XnJshcJdAK',0,NULL,0,'2018-11-05 12:17:12','2018-11-05 12:17:12'),(23,NULL,'myrk@enqos.com','myrk@enqos.com','$2a$10$WF5p9syvzoRQyYUirfCI1eKrI8zt8ejD5wCgRLGNNyy2shkgexFy.',0,NULL,0,'2018-11-05 12:32:07','2018-11-05 12:32:07'),(24,NULL,'meelese@enqos.com','meelese@enqos.com','$2a$10$uG9KlugbjD/2gpDSQF6OqO50gUFUR1bgPSf3ZVSy16w6cBJf6AYPa',0,NULL,0,'2018-11-05 12:35:10','2018-11-05 12:35:10'),(25,NULL,'leonsattesting@gmail.com','leonsattesting@gmail.com','$2a$10$3Ey6OcKSyk2hypOYXJ9cve56A7sdcVEJ1YE5MRYSy54U0T3ozbMbi',0,NULL,0,'2018-11-05 16:28:56','2018-11-05 16:28:56'),(26,NULL,'leonsp@enqos.com','leonsp@enqos.com','$2a$10$oVwu.p6JHZcH1iaemOYQH.bC6SBg04/wjVoch9lXGzG/f6uaU/wO6',0,NULL,0,'2018-11-05 17:18:21','2018-11-05 17:18:21'),(27,NULL,'leons12@gmail.com','leons12@gmail.com','$2a$10$yFwUKgsLuA.c8J/XFI1owOwo7k3v.1UV3cdf.w9yANNzcvGmVLULu',0,NULL,0,'2018-11-05 17:43:39','2018-11-05 17:43:39'),(28,NULL,'vin@gmail.com','vin@gmail.com','$2a$10$A7n8b6nrRPlY8.EP0y/z..A2FHJbQBMswIp0BcplV0qWTMwXBFd26',0,NULL,0,'2018-11-15 18:16:06','2018-11-15 18:16:06');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `atc_category`
--

DROP TABLE IF EXISTS `atc_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `atc_category`
--

LOCK TABLES `atc_category` WRITE;
/*!40000 ALTER TABLE `atc_category` DISABLE KEYS */;
/*!40000 ALTER TABLE `atc_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bulkupload`
--

DROP TABLE IF EXISTS `bulkupload`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `bulkupload` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(120) NOT NULL,
  `details` text NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bulkupload`
--

LOCK TABLES `bulkupload` WRITE;
/*!40000 ALTER TABLE `bulkupload` DISABLE KEYS */;
INSERT INTO `bulkupload` VALUES (1,'string','string','string'),(2,'sadsa','saasd','sadas');
/*!40000 ALTER TABLE `bulkupload` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'fashion',0,NULL,'2018-10-08 07:14:50',0,'2018-10-08 07:14:50',0),(5,'electronics',0,'test','2018-10-08 07:34:10',0,'2018-10-08 07:34:10',0),(6,'home',0,NULL,'2018-10-08 07:34:45',0,'2018-10-08 07:34:45',0),(8,'Mobile',5,'test','2018-10-08 08:33:11',0,'2018-10-08 08:33:11',0),(9,'refrigrator',5,'test','2018-10-08 08:33:48',0,'2018-10-08 08:33:48',0),(10,'Air Conditioner',5,'test','2018-10-08 08:34:26',0,'2018-10-08 08:34:26',0),(11,'samsung',7,'test','2018-10-08 08:56:36',0,'2018-10-08 08:56:36',0),(12,'vu',7,'test','2018-10-08 08:57:12',0,'2018-10-08 08:57:12',0),(13,'videocon',7,'test','2018-10-08 08:57:37',0,'2018-10-08 08:57:37',0),(14,'redmi',8,'test','2018-10-08 08:58:45',0,'2018-10-08 08:58:45',0),(15,'Honor',8,'test','2018-10-08 08:58:54',0,'2018-10-08 08:58:54',0),(16,'iphone',8,'test','2018-10-08 08:59:04',0,'2018-10-08 08:59:04',0);
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorite`
--

DROP TABLE IF EXISTS `favorite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `favorite` (
  `id` mediumint(9) NOT NULL AUTO_INCREMENT,
  `user_id` mediumint(9) NOT NULL,
  `store` text NOT NULL,
  `product` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorite`
--

LOCK TABLES `favorite` WRITE;
/*!40000 ALTER TABLE `favorite` DISABLE KEYS */;
INSERT INTO `favorite` VALUES (2,1,'[{\"100\":\"1\"},{\"80\":\"0\"}]','[{\"30\":\"1\"},{\"50\":\"0\"},{\"80\":\"1\"}]','2018-11-13 11:41:25'),(3,10,'[{\"10\":\"1\"},{\"20\":\"0\"}]','[{\"10\":\"1\"},{\"20\":\"0\"}]','2018-11-13 11:42:19'),(4,25,'[{\"100\":\"1\"},{\"80\":\"0\"}]','[{\"10\":\"1\"},{\"20\":\"0\"}]','2018-11-13 11:43:10'),(5,12,'[{\"10\":\"1\"},{\"20\":\"0\"}]','[{\"30\":\"1\"},{\"50\":\"0\"},{\"80\":\"1\"}]','2018-11-13 14:31:55'),(6,210,'[{\"10\":\"1\"},{\"20\":\"0\"}]','[{\"30\":\"1\"},{\"50\":\"0\"},{\"80\":\"1\"}]','2018-11-13 15:07:04'),(7,210,'[{\"storeid\":\"10\",\"isfavorite\":\"1\"},{\"storeid\":\"100\",\"isfavorite\":\"1\"}]','[{\"productid\":\"30\",\"isfavorite\":\"1\"},{\"productid\":\"300\",\"isfavorite\":\"1\"}]','2018-11-13 15:42:03'),(8,220,'[{\"storeid\":\"130\",\"isfavorite\":\"1\"},{\"storeid\":\"100\",\"isfavorite\":\"1\"}]','[{\"productid\":\"30\",\"isfavorite\":\"1\"},{\"productid\":\"300\",\"isfavorite\":\"1\"}]','2018-11-13 15:42:59');
/*!40000 ALTER TABLE `favorite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
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
) ENGINE=InnoDB AUTO_INCREMENT=146 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,110,'Head and shoulder shampoo',4.00,'test','shampoo','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-05 10:22:50','2018-11-05 10:22:50'),(2,110,'Samsung 50-inch',1110.00,'test','samsung','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-05 10:22:50','2018-11-05 10:22:50'),(3,110,'Philips trimmer',150.00,'test','philips','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-05 10:22:50','2018-11-05 10:22:50'),(4,110,'Dove soap',2.00,'test','soap','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-05 10:22:50','2018-11-05 10:22:50'),(5,110,'colgate',1.00,'test','toothpaste','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-05 10:22:50','2018-11-05 10:22:50'),(6,110,'dfgdfg',10.00,'test','biscuits','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-05 10:22:50','2018-11-05 10:22:50'),(7,110,'pizza',5.00,'test','dfgdfg','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-05 10:22:50','2018-11-05 10:22:50'),(8,110,'coke',8.00,'test',' Coffee, Tea & Beverages','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-05 10:22:50','2018-11-05 10:22:50'),(9,110,'sparks',10.00,'test','men shoes','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-05 10:22:50','2018-11-05 10:22:50'),(10,210,'Head and shoulder shampoo',4.00,'test','shampoo','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-05 10:26:13','2018-11-05 10:26:13'),(11,210,'Samsung 50-inch',1110.00,'test','samsung','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-05 10:26:13','2018-11-05 10:26:13'),(12,210,'Philips trimmer',150.00,'test','philips','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-05 10:26:13','2018-11-05 10:26:13'),(13,210,'Dove soap',2.00,'test','soap','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-05 10:26:13','2018-11-05 10:26:13'),(14,210,'colgate',1.00,'test','toothpaste','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-05 10:26:13','2018-11-05 10:26:13'),(15,210,'dfgdfg',10.00,'test','biscuits','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-05 10:26:13','2018-11-05 10:26:13'),(16,210,'pizza',5.00,'test','dfgdfg','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-05 10:26:13','2018-11-05 10:26:13'),(17,210,'coke',8.00,'test',' Coffee, Tea & Beverages','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-05 10:26:13','2018-11-05 10:26:13'),(18,210,'sparks',10.00,'test','men shoes','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-05 10:26:13','2018-11-05 10:26:13'),(19,210,'Head and shoulder shampoo',4.00,'test','shampoo','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-05 11:44:55','2018-11-05 11:44:55'),(20,210,'Samsung 50-inch',1110.00,'test','samsung','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-05 11:44:55','2018-11-05 11:44:55'),(21,210,'Philips trimmer',150.00,'test','philips','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-05 11:44:55','2018-11-05 11:44:55'),(22,210,'Dove soap',2.00,'test','soap','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-05 11:44:55','2018-11-05 11:44:55'),(23,210,'colgate',1.00,'test','toothpaste','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-05 11:44:55','2018-11-05 11:44:55'),(24,210,'dfgdfg',10.00,'test','biscuits','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-05 11:44:55','2018-11-05 11:44:55'),(25,210,'pizza',5.00,'test','dfgdfg','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-05 11:44:55','2018-11-05 11:44:55'),(26,210,'coke',8.00,'test',' Coffee, Tea & Beverages','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-05 11:44:55','2018-11-05 11:44:55'),(27,210,'sparks',10.00,'test','men shoes','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-05 11:44:55','2018-11-05 11:44:55'),(28,210,'sparks',10.00,'test','men shoes','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-05 11:48:20','2018-11-05 11:48:20'),(29,210,'Head and shoulder shampoo',4.00,'test','shampoo','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-05 11:48:20','2018-11-05 11:48:20'),(30,210,'Samsung 50-inch',1110.00,'test','samsung','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-05 11:48:20','2018-11-05 11:48:20'),(31,210,'Philips trimmer',150.00,'test','philips','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-05 11:48:20','2018-11-05 11:48:20'),(32,210,'Dove soap',2.00,'test','soap','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-05 11:48:20','2018-11-05 11:48:20'),(33,210,'colgate',1.00,'test','toothpaste','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-05 11:48:20','2018-11-05 11:48:20'),(34,210,'dfgdfg',10.00,'test','biscuits','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-05 11:48:20','2018-11-05 11:48:20'),(35,210,'pizza',5.00,'test','dfgdfg','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-05 11:48:20','2018-11-05 11:48:20'),(36,210,'coke',8.00,'test',' Coffee, Tea & Beverages','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-05 11:48:20','2018-11-05 11:48:20'),(37,210,'sparks',10.00,'test','men shoes','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-05 13:04:52','2018-11-05 13:04:52'),(38,210,'Head and shoulder shampoo',4.00,'test','shampoo','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-05 13:04:52','2018-11-05 13:04:52'),(39,210,'Samsung 50-inch',1110.00,'test','samsung','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-05 13:04:52','2018-11-05 13:04:52'),(40,210,'Philips trimmer',150.00,'test','philips','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-05 13:04:52','2018-11-05 13:04:52'),(41,210,'Dove soap',2.00,'test','soap','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-05 13:04:52','2018-11-05 13:04:52'),(42,210,'colgate',1.00,'test','toothpaste','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-05 13:04:52','2018-11-05 13:04:52'),(43,210,'dfgdfg',10.00,'test','biscuits','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-05 13:04:52','2018-11-05 13:04:52'),(44,210,'pizza',5.00,'test','dfgdfg','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-05 13:04:52','2018-11-05 13:04:52'),(45,210,'coke',8.00,'test',' Coffee, Tea & Beverages','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-05 13:04:52','2018-11-05 13:04:52'),(46,210,'sparks',10.00,'test','men shoes','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-05 20:46:19','2018-11-05 20:46:19'),(47,210,'Head and shoulder shampoo',4.00,'test','shampoo','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-05 20:46:19','2018-11-05 20:46:19'),(48,210,'Samsung 50-inch',1110.00,'test','samsung','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-05 20:46:19','2018-11-05 20:46:19'),(49,210,'Philips trimmer',150.00,'test','philips','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-05 20:46:19','2018-11-05 20:46:19'),(50,210,'Dove soap',2.00,'test','soap','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-05 20:46:19','2018-11-05 20:46:19'),(51,210,'colgate',1.00,'test','toothpaste','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-05 20:46:19','2018-11-05 20:46:19'),(52,210,'dfgdfg',10.00,'test','biscuits','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-05 20:46:19','2018-11-05 20:46:19'),(53,210,'pizza',5.00,'test','dfgdfg','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-05 20:46:19','2018-11-05 20:46:19'),(54,210,'coke',8.00,'test',' Coffee, Tea & Beverages','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-05 20:46:19','2018-11-05 20:46:19'),(55,210,'Head and shoulder shampoo',4.00,'test','shampoo','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-08 08:29:44','2018-11-08 08:29:44'),(56,210,'Samsung 50-inch',1110.00,'test','samsung','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-08 08:29:44','2018-11-08 08:29:44'),(57,210,'dfgdfg',10.00,'test','biscuits','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-08 08:29:44','2018-11-08 08:29:44'),(58,210,'Dove soap',2.00,'test','soap','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-08 08:29:44','2018-11-08 08:29:44'),(59,210,'pizza',5.00,'test','dfgdfg','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-08 08:29:44','2018-11-08 08:29:44'),(60,210,'colgate',1.00,'test','toothpaste','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-08 08:29:44','2018-11-08 08:29:44'),(61,210,'Philips trimmer',150.00,'test','philips','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-08 08:29:44','2018-11-08 08:29:44'),(62,210,'sparks',10.00,'test','men shoes','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-08 08:29:44','2018-11-08 08:29:44'),(63,210,'coke',8.00,'test',' Coffee, Tea & Beverages','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-08 08:29:44','2018-11-08 08:29:44'),(64,210,'sparks',10.00,'test','men shoes','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-08 08:29:55','2018-11-08 08:29:55'),(65,210,'Head and shoulder shampoo',4.00,'test','shampoo','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-08 08:29:55','2018-11-08 08:29:55'),(66,210,'Samsung 50-inch',1110.00,'test','samsung','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-08 08:29:55','2018-11-08 08:29:55'),(67,210,'Philips trimmer',150.00,'test','philips','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-08 08:29:55','2018-11-08 08:29:55'),(68,210,'Dove soap',2.00,'test','soap','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-08 08:29:55','2018-11-08 08:29:55'),(69,210,'colgate',1.00,'test','toothpaste','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-08 08:29:55','2018-11-08 08:29:55'),(70,210,'dfgdfg',10.00,'test','biscuits','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-08 08:29:55','2018-11-08 08:29:55'),(71,210,'pizza',5.00,'test','dfgdfg','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-08 08:29:55','2018-11-08 08:29:55'),(72,210,'coke',8.00,'test',' Coffee, Tea & Beverages','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-08 08:29:55','2018-11-08 08:29:55'),(73,210,'sparks',10.00,'test','men shoes','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-08 09:37:00','2018-11-08 09:37:00'),(74,210,'Head and shoulder shampoo',4.00,'test','shampoo','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-08 09:37:00','2018-11-08 09:37:00'),(75,210,'Samsung 50-inch',1110.00,'test','samsung','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-08 09:37:00','2018-11-08 09:37:00'),(76,210,'Philips trimmer',150.00,'test','philips','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-08 09:37:00','2018-11-08 09:37:00'),(77,210,'Dove soap',2.00,'test','soap','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-08 09:37:00','2018-11-08 09:37:00'),(78,210,'colgate',1.00,'test','toothpaste','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-08 09:37:00','2018-11-08 09:37:00'),(79,210,'dfgdfg',10.00,'test','biscuits','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-08 09:37:00','2018-11-08 09:37:00'),(80,210,'pizza',5.00,'test','dfgdfg','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-08 09:37:00','2018-11-08 09:37:00'),(81,210,'coke',8.00,'test',' Coffee, Tea & Beverages','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-08 09:37:00','2018-11-08 09:37:00'),(82,210,'sparks',10.00,'test','men shoes','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-08 09:38:14','2018-11-08 09:38:14'),(83,210,'Head and shoulder shampoo',4.00,'test','shampoo','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-08 09:38:14','2018-11-08 09:38:14'),(84,210,'Samsung 50-inch',1110.00,'test','samsung','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-08 09:38:14','2018-11-08 09:38:14'),(85,210,'Philips trimmer',150.00,'test','philips','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-08 09:38:14','2018-11-08 09:38:14'),(86,210,'Dove soap',2.00,'test','soap','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-08 09:38:14','2018-11-08 09:38:14'),(87,210,'colgate',1.00,'test','toothpaste','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-08 09:38:14','2018-11-08 09:38:14'),(88,210,'dfgdfg',10.00,'test','biscuits','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-08 09:38:14','2018-11-08 09:38:14'),(89,210,'pizza',5.00,'test','dfgdfg','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-08 09:38:14','2018-11-08 09:38:14'),(90,210,'coke',8.00,'test',' Coffee, Tea & Beverages','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-08 09:38:14','2018-11-08 09:38:14'),(91,210,'sparks',10.00,'test','men shoes','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-08 11:52:01','2018-11-08 11:52:01'),(92,210,'Head and shoulder shampoo',4.00,'test','shampoo','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-08 11:52:01','2018-11-08 11:52:01'),(93,210,'Samsung 50-inch',1110.00,'test','samsung','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-08 11:52:01','2018-11-08 11:52:01'),(94,210,'Philips trimmer',150.00,'test','philips','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-08 11:52:01','2018-11-08 11:52:01'),(95,210,'Dove soap',2.00,'test','soap','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-08 11:52:01','2018-11-08 11:52:01'),(96,210,'colgate',1.00,'test','toothpaste','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-08 11:52:01','2018-11-08 11:52:01'),(97,210,'dfgdfg',10.00,'test','biscuits','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-08 11:52:01','2018-11-08 11:52:01'),(98,210,'pizza',5.00,'test','dfgdfg','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-08 11:52:01','2018-11-08 11:52:01'),(99,210,'coke',8.00,'test',' Coffee, Tea & Beverages','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-08 11:52:01','2018-11-08 11:52:01'),(100,210,'sparks',10.00,'test','men shoes','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-08 11:52:33','2018-11-08 11:52:33'),(101,210,'Head and shoulder shampoo',4.00,'test','shampoo','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-08 11:52:33','2018-11-08 11:52:33'),(102,210,'Samsung 50-inch',1110.00,'test','samsung','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-08 11:52:33','2018-11-08 11:52:33'),(103,210,'Philips trimmer',150.00,'test','philips','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-08 11:52:33','2018-11-08 11:52:33'),(104,210,'Dove soap',2.00,'test','soap','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-08 11:52:33','2018-11-08 11:52:33'),(105,210,'colgate',1.00,'test','toothpaste','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-08 11:52:33','2018-11-08 11:52:33'),(106,210,'dfgdfg',10.00,'test','biscuits','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-08 11:52:33','2018-11-08 11:52:33'),(107,210,'pizza',5.00,'test','dfgdfg','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-08 11:52:33','2018-11-08 11:52:33'),(108,210,'coke',8.00,'test',' Coffee, Tea & Beverages','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-08 11:52:33','2018-11-08 11:52:33'),(109,210,'sparks',10.00,'test','men shoes','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-08 11:53:57','2018-11-08 11:53:57'),(110,210,'Head and shoulder shampoo',4.00,'test','shampoo','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-08 11:53:57','2018-11-08 11:53:57'),(111,210,'Samsung 50-inch',1110.00,'test','samsung','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-08 11:53:57','2018-11-08 11:53:57'),(112,210,'Philips trimmer',150.00,'test','philips','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-08 11:53:57','2018-11-08 11:53:57'),(113,210,'Dove soap',2.00,'test','soap','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-08 11:53:57','2018-11-08 11:53:57'),(114,210,'colgate',1.00,'test','toothpaste','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-08 11:53:57','2018-11-08 11:53:57'),(115,210,'dfgdfg',10.00,'test','biscuits','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-08 11:53:57','2018-11-08 11:53:57'),(116,210,'pizza',5.00,'test','dfgdfg','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-08 11:53:57','2018-11-08 11:53:57'),(117,210,'coke',8.00,'test',' Coffee, Tea & Beverages','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-08 11:53:57','2018-11-08 11:53:57'),(118,210,'sparks',10.00,'test','men shoes','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-08 11:54:50','2018-11-08 11:54:50'),(119,210,'Head and shoulder shampoo',4.00,'test','shampoo','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-08 11:54:50','2018-11-08 11:54:50'),(120,210,'Samsung 50-inch',1110.00,'test','samsung','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-08 11:54:50','2018-11-08 11:54:50'),(121,210,'Philips trimmer',150.00,'test','philips','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-08 11:54:50','2018-11-08 11:54:50'),(122,210,'Dove soap',2.00,'test','soap','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-08 11:54:50','2018-11-08 11:54:50'),(123,210,'colgate',1.00,'test','toothpaste','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-08 11:54:50','2018-11-08 11:54:50'),(124,210,'dfgdfg',10.00,'test','biscuits','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-08 11:54:50','2018-11-08 11:54:50'),(125,210,'pizza',5.00,'test','dfgdfg','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-08 11:54:50','2018-11-08 11:54:50'),(126,210,'coke',8.00,'test',' Coffee, Tea & Beverages','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-08 11:54:50','2018-11-08 11:54:50'),(127,210,'sparks',10.00,'test','men shoes','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-08 11:59:55','2018-11-08 11:59:55'),(128,210,'Head and shoulder shampoo',4.00,'test','shampoo','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-08 11:59:55','2018-11-08 11:59:55'),(129,210,'Samsung 50-inch',1110.00,'test','samsung','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-08 11:59:55','2018-11-08 11:59:55'),(130,210,'Philips trimmer',150.00,'test','philips','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-08 11:59:55','2018-11-08 11:59:55'),(131,210,'Dove soap',2.00,'test','soap','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-08 11:59:55','2018-11-08 11:59:55'),(132,210,'colgate',1.00,'test','toothpaste','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-08 11:59:55','2018-11-08 11:59:55'),(133,210,'dfgdfg',10.00,'test','biscuits','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-08 11:59:55','2018-11-08 11:59:55'),(134,210,'pizza',5.00,'test','dfgdfg','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-08 11:59:55','2018-11-08 11:59:55'),(135,210,'coke',8.00,'test',' Coffee, Tea & Beverages','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-08 11:59:55','2018-11-08 11:59:55'),(136,0,'dsfdsfsd',0.00,'dsfdsfdsfds','dsfdsfds','dsfdsfdsf','2012-11-22 00:00:00','2018-11-08 13:56:51'),(137,210,'Head and shoulder shampoo',4.00,'test','shampoo','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-09 17:02:47','2018-11-09 17:02:47'),(138,210,'Samsung 50-inch',1110.00,'test','samsung','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-09 17:02:47','2018-11-09 17:02:47'),(139,210,'Philips trimmer',150.00,'test','philips','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-09 17:02:47','2018-11-09 17:02:47'),(140,210,'Dove soap',2.00,'test','soap','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-09 17:02:47','2018-11-09 17:02:47'),(141,210,'colgate',1.00,'test','toothpaste','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-09 17:02:47','2018-11-09 17:02:47'),(142,210,'dfgdfg',10.00,'test','biscuits','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-09 17:02:47','2018-11-09 17:02:47'),(143,210,'pizza',5.00,'test','dfgdfg','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-09 17:02:47','2018-11-09 17:02:47'),(144,210,'coke',8.00,'test',' Coffee, Tea & Beverages','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-09 17:02:47','2018-11-09 17:02:47'),(145,210,'sparks',10.00,'test','men shoes','https://www.incensesticks.com/1362-home_default/meditation.jpg','2018-11-09 17:02:47','2018-11-09 17:02:47');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service`
--

DROP TABLE IF EXISTS `service`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service`
--

LOCK TABLES `service` WRITE;
/*!40000 ALTER TABLE `service` DISABLE KEYS */;
/*!40000 ALTER TABLE `service` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `socialUser`
--

DROP TABLE IF EXISTS `socialUser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `socialUser` (
  `id` mediumint(9) NOT NULL AUTO_INCREMENT,
  `userId` mediumint(9) NOT NULL,
  `provider` varchar(255) NOT NULL,
  `externalId` varchar(1000) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `socialUser`
--

LOCK TABLES `socialUser` WRITE;
/*!40000 ALTER TABLE `socialUser` DISABLE KEYS */;
INSERT INTO `socialUser` VALUES (1,2,'facebook','test@123','2018-10-27 13:25:53','2018-10-27 13:25:53'),(2,7,'google','111418662081434498189','2018-10-29 03:19:15','2018-10-29 03:19:15'),(3,15,'facebook','1431267950309690','2018-11-03 15:22:27','2018-11-03 15:22:27'),(4,19,'google','113228526523145970962','2018-11-05 12:04:00','2018-11-05 12:04:00'),(5,25,'facebook','106104853731017','2018-11-05 16:28:56','2018-11-05 16:28:56');
/*!40000 ALTER TABLE `socialUser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `store`
--

DROP TABLE IF EXISTS `store`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `store`
--

LOCK TABLES `store` WRITE;
/*!40000 ALTER TABLE `store` DISABLE KEYS */;
INSERT INTO `store` VALUES (6,110,'dominos','test','2331212',0,'http://www.store.com',1,'test','test','Pacific Time Zone','{ \"Hours\" : \n    [ \n    { \"Monday\": \n        [\n            { \"Start\": \"0900\", \"Finish\": \"1300\" }\n        ]\n    },\n    { \"Tuesday\":\n        [\n            { \"Start\": \"0900\", \"Finish\": \"1300\" }\n        \n        ]\n    },\n    { \"Wednesday\":\n        [\n            { \"Start\": \"0900\", \"Finish\": \"1300\" }\n\n        ]\n    },\n    { \"Thursday\":\n        [\n            { \"Start\": \"0900\", \"Finish\": \"1300\" }\n        \n        ]\n    },\n    { \"Friday\":\n        [\n            { \"Start\": \"0900\", \"Finish\": \"1300\" }\n           \n        ]\n    },\n    { \"Saturday\":\n        []\n    },\n    { \"Sunday\":\n        []\n    }\n]\n}',NULL,'pizza, burger','this my description',NULL,24.1806197593,79.3656508901,'2018-11-12 08:39:49',110,'2018-11-12 08:39:49',110),(7,110,'dominos','test','234234324',0,'http://www.store.com',1,'test','test','Pacific Time Zone','{ \"Hours\" : \r\n    [ \r\n    { \"Monday\": \r\n        [\r\n            { \"Start\": \"0900\", \"Finish\": \"1300\" }\r\n        ]\r\n    },\r\n    { \"Tuesday\":\r\n        [\r\n            { \"Start\": \"0900\", \"Finish\": \"1300\" }\r\n        \r\n        ]\r\n    },\r\n    { \"Wednesday\":\r\n        [\r\n            { \"Start\": \"0900\", \"Finish\": \"1300\" }\r\n\r\n        ]\r\n    },\r\n    { \"Thursday\":\r\n        [\r\n            { \"Start\": \"0900\", \"Finish\": \"1300\" }\r\n        \r\n        ]\r\n    },\r\n    { \"Friday\":\r\n        [\r\n            { \"Start\": \"0900\", \"Finish\": \"1300\" }\r\n           \r\n        ]\r\n    },\r\n    { \"Saturday\":\r\n        []\r\n    },\r\n    { \"Sunday\":\r\n        []\r\n    }\r\n]\r\n}',NULL,'pizza, burger','this my description',NULL,24.1806197593,79.3656508901,'2018-11-12 10:23:55',110,'2018-11-12 10:23:55',110);
/*!40000 ALTER TABLE `store` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-11-18 19:46:58

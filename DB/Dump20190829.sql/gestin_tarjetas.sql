-- MySQL dump 10.13  Distrib 8.0.17, for Win64 (x86_64)
--
-- Host: localhost    Database: gestin
-- ------------------------------------------------------
-- Server version	5.7.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tarjetas`
--

DROP TABLE IF EXISTS `tarjetas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tarjetas` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `idInstalacion` varchar(255) DEFAULT NULL,
  `idTipoActuacion` int(11) DEFAULT NULL,
  `idNumSerie` varchar(255) DEFAULT NULL,
  `idUsuario` varchar(11) DEFAULT NULL,
  `observaciones` varchar(255) DEFAULT NULL,
  `fechaActuacion` date DEFAULT NULL,
  `precio` int(11) DEFAULT NULL,
  `activo` varchar(255) DEFAULT NULL,
  `albaran` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idInstalacion` (`idInstalacion`),
  KEY `idTipoActuación` (`idTipoActuacion`),
  KEY `idNumSerie` (`idNumSerie`),
  KEY `idUsuario` (`idUsuario`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tarjetas`
--

LOCK TABLES `tarjetas` WRITE;
/*!40000 ALTER TABLE `tarjetas` DISABLE KEYS */;
INSERT INTO `tarjetas` VALUES (1,'1',3,'1','1','asdfd','2019-08-29',0,'true',11),(2,'1',3,'2','1','a34234sfd','2019-08-28',0,'false',112),(3,'1',3,'3','1','a34234sfd1234','2019-08-27',0,'true',112),(4,'10',3,'1','1','12312','2019-08-14',23,'false',12),(5,'10',3,'2','1','123','2019-08-21',0,'true',0),(6,'1',3,'2','1','222222','2019-08-29',0,'true',1),(7,'1',3,'3','1','3123','2019-08-17',0,'true',1);
/*!40000 ALTER TABLE `tarjetas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-08-29 12:21:02

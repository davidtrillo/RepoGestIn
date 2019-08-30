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
-- Table structure for table `pantallascon`
--

DROP TABLE IF EXISTS `pantallascon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pantallascon` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `idInstalacion` varchar(255) DEFAULT NULL,
  `idTipoActuacion` int(11) DEFAULT NULL,
  `idNumSerie` int(11) DEFAULT NULL,
  `idUsuario` int(11) DEFAULT NULL,
  `observaciones` varchar(255) DEFAULT NULL,
  `fechaActuacion` date DEFAULT NULL,
  `precio` int(11) DEFAULT NULL,
  `activo` varchar(255) NOT NULL,
  `albaran` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idInstalacion` (`idInstalacion`),
  KEY `idTipoActuación` (`idTipoActuacion`),
  KEY `idNumSerie` (`idNumSerie`),
  KEY `idUsuario` (`idUsuario`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pantallascon`
--

LOCK TABLES `pantallascon` WRITE;
/*!40000 ALTER TABLE `pantallascon` DISABLE KEYS */;
INSERT INTO `pantallascon` VALUES (1,'1',3,123,1,'tdfgdfgsdfg','2019-08-22',123,'true',123);
/*!40000 ALTER TABLE `pantallascon` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-08-29 12:21:01

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
-- Table structure for table `preventivo`
--

DROP TABLE IF EXISTS `preventivo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `preventivo` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `idInstalacion` varchar(255) DEFAULT NULL,
  `idUsuario` int(11) DEFAULT NULL,
  `observacionesPreventivo` varchar(255) DEFAULT NULL,
  `fechaPreventivo` date DEFAULT NULL,
  `fechaInspeccionVoluntarioSemaforo` date DEFAULT NULL,
  `fechaInspeccionAlumbrado` date DEFAULT NULL,
  `estadoInspeccionVoluntarioSemaforo` varchar(255) DEFAULT NULL,
  `estadoInspeccionAlumbrado` varchar(255) DEFAULT NULL,
  `observacionesInspeccionVoluntarioSemaforo` varchar(255) DEFAULT NULL,
  `observacionesInspeccionAlumbrado` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idInstalacion` (`idInstalacion`),
  KEY `idUsuario` (`idUsuario`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `preventivo`
--

LOCK TABLES `preventivo` WRITE;
/*!40000 ALTER TABLE `preventivo` DISABLE KEYS */;
INSERT INTO `preventivo` VALUES (1,'209',1,'1545','2019-08-07','2019-08-07','2019-08-07','1545','1545','1545','1545'),(3,'10',1,'129','2019-08-09','2019-08-16','2019-08-16','Favorable','Favorable','129','129'),(4,'108',1,'234234','2019-08-02','2019-08-28','2019-08-09','Leve','Condicional','234234','sgfsfgdsfg');
/*!40000 ALTER TABLE `preventivo` ENABLE KEYS */;
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

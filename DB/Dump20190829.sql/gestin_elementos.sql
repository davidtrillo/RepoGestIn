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
-- Table structure for table `elementos`
--

DROP TABLE IF EXISTS `elementos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `elementos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idInstalacion` varchar(255) NOT NULL,
  `reg` int(11) NOT NULL,
  `det` int(11) NOT NULL,
  `ctv` int(11) NOT NULL,
  `central` int(11) NOT NULL,
  `08m` int(11) NOT NULL,
  `24m` int(11) NOT NULL,
  `4m` int(11) NOT NULL,
  `bac` int(11) NOT NULL,
  `sim` int(11) NOT NULL,
  `dob` int(11) NOT NULL,
  `baj` int(11) NOT NULL,
  `observaciones` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `elementos`
--

LOCK TABLES `elementos` WRITE;
/*!40000 ALTER TABLE `elementos` DISABLE KEYS */;
INSERT INTO `elementos` VALUES (1,'100',1,1,1,1,1,1,1,1,1,1,1,'1'),(2,' 426',1,1,0,0,1,1,0,1,5,0,2,''),(3,'426',1,1,0,0,1,1,0,1,5,0,2,''),(4,'425',1,0,0,0,0,5,0,2,8,1,2,''),(5,'424',1,0,0,0,0,2,1,1,12,0,1,''),(6,'934',0,1,0,0,1,2,0,0,2,0,0,'ARMARIO G-1'),(7,'423',1,0,1,1,0,2,1,3,19,0,4,''),(8,'422',1,1,0,0,1,2,1,0,12,0,0,''),(9,'421',1,2,0,0,2,0,0,2,12,1,3,''),(10,'964',1,0,0,0,0,1,0,1,4,0,2,''),(11,'965',0,3,0,0,3,0,1,0,2,0,0,'1 ARMARIO G-1'),(12,'420',1,0,1,1,0,8,0,6,12,0,7,''),(13,'419',1,0,0,0,0,11,0,4,23,0,7,''),(14,'436',1,0,0,0,0,0,1,1,11,0,1,'(*) BÁCULO DE A.P. PINTADO HASTA 4 M.'),(15,'316',1,1,0,0,1,4,0,0,6,1,0,''),(16,'315',1,0,0,0,0,5,1,1,9,1,1,''),(17,'314',1,0,0,0,0,8,0,4,20,0,6,''),(18,'307',1,1,0,0,1,1,0,2,7,0,3,''),(19,'322',1,4,0,0,4,4,2,2,16,2,3,'2,4 m. (2) Y 4 m. (2) COLUMNAS SON NUEVAS ODT'),(20,'323',1,3,0,0,3,3,0,0,2,2,0,''),(21,'300',1,1,1,1,1,11,0,5,29,2,5,'ARMARIO CTV (M1)'),(22,'311',1,3,0,1,2,6,0,4,16,2,5,''),(23,'321',1,2,0,0,2,5,2,1,14,0,1,'(*) 1 BÁCULO DE A.P. PINTADO HASTA 4 M.'),(24,'312',1,3,0,1,2,3,0,5,21,0,4,'ARMARIO CTV (NEW RITTAL)'),(25,'908',1,0,0,0,0,0,0,2,8,0,2,''),(26,'233',1,0,1,1,0,3,0,1,9,0,2,''),(27,'237',1,1,0,0,1,3,2,1,19,0,2,''),(28,'238',1,0,1,0,0,3,0,3,23,0,3,''),(29,'239',1,0,0,0,0,2,0,2,10,0,2,''),(30,'240',1,0,0,0,0,1,0,1,5,0,2,''),(31,'241',1,0,1,0,0,6,0,0,8,0,0,''),(32,'242',1,1,0,0,1,7,0,0,5,1,0,''),(33,'901',1,0,0,0,0,0,0,2,8,0,2,''),(34,'234',1,0,0,0,0,3,1,2,7,0,2,''),(35,'236',1,0,0,0,0,3,0,1,3,0,2,''),(36,'946',1,0,0,0,0,0,0,3,12,1,4,'PENDIENTE ELEMENTOS NUEVOS REFORMA'),(37,'943',1,0,0,0,0,4,0,2,4,0,3,'REFORMA: 1 UD. COL. 4 M. A 2 UDS. DE 2,4 M.'),(38,'319',1,1,0,0,1,8,0,2,16,0,2,''),(39,'305',1,0,0,0,0,4,0,2,10,2,2,''),(40,'304',1,0,0,0,0,8,0,2,17,2,2,''),(41,'303',1,1,0,0,1,3,0,3,21,1,3,''),(42,'302',1,2,1,0,2,6,0,4,23,1,4,'ARMARIO CTV (M1)'),(43,'301',1,0,0,0,0,11,0,5,28,1,5,''),(44,'320',1,0,1,0,0,1,0,3,9,3,6,'ARMARIO CTV (M1)'),(45,'318',1,0,0,0,0,6,0,2,10,0,2,''),(46,'212',1,3,0,0,3,5,0,4,17,1,4,''),(47,'228',1,0,1,0,0,5,0,3,14,3,3,'ARMARIO CTV (FIBRA DE VIDRIO)'),(48,'313',1,2,0,0,1,3,1,3,18,1,4,''),(49,'317',1,0,0,0,0,1,0,2,15,2,3,'ARMARIO DETECCIÓN A RETIRAR POR ODT'),(50,'912',1,0,0,0,0,0,0,2,8,0,2,'');
/*!40000 ALTER TABLE `elementos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-08-29 12:21:03

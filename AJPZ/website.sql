-- MySQL dump 10.13  Distrib 8.0.25, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: website
-- ------------------------------------------------------
-- Server version	8.0.19-0ubuntu5

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `website`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `website` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `website`;

--
-- Table structure for table `Addresses`
--

DROP TABLE IF EXISTS `Addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Addresses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Street_Address` varchar(255) NOT NULL,
  `Suburb_Town` varchar(255) NOT NULL,
  `State` varchar(255) NOT NULL,
  `Country` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=176 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Addresses`
--

LOCK TABLES `Addresses` WRITE;
/*!40000 ALTER TABLE `Addresses` DISABLE KEYS */;
INSERT INTO `Addresses` VALUES (170,'22 Clovelly Ave, Royal Park','Adelaide','SA','Australia'),(171,'22 Clovelly Ave, Royal Park','Adelaide','SA','Australia'),(172,'22 Clovelly Ave, Royal Park','Adelaide','SA','Australia'),(173,'22 Clovelly Ave, Royal Park','Adelaide','SA','Australia'),(174,'22 Clovelly Ave, Royal Park','Adelaide','SA','Australia'),(175,'22 Clovelly Ave, Royal Park','Adelaide','SA','Australia');
/*!40000 ALTER TABLE `Addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Check_In`
--

DROP TABLE IF EXISTS `Check_In`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Check_In` (
  `id` int NOT NULL AUTO_INCREMENT,
  `User_id` int NOT NULL,
  `Venue` int NOT NULL,
  `TimeStamp` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `User_id` (`User_id`),
  KEY `Venue` (`Venue`),
  CONSTRAINT `Check_In_ibfk_1` FOREIGN KEY (`User_id`) REFERENCES `Users` (`id`),
  CONSTRAINT `Check_In_ibfk_2` FOREIGN KEY (`Venue`) REFERENCES `Venue` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Check_In`
--

LOCK TABLES `Check_In` WRITE;
/*!40000 ALTER TABLE `Check_In` DISABLE KEYS */;
/*!40000 ALTER TABLE `Check_In` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Hostspots`
--

DROP TABLE IF EXISTS `Hostspots`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Hostspots` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Venue_id` int DEFAULT NULL,
  `TimeFrame` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Hostspots`
--

LOCK TABLES `Hostspots` WRITE;
/*!40000 ALTER TABLE `Hostspots` DISABLE KEYS */;
/*!40000 ALTER TABLE `Hostspots` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Roles`
--

DROP TABLE IF EXISTS `Roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Role_Name` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Roles`
--

LOCK TABLES `Roles` WRITE;
/*!40000 ALTER TABLE `Roles` DISABLE KEYS */;
INSERT INTO `Roles` VALUES (1,'User'),(2,'Manager');
/*!40000 ALTER TABLE `Roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Given_name` varchar(255) NOT NULL,
  `Family_name` varchar(255) NOT NULL,
  `Address` int NOT NULL,
  `Phone` varchar(14) NOT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `DOB` varchar(30) DEFAULT NULL,
  `Role` int DEFAULT NULL,
  `Password` char(60) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Address` (`Address`),
  KEY `Role` (`Role`),
  CONSTRAINT `Users_ibfk_1` FOREIGN KEY (`Address`) REFERENCES `Addresses` (`id`),
  CONSTRAINT `Users_ibfk_2` FOREIGN KEY (`Role`) REFERENCES `Roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=224 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (218,'Anderson','Chin',170,'0424850370','qwe',NULL,2,'$2b$11$vP6uiAIy62foZRSgclg.XuN7auuG72NQ.anqM9TNHsl7hxAdPk0E2'),(219,'Anderson','Chin',170,'0424850370','123123hin04@gmail.com',NULL,2,'$2b$11$GydlgiiEx8D5abY5wEz9yezyg21U4ziX1Kmpc/nUMDBZ4Don4X7C6'),(220,'Anderson','Chin',170,'0424850370','123chin04@gmail.com','2021-06-01',1,'$2b$11$wrDED/b7LFu0AYnJslKjxeCgNY0FcEl1zYtTMxfBGk61SveNPbMpy'),(221,'Anderson','Chin',170,'0424850370','anderson.chin04@gmail.com','2021-06-11',1,'$2b$11$5g3wqLoVRMsXv1HUYp1pY.mF2YxD3kot0QTI8Cg2GdV0MkCHojmoG'),(222,'Anderson','Chin',170,'0424850370','anderson.c1234@gmail.com',NULL,2,'$2b$11$RcbfcNf2V4SMWSo9zG2YZugsEljYy4sM78UvcsOIZHHRUw1/vfdw6'),(223,'Anderson','Chin',170,'0424850370','ande124son.chin04@gmail.com',NULL,2,'$2b$11$FpAeev.RxJ1gyxag9rKDQus26d/0HjDtJ5NU9JZc6DqXOxR.u.6Ci');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Venue`
--

DROP TABLE IF EXISTS `Venue`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Venue` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Venue_Name` varchar(255) DEFAULT NULL,
  `Owner` int NOT NULL,
  `isHotspot` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Owner` (`Owner`),
  CONSTRAINT `Venue_ibfk_1` FOREIGN KEY (`Owner`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Venue`
--

LOCK TABLES `Venue` WRITE;
/*!40000 ALTER TABLE `Venue` DISABLE KEYS */;
INSERT INTO `Venue` VALUES (13,'qwe',218,0),(14,'qwe',219,0),(15,'qwe',222,0),(16,'qwe',223,0);
/*!40000 ALTER TABLE `Venue` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-06-11 16:54:55

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
) ENGINE=InnoDB AUTO_INCREMENT=267 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Addresses`
--

LOCK TABLES `Addresses` WRITE;
/*!40000 ALTER TABLE `Addresses` DISABLE KEYS */;
INSERT INTO `Addresses` VALUES (258,'30 Street','Suburb','State','Country'),(259,'11 Palm Avenue','Royal Park','SA','Australia'),(260,'12 Palm Avenue','Royal Park','SA','Australia'),(261,'10 Street','Suburb Venue','State Venue','Country Venue'),(262,'venue street','venue suburb','venue state','venue country '),(263,'street venue','sure sub','str stat','country ven'),(264,'161 Melbourne St','North Adelaide','SA','Australia'),(266,'58 Woodville Rd','Woodville South','SA','Australia');
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Check_In`
--

LOCK TABLES `Check_In` WRITE;
/*!40000 ALTER TABLE `Check_In` DISABLE KEYS */;
INSERT INTO `Check_In` VALUES (1,241,46,'2021-06-14 12:19:35.507');
/*!40000 ALTER TABLE `Check_In` ENABLE KEYS */;
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
INSERT INTO `Roles` VALUES (1,'User'),(2,'Manager'),(3,'Admin');
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
  `Address` int DEFAULT NULL,
  `Phone` varchar(14) NOT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `DOB` varchar(30) DEFAULT NULL,
  `Role` int DEFAULT NULL,
  `Password` char(60) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Email` (`Email`),
  KEY `Address` (`Address`),
  KEY `Role` (`Role`),
  CONSTRAINT `Users_ibfk_1` FOREIGN KEY (`Address`) REFERENCES `Addresses` (`id`),
  CONSTRAINT `Users_ibfk_2` FOREIGN KEY (`Role`) REFERENCES `Roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=245 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (241,'Test','Case',258,'1234567890','test@gmail.com','12/12/2021',1,'$2b$11$7ljrQLGEQ6BSZI6lSbsMjee.k10NTt8/OvrXNn1cUMACUd7Whz4Iy'),(242,'Bob','Smith',NULL,'0424850370','test3@gmail.com',NULL,3,'$2b$11$VCFX7nK7HEnzL2ofKsk4muxiF65cPaLfvGETdGh68Wm4yXrT62nf2'),(243,'Bob','Last',NULL,'1234567890','test2@gmail.com',NULL,3,'$2b$11$6a2ctqGZ5x91QmvTJYEgHuSRrt61tkiGG4S7ZyikM7n0.xTl/Rwya'),(244,'Bob','ue',NULL,'1234567890','test10@gmail.com',NULL,2,'$2b$11$/JB5WSkSz8PGXX0xC2oxt.hRUcSQG2sMiFSYzkejrbHp6mnrRRDp6');
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
  `Owner` int DEFAULT NULL,
  `isHotspot` int DEFAULT NULL,
  `Address` int NOT NULL,
  `Start_Date` varchar(255) DEFAULT NULL,
  `End_Date` varchar(255) DEFAULT NULL,
  `Longitute` varchar(255) DEFAULT NULL,
  `Latitude` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Owner` (`Owner`),
  CONSTRAINT `Venue_ibfk_1` FOREIGN KEY (`Owner`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Venue`
--

LOCK TABLES `Venue` WRITE;
/*!40000 ALTER TABLE `Venue` DISABLE KEYS */;
INSERT INTO `Venue` VALUES (46,'test venue',244,0,263,NULL,NULL,NULL,NULL),(47,'The Lion Hotel',NULL,1,264,'2021-06-14','2021-06-28','138.6109899','-34.905054'),(49,'Woodville Pizza Bar',NULL,1,266,'2021-06-14','2021-06-28','138.5361438','-34.8799743');
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

-- Dump completed on 2021-06-14 13:20:22

CREATE DATABASE  IF NOT EXISTS `celiaconnectdb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `celiaconnectdb`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: celiaconnectdb
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

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
-- Table structure for table `barrio`
--

DROP TABLE IF EXISTS `barrio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `barrio` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_barrio_nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `barrio`
--

LOCK TABLES `barrio` WRITE;
/*!40000 ALTER TABLE `barrio` DISABLE KEYS */;
INSERT INTO `barrio` VALUES (1,'Agronomía'),(2,'Almagro'),(3,'Balvanera'),(4,'Barracas'),(5,'Belgrano'),(6,'Boedo'),(7,'Caballito'),(8,'Chacarita'),(9,'Coghlan'),(10,'Colegiales'),(11,'Constitución'),(12,'Flores'),(13,'Floresta'),(14,'La Boca'),(15,'La Paternal'),(16,'Liniers'),(17,'Mataderos'),(18,'Monte Castro'),(19,'Montserrat'),(20,'Nueva Pompeya'),(21,'Núñez'),(22,'Palermo'),(23,'Parque Avellaneda'),(24,'Parque Chacabuco'),(25,'Parque Chas'),(26,'Parque Patricios'),(27,'Puerto Madero'),(28,'Recoleta'),(29,'Retiro'),(30,'Saavedra'),(31,'San Cristóbal'),(32,'San Nicolás'),(33,'San Telmo'),(34,'Vélez Sarsfield'),(35,'Versalles'),(36,'Villa Crespo'),(37,'Villa del Parque'),(38,'Villa Devoto'),(39,'Villa General Mitre'),(40,'Villa Lugano'),(41,'Villa Luro'),(42,'Villa Ortúzar'),(43,'Villa Pueyrredón'),(44,'Villa Real'),(45,'Villa Riachuelo'),(46,'Villa Santa Rita'),(47,'Villa Soldati'),(48,'Villa Urquiza');
/*!40000 ALTER TABLE `barrio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `caracteristica`
--

DROP TABLE IF EXISTS `caracteristica`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `caracteristica` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `icono` varchar(255) DEFAULT NULL COMMENT 'Nombre del archivo del icono, por ejemplo menu-sin-tacc.svg',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_caracteristica_nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `caracteristica`
--

LOCK TABLES `caracteristica` WRITE;
/*!40000 ALTER TABLE `caracteristica` DISABLE KEYS */;
INSERT INTO `caracteristica` VALUES (1,'Menú Sin TACC','menu-sin-tacc.svg'),(2,'Cocina exclusiva Sin TACC','cocina-exclusiva.svg'),(3,'Opciones sin lactosa','sin-lactosa.svg'),(4,'Opciones veganas','vegano.svg'),(5,'Apto celíacos certificado','certificado.svg'),(6,'Con delivery','delivery.svg');
/*!40000 ALTER TABLE `caracteristica` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_categoria_nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` VALUES (6,'Bebidas'),(3,'Galletitas'),(1,'Harinas'),(5,'Lácteos'),(2,'Panificados'),(4,'Snacks');
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comentariolocal`
--

DROP TABLE IF EXISTS `comentariolocal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comentariolocal` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(150) DEFAULT NULL,
  `comentario` text NOT NULL,
  `calificacion` tinyint(4) NOT NULL,
  `fechaComentario` datetime NOT NULL DEFAULT current_timestamp(),
  `estado` enum('pendiente','aprobado','rechazado') NOT NULL DEFAULT 'pendiente',
  `usuarioId` int(11) NOT NULL,
  `localId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_comlocal_usuario_local` (`usuarioId`,`localId`),
  KEY `fk_comlocal_local` (`localId`),
  CONSTRAINT `fk_comlocal_local` FOREIGN KEY (`localId`) REFERENCES `local` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_comlocal_usuario` FOREIGN KEY (`usuarioId`) REFERENCES `usuario` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `chk_comlocal_calificacion` CHECK (`calificacion` between 1 and 5)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comentariolocal`
--

LOCK TABLES `comentariolocal` WRITE;
/*!40000 ALTER TABLE `comentariolocal` DISABLE KEYS */;
INSERT INTO `comentariolocal` VALUES (1,'Gran variedad','Tienen todo lo que necesito en un solo lugar, y bien identificado.',5,'2026-08-15 09:10:00','aprobado',2,1),(2,'Buenos precios','Buena atención y precios razonables para productos certificados.',4,'2026-09-01 14:20:00','aprobado',3,2),(3,'Góndola sin TACC','La góndola Sin TACC es amplia y está separada del resto.',4,'2026-09-10 10:35:00','aprobado',4,3),(4,'Atención experta','Me asesoraron muy bien sobre marcas y certificaciones.',5,'2026-09-25 22:00:00','aprobado',5,1),(5,'A veces falta stock','Buen lugar, pero algunos productos se agotan rápido.',3,'2026-10-01 18:15:00','aprobado',2,5);
/*!40000 ALTER TABLE `comentariolocal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comentarionutricionista`
--

DROP TABLE IF EXISTS `comentarionutricionista`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comentarionutricionista` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(150) DEFAULT NULL,
  `comentario` text NOT NULL,
  `calificacion` tinyint(4) NOT NULL,
  `fechaComentario` datetime NOT NULL DEFAULT current_timestamp(),
  `estado` enum('pendiente','aprobado','rechazado') NOT NULL DEFAULT 'pendiente',
  `usuarioId` int(11) NOT NULL,
  `nutricionistaId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_comnutri_usuario_nutricionista` (`usuarioId`,`nutricionistaId`),
  KEY `fk_comnutri_nutricionista` (`nutricionistaId`),
  CONSTRAINT `fk_comnutri_nutricionista` FOREIGN KEY (`nutricionistaId`) REFERENCES `nutricionista` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_comnutri_usuario` FOREIGN KEY (`usuarioId`) REFERENCES `usuario` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `chk_comnutri_calificacion` CHECK (`calificacion` between 1 and 5)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comentarionutricionista`
--

LOCK TABLES `comentarionutricionista` WRITE;
/*!40000 ALTER TABLE `comentarionutricionista` DISABLE KEYS */;
INSERT INTO `comentarionutricionista` VALUES (1,'Muy clara','Me explicó todo con paciencia y me armó un plan realista.',5,'2026-08-03 17:00:00','aprobado',2,2),(2,'Recomendable','Buen seguimiento y respuestas rápidas.',4,'2026-08-20 11:30:00','aprobado',3,2),(3,'Excelente profesional','Especializada en celiaquía, me ayudó con mi hijo.',5,'2026-09-08 16:45:00','aprobado',4,3),(4,'Atención cálida','Muy buena atención, aunque la agenda está llena.',5,'2026-10-02 10:20:00','pendiente',5,3),(5,'Buenas consultas','Consultas por videollamada muy completas.',4,'2026-09-18 19:00:00','aprobado',2,4);
/*!40000 ALTER TABLE `comentarionutricionista` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comentarioproducto`
--

DROP TABLE IF EXISTS `comentarioproducto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comentarioproducto` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(150) DEFAULT NULL,
  `comentario` text NOT NULL,
  `calificacion` tinyint(4) NOT NULL,
  `fechaComentario` datetime NOT NULL DEFAULT current_timestamp(),
  `estado` enum('pendiente','aprobado','rechazado') NOT NULL DEFAULT 'pendiente',
  `usuarioId` int(11) NOT NULL,
  `productoId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_comprod_usuario_producto` (`usuarioId`,`productoId`),
  KEY `fk_comprod_producto` (`productoId`),
  CONSTRAINT `fk_comprod_producto` FOREIGN KEY (`productoId`) REFERENCES `producto` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_comprod_usuario` FOREIGN KEY (`usuarioId`) REFERENCES `usuario` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `chk_comprod_calificacion` CHECK (`calificacion` between 1 and 5)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comentarioproducto`
--

LOCK TABLES `comentarioproducto` WRITE;
/*!40000 ALTER TABLE `comentarioproducto` DISABLE KEYS */;
INSERT INTO `comentarioproducto` VALUES (1,'Excelente pan','El pan de molde se mantiene blando varios días y no se desarma.',5,'2026-07-02 10:15:00','aprobado',2,3),(2,'Muy buenas','Galletitas ricas y bien certificadas, las compro seguido.',4,'2026-07-18 16:40:00','aprobado',3,2),(3,'Buen producto','Muy bueno, aunque cuesta encontrarlo en mi barrio.',4,'2026-10-03 12:05:00','rechazado',4,3),(4,'Rinde mucho','La harina de arroz es muy fina y sirve para todo tipo de recetas.',5,'2026-08-09 09:30:00','aprobado',5,1),(5,'Más o menos','Los chips están ricos pero todavía no figuran como certificados.',3,'2026-08-21 19:10:00','aprobado',2,9),(6,'Se rompen','Las medialunas llegaron algo desarmadas, el sabor es bueno.',2,'2026-09-02 13:25:00','aprobado',3,8),(7,'Muy buen producto.','Lo probé y me gustó mucho. Buena calidad y sabor.',5,'2026-10-19 15:57:01','aprobado',6,1),(8,'Bueno','Es barato',5,'2026-10-21 20:08:26','aprobado',6,2);
/*!40000 ALTER TABLE `comentarioproducto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comentariorestaurante`
--

DROP TABLE IF EXISTS `comentariorestaurante`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comentariorestaurante` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(150) DEFAULT NULL,
  `comentario` text NOT NULL,
  `calificacion` tinyint(4) NOT NULL,
  `fechaComentario` datetime NOT NULL DEFAULT current_timestamp(),
  `estado` enum('pendiente','aprobado','rechazado') NOT NULL DEFAULT 'pendiente',
  `usuarioId` int(11) NOT NULL,
  `restauranteId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_comrest_usuario_restaurante` (`usuarioId`,`restauranteId`),
  KEY `fk_comrest_restaurante` (`restauranteId`),
  CONSTRAINT `fk_comrest_restaurante` FOREIGN KEY (`restauranteId`) REFERENCES `restaurante` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_comrest_usuario` FOREIGN KEY (`usuarioId`) REFERENCES `usuario` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `chk_comrest_calificacion` CHECK (`calificacion` between 1 and 5)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comentariorestaurante`
--

LOCK TABLES `comentariorestaurante` WRITE;
/*!40000 ALTER TABLE `comentariorestaurante` DISABLE KEYS */;
INSERT INTO `comentariorestaurante` VALUES (1,'Excelente atención','Excelente atención, tienen opciones certificadas y separan todo en cocina.',5,'2026-10-04 11:20:00','pendiente',2,1),(2,'Dudas con la cocina','No estoy seguro de que la cocina esté libre de contaminación cruzada.',2,'2026-10-04 20:05:00','pendiente',3,3),(3,'Pan riquísimo','El pan y las facturas son lo mejor que probé sin TACC.',5,'2026-08-12 10:00:00','aprobado',4,2),(4,'Pizza muy rica','La masa sin TACC es excelente y la atención muy cuidadosa.',4,'2026-09-05 21:30:00','aprobado',5,4),(5,'Muy recomendable','Variedad de panificados y buen precio.',4,'2026-09-14 08:45:00','aprobado',2,2),(6,'Comentario fuera de tema','Este comentario no habla del lugar.',1,'2026-09-20 17:00:00','rechazado',3,6),(7,'Muy buena experiencia','Buena atención y varias opciones Sin TACC.',5,'2026-10-21 11:51:42','pendiente',6,1);
/*!40000 ALTER TABLE `comentariorestaurante` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favoritolocal`
--

DROP TABLE IF EXISTS `favoritolocal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favoritolocal` (
  `usuarioId` int(11) NOT NULL,
  `localId` int(11) NOT NULL,
  `fechaAgregado` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`usuarioId`,`localId`),
  KEY `fk_favlocal_local` (`localId`),
  CONSTRAINT `fk_favlocal_local` FOREIGN KEY (`localId`) REFERENCES `local` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_favlocal_usuario` FOREIGN KEY (`usuarioId`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favoritolocal`
--

LOCK TABLES `favoritolocal` WRITE;
/*!40000 ALTER TABLE `favoritolocal` DISABLE KEYS */;
INSERT INTO `favoritolocal` VALUES (2,1,'2026-10-05 13:17:53'),(3,2,'2026-10-05 13:17:53'),(4,3,'2026-10-05 13:17:53'),(5,1,'2026-10-05 13:17:53');
/*!40000 ALTER TABLE `favoritolocal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favoritonutricionista`
--

DROP TABLE IF EXISTS `favoritonutricionista`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favoritonutricionista` (
  `usuarioId` int(11) NOT NULL,
  `nutricionistaId` int(11) NOT NULL,
  `fechaAgregado` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`usuarioId`,`nutricionistaId`),
  KEY `fk_favnutri_nutricionista` (`nutricionistaId`),
  CONSTRAINT `fk_favnutri_nutricionista` FOREIGN KEY (`nutricionistaId`) REFERENCES `nutricionista` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_favnutri_usuario` FOREIGN KEY (`usuarioId`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favoritonutricionista`
--

LOCK TABLES `favoritonutricionista` WRITE;
/*!40000 ALTER TABLE `favoritonutricionista` DISABLE KEYS */;
INSERT INTO `favoritonutricionista` VALUES (2,2,'2026-10-05 13:17:54'),(3,3,'2026-10-05 13:17:54'),(4,2,'2026-10-05 13:17:54');
/*!40000 ALTER TABLE `favoritonutricionista` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favoritoproducto`
--

DROP TABLE IF EXISTS `favoritoproducto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favoritoproducto` (
  `usuarioId` int(11) NOT NULL,
  `productoId` int(11) NOT NULL,
  `fechaAgregado` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`usuarioId`,`productoId`),
  KEY `fk_favprod_producto` (`productoId`),
  CONSTRAINT `fk_favprod_producto` FOREIGN KEY (`productoId`) REFERENCES `producto` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_favprod_usuario` FOREIGN KEY (`usuarioId`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favoritoproducto`
--

LOCK TABLES `favoritoproducto` WRITE;
/*!40000 ALTER TABLE `favoritoproducto` DISABLE KEYS */;
INSERT INTO `favoritoproducto` VALUES (2,1,'2026-10-05 13:17:53'),(2,3,'2026-10-05 13:17:53'),(3,2,'2026-10-05 13:17:53'),(4,3,'2026-10-05 13:17:53'),(5,10,'2026-10-05 13:17:53');
/*!40000 ALTER TABLE `favoritoproducto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favoritorestaurante`
--

DROP TABLE IF EXISTS `favoritorestaurante`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favoritorestaurante` (
  `usuarioId` int(11) NOT NULL,
  `restauranteId` int(11) NOT NULL,
  `fechaAgregado` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`usuarioId`,`restauranteId`),
  KEY `fk_favrest_restaurante` (`restauranteId`),
  CONSTRAINT `fk_favrest_restaurante` FOREIGN KEY (`restauranteId`) REFERENCES `restaurante` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_favrest_usuario` FOREIGN KEY (`usuarioId`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favoritorestaurante`
--

LOCK TABLES `favoritorestaurante` WRITE;
/*!40000 ALTER TABLE `favoritorestaurante` DISABLE KEYS */;
INSERT INTO `favoritorestaurante` VALUES (2,1,'2026-10-05 13:17:53'),(2,2,'2026-10-05 13:17:53'),(3,4,'2026-10-05 13:17:53'),(4,2,'2026-10-05 13:17:53');
/*!40000 ALTER TABLE `favoritorestaurante` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `local`
--

DROP TABLE IF EXISTS `local`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `local` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `telefono` varchar(50) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `instagram` varchar(150) DEFAULT NULL,
  `sitioWeb` varchar(255) DEFAULT NULL,
  `horario` varchar(255) DEFAULT NULL,
  `latitud` decimal(10,8) DEFAULT NULL,
  `longitud` decimal(11,8) DEFAULT NULL,
  `estadoVerificacion` enum('pendiente','verificado','rechazado') NOT NULL DEFAULT 'pendiente',
  `calificacionPromedio` decimal(2,1) NOT NULL DEFAULT 0.0,
  `cantidadResenas` int(11) NOT NULL DEFAULT 0,
  `tipoLocalId` int(11) NOT NULL,
  `barrioId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_local_tipo` (`tipoLocalId`),
  KEY `fk_local_barrio` (`barrioId`),
  CONSTRAINT `fk_local_barrio` FOREIGN KEY (`barrioId`) REFERENCES `barrio` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_local_tipo` FOREIGN KEY (`tipoLocalId`) REFERENCES `tipolocal` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `local`
--

LOCK TABLES `local` WRITE;
/*!40000 ALTER TABLE `local` DISABLE KEYS */;
INSERT INTO `local` VALUES (1,'Dietética Granos del Sur','Dietética con amplia sección de harinas, galletitas y panificados sin TACC.',NULL,'Av. Rivadavia 5800','11 5555-0201','hola@granosdelsur.example.com','granosdelsur.demo','https://granosdelsur.example.com','Lun a Sáb de 9:00 a 20:00',-34.61800000,-58.44000000,'verificado',5.0,2,2,7),(2,'Almacén Natural Cuatro Estaciones','Almacén naturista con productos certificados y atención personalizada.',NULL,'Av. Triunvirato 4200','11 5555-0202','hola@cuatroestaciones.example.com','cuatroestaciones.demo',NULL,'Lun a Sáb de 9:30 a 19:30',-34.57300000,-58.48200000,'verificado',4.0,1,3,48),(3,'Súper Vida Sana','Supermercado con góndola exclusiva de productos Sin TACC.',NULL,'Av. Cabildo 1800','11 5555-0203','hola@supervidasana.example.com','supervidasana.demo','https://supervidasana.example.com','Todos los días de 8:00 a 22:00',-34.56200000,-58.45300000,'verificado',4.0,1,1,5),(4,'Verdulería La Quinta','Verduras y frutas frescas, con un sector de productos libres de gluten.',NULL,'Av. Corrientes 3900','11 5555-0204',NULL,'laquinta.demo',NULL,'Lun a Sáb de 8:00 a 20:00',-34.60400000,-58.41800000,'verificado',0.0,0,4,2),(5,'Dietética Espiga de Oro','Dietética especializada en celiaquía con envíos a domicilio.',NULL,'Av. Las Heras 2500','11 5555-0205','hola@espigadeoro.example.com','espigadeoro.demo','https://espigadeoro.example.com','Lun a Vie de 9:00 a 19:00',-34.58900000,-58.40300000,'verificado',3.0,1,2,28),(6,'Almacén Celíaco Central','Almacén naturista nuevo, pendiente de verificación.',NULL,'Av. Scalabrini Ortiz 800','11 5555-0206','hola@celiacocentral.example.com',NULL,NULL,'Lun a Sáb de 10:00 a 20:00',-34.59900000,-58.43200000,'pendiente',0.0,0,3,36);
/*!40000 ALTER TABLE `local` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `localcaracteristica`
--

DROP TABLE IF EXISTS `localcaracteristica`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `localcaracteristica` (
  `localId` int(11) NOT NULL,
  `caracteristicaId` int(11) NOT NULL,
  PRIMARY KEY (`localId`,`caracteristicaId`),
  KEY `fk_localcarac_caracteristica` (`caracteristicaId`),
  CONSTRAINT `fk_localcarac_caracteristica` FOREIGN KEY (`caracteristicaId`) REFERENCES `caracteristica` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_localcarac_local` FOREIGN KEY (`localId`) REFERENCES `local` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `localcaracteristica`
--

LOCK TABLES `localcaracteristica` WRITE;
/*!40000 ALTER TABLE `localcaracteristica` DISABLE KEYS */;
INSERT INTO `localcaracteristica` VALUES (1,3),(1,4),(1,5),(1,6),(2,4),(2,5),(3,3),(3,5),(3,6),(4,4),(5,3),(5,5),(6,5);
/*!40000 ALTER TABLE `localcaracteristica` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `marca`
--

DROP TABLE IF EXISTS `marca`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `marca` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `logo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_marca_nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marca`
--

LOCK TABLES `marca` WRITE;
/*!40000 ALTER TABLE `marca` DISABLE KEYS */;
INSERT INTO `marca` VALUES (1,'Pura Vida',NULL),(2,'Natufoods',NULL),(3,'Celisabor',NULL),(4,'GlutenFree Co.',NULL);
/*!40000 ALTER TABLE `marca` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nutricionista`
--

DROP TABLE IF EXISTS `nutricionista`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nutricionista` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `matricula` varchar(50) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `fotoPerfil` varchar(255) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `telefono` varchar(50) DEFAULT NULL,
  `tieneWhatsapp` tinyint(1) NOT NULL DEFAULT 0,
  `email` varchar(150) DEFAULT NULL,
  `instagram` varchar(150) DEFAULT NULL,
  `sitioWeb` varchar(255) DEFAULT NULL,
  `horario` varchar(255) DEFAULT NULL,
  `latitud` decimal(10,8) DEFAULT NULL,
  `longitud` decimal(11,8) DEFAULT NULL,
  `estadoVerificacion` enum('pendiente','verificado','rechazado') NOT NULL DEFAULT 'pendiente',
  `calificacionPromedio` decimal(2,1) NOT NULL DEFAULT 0.0,
  `cantidadResenas` int(11) NOT NULL DEFAULT 0,
  `barrioId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_nutricionista_matricula` (`matricula`),
  KEY `fk_nutricionista_barrio` (`barrioId`),
  CONSTRAINT `fk_nutricionista_barrio` FOREIGN KEY (`barrioId`) REFERENCES `barrio` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nutricionista`
--

LOCK TABLES `nutricionista` WRITE;
/*!40000 ALTER TABLE `nutricionista` DISABLE KEYS */;
INSERT INTO `nutricionista` VALUES (1,'Marina','Duarte','DEMO-0001','Licenciada en Nutrición. Acompañamiento en alimentación sin gluten para adultos.',NULL,'Av. Cabildo 1500, 3° B','11 5555-0401',1,'marina.duarte@example.com','lic.marinaduarte.demo',NULL,'Lun a Vie de 9:00 a 18:00',-34.56400000,-58.45000000,'pendiente',0.0,0,5),(2,'Julián','Ramírez','DEMO-0002','Nutricionista especializado en celiaquía y alimentación deportiva.',NULL,'Av. Santa Fe 3200, 5° A','11 5555-0402',1,'julian.ramirez@example.com','julian.nutri.demo',NULL,'Lun a Vie de 10:00 a 19:00',-34.58800000,-58.41000000,'verificado',4.5,2,22),(3,'Carolina','Vega','DEMO-0003','Especialista en celiaquía infantil y en armado de menús familiares.',NULL,'Av. Callao 1200, 2° C','11 5555-0403',1,'carolina.vega@example.com','carovega.nutri.demo',NULL,'Mar a Sáb de 9:00 a 17:00',-34.59200000,-58.39300000,'verificado',5.0,1,28),(4,'Martín','Sosa','DEMO-0004','Consultas presenciales y por videollamada. Plan de alimentación sin TACC.',NULL,'Av. Rivadavia 5100, 1° D','11 5555-0404',0,'martin.sosa@example.com',NULL,NULL,'Lun, Mié y Vie de 14:00 a 20:00',-34.61800000,-58.44100000,'verificado',4.0,1,7),(5,'Lucía','Benítez','DEMO-0005','Nutricionista clínica con foco en intolerancias alimentarias.',NULL,'Av. Triunvirato 4500, PB','11 5555-0405',1,'lucia.benitez@example.com','lucia.benitez.demo',NULL,'Lun a Jue de 9:00 a 15:00',-34.57000000,-58.48500000,'pendiente',0.0,0,48);
/*!40000 ALTER TABLE `nutricionista` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto`
--

DROP TABLE IF EXISTS `producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `ingredientes` text DEFAULT NULL,
  `informacionNutricional` text DEFAULT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `codigoBarras` varchar(50) DEFAULT NULL,
  `certificadoSinTacc` tinyint(1) NOT NULL DEFAULT 0,
  `fechaCreacion` datetime NOT NULL DEFAULT current_timestamp(),
  `marcaId` int(11) NOT NULL,
  `categoriaId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_producto_codigobarras` (`codigoBarras`),
  KEY `fk_producto_marca` (`marcaId`),
  KEY `fk_producto_categoria` (`categoriaId`),
  CONSTRAINT `fk_producto_categoria` FOREIGN KEY (`categoriaId`) REFERENCES `categoria` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_producto_marca` FOREIGN KEY (`marcaId`) REFERENCES `marca` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
INSERT INTO `producto` VALUES (1,'Harina de Arroz','Harina de arroz fina para panificados, rebozados y espesar salsas.','Harina de arroz.','Por 100 g: 360 kcal, 80 g de hidratos de carbono, 6 g de proteínas, 1 g de grasas.',NULL,'7790000000001',1,'2026-10-05 13:17:53',1,1),(2,'Galletitas Dulces','Galletitas dulces de vainilla, listas para el desayuno o la merienda.','Harina de arroz, azúcar, manteca, huevo, esencia de vainilla.','Por porción de 30 g: 140 kcal, 21 g de hidratos de carbono, 2 g de proteínas, 5 g de grasas.',NULL,'7790000000002',1,'2026-10-05 13:17:53',2,3),(3,'Pan de Molde','Pan de molde blando y de buena miga, ideal para tostadas y sándwiches.','Almidón de maíz, harina de arroz, agua, levadura, aceite de girasol, sal.','Por rebanada de 30 g: 75 kcal, 14 g de hidratos de carbono, 1 g de proteínas, 1,5 g de grasas.',NULL,'7790000000003',1,'2026-10-05 13:17:53',3,2),(4,'Barritas de Cereal','Barritas de arroz inflado, miel y frutos secos.','Arroz inflado, miel, frutos secos, chocolate.','Por barra de 25 g: 110 kcal, 18 g de hidratos de carbono, 2 g de proteínas, 3 g de grasas.',NULL,'7790000000004',1,'2026-10-05 13:17:53',4,4),(5,'Mezcla para Panqueques','Premezcla lista: solo se agrega leche y huevo.','Harina de arroz, almidón de maíz, azúcar, polvo de hornear.','Por 100 g: 350 kcal, 78 g de hidratos de carbono, 4 g de proteínas, 1 g de grasas.',NULL,'7790000000005',1,'2026-10-05 13:17:53',1,1),(6,'Yogur Natural','Yogur natural sin azúcar agregada.','Leche, fermentos lácticos.','Por 100 g: 60 kcal, 5 g de hidratos de carbono, 3,5 g de proteínas, 3 g de grasas.',NULL,'7790000000006',1,'2026-10-05 13:17:53',2,5),(7,'Premezcla para Pizza','Premezcla para pizzas y prepizzas de masa crocante.','Harina de arroz, almidón de mandioca, levadura, sal.','Por 100 g: 345 kcal, 76 g de hidratos de carbono, 5 g de proteínas, 1 g de grasas.',NULL,'7790000000007',1,'2026-10-05 13:17:53',3,1),(8,'Medialunas Congeladas','Medialunas de manteca listas para hornear.','Harina de arroz, manteca, azúcar, huevo, levadura.','Por unidad de 50 g: 190 kcal, 24 g de hidratos de carbono, 3 g de proteínas, 9 g de grasas.',NULL,'7790000000008',1,'2026-10-05 13:17:53',4,2),(9,'Chips de Maíz','Chips de maíz con sal marina. Certificación Sin TACC en trámite.','Maíz, aceite de girasol, sal marina.','Por porción de 30 g: 150 kcal, 18 g de hidratos de carbono, 2 g de proteínas, 8 g de grasas.',NULL,'7790000000009',0,'2026-10-05 13:17:53',1,4),(10,'Bebida de Arroz','Bebida vegetal de arroz, sin azúcar agregada.','Agua, arroz, aceite de girasol, sal.','Por 100 ml: 47 kcal, 9 g de hidratos de carbono, 0,3 g de proteínas, 1 g de grasas.',NULL,'7790000000010',1,'2026-10-05 13:17:53',2,6);
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restaurante`
--

DROP TABLE IF EXISTS `restaurante`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `restaurante` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `imagenExterior` varchar(255) DEFAULT NULL,
  `imagenInterior` varchar(255) DEFAULT NULL,
  `sitioWeb` varchar(255) DEFAULT NULL,
  `horario` varchar(255) DEFAULT NULL,
  `latitud` decimal(10,8) DEFAULT NULL,
  `longitud` decimal(11,8) DEFAULT NULL,
  `instagram` varchar(150) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `telefono` varchar(50) DEFAULT NULL,
  `estadoVerificacion` enum('pendiente','verificado','rechazado') NOT NULL DEFAULT 'pendiente',
  `calificacionPromedio` decimal(2,1) NOT NULL DEFAULT 0.0,
  `cantidadResenas` int(11) NOT NULL DEFAULT 0,
  `tipoRestauranteId` int(11) NOT NULL,
  `barrioId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_restaurante_tipo` (`tipoRestauranteId`),
  KEY `fk_restaurante_barrio` (`barrioId`),
  CONSTRAINT `fk_restaurante_barrio` FOREIGN KEY (`barrioId`) REFERENCES `barrio` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_restaurante_tipo` FOREIGN KEY (`tipoRestauranteId`) REFERENCES `tiporestaurante` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurante`
--

LOCK TABLES `restaurante` WRITE;
/*!40000 ALTER TABLE `restaurante` DISABLE KEYS */;
INSERT INTO `restaurante` VALUES (1,'Almacén Libre','Cafetería y almacén libre de gluten. Panificados, tortas y desayunos con cocina 100% separada.','Thames 1850',NULL,NULL,'https://almacenlibre.example.com','Lun a Sáb de 8:00 a 20:00',-34.58750000,-58.43060000,'almacenlibre.demo','hola@almacenlibre.example.com','11 5555-0101','verificado',0.0,0,1,22),(2,'La Espiga Feliz','Panadería sin TACC con pan casero, facturas y tartas.','Av. Corrientes 5400',NULL,NULL,'https://laespigafeliz.example.com','Todos los días de 7:00 a 21:00',-34.59930000,-58.43800000,'laespigafeliz.demo','hola@laespigafeliz.example.com','11 5555-0102','verificado',4.5,2,2,36),(3,'Verde Bowl','Bowls, ensaladas y platos veganos con opciones aptas para celíacos.','Av. Cabildo 2100',NULL,NULL,'https://verdebowl.example.com','Lun a Dom de 11:00 a 23:00',-34.56270000,-58.45600000,'verdebowl.demo','hola@verdebowl.example.com','11 5555-0103','verificado',0.0,0,3,5),(4,'Trigo Aparte','Pizzería con masa sin TACC elaborada en horno y cocina exclusivos.','Junín 1100',NULL,NULL,'https://trigoaparte.example.com','Mar a Dom de 19:00 a 23:30',-34.58800000,-58.39300000,'trigoaparte.demo','hola@trigoaparte.example.com','11 5555-0104','verificado',4.0,1,5,28),(5,'Dulce Libre','Helados artesanales sin gluten, con sabores clásicos y de temporada.','Av. Federico Lacroze 2900',NULL,NULL,NULL,'Todos los días de 12:00 a 22:00',-34.57400000,-58.44700000,'dulcelibre.demo','hola@dulcelibre.example.com','11 5555-0105','pendiente',0.0,0,6,10),(6,'Brasas del Sur','Parrilla con cortes y guarniciones. Requiere confirmar las medidas sin TACC del local.','Av. Medrano 600',NULL,NULL,NULL,'Lun a Dom de 12:00 a 00:00',-34.60500000,-58.42000000,NULL,'hola@brasasdelsur.example.com','11 5555-0106','rechazado',0.0,0,4,2);
/*!40000 ALTER TABLE `restaurante` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restaurantecaracteristica`
--

DROP TABLE IF EXISTS `restaurantecaracteristica`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `restaurantecaracteristica` (
  `restauranteId` int(11) NOT NULL,
  `caracteristicaId` int(11) NOT NULL,
  PRIMARY KEY (`restauranteId`,`caracteristicaId`),
  KEY `fk_restcarac_caracteristica` (`caracteristicaId`),
  CONSTRAINT `fk_restcarac_caracteristica` FOREIGN KEY (`caracteristicaId`) REFERENCES `caracteristica` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_restcarac_restaurante` FOREIGN KEY (`restauranteId`) REFERENCES `restaurante` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurantecaracteristica`
--

LOCK TABLES `restaurantecaracteristica` WRITE;
/*!40000 ALTER TABLE `restaurantecaracteristica` DISABLE KEYS */;
INSERT INTO `restaurantecaracteristica` VALUES (1,2),(1,3),(1,5),(2,1),(2,5),(2,6),(3,1),(3,3),(3,4),(3,6),(4,1),(4,2),(4,5),(4,6),(5,1),(5,3),(6,1);
/*!40000 ALTER TABLE `restaurantecaracteristica` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_rol_nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` VALUES (1,'admin','Administra el sitio y modera el contenido'),(2,'usuario','Usuario registrado de la comunidad');
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipolocal`
--

DROP TABLE IF EXISTS `tipolocal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipolocal` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_tipolocal_nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipolocal`
--

LOCK TABLES `tipolocal` WRITE;
/*!40000 ALTER TABLE `tipolocal` DISABLE KEYS */;
INSERT INTO `tipolocal` VALUES (3,'Almacén naturista'),(2,'Dietética'),(1,'Supermercado'),(4,'Verdulería');
/*!40000 ALTER TABLE `tipolocal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tiporestaurante`
--

DROP TABLE IF EXISTS `tiporestaurante`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tiporestaurante` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_tiporestaurante_nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tiporestaurante`
--

LOCK TABLES `tiporestaurante` WRITE;
/*!40000 ALTER TABLE `tiporestaurante` DISABLE KEYS */;
INSERT INTO `tiporestaurante` VALUES (1,'Cafetería'),(6,'Heladería'),(2,'Panadería'),(4,'Parrilla'),(5,'Pizzería'),(3,'Vegano');
/*!40000 ALTER TABLE `tiporestaurante` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `documento` varchar(20) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `genero` varchar(20) DEFAULT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL COMMENT 'Hash de la contrasena, nunca el texto plano',
  `telefono` varchar(50) DEFAULT NULL,
  `fotoPerfil` varchar(255) DEFAULT NULL,
  `fechaNacimiento` date DEFAULT NULL,
  `fechaRegistro` datetime NOT NULL DEFAULT current_timestamp(),
  `esActivo` tinyint(1) NOT NULL DEFAULT 1,
  `rolId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_usuario_documento` (`documento`),
  UNIQUE KEY `uq_usuario_email` (`email`),
  KEY `fk_usuario_rol` (`rolId`),
  CONSTRAINT `fk_usuario_rol` FOREIGN KEY (`rolId`) REFERENCES `rol` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'90000001','Admin','CeliaConnect',NULL,'admin@celiaconnect.test','$2b$10$KW1vX0CfXs9zdunxN6QxUO4m19MBPZ2iw2AFY.OzFOEr3zjO77uIK',NULL,NULL,NULL,'2026-01-10 09:00:00',1,1),(2,'90000002','María','González','Femenino','maria@celiaconnect.test','$2b$10$KW1vX0CfXs9zdunxN6QxUO4m19MBPZ2iw2AFY.OzFOEr3zjO77uIK','11 5555-0301',NULL,'1990-05-14','2026-02-03 18:20:00',1,2),(3,'90000003','Lucas','Pérez','Masculino','lucas@celiaconnect.test','$2b$10$KW1vX0CfXs9zdunxN6QxUO4m19MBPZ2iw2AFY.OzFOEr3zjO77uIK','11 5555-0302',NULL,'1985-11-02','2026-03-15 11:05:00',1,2),(4,'90000004','Sofía','Rodríguez','Femenino','sofia@celiaconnect.test','$2b$10$KW1vX0CfXs9zdunxN6QxUO4m19MBPZ2iw2AFY.OzFOEr3zjO77uIK',NULL,NULL,'1996-08-27','2026-04-22 20:45:00',1,2),(5,'90000005','Camila','Fernández',NULL,'camila@celiaconnect.test','$2b$10$KW1vX0CfXs9zdunxN6QxUO4m19MBPZ2iw2AFY.OzFOEr3zjO77uIK','11 5555-0305',NULL,NULL,'2026-06-08 15:30:00',1,2),(6,'99999999','UserPrueba','Uno',NULL,'prueba1@celiaconnect.test','$2b$10$Y8oaLsAXYsFWCU39Pykq9uEVuibTGyCP4xRzz6b55wOq6ycdTtKgu',NULL,NULL,NULL,'2026-10-19 09:54:45',1,2);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-10-26  9:07:44

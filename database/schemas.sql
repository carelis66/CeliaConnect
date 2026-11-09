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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
  `fechaCreacion` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `fk_local_tipo` (`tipoLocalId`),
  KEY `fk_local_barrio` (`barrioId`),
  CONSTRAINT `fk_local_barrio` FOREIGN KEY (`barrioId`) REFERENCES `barrio` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_local_tipo` FOREIGN KEY (`tipoLocalId`) REFERENCES `tipolocal` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
  `fechaCreacion` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_nutricionista_matricula` (`matricula`),
  KEY `fk_nutricionista_barrio` (`barrioId`),
  CONSTRAINT `fk_nutricionista_barrio` FOREIGN KEY (`barrioId`) REFERENCES `barrio` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
  `estadoVerificacion` enum('pendiente','verificado','rechazado') NOT NULL DEFAULT 'pendiente',
  `fechaCreacion` datetime NOT NULL DEFAULT current_timestamp(),
  `marcaId` int(11) NOT NULL,
  `categoriaId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_producto_codigobarras` (`codigoBarras`),
  KEY `fk_producto_marca` (`marcaId`),
  KEY `fk_producto_categoria` (`categoriaId`),
  CONSTRAINT `fk_producto_categoria` FOREIGN KEY (`categoriaId`) REFERENCES `categoria` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_producto_marca` FOREIGN KEY (`marcaId`) REFERENCES `marca` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
  `fechaCreacion` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `fk_restaurante_tipo` (`tipoRestauranteId`),
  KEY `fk_restaurante_barrio` (`barrioId`),
  CONSTRAINT `fk_restaurante_barrio` FOREIGN KEY (`barrioId`) REFERENCES `barrio` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_restaurante_tipo` FOREIGN KEY (`tipoRestauranteId`) REFERENCES `tiporestaurante` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-11-09 17:11:50

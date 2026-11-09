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
-- Dumping data for table `barrio`
--

LOCK TABLES `barrio` WRITE;
/*!40000 ALTER TABLE `barrio` DISABLE KEYS */;
INSERT INTO `barrio` VALUES (1,'Agronomía'),(2,'Almagro'),(3,'Balvanera'),(4,'Barracas'),(5,'Belgrano'),(6,'Boedo'),(7,'Caballito'),(8,'Chacarita'),(9,'Coghlan'),(10,'Colegiales'),(11,'Constitución'),(12,'Flores'),(13,'Floresta'),(14,'La Boca'),(15,'La Paternal'),(16,'Liniers'),(17,'Mataderos'),(18,'Monte Castro'),(19,'Montserrat'),(20,'Nueva Pompeya'),(21,'Núñez'),(22,'Palermo'),(23,'Parque Avellaneda'),(24,'Parque Chacabuco'),(25,'Parque Chas'),(26,'Parque Patricios'),(27,'Puerto Madero'),(28,'Recoleta'),(29,'Retiro'),(30,'Saavedra'),(31,'San Cristóbal'),(32,'San Nicolás'),(33,'San Telmo'),(34,'Vélez Sarsfield'),(35,'Versalles'),(36,'Villa Crespo'),(37,'Villa del Parque'),(38,'Villa Devoto'),(39,'Villa General Mitre'),(40,'Villa Lugano'),(41,'Villa Luro'),(42,'Villa Ortúzar'),(43,'Villa Pueyrredón'),(44,'Villa Real'),(45,'Villa Riachuelo'),(46,'Villa Santa Rita'),(47,'Villa Soldati'),(48,'Villa Urquiza');
/*!40000 ALTER TABLE `barrio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `caracteristica`
--

LOCK TABLES `caracteristica` WRITE;
/*!40000 ALTER TABLE `caracteristica` DISABLE KEYS */;
INSERT INTO `caracteristica` VALUES (1,'Menú Sin TACC','menu-sin-tacc.svg'),(2,'Cocina exclusiva Sin TACC','cocina-exclusiva.svg'),(3,'Opciones sin lactosa','sin-lactosa.svg'),(4,'Opciones veganas','vegano.svg'),(5,'Apto celíacos certificado','certificado.svg'),(6,'Con delivery','delivery.svg');
/*!40000 ALTER TABLE `caracteristica` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` VALUES (6,'Bebidas'),(3,'Galletitas'),(1,'Harinas'),(5,'Lácteos'),(2,'Panificados'),(4,'Snacks');
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `comentariolocal`
--

LOCK TABLES `comentariolocal` WRITE;
/*!40000 ALTER TABLE `comentariolocal` DISABLE KEYS */;
INSERT INTO `comentariolocal` VALUES (1,'Gran variedad','Tienen todo lo que necesito en un solo lugar, y bien identificado.',5,'2026-08-15 09:10:00','aprobado',2,1),(2,'Buenos precios','Buena atención y precios razonables para productos certificados.',4,'2026-09-01 14:20:00','aprobado',3,2),(3,'Góndola sin TACC','La góndola Sin TACC es amplia y está separada del resto.',4,'2026-09-10 10:35:00','aprobado',4,3),(4,'Atención experta','Me asesoraron muy bien sobre marcas y certificaciones.',5,'2026-09-25 22:00:00','aprobado',5,1),(5,'A veces falta stock','Buen lugar, pero algunos productos se agotan rápido.',3,'2026-10-01 18:15:00','aprobado',2,5),(6,'Muy buena atención','Buena atención y variedad de productos Sin TACC.',5,'2026-10-26 16:18:00','aprobado',4,4),(7,'Buen precio','Rica comida y a buen precio.',5,'2026-11-09 12:54:00','aprobado',2,7);
/*!40000 ALTER TABLE `comentariolocal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `comentarionutricionista`
--

LOCK TABLES `comentarionutricionista` WRITE;
/*!40000 ALTER TABLE `comentarionutricionista` DISABLE KEYS */;
INSERT INTO `comentarionutricionista` VALUES (1,'Muy clara','Me explicó todo con paciencia y me armó un plan realista.',5,'2026-08-03 17:00:00','aprobado',2,2),(2,'Recomendable','Buen seguimiento y respuestas rápidas.',4,'2026-08-20 11:30:00','aprobado',3,2),(3,'Excelente profesional','Especializada en celiaquía, me ayudó con mi hijo.',5,'2026-09-08 16:45:00','aprobado',4,3),(4,'Atención cálida','Muy buena atención, aunque la agenda está llena.',5,'2026-10-02 10:20:00','pendiente',5,3),(5,'Buenas consultas','Consultas por videollamada muy completas.',4,'2026-09-18 19:00:00','aprobado',2,4),(6,'Excelente atención','Muy buena atención y excelente asesoramiento sobre alimentación Sin TACC.',5,'2026-10-26 17:08:08','aprobado',4,2);
/*!40000 ALTER TABLE `comentarionutricionista` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `comentarioproducto`
--

LOCK TABLES `comentarioproducto` WRITE;
/*!40000 ALTER TABLE `comentarioproducto` DISABLE KEYS */;
INSERT INTO `comentarioproducto` VALUES (1,'Excelente pan','El pan de molde se mantiene blando varios días y no se desarma.',5,'2026-07-02 10:15:00','aprobado',2,3),(2,'Muy buenas','Galletitas ricas y bien certificadas, las compro seguido.',4,'2026-07-18 16:40:00','aprobado',3,2),(3,'Buen producto','Muy bueno, aunque cuesta encontrarlo en mi barrio.',4,'2026-10-03 12:05:00','rechazado',4,3),(4,'Rinde mucho','La harina de arroz es muy fina y sirve para todo tipo de recetas.',5,'2026-08-09 09:30:00','aprobado',5,1),(5,'Más o menos','Los chips están ricos pero todavía no figuran como certificados.',3,'2026-08-21 19:10:00','aprobado',2,9),(6,'Se rompen','Las medialunas llegaron algo desarmadas, el sabor es bueno.',2,'2026-09-02 13:25:00','aprobado',3,8),(7,'Muy buen producto.','Lo probé y me gustó mucho. Buena calidad y sabor.',5,'2026-10-19 15:57:01','aprobado',6,1),(8,'Bueno','Es barato',5,'2026-10-21 20:08:26','aprobado',6,2),(9,'Muy ricas y prácticas','Me gustaron mucho. Son prácticas para llevar y tienen muy buen sabor.',5,'2026-11-06 07:24:55','aprobado',2,4),(10,'Rinde un monton','Bastante saludable y muy rico.',5,'2026-11-06 07:26:10','aprobado',2,5),(11,'Es suave','Tiene una buena consistencia y de sabor muy rico.',5,'2026-11-06 07:26:55','aprobado',2,6),(12,'Rinde mucho','Podés hacer muchas porciones, excelente alimento.',5,'2026-11-09 12:54:55','aprobado',2,2);
/*!40000 ALTER TABLE `comentarioproducto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `comentariorestaurante`
--

LOCK TABLES `comentariorestaurante` WRITE;
/*!40000 ALTER TABLE `comentariorestaurante` DISABLE KEYS */;
INSERT INTO `comentariorestaurante` VALUES (1,'Excelente atención','Excelente atención, tienen opciones certificadas y separan todo en cocina.',5,'2026-10-04 11:20:00','rechazado',2,1),(2,'Dudas con la cocina','No estoy seguro de que la cocina esté libre de contaminación cruzada.',2,'2026-10-04 20:05:00','aprobado',3,3),(3,'Pan riquísimo','El pan y las facturas son lo mejor que probé sin TACC.',5,'2026-08-12 10:00:00','aprobado',4,2),(4,'Pizza muy rica','La masa sin TACC es excelente y la atención muy cuidadosa.',4,'2026-09-05 21:30:00','aprobado',5,4),(5,'Muy recomendable','Variedad de panificados y buen precio.',4,'2026-09-14 08:45:00','aprobado',2,2),(6,'Comentario fuera de tema','Este comentario no habla del lugar.',1,'2026-09-20 17:00:00','rechazado',3,6),(7,'Muy buena experiencia','Buena atención y varias opciones Sin TACC.',5,'2026-10-21 11:51:42','aprobado',6,1),(8,'Mucha variedad','Variedad de diferentes platos de la cocina Italiana y libre de gluten.',5,'2026-11-09 14:28:32','aprobado',5,8);
/*!40000 ALTER TABLE `comentariorestaurante` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `favoritolocal`
--

LOCK TABLES `favoritolocal` WRITE;
/*!40000 ALTER TABLE `favoritolocal` DISABLE KEYS */;
INSERT INTO `favoritolocal` VALUES (2,1,'2026-10-05 13:17:53'),(2,5,'2026-11-09 12:47:08'),(3,1,'2026-11-09 11:32:21'),(3,2,'2026-10-05 13:17:53'),(3,4,'2026-11-06 15:53:45'),(4,3,'2026-10-05 13:17:53'),(5,1,'2026-10-05 13:17:53');
/*!40000 ALTER TABLE `favoritolocal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `favoritonutricionista`
--

LOCK TABLES `favoritonutricionista` WRITE;
/*!40000 ALTER TABLE `favoritonutricionista` DISABLE KEYS */;
INSERT INTO `favoritonutricionista` VALUES (3,2,'2026-11-09 11:20:28'),(3,3,'2026-10-05 13:17:54'),(3,4,'2026-11-06 16:12:24'),(3,6,'2026-11-09 11:19:56'),(3,7,'2026-11-09 11:20:24'),(3,8,'2026-11-09 11:20:25'),(4,2,'2026-10-05 13:17:54');
/*!40000 ALTER TABLE `favoritonutricionista` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `favoritoproducto`
--

LOCK TABLES `favoritoproducto` WRITE;
/*!40000 ALTER TABLE `favoritoproducto` DISABLE KEYS */;
INSERT INTO `favoritoproducto` VALUES (2,1,'2026-10-05 13:17:53'),(2,2,'2026-11-09 12:47:00'),(3,1,'2026-11-09 11:24:10'),(3,4,'2026-11-06 15:09:43'),(3,5,'2026-11-09 11:20:46'),(3,6,'2026-11-09 11:20:45'),(3,7,'2026-11-09 11:19:39'),(3,8,'2026-11-09 11:20:43'),(3,10,'2026-11-09 11:20:44'),(4,3,'2026-10-05 13:17:53'),(5,10,'2026-10-05 13:17:53');
/*!40000 ALTER TABLE `favoritoproducto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `favoritorestaurante`
--

LOCK TABLES `favoritorestaurante` WRITE;
/*!40000 ALTER TABLE `favoritorestaurante` DISABLE KEYS */;
INSERT INTO `favoritorestaurante` VALUES (2,2,'2026-10-05 13:17:53'),(3,1,'2026-11-09 11:19:50'),(3,2,'2026-11-06 15:42:01'),(3,3,'2026-11-09 11:31:39'),(3,4,'2026-10-05 13:17:53'),(3,7,'2026-11-09 11:31:42'),(3,8,'2026-11-09 11:31:38'),(4,2,'2026-10-05 13:17:53');
/*!40000 ALTER TABLE `favoritorestaurante` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `local`
--

LOCK TABLES `local` WRITE;
/*!40000 ALTER TABLE `local` DISABLE KEYS */;
INSERT INTO `local` VALUES (1,'Dietética Granos del Sur','Dietética con amplia sección de harinas, galletitas y panificados sin TACC.','assets/images/locales/granos-del-sur.png','Av. Rivadavia 5800','11 5555-0201','hola@granosdelsur.example.com','granosdelsur.demo','https://granosdelsur.example.com','Lun a Sáb de 9:00 a 20:00',-34.61800000,-58.44000000,'verificado',5.0,2,2,7,'2026-10-29 10:30:00'),(2,'Almacén Natural Cuatro Estaciones','Almacén naturista con productos certificados y atención personalizada.','assets/images/locales/cuatro-estaciones.png','Av. Triunvirato 4200','11 5555-0202','hola@cuatroestaciones.example.com','cuatroestaciones.demo',NULL,'Lun a Sáb de 9:30 a 19:30',-34.57300000,-58.48200000,'verificado',4.0,1,3,48,'2026-10-18 15:20:00'),(3,'Súper Vida Sana','Supermercado con góndola exclusiva de productos Sin TACC.','assets/images/locales/super-vida-sana.png','Av. Cabildo 1800','11 5555-0203','hola@supervidasana.example.com','supervidasana.demo','https://supervidasana.example.com','Todos los días de 8:00 a 22:00',-34.56200000,-58.45300000,'verificado',4.0,1,1,5,'2026-10-10 09:15:00'),(4,'Verdulería La Quinta','Verduras y frutas frescas, con un sector de productos libres de gluten.','assets/images/locales/la-quinta.png','Av. Corrientes 3900','11 5555-0204',NULL,'laquinta.demo',NULL,'Lun a Sáb de 8:00 a 20:00',-34.60400000,-58.41800000,'verificado',5.0,1,4,2,'2026-09-30 13:40:00'),(5,'Dietética Espiga de Oro','Dietética especializada en celiaquía con envíos a domicilio.','assets/images/locales/espiga-de-oro.png','Av. Las Heras 2500','11 5555-0205','hola@espigadeoro.example.com','espigadeoro.demo','https://espigadeoro.example.com','Lun a Vie de 9:00 a 19:00',-34.58900000,-58.40300000,'verificado',3.0,1,2,28,'2026-09-24 16:10:00'),(6,'Almacén Celíaco Central','Almacén naturista nuevo, pendiente de verificación.',NULL,'Av. Scalabrini Ortiz 800','11 5555-0206','hola@celiacocentral.example.com',NULL,NULL,'Lun a Sáb de 10:00 a 20:00',-34.59900000,-58.43200000,'pendiente',0.0,0,3,36,'2026-10-25 11:50:00'),(7,'Mercado Sin Gluten','Mercado especializado en alimentos Sin TACC, con productos frescos, congelados y de almacén.','assets/images/locales/mercado-sin-gluten.png','Av. Santa Fe 3500','11 5555-0606','contacto@mercadosingluten.demo','mercadosingluten.demo',NULL,'Lun a Sáb de 9:00 a 20:00',-34.58650000,-58.41400000,'verificado',5.0,1,1,22,'2026-10-31 12:25:00');
/*!40000 ALTER TABLE `local` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `localcaracteristica`
--

LOCK TABLES `localcaracteristica` WRITE;
/*!40000 ALTER TABLE `localcaracteristica` DISABLE KEYS */;
INSERT INTO `localcaracteristica` VALUES (1,3),(1,4),(1,5),(1,6),(2,4),(2,5),(3,3),(3,5),(3,6),(4,4),(5,3),(5,5),(6,5);
/*!40000 ALTER TABLE `localcaracteristica` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `marca`
--

LOCK TABLES `marca` WRITE;
/*!40000 ALTER TABLE `marca` DISABLE KEYS */;
INSERT INTO `marca` VALUES (1,'Pura Vida',NULL),(2,'Natufoods',NULL),(3,'Celisabor',NULL),(4,'GlutenFree Co.',NULL);
/*!40000 ALTER TABLE `marca` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `nutricionista`
--

LOCK TABLES `nutricionista` WRITE;
/*!40000 ALTER TABLE `nutricionista` DISABLE KEYS */;
INSERT INTO `nutricionista` VALUES (1,'Marina','Duarte','DEMO-0001','Licenciada en Nutrición. Acompañamiento en alimentación sin gluten para adultos.',NULL,'Av. Cabildo 1500, 3° B','11 5555-0401',1,'marina.duarte@example.com','lic.marinaduarte.demo',NULL,'Lun a Vie de 9:00 a 18:00',-34.56400000,-58.45000000,'pendiente',0.0,0,5,'2026-09-26 10:00:00'),(2,'Julián','Ramírez','DEMO-0002','Nutricionista especializado en celiaquía y alimentación deportiva.','assets/images/nutricionistas/julian-ramirez.png','Av. Santa Fe 3200, 5° A','11 5555-0402',1,'julian.ramirez@example.com','julian.nutri.demo',NULL,'Lun a Vie de 10:00 a 19:00',-34.58800000,-58.41000000,'verificado',4.7,3,22,'2026-10-08 14:20:00'),(3,'Carolina','Vega','DEMO-0003','Especialista en celiaquía infantil y en armado de menús familiares.','assets/images/nutricionistas/carolina-vega.png','Av. Callao 1200, 2° C','11 5555-0403',1,'carolina.vega@example.com','carovega.nutri.demo',NULL,'Mar a Sáb de 9:00 a 17:00',-34.59200000,-58.39300000,'verificado',5.0,1,28,'2026-10-16 09:30:00'),(4,'Martín','Sosa','DEMO-0004','Consultas presenciales y por videollamada. Plan de alimentación sin TACC.','assets/images/nutricionistas/martin-sosa.png','Av. Rivadavia 5100, 1° D','11 5555-0404',0,'martin.sosa@example.com',NULL,NULL,'Lun, Mié y Vie de 14:00 a 20:00',-34.61800000,-58.44100000,'verificado',4.0,1,7,'2026-10-21 16:45:00'),(5,'Lucía','Benítez','DEMO-0005','Nutricionista clínica con foco en intolerancias alimentarias.',NULL,'Av. Triunvirato 4500, PB','11 5555-0405',1,'lucia.benitez@example.com','lucia.benitez.demo',NULL,'Lun a Jue de 9:00 a 15:00',-34.57000000,-58.48500000,'pendiente',0.0,0,48,'2026-09-29 11:10:00'),(6,'Valentina','Rossi','MN-45821','Licenciada en Nutrición especializada en alimentación sin gluten y acompañamiento nutricional para personas con celiaquía.','assets/images/nutricionistas/valentina-rossi.png','Av. Santa Fe 3250','11 4582-2140',1,'valentina.rossi@celiaconnect.test','nutri.valentinarossi',NULL,'Lunes a viernes de 9:00 a 18:00',-34.58850000,-58.41080000,'verificado',0.0,0,22,'2026-10-27 15:30:00'),(7,'Agustina','Méndez','MN-51276','Licenciada en Nutrición con enfoque en salud digestiva, educación alimentaria y planificación de dietas libres de gluten.','assets/images/nutricionistas/agustina-mendez.png','Av. Cabildo 1850','11 4788-3251',1,'agustina.mendez@celiaconnect.test','nutri.agustinamendez',NULL,'Lunes a viernes de 10:00 a 19:00',-34.56290000,-58.45630000,'verificado',0.0,0,5,'2026-10-30 09:15:00'),(8,'Federico','López','MN-53694','Licenciado en Nutrición orientado a nutrición clínica, celiaquía y adaptación de hábitos para una alimentación equilibrada sin TACC.','assets/images/nutricionistas/federico-lopez.png','Av. Rivadavia 5100','11 4902-6184',1,'federico.lopez@celiaconnect.test','nutri.federicolopez',NULL,'Martes a sábado de 9:00 a 17:00',-34.61850000,-58.43890000,'verificado',0.0,0,7,'2026-11-01 10:40:00');
/*!40000 ALTER TABLE `nutricionista` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
INSERT INTO `producto` VALUES (1,'Harina de Arroz','Harina de arroz fina para panificados, rebozados y espesar salsas.','Harina de arroz.','Por 100 g: 360 kcal, 80 g de hidratos de carbono, 6 g de proteínas, 1 g de grasas.','assets/images/productos/harina-de-arroz.png','7790000000001',1,'verificado','2026-10-05 13:17:53',1,1),(2,'Galletitas Dulces','Galletitas dulces de vainilla, listas para el desayuno o la merienda.','Harina de arroz, azúcar, manteca, huevo, esencia de vainilla.','Por porción de 30 g: 140 kcal, 21 g de hidratos de carbono, 2 g de proteínas, 5 g de grasas.','assets/images/productos/galletitas-dulces.png','7790000000002',1,'verificado','2026-10-05 13:17:53',2,3),(3,'Pan de Molde','Pan de molde blando y de buena miga, ideal para tostadas y sándwiches.','Almidón de maíz, harina de arroz, agua, levadura, aceite de girasol, sal.','Por rebanada de 30 g: 75 kcal, 14 g de hidratos de carbono, 1 g de proteínas, 1,5 g de grasas.','assets/images/productos/pan-de-molde.png','7790000000003',1,'verificado','2026-10-05 13:17:53',3,2),(4,'Barritas de Cereal','Barritas de arroz inflado, miel y frutos secos.','Arroz inflado, miel, frutos secos, chocolate.','Por barra de 25 g: 110 kcal, 18 g de hidratos de carbono, 2 g de proteínas, 3 g de grasas.','assets/images/productos/barritas-de-cereal.png','7790000000004',1,'verificado','2026-10-05 13:17:53',4,4),(5,'Mezcla para Panqueques','Premezcla lista: solo se agrega leche y huevo.','Harina de arroz, almidón de maíz, azúcar, polvo de hornear.','Por 100 g: 350 kcal, 78 g de hidratos de carbono, 4 g de proteínas, 1 g de grasas.','assets/images/productos/mezcla-para-panqueques.png','7790000000005',1,'verificado','2026-10-05 13:17:53',1,1),(6,'Yogur Natural','Yogur natural sin azúcar agregada.','Leche, fermentos lácticos.','Por 100 g: 60 kcal, 5 g de hidratos de carbono, 3,5 g de proteínas, 3 g de grasas.','assets/images/productos/yogur-natural.png','7790000000006',1,'verificado','2026-10-05 13:17:53',2,5),(7,'Premezcla para Pizza','Premezcla para pizzas y prepizzas de masa crocante.','Harina de arroz, almidón de mandioca, levadura, sal.','Por 100 g: 345 kcal, 76 g de hidratos de carbono, 5 g de proteínas, 1 g de grasas.','assets/images/productos/premezcla-para-pizza.png','7790000000007',1,'verificado','2026-10-05 13:17:53',3,1),(8,'Medialunas Congeladas','Medialunas de manteca listas para hornear.','Harina de arroz, manteca, azúcar, huevo, levadura.','Por unidad de 50 g: 190 kcal, 24 g de hidratos de carbono, 3 g de proteínas, 9 g de grasas.','assets/images/productos/medialunas-congeladas.png','7790000000008',1,'pendiente','2026-10-05 13:17:53',4,2),(9,'Chips de Maíz','Chips de maíz con sal marina. Certificación Sin TACC en trámite.','Maíz, aceite de girasol, sal marina.','Por porción de 30 g: 150 kcal, 18 g de hidratos de carbono, 2 g de proteínas, 8 g de grasas.','assets/images/productos/chips-de-maiz.png','7790000000009',0,'pendiente','2026-10-05 13:17:53',1,4),(10,'Bebida de Arroz','Bebida vegetal de arroz, sin azúcar agregada.','Agua, arroz, aceite de girasol, sal.','Por 100 ml: 47 kcal, 9 g de hidratos de carbono, 0,3 g de proteínas, 1 g de grasas.','assets/images/productos/bebida-de-arroz.png','7790000000010',1,'verificado','2026-10-05 13:17:53',2,6);
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `restaurante`
--

LOCK TABLES `restaurante` WRITE;
/*!40000 ALTER TABLE `restaurante` DISABLE KEYS */;
INSERT INTO `restaurante` VALUES (1,'Almacén Libre','Cafetería y almacén libre de gluten. Panificados, tortas y desayunos con cocina 100% separada.','Thames 1850','assets/images/restaurantes/almacen-libre-exterior.png','assets/images/restaurantes/almacen-libre-interior.png','https://almacenlibre.example.com','Lun a Sáb de 8:00 a 20:30',-34.58750000,-58.43060000,'almacenlibre.demo','hola@almacenlibre.example.com','11 5555-0101','verificado',5.0,1,1,22,'2026-10-30 16:20:00'),(2,'La Espiga Feliz','Panadería sin TACC con pan casero, facturas y tartas.','Av. Corrientes 5400','assets/images/restaurantes/la-espiga-feliz-exterior.png','assets/images/restaurantes/la-espiga-feliz-interior.png','https://laespigafeliz.example.com','Todos los días de 7:00 a 21:00',-34.59930000,-58.43800000,'laespigafeliz.demo','hola@laespigafeliz.example.com','11 5555-0102','verificado',4.5,2,2,36,'2026-10-22 11:15:00'),(3,'Verde Bowl','Bowls, ensaladas y platos veganos con opciones aptas para celíacos.','Av. Cabildo 2100','assets/images/restaurantes/verde-bowl-exterior.png','assets/images/restaurantes/verde-bowl-interior.png','https://verdebowl.example.com','Lun a Dom de 11:00 a 23:00',-34.56270000,-58.45600000,'verdebowl.demo','hola@verdebowl.example.com','11 5555-0103','verificado',2.0,1,3,5,'2026-10-14 14:30:00'),(4,'Trigo Aparte','Pizzería con masa sin TACC elaborada en horno y cocina exclusivos.','Junín 1100','assets/images/restaurantes/trigo-aparte-exterior.png','assets/images/restaurantes/trigo-aparte-interior.png','https://trigoaparte.example.com','Mar a Dom de 19:00 a 23:30',-34.58800000,-58.39300000,'trigoaparte.demo','hola@trigoaparte.example.com','11 5555-0104','verificado',4.0,1,5,28,'2026-10-05 10:10:00'),(5,'Dulce Libre','Helados artesanales sin gluten, con sabores clásicos y de temporada.','Av. Federico Lacroze 2900',NULL,NULL,NULL,'Todos los días de 12:00 a 22:00',-34.57400000,-58.44700000,'dulcelibre.demo','hola@dulcelibre.example.com','11 5555-0105','pendiente',0.0,0,6,10,'2026-09-28 17:45:00'),(6,'Brasas del Sur','Parrilla con cortes y guarniciones. Requiere confirmar las medidas sin TACC del local.','Av. Medrano 600',NULL,NULL,NULL,'Lun a Dom de 12:00 a 00:00',-34.60500000,-58.42000000,NULL,'hola@brasasdelsur.example.com','11 5555-0106','rechazado',0.0,0,4,2,'2026-09-20 12:00:00'),(7,'Sabor Sin TACC','Cafetería especializada en desayunos, meriendas y pastelería completamente libre de gluten.','Av. Scalabrini Ortiz 2100','assets/images/restaurantes/sabor-sin-tacc-exterior.png','assets/images/restaurantes/sabor-sin-tacc-interior.png','https://saborsintacc.example.com','Lun a Dom de 8:00 a 20:00',-34.58600000,-58.42500000,'saborsintacc.demo','hola@saborsintacc.example.com','11 5555-0107','verificado',0.0,0,1,22,'2026-10-26 09:40:00'),(8,'Forno Libre','Pizzería con pizzas, focaccias y empanadas Sin TACC elaboradas en un espacio exclusivo.','Av. Rivadavia 5200','assets/images/restaurantes/forno-libre-exterior.png','assets/images/restaurantes/forno-libre-interior.png','https://fornolibre.example.com','Mar a Dom de 18:00 a 00:00',-34.61800000,-58.43900000,'fornolibre.demo','hola@fornolibre.example.com','11 5555-0108','verificado',5.0,1,5,7,'2026-11-01 18:10:00');
/*!40000 ALTER TABLE `restaurante` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `restaurantecaracteristica`
--

LOCK TABLES `restaurantecaracteristica` WRITE;
/*!40000 ALTER TABLE `restaurantecaracteristica` DISABLE KEYS */;
INSERT INTO `restaurantecaracteristica` VALUES (1,2),(1,3),(1,5),(2,1),(2,5),(2,6),(3,1),(3,3),(3,4),(3,6),(4,1),(4,2),(4,5),(4,6),(5,1),(5,3),(6,1);
/*!40000 ALTER TABLE `restaurantecaracteristica` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` VALUES (1,'admin','Administra el sitio y modera el contenido'),(2,'usuario','Usuario registrado de la comunidad'),(3,'moderador','Modera comentarios y contenido sin acceso a la administración de usuarios');
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tipolocal`
--

LOCK TABLES `tipolocal` WRITE;
/*!40000 ALTER TABLE `tipolocal` DISABLE KEYS */;
INSERT INTO `tipolocal` VALUES (3,'Almacén naturista'),(2,'Dietética'),(1,'Supermercado'),(4,'Verdulería');
/*!40000 ALTER TABLE `tipolocal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tiporestaurante`
--

LOCK TABLES `tiporestaurante` WRITE;
/*!40000 ALTER TABLE `tiporestaurante` DISABLE KEYS */;
INSERT INTO `tiporestaurante` VALUES (1,'Cafetería'),(6,'Heladería'),(2,'Panadería'),(4,'Parrilla'),(5,'Pizzería'),(3,'Vegano');
/*!40000 ALTER TABLE `tiporestaurante` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'90000001','Admin','CeliaConnect',NULL,'admin@celiaconnect.test','$2b$10$KW1vX0CfXs9zdunxN6QxUO4m19MBPZ2iw2AFY.OzFOEr3zjO77uIK',NULL,NULL,NULL,'2026-01-10 09:00:00',1,1),(2,'90000002','María','González','Femenino','maria@celiaconnect.test','$2b$10$KW1vX0CfXs9zdunxN6QxUO4m19MBPZ2iw2AFY.OzFOEr3zjO77uIK','11 5555-0301',NULL,'1990-05-14','2026-02-03 18:20:00',1,2),(3,'90000003','Lucas','Pérez','Masculino','lucas@celiaconnect.test','$2b$10$KW1vX0CfXs9zdunxN6QxUO4m19MBPZ2iw2AFY.OzFOEr3zjO77uIK','11 5555-0302',NULL,'1985-11-02','2026-03-15 11:05:00',1,2),(4,'90000004','Sofía','Rodríguez','Femenino','sofia@celiaconnect.test','$2b$10$KW1vX0CfXs9zdunxN6QxUO4m19MBPZ2iw2AFY.OzFOEr3zjO77uIK',NULL,NULL,'1996-08-27','2026-04-22 20:45:00',1,2),(5,'90000005','Camila','Fernández',NULL,'camila@celiaconnect.test','$2b$10$KW1vX0CfXs9zdunxN6QxUO4m19MBPZ2iw2AFY.OzFOEr3zjO77uIK','11 5555-0305',NULL,NULL,'2026-06-08 15:30:00',1,2),(6,'99999999','UserPrueba','Uno',NULL,'prueba1@celiaconnect.test','$2b$10$Y8oaLsAXYsFWCU39Pykq9uEVuibTGyCP4xRzz6b55wOq6ycdTtKgu',NULL,NULL,NULL,'2026-10-19 09:54:45',1,2),(7,'118529633','Moderador','Dashboard','F','moderador@celiaconnect.test','$2b$10$ATgHcVc0smzuuFaIcUfhIudFE5Vi0t4T3vGBe3SR2k6ukaPFd.d8e','1132407485',NULL,'1985-06-03','2026-11-05 09:40:44',1,3),(8,'182359632','Ramon','Trujillo',NULL,'rtrujillo@gmail.com','$2b$10$NmZN6G4SggK8SY2PE43e2.TfTApA0SldqdZYzez1o.KJ.d2i6RAem',NULL,NULL,NULL,'2026-11-09 12:38:21',1,2),(9,'745829631','Alejandra','Robles',NULL,'r@roblesgmail.com','$2b$10$nisM5WxB57qKVATqnIwrK.DfhLgySQzeaB9aIh49iQEItWTVwmZ2C',NULL,NULL,NULL,'2026-11-09 12:43:51',1,2),(10,'74855856','Carlos','Yepez',NULL,'calitoy@gmail.com','$2b$10$jVZtGTCpWzEH1ye7fWqXYeS1NtieasHwOJmJPqGeAVwHwboq5qSWy',NULL,NULL,NULL,'2026-11-09 14:59:26',1,2);
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

-- Dump completed on 2026-11-09 17:13:50

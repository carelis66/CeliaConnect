-- ============================================================
--  CeliaConnect - Datos de prueba
--  Base: celiaconnectdb. Ejecutar DESPUES de schema.sql.
--
--  Todos los datos son FICTICIOS (comercios, productos,
--  nutricionistas, documentos, matriculas "DEMO", telefonos y mails
--  de ejemplo). Los 48 barrios de CABA si son los oficiales; los
--  tipos de local y las 6 caracteristicas son los que ya tenias.
--
--  Las contrasenas de los usuarios de prueba son un marcador
--  (REEMPLAZAR_POR_HASH_BCRYPT): todavia no se puede iniciar
--  sesion con ellos. Se reemplazan cuando el backend genere los
--  hashes reales.
--
--  Los comentarios "pendientes" son los que aparecen en el panel
--  de moderacion del administrador.
-- ============================================================

USE `celiaconnectdb`;
SET NAMES utf8mb4;

-- rol (2)
INSERT INTO `rol` (`id`, `nombre`, `descripcion`) VALUES
  (1, 'admin', 'Administra el sitio y modera el contenido'),
  (2, 'usuario', 'Usuario registrado de la comunidad');

-- usuario (5)
INSERT INTO `usuario` (`id`, `documento`, `nombre`, `apellido`, `genero`, `email`, `password`, `telefono`, `fechaNacimiento`, `fechaRegistro`, `esActivo`, `rolId`) VALUES
  (1, '90000001', 'Admin', 'CeliaConnect', NULL, 'admin@celiaconnect.test', 'REEMPLAZAR_POR_HASH_BCRYPT', NULL, NULL, '2026-01-10 09:00:00', 1, 1),
  (2, '90000002', 'María', 'González', 'Femenino', 'maria.gonzalez@example.com', 'REEMPLAZAR_POR_HASH_BCRYPT', '11 5555-0301', '1990-05-14', '2026-02-03 18:20:00', 1, 2),
  (3, '90000003', 'Lucas', 'Pérez', 'Masculino', 'lucas.perez@example.com', 'REEMPLAZAR_POR_HASH_BCRYPT', '11 5555-0302', '1985-11-02', '2026-03-15 11:05:00', 1, 2),
  (4, '90000004', 'Sofía', 'Rodríguez', 'Femenino', 'sofia.rodriguez@example.com', 'REEMPLAZAR_POR_HASH_BCRYPT', NULL, '1996-08-27', '2026-04-22 20:45:00', 1, 2),
  (5, '90000005', 'Camila', 'Fernández', NULL, 'camila.fernandez@example.com', 'REEMPLAZAR_POR_HASH_BCRYPT', '11 5555-0305', NULL, '2026-06-08 15:30:00', 1, 2);

-- barrio (48)
INSERT INTO `barrio` (`id`, `nombre`) VALUES
  (1, 'Agronomía'),
  (2, 'Almagro'),
  (3, 'Balvanera'),
  (4, 'Barracas'),
  (5, 'Belgrano'),
  (6, 'Boedo'),
  (7, 'Caballito'),
  (8, 'Chacarita'),
  (9, 'Coghlan'),
  (10, 'Colegiales'),
  (11, 'Constitución'),
  (12, 'Flores'),
  (13, 'Floresta'),
  (14, 'La Boca'),
  (15, 'La Paternal'),
  (16, 'Liniers'),
  (17, 'Mataderos'),
  (18, 'Monte Castro'),
  (19, 'Montserrat'),
  (20, 'Nueva Pompeya'),
  (21, 'Núñez'),
  (22, 'Palermo'),
  (23, 'Parque Avellaneda'),
  (24, 'Parque Chacabuco'),
  (25, 'Parque Chas'),
  (26, 'Parque Patricios'),
  (27, 'Puerto Madero'),
  (28, 'Recoleta'),
  (29, 'Retiro'),
  (30, 'Saavedra'),
  (31, 'San Cristóbal'),
  (32, 'San Nicolás'),
  (33, 'San Telmo'),
  (34, 'Vélez Sarsfield'),
  (35, 'Versalles'),
  (36, 'Villa Crespo'),
  (37, 'Villa del Parque'),
  (38, 'Villa Devoto'),
  (39, 'Villa General Mitre'),
  (40, 'Villa Lugano'),
  (41, 'Villa Luro'),
  (42, 'Villa Ortúzar'),
  (43, 'Villa Pueyrredón'),
  (44, 'Villa Real'),
  (45, 'Villa Riachuelo'),
  (46, 'Villa Santa Rita'),
  (47, 'Villa Soldati'),
  (48, 'Villa Urquiza');

-- categoria (6)
INSERT INTO `categoria` (`id`, `nombre`) VALUES
  (1, 'Harinas'),
  (2, 'Panificados'),
  (3, 'Galletitas'),
  (4, 'Snacks'),
  (5, 'Lácteos'),
  (6, 'Bebidas');

-- marca (4)
INSERT INTO `marca` (`id`, `nombre`, `logo`) VALUES
  (1, 'Pura Vida', NULL),
  (2, 'Natufoods', NULL),
  (3, 'Celisabor', NULL),
  (4, 'GlutenFree Co.', NULL);

-- tipoRestaurante (6)
INSERT INTO `tipoRestaurante` (`id`, `nombre`) VALUES
  (1, 'Cafetería'),
  (2, 'Panadería'),
  (3, 'Vegano'),
  (4, 'Parrilla'),
  (5, 'Pizzería'),
  (6, 'Heladería');

-- tipoLocal (4)
INSERT INTO `tipoLocal` (`id`, `nombre`) VALUES
  (1, 'Supermercado'),
  (2, 'Dietética'),
  (3, 'Almacén naturista'),
  (4, 'Verdulería');

-- caracteristica (6)
INSERT INTO `caracteristica` (`id`, `nombre`, `icono`) VALUES
  (1, 'Menú Sin TACC', 'menu-sin-tacc.svg'),
  (2, 'Cocina exclusiva Sin TACC', 'cocina-exclusiva.svg'),
  (3, 'Opciones sin lactosa', 'sin-lactosa.svg'),
  (4, 'Opciones veganas', 'vegano.svg'),
  (5, 'Apto celíacos certificado', 'certificado.svg'),
  (6, 'Con delivery', 'delivery.svg');

-- producto (10)
INSERT INTO `producto` (`id`, `nombre`, `descripcion`, `ingredientes`, `informacionNutricional`, `imagen`, `codigoBarras`, `certificadoSinTacc`, `marcaId`, `categoriaId`) VALUES
  (1, 'Harina de Arroz', 'Harina de arroz fina para panificados, rebozados y espesar salsas.', 'Harina de arroz.', 'Por 100 g: 360 kcal, 80 g de hidratos de carbono, 6 g de proteínas, 1 g de grasas.', NULL, '7790000000001', 1, 1, 1),
  (2, 'Galletitas Dulces', 'Galletitas dulces de vainilla, listas para el desayuno o la merienda.', 'Harina de arroz, azúcar, manteca, huevo, esencia de vainilla.', 'Por porción de 30 g: 140 kcal, 21 g de hidratos de carbono, 2 g de proteínas, 5 g de grasas.', NULL, '7790000000002', 1, 2, 3),
  (3, 'Pan de Molde', 'Pan de molde blando y de buena miga, ideal para tostadas y sándwiches.', 'Almidón de maíz, harina de arroz, agua, levadura, aceite de girasol, sal.', 'Por rebanada de 30 g: 75 kcal, 14 g de hidratos de carbono, 1 g de proteínas, 1,5 g de grasas.', NULL, '7790000000003', 1, 3, 2),
  (4, 'Barritas de Cereal', 'Barritas de arroz inflado, miel y frutos secos.', 'Arroz inflado, miel, frutos secos, chocolate.', 'Por barra de 25 g: 110 kcal, 18 g de hidratos de carbono, 2 g de proteínas, 3 g de grasas.', NULL, '7790000000004', 1, 4, 4),
  (5, 'Mezcla para Panqueques', 'Premezcla lista: solo se agrega leche y huevo.', 'Harina de arroz, almidón de maíz, azúcar, polvo de hornear.', 'Por 100 g: 350 kcal, 78 g de hidratos de carbono, 4 g de proteínas, 1 g de grasas.', NULL, '7790000000005', 1, 1, 1),
  (6, 'Yogur Natural', 'Yogur natural sin azúcar agregada.', 'Leche, fermentos lácticos.', 'Por 100 g: 60 kcal, 5 g de hidratos de carbono, 3,5 g de proteínas, 3 g de grasas.', NULL, '7790000000006', 1, 2, 5),
  (7, 'Premezcla para Pizza', 'Premezcla para pizzas y prepizzas de masa crocante.', 'Harina de arroz, almidón de mandioca, levadura, sal.', 'Por 100 g: 345 kcal, 76 g de hidratos de carbono, 5 g de proteínas, 1 g de grasas.', NULL, '7790000000007', 1, 3, 1),
  (8, 'Medialunas Congeladas', 'Medialunas de manteca listas para hornear.', 'Harina de arroz, manteca, azúcar, huevo, levadura.', 'Por unidad de 50 g: 190 kcal, 24 g de hidratos de carbono, 3 g de proteínas, 9 g de grasas.', NULL, '7790000000008', 1, 4, 2),
  (9, 'Chips de Maíz', 'Chips de maíz con sal marina. Certificación Sin TACC en trámite.', 'Maíz, aceite de girasol, sal marina.', 'Por porción de 30 g: 150 kcal, 18 g de hidratos de carbono, 2 g de proteínas, 8 g de grasas.', NULL, '7790000000009', 0, 1, 4),
  (10, 'Bebida de Arroz', 'Bebida vegetal de arroz, sin azúcar agregada.', 'Agua, arroz, aceite de girasol, sal.', 'Por 100 ml: 47 kcal, 9 g de hidratos de carbono, 0,3 g de proteínas, 1 g de grasas.', NULL, '7790000000010', 1, 2, 6);

-- restaurante (6)
INSERT INTO `restaurante` (`id`, `nombre`, `descripcion`, `direccion`, `sitioWeb`, `horario`, `latitud`, `longitud`, `instagram`, `email`, `telefono`, `estadoVerificacion`, `tipoRestauranteId`, `barrioId`) VALUES
  (1, 'Almacén Libre', 'Cafetería y almacén libre de gluten. Panificados, tortas y desayunos con cocina 100% separada.', 'Thames 1850', 'https://almacenlibre.example.com', 'Lun a Sáb de 8:00 a 20:00', -34.5875, -58.4306, 'almacenlibre.demo', 'hola@almacenlibre.example.com', '11 5555-0101', 'verificado', 1, 22),
  (2, 'La Espiga Feliz', 'Panadería sin TACC con pan casero, facturas y tartas.', 'Av. Corrientes 5400', 'https://laespigafeliz.example.com', 'Todos los días de 7:00 a 21:00', -34.5993, -58.438, 'laespigafeliz.demo', 'hola@laespigafeliz.example.com', '11 5555-0102', 'verificado', 2, 36),
  (3, 'Verde Bowl', 'Bowls, ensaladas y platos veganos con opciones aptas para celíacos.', 'Av. Cabildo 2100', 'https://verdebowl.example.com', 'Lun a Dom de 11:00 a 23:00', -34.5627, -58.456, 'verdebowl.demo', 'hola@verdebowl.example.com', '11 5555-0103', 'verificado', 3, 5),
  (4, 'Trigo Aparte', 'Pizzería con masa sin TACC elaborada en horno y cocina exclusivos.', 'Junín 1100', 'https://trigoaparte.example.com', 'Mar a Dom de 19:00 a 23:30', -34.588, -58.393, 'trigoaparte.demo', 'hola@trigoaparte.example.com', '11 5555-0104', 'verificado', 5, 28),
  (5, 'Dulce Libre', 'Helados artesanales sin gluten, con sabores clásicos y de temporada.', 'Av. Federico Lacroze 2900', NULL, 'Todos los días de 12:00 a 22:00', -34.574, -58.447, 'dulcelibre.demo', 'hola@dulcelibre.example.com', '11 5555-0105', 'pendiente', 6, 10),
  (6, 'Brasas del Sur', 'Parrilla con cortes y guarniciones. Requiere confirmar las medidas sin TACC del local.', 'Av. Medrano 600', NULL, 'Lun a Dom de 12:00 a 00:00', -34.605, -58.42, NULL, 'hola@brasasdelsur.example.com', '11 5555-0106', 'rechazado', 4, 2);

-- local (6)
INSERT INTO `local` (`id`, `nombre`, `descripcion`, `direccion`, `telefono`, `email`, `instagram`, `sitioWeb`, `horario`, `latitud`, `longitud`, `estadoVerificacion`, `tipoLocalId`, `barrioId`) VALUES
  (1, 'Dietética Granos del Sur', 'Dietética con amplia sección de harinas, galletitas y panificados sin TACC.', 'Av. Rivadavia 5800', '11 5555-0201', 'hola@granosdelsur.example.com', 'granosdelsur.demo', 'https://granosdelsur.example.com', 'Lun a Sáb de 9:00 a 20:00', -34.618, -58.44, 'verificado', 2, 7),
  (2, 'Almacén Natural Cuatro Estaciones', 'Almacén naturista con productos certificados y atención personalizada.', 'Av. Triunvirato 4200', '11 5555-0202', 'hola@cuatroestaciones.example.com', 'cuatroestaciones.demo', NULL, 'Lun a Sáb de 9:30 a 19:30', -34.573, -58.482, 'verificado', 3, 48),
  (3, 'Súper Vida Sana', 'Supermercado con góndola exclusiva de productos Sin TACC.', 'Av. Cabildo 1800', '11 5555-0203', 'hola@supervidasana.example.com', 'supervidasana.demo', 'https://supervidasana.example.com', 'Todos los días de 8:00 a 22:00', -34.562, -58.453, 'verificado', 1, 5),
  (4, 'Verdulería La Quinta', 'Verduras y frutas frescas, con un sector de productos libres de gluten.', 'Av. Corrientes 3900', '11 5555-0204', NULL, 'laquinta.demo', NULL, 'Lun a Sáb de 8:00 a 20:00', -34.604, -58.418, 'verificado', 4, 2),
  (5, 'Dietética Espiga de Oro', 'Dietética especializada en celiaquía con envíos a domicilio.', 'Av. Las Heras 2500', '11 5555-0205', 'hola@espigadeoro.example.com', 'espigadeoro.demo', 'https://espigadeoro.example.com', 'Lun a Vie de 9:00 a 19:00', -34.589, -58.403, 'verificado', 2, 28),
  (6, 'Almacén Celíaco Central', 'Almacén naturista nuevo, pendiente de verificación.', 'Av. Scalabrini Ortiz 800', '11 5555-0206', 'hola@celiacocentral.example.com', NULL, NULL, 'Lun a Sáb de 10:00 a 20:00', -34.599, -58.432, 'pendiente', 3, 36);

-- restauranteCaracteristica (17)
INSERT INTO `restauranteCaracteristica` (`restauranteId`, `caracteristicaId`) VALUES
  (1, 2),
  (1, 3),
  (1, 5),
  (2, 1),
  (2, 5),
  (2, 6),
  (3, 1),
  (3, 3),
  (3, 4),
  (3, 6),
  (4, 1),
  (4, 2),
  (4, 5),
  (4, 6),
  (5, 1),
  (5, 3),
  (6, 1);

-- localCaracteristica (13)
INSERT INTO `localCaracteristica` (`localId`, `caracteristicaId`) VALUES
  (1, 3),
  (1, 4),
  (1, 5),
  (1, 6),
  (2, 4),
  (2, 5),
  (3, 3),
  (3, 5),
  (3, 6),
  (4, 4),
  (5, 3),
  (5, 5),
  (6, 5);

-- nutricionista (5)
INSERT INTO `nutricionista` (`id`, `nombre`, `apellido`, `matricula`, `descripcion`, `direccion`, `telefono`, `tieneWhatsapp`, `email`, `instagram`, `horario`, `latitud`, `longitud`, `estadoVerificacion`, `barrioId`) VALUES
  (1, 'Marina', 'Duarte', 'DEMO-0001', 'Licenciada en Nutrición. Acompañamiento en alimentación sin gluten para adultos.', 'Av. Cabildo 1500, 3° B', '11 5555-0401', 1, 'marina.duarte@example.com', 'lic.marinaduarte.demo', 'Lun a Vie de 9:00 a 18:00', -34.564, -58.45, 'pendiente', 5),
  (2, 'Julián', 'Ramírez', 'DEMO-0002', 'Nutricionista especializado en celiaquía y alimentación deportiva.', 'Av. Santa Fe 3200, 5° A', '11 5555-0402', 1, 'julian.ramirez@example.com', 'julian.nutri.demo', 'Lun a Vie de 10:00 a 19:00', -34.588, -58.41, 'verificado', 22),
  (3, 'Carolina', 'Vega', 'DEMO-0003', 'Especialista en celiaquía infantil y en armado de menús familiares.', 'Av. Callao 1200, 2° C', '11 5555-0403', 1, 'carolina.vega@example.com', 'carovega.nutri.demo', 'Mar a Sáb de 9:00 a 17:00', -34.592, -58.393, 'verificado', 28),
  (4, 'Martín', 'Sosa', 'DEMO-0004', 'Consultas presenciales y por videollamada. Plan de alimentación sin TACC.', 'Av. Rivadavia 5100, 1° D', '11 5555-0404', 0, 'martin.sosa@example.com', NULL, 'Lun, Mié y Vie de 14:00 a 20:00', -34.618, -58.441, 'verificado', 7),
  (5, 'Lucía', 'Benítez', 'DEMO-0005', 'Nutricionista clínica con foco en intolerancias alimentarias.', 'Av. Triunvirato 4500, PB', '11 5555-0405', 1, 'lucia.benitez@example.com', 'lucia.benitez.demo', 'Lun a Jue de 9:00 a 15:00', -34.57, -58.485, 'pendiente', 48);

-- favoritoProducto (5)
INSERT INTO `favoritoProducto` (`usuarioId`, `productoId`) VALUES
  (2, 1),
  (2, 3),
  (3, 2),
  (4, 3),
  (5, 10);

-- favoritoRestaurante (4)
INSERT INTO `favoritoRestaurante` (`usuarioId`, `restauranteId`) VALUES
  (2, 1),
  (2, 2),
  (3, 4),
  (4, 2);

-- favoritoLocal (4)
INSERT INTO `favoritoLocal` (`usuarioId`, `localId`) VALUES
  (2, 1),
  (3, 2),
  (4, 3),
  (5, 1);

-- favoritoNutricionista (3)
INSERT INTO `favoritoNutricionista` (`usuarioId`, `nutricionistaId`) VALUES
  (2, 2),
  (3, 3),
  (4, 2);

-- comentarioProducto (6)
INSERT INTO `comentarioProducto` (`id`, `titulo`, `comentario`, `calificacion`, `fechaComentario`, `estado`, `usuarioId`, `productoId`) VALUES
  (1, 'Excelente pan', 'El pan de molde se mantiene blando varios días y no se desarma.', 5, '2026-07-02 10:15:00', 'aprobado', 2, 3),
  (2, 'Muy buenas', 'Galletitas ricas y bien certificadas, las compro seguido.', 4, '2026-07-18 16:40:00', 'aprobado', 3, 2),
  (3, 'Buen producto', 'Muy bueno, aunque cuesta encontrarlo en mi barrio.', 4, '2026-10-03 12:05:00', 'pendiente', 4, 3),
  (4, 'Rinde mucho', 'La harina de arroz es muy fina y sirve para todo tipo de recetas.', 5, '2026-08-09 09:30:00', 'aprobado', 5, 1),
  (5, 'Más o menos', 'Los chips están ricos pero todavía no figuran como certificados.', 3, '2026-08-21 19:10:00', 'aprobado', 2, 9),
  (6, 'Se rompen', 'Las medialunas llegaron algo desarmadas, el sabor es bueno.', 2, '2026-09-02 13:25:00', 'aprobado', 3, 8);

-- comentarioRestaurante (6)
INSERT INTO `comentarioRestaurante` (`id`, `titulo`, `comentario`, `calificacion`, `fechaComentario`, `estado`, `usuarioId`, `restauranteId`) VALUES
  (1, 'Excelente atención', 'Excelente atención, tienen opciones certificadas y separan todo en cocina.', 5, '2026-10-04 11:20:00', 'pendiente', 2, 1),
  (2, 'Dudas con la cocina', 'No estoy seguro de que la cocina esté libre de contaminación cruzada.', 2, '2026-10-04 20:05:00', 'pendiente', 3, 3),
  (3, 'Pan riquísimo', 'El pan y las facturas son lo mejor que probé sin TACC.', 5, '2026-08-12 10:00:00', 'aprobado', 4, 2),
  (4, 'Pizza muy rica', 'La masa sin TACC es excelente y la atención muy cuidadosa.', 4, '2026-09-05 21:30:00', 'aprobado', 5, 4),
  (5, 'Muy recomendable', 'Variedad de panificados y buen precio.', 4, '2026-09-14 08:45:00', 'aprobado', 2, 2),
  (6, 'Comentario fuera de tema', 'Este comentario no habla del lugar.', 1, '2026-09-20 17:00:00', 'rechazado', 3, 6);

-- comentarioLocal (5)
INSERT INTO `comentarioLocal` (`id`, `titulo`, `comentario`, `calificacion`, `fechaComentario`, `estado`, `usuarioId`, `localId`) VALUES
  (1, 'Gran variedad', 'Tienen todo lo que necesito en un solo lugar, y bien identificado.', 5, '2026-08-15 09:10:00', 'aprobado', 2, 1),
  (2, 'Buenos precios', 'Buena atención y precios razonables para productos certificados.', 4, '2026-09-01 14:20:00', 'aprobado', 3, 2),
  (3, 'Góndola sin TACC', 'La góndola Sin TACC es amplia y está separada del resto.', 4, '2026-09-10 10:35:00', 'aprobado', 4, 3),
  (4, 'Atención experta', 'Me asesoraron muy bien sobre marcas y certificaciones.', 5, '2026-09-25 22:00:00', 'aprobado', 5, 1),
  (5, 'A veces falta stock', 'Buen lugar, pero algunos productos se agotan rápido.', 3, '2026-10-01 18:15:00', 'aprobado', 2, 5);

-- comentarioNutricionista (5)
INSERT INTO `comentarioNutricionista` (`id`, `titulo`, `comentario`, `calificacion`, `fechaComentario`, `estado`, `usuarioId`, `nutricionistaId`) VALUES
  (1, 'Muy clara', 'Me explicó todo con paciencia y me armó un plan realista.', 5, '2026-08-03 17:00:00', 'aprobado', 2, 2),
  (2, 'Recomendable', 'Buen seguimiento y respuestas rápidas.', 4, '2026-08-20 11:30:00', 'aprobado', 3, 2),
  (3, 'Excelente profesional', 'Especializada en celiaquía, me ayudó con mi hijo.', 5, '2026-09-08 16:45:00', 'aprobado', 4, 3),
  (4, 'Atención cálida', 'Muy buena atención, aunque la agenda está llena.', 5, '2026-10-02 10:20:00', 'pendiente', 5, 3),
  (5, 'Buenas consultas', 'Consultas por videollamada muy completas.', 4, '2026-09-18 19:00:00', 'aprobado', 2, 4);

-- ============================================================
--  Promedios de calificacion (solo con comentarios aprobados).
--  En el backend esta misma cuenta se hace cada vez que se aprueba
--  o se rechaza un comentario.
--  El "WHERE id > 0" es para que funcione con el modo seguro de
--  MySQL Workbench (safe updates).
-- ============================================================

UPDATE `restaurante` r SET
  r.`calificacionPromedio` = COALESCE((SELECT ROUND(AVG(c.`calificacion`), 1) FROM `comentarioRestaurante` c
                                       WHERE c.`restauranteId` = r.`id` AND c.`estado` = 'aprobado'), 0),
  r.`cantidadResenas`      = (SELECT COUNT(*) FROM `comentarioRestaurante` c
                              WHERE c.`restauranteId` = r.`id` AND c.`estado` = 'aprobado')
WHERE r.`id` > 0;

UPDATE `local` l SET
  l.`calificacionPromedio` = COALESCE((SELECT ROUND(AVG(c.`calificacion`), 1) FROM `comentarioLocal` c
                                       WHERE c.`localId` = l.`id` AND c.`estado` = 'aprobado'), 0),
  l.`cantidadResenas`      = (SELECT COUNT(*) FROM `comentarioLocal` c
                              WHERE c.`localId` = l.`id` AND c.`estado` = 'aprobado')
WHERE l.`id` > 0;

UPDATE `nutricionista` n SET
  n.`calificacionPromedio` = COALESCE((SELECT ROUND(AVG(c.`calificacion`), 1) FROM `comentarioNutricionista` c
                                       WHERE c.`nutricionistaId` = n.`id` AND c.`estado` = 'aprobado'), 0),
  n.`cantidadResenas`      = (SELECT COUNT(*) FROM `comentarioNutricionista` c
                              WHERE c.`nutricionistaId` = n.`id` AND c.`estado` = 'aprobado')
WHERE n.`id` > 0;

-- ============================================================
--  Control: cantidad de filas cargadas por tabla
-- ============================================================

SELECT 'rol' AS tabla, COUNT(*) AS filas FROM `rol`
UNION ALL
SELECT 'usuario' AS tabla, COUNT(*) AS filas FROM `usuario`
UNION ALL
SELECT 'barrio' AS tabla, COUNT(*) AS filas FROM `barrio`
UNION ALL
SELECT 'categoria' AS tabla, COUNT(*) AS filas FROM `categoria`
UNION ALL
SELECT 'marca' AS tabla, COUNT(*) AS filas FROM `marca`
UNION ALL
SELECT 'tipoRestaurante' AS tabla, COUNT(*) AS filas FROM `tipoRestaurante`
UNION ALL
SELECT 'tipoLocal' AS tabla, COUNT(*) AS filas FROM `tipoLocal`
UNION ALL
SELECT 'caracteristica' AS tabla, COUNT(*) AS filas FROM `caracteristica`
UNION ALL
SELECT 'producto' AS tabla, COUNT(*) AS filas FROM `producto`
UNION ALL
SELECT 'restaurante' AS tabla, COUNT(*) AS filas FROM `restaurante`
UNION ALL
SELECT 'local' AS tabla, COUNT(*) AS filas FROM `local`
UNION ALL
SELECT 'restauranteCaracteristica' AS tabla, COUNT(*) AS filas FROM `restauranteCaracteristica`
UNION ALL
SELECT 'localCaracteristica' AS tabla, COUNT(*) AS filas FROM `localCaracteristica`
UNION ALL
SELECT 'nutricionista' AS tabla, COUNT(*) AS filas FROM `nutricionista`
UNION ALL
SELECT 'favoritoProducto' AS tabla, COUNT(*) AS filas FROM `favoritoProducto`
UNION ALL
SELECT 'favoritoRestaurante' AS tabla, COUNT(*) AS filas FROM `favoritoRestaurante`
UNION ALL
SELECT 'favoritoLocal' AS tabla, COUNT(*) AS filas FROM `favoritoLocal`
UNION ALL
SELECT 'favoritoNutricionista' AS tabla, COUNT(*) AS filas FROM `favoritoNutricionista`
UNION ALL
SELECT 'comentarioProducto' AS tabla, COUNT(*) AS filas FROM `comentarioProducto`
UNION ALL
SELECT 'comentarioRestaurante' AS tabla, COUNT(*) AS filas FROM `comentarioRestaurante`
UNION ALL
SELECT 'comentarioLocal' AS tabla, COUNT(*) AS filas FROM `comentarioLocal`
UNION ALL
SELECT 'comentarioNutricionista' AS tabla, COUNT(*) AS filas FROM `comentarioNutricionista`;

 

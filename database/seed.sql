/*
=======================================================
 Proyecto: CeliaConnect
 Archivo : seed.sql
 Autor   : Carelis Fagundez
 Descripción:
 Datos iniciales necesarios para el funcionamiento
 de CeliaConnect.
=======================================================
*/
 
USE celiaconnectdb;
 
 
/*======================================================
  MÓDULO: SEGURIDAD
======================================================*/
 
INSERT INTO rol (nombre, descripcion)
VALUES
('Administrador', 'Administrador del sistema'),
('Usuario', 'Usuario registrado en la plataforma');
 
 
/*======================================================
  MÓDULO: PRODUCTOS
======================================================*/
 
INSERT INTO categoria (nombre)
VALUES
('Harinas'),
('Pastas'),
('Panificados'),
('Galletitas'),
('Snacks'),
('Congelados'),
('Lácteos'),
('Bebidas'),
('Premezclas');
 
 
INSERT INTO marca (nombre)
VALUES
('Schär'),
('Kapac'),
('Valente'),
('Free Foods'),
('Molino Cañuelas');
 
 
/*======================================================
  MÓDULO: RESTAURANTES
======================================================*/
 
INSERT INTO tipoRestaurante (nombre)
VALUES
('Restaurante'),
('Cafetería'),
('Panadería'),
('Heladería'),
('Fast Food'),
('Pastelería');
 
 
INSERT INTO barrio (nombre)
VALUES
('Agronomía'),
('Almagro'),
('Balvanera'),
('Barracas'),
('Belgrano'),
('Boedo'),
('Caballito'),
('Chacarita'),
('Coghlan'),
('Colegiales'),
('Constitución'),
('Flores'),
('Floresta'),
('La Boca'),
('La Paternal'),
('Liniers'),
('Mataderos'),
('Monserrat'),
('Monte Castro'),
('Nueva Pompeya'),
('Núñez'),
('Palermo'),
('Parque Avellaneda'),
('Parque Chacabuco'),
('Parque Chas'),
('Parque Patricios'),
('Puerto Madero'),
('Recoleta'),
('Retiro'),
('Saavedra'),
('San Cristóbal'),
('San Nicolás'),
('San Telmo'),
('Vélez Sarsfield'),
('Versalles'),
('Villa Crespo'),
('Villa del Parque'),
('Villa Devoto'),
('Villa General Mitre'),
('Villa Lugano'),
('Villa Luro'),
('Villa Ortúzar'),
('Villa Pueyrredón'),
('Villa Real'),
('Villa Riachuelo'),
('Villa Santa Rita'),
('Villa Soldati'),
('Villa Urquiza');
 
 
/*======================================================
  MÓDULO: LOCALES (TIENDAS)
======================================================*/
 
INSERT INTO tipoLocal (nombre)
VALUES
('Supermercado'),
('Dietética'),
('Almacén naturista'),
('Verdulería');
 
 
/*======================================================
  MÓDULO: CARACTERÍSTICAS
======================================================*/
 
INSERT INTO caracteristica (nombre, icono)
VALUES
('Menú Sin TACC', 'menu-sin-tacc.svg'),
('Cocina exclusiva Sin TACC', 'cocina-exclusiva.svg'),
('Opciones sin lactosa', 'sin-lactosa.svg'),
('Opciones veganas', 'vegano.svg'),
('Apto celíacos certificado', 'certificado.svg'),
('Con delivery', 'delivery.svg');
 

/*
=======================================================
 Proyecto: CeliaConnect
 Archivo : schema.sql
 Autor   : Carelis Fagundez
 Descripción:
 Script de creación de la estructura de la base de datos
=======================================================
*/

CREATE DATABASE IF NOT EXISTS celiaconnectdb;
USE celiaconnectdb;





/*======================================================
  MÓDULO: SEGURIDAD
======================================================*/

CREATE TABLE rol (
    id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    descripcion VARCHAR(255),
    PRIMARY KEY (id)
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;



CREATE TABLE usuario (
    id INT NOT NULL AUTO_INCREMENT,
    documento VARCHAR(20) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    genero VARCHAR(20),
    email VARCHAR(150) NOT NULL,
    password VARCHAR(255) NOT NULL,
    telefono VARCHAR(50),
    fotoPerfil VARCHAR(255),
    fechaNacimiento DATE,
    fechaRegistro DATETIME NOT NULL,
    esActivo BOOLEAN NOT NULL DEFAULT TRUE,
    rolId INT NOT NULL,

    PRIMARY KEY (id),

    UNIQUE (email),
    UNIQUE (documento),

    CONSTRAINT fk_usuario_rol
        FOREIGN KEY (rolId)
        REFERENCES rol(id)

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;





/*======================================================
  MÓDULO: PRODUCTOS
======================================================*/

CREATE TABLE categoria (
    id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,

    PRIMARY KEY (id)

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;



CREATE TABLE marca (
    id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    logo VARCHAR(255),

    PRIMARY KEY (id)

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;



CREATE TABLE producto (

    id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT,
    ingredientes TEXT,
    informacionNutricional TEXT,
    imagen VARCHAR(255),
    codigoBarras VARCHAR(50),
    certificadoSinTacc BOOLEAN NOT NULL DEFAULT FALSE,
    fechaCreacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    marcaId INT NOT NULL,
    categoriaId INT NOT NULL,

    PRIMARY KEY (id),

    CONSTRAINT fk_producto_marca
        FOREIGN KEY (marcaId)
        REFERENCES marca(id),

    CONSTRAINT fk_producto_categoria
        FOREIGN KEY (categoriaId)
        REFERENCES categoria(id)

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;





/*======================================================
  MÓDULO: RESTAURANTES
======================================================*/

CREATE TABLE tipoRestaurante (

    id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,

    PRIMARY KEY (id)

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;



CREATE TABLE barrio (

    id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,

    PRIMARY KEY (id)

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;



CREATE TABLE restaurante (

    id INT NOT NULL AUTO_INCREMENT,

    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT,
    imagenExterior VARCHAR(255),
    imagenInterior VARCHAR(255),
    direccion VARCHAR(255),
    telefono VARCHAR(50),
    email VARCHAR(150),
    instagram VARCHAR(150),
    sitioWeb VARCHAR(255),
    horario VARCHAR(255),
    latitud DECIMAL(10,8),
    longitud DECIMAL(11,8),

    verificado BOOLEAN NOT NULL DEFAULT FALSE,
    calificacionPromedio DECIMAL(2,1) NOT NULL DEFAULT 0,
    cantidadResenas INT NOT NULL DEFAULT 0,

    tipoRestauranteId INT NOT NULL,
    barrioId INT NOT NULL,

    PRIMARY KEY (id),

    CONSTRAINT fk_restaurante_tipo
        FOREIGN KEY (tipoRestauranteId)
        REFERENCES tipoRestaurante(id),

    CONSTRAINT fk_restaurante_barrio
        FOREIGN KEY (barrioId)
        REFERENCES barrio(id)

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;


/*
=========================================================
PENDIENTE

CREATE TABLE tipoLocal (...)
CREATE TABLE local (...)
CREATE TABLE nutricionista (...)
CREATE TABLE caracteristica (...)
CREATE TABLE restauranteCaracteristica (...)
CREATE TABLE localCaracteristica (...)
CREATE TABLE comentarioRestaurante (...)
CREATE TABLE comentarioLocal (...)
CREATE TABLE favoritoRestaurante (...)
CREATE TABLE favoritoLocal (...)
CREATE TABLE favoritoNutricionista (...)
CREATE TABLE promocion (...)

(se agregarán a medida que se complete el script,
usando como referencia el documento 03-modelo-de-datos)
=========================================================
*/

/*
=======================================================
 Proyecto: CeliaConnect
 Archivo : schema.sql
 Autor   : Carelis Fagundez
 Descripción:
 Script de creación de la estructura de la base de datos

 ATENCIÓN: al empezar borra las tablas (si existen) y las vuelve
 a crear. Si hay datos que importan, exportarlos antes
 (MySQL Workbench > Server > Data Export).

 Cambios respecto a la versión anterior:
  - Se elimina el módulo de promociones.
  - Comentarios: "activo" pasa a "estado" (pendiente, aprobado,
    rechazado) para la moderación desde el panel de administración.
  - "verificado" pasa a "estadoVerificacion" (pendiente, verificado,
    rechazado) en restaurante y local, y se agrega en nutricionista.
  - Tablas nuevas: favoritoProducto, comentarioProducto y
    comentarioNutricionista.
  - Un usuario puede dejar una sola reseña por ítem (UNIQUE).
  - Los nombres de catálogos (rol, categoría, marca, barrio, tipos y
    características) y el código de barras no se pueden repetir.
=======================================================
*/

CREATE DATABASE IF NOT EXISTS celiaconnectdb
    DEFAULT CHARACTER SET utf8mb4
    COLLATE utf8mb4_general_ci;

USE celiaconnectdb;

SET NAMES utf8mb4;


/*======================================================
  LIMPIEZA (permite volver a ejecutar el script)
======================================================*/

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS comentarioNutricionista;
DROP TABLE IF EXISTS comentarioProducto;
DROP TABLE IF EXISTS comentarioLocal;
DROP TABLE IF EXISTS comentarioRestaurante;
DROP TABLE IF EXISTS favoritoNutricionista;
DROP TABLE IF EXISTS favoritoLocal;
DROP TABLE IF EXISTS favoritoRestaurante;
DROP TABLE IF EXISTS favoritoProducto;
DROP TABLE IF EXISTS localCaracteristica;
DROP TABLE IF EXISTS restauranteCaracteristica;
DROP TABLE IF EXISTS caracteristica;
DROP TABLE IF EXISTS nutricionista;
DROP TABLE IF EXISTS local;
DROP TABLE IF EXISTS tipoLocal;
DROP TABLE IF EXISTS restaurante;
DROP TABLE IF EXISTS barrio;
DROP TABLE IF EXISTS tipoRestaurante;
DROP TABLE IF EXISTS producto;
DROP TABLE IF EXISTS marca;
DROP TABLE IF EXISTS categoria;
DROP TABLE IF EXISTS usuario;
DROP TABLE IF EXISTS rol;
DROP TABLE IF EXISTS promocion;

SET FOREIGN_KEY_CHECKS = 1;


/*======================================================
  MÓDULO: SEGURIDAD
======================================================*/

CREATE TABLE rol (
    id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    descripcion VARCHAR(255),
    PRIMARY KEY (id),
    UNIQUE (nombre)
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
    password VARCHAR(255) NOT NULL,  -- se guarda el hash, nunca la contraseña en texto plano
    telefono VARCHAR(50),
    fotoPerfil VARCHAR(255),
    fechaNacimiento DATE,
    fechaRegistro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    esActivo BOOLEAN NOT NULL DEFAULT TRUE,
    rolId INT NOT NULL,

    PRIMARY KEY (id),
    UNIQUE (email),
    UNIQUE (documento),

    CONSTRAINT fk_usuario_rol
        FOREIGN KEY (rolId)
        REFERENCES rol(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;


/*======================================================
  MÓDULO: PRODUCTOS
======================================================*/

CREATE TABLE categoria (
    id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (nombre)
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;


CREATE TABLE marca (
    id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    logo VARCHAR(255),
    PRIMARY KEY (id),
    UNIQUE (nombre)
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
    UNIQUE (codigoBarras),

    CONSTRAINT fk_producto_marca
        FOREIGN KEY (marcaId)
        REFERENCES marca(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT fk_producto_categoria
        FOREIGN KEY (categoriaId)
        REFERENCES categoria(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;


/*======================================================
  MÓDULO: RESTAURANTES
======================================================*/

CREATE TABLE tipoRestaurante (
    id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (nombre)
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;


CREATE TABLE barrio (
    id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (nombre)
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

    estadoVerificacion ENUM('pendiente','verificado','rechazado') NOT NULL DEFAULT 'pendiente',
    calificacionPromedio DECIMAL(2,1) NOT NULL DEFAULT 0,
    cantidadResenas INT NOT NULL DEFAULT 0,

    tipoRestauranteId INT NOT NULL,
    barrioId INT NOT NULL,

    PRIMARY KEY (id),

    CONSTRAINT fk_restaurante_tipo
        FOREIGN KEY (tipoRestauranteId)
        REFERENCES tipoRestaurante(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT fk_restaurante_barrio
        FOREIGN KEY (barrioId)
        REFERENCES barrio(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;


/*======================================================
  MÓDULO: LOCALES (TIENDAS: supermercados y dietéticas)
======================================================*/

CREATE TABLE tipoLocal (
    id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (nombre)
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;


CREATE TABLE local (
    id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT,
    imagen VARCHAR(255),
    direccion VARCHAR(255),
    telefono VARCHAR(50),
    email VARCHAR(150),
    instagram VARCHAR(150),
    sitioWeb VARCHAR(255),
    horario VARCHAR(255),
    latitud DECIMAL(10,8),
    longitud DECIMAL(11,8),

    estadoVerificacion ENUM('pendiente','verificado','rechazado') NOT NULL DEFAULT 'pendiente',
    calificacionPromedio DECIMAL(2,1) NOT NULL DEFAULT 0,
    cantidadResenas INT NOT NULL DEFAULT 0,

    tipoLocalId INT NOT NULL,
    barrioId INT NOT NULL,

    PRIMARY KEY (id),

    CONSTRAINT fk_local_tipo
        FOREIGN KEY (tipoLocalId)
        REFERENCES tipoLocal(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT fk_local_barrio
        FOREIGN KEY (barrioId)
        REFERENCES barrio(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;


/*======================================================
  MÓDULO: NUTRICIONISTAS
======================================================*/

CREATE TABLE nutricionista (
    id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    matricula VARCHAR(50) NOT NULL,
    descripcion TEXT,
    fotoPerfil VARCHAR(255),
    direccion VARCHAR(255),
    telefono VARCHAR(50),
    tieneWhatsapp BOOLEAN NOT NULL DEFAULT FALSE,
    email VARCHAR(150),
    instagram VARCHAR(150),
    sitioWeb VARCHAR(255),
    horario VARCHAR(255),
    latitud DECIMAL(10,8),
    longitud DECIMAL(11,8),

    estadoVerificacion ENUM('pendiente','verificado','rechazado') NOT NULL DEFAULT 'pendiente',
    calificacionPromedio DECIMAL(2,1) NOT NULL DEFAULT 0,
    cantidadResenas INT NOT NULL DEFAULT 0,

    barrioId INT NOT NULL,

    PRIMARY KEY (id),
    UNIQUE (matricula),

    CONSTRAINT fk_nutricionista_barrio
        FOREIGN KEY (barrioId)
        REFERENCES barrio(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;


/*======================================================
  MÓDULO: CARACTERÍSTICAS (servicios de restaurantes y locales)
======================================================*/

CREATE TABLE caracteristica (
    id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    icono VARCHAR(255),  -- nombre del archivo del ícono, por ejemplo menu-sin-tacc.svg
    PRIMARY KEY (id),
    UNIQUE (nombre)
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;


CREATE TABLE restauranteCaracteristica (
    restauranteId INT NOT NULL,
    caracteristicaId INT NOT NULL,

    PRIMARY KEY (restauranteId, caracteristicaId),

    CONSTRAINT fk_restcarac_restaurante
        FOREIGN KEY (restauranteId)
        REFERENCES restaurante(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_restcarac_caracteristica
        FOREIGN KEY (caracteristicaId)
        REFERENCES caracteristica(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;


CREATE TABLE localCaracteristica (
    localId INT NOT NULL,
    caracteristicaId INT NOT NULL,

    PRIMARY KEY (localId, caracteristicaId),

    CONSTRAINT fk_localcarac_local
        FOREIGN KEY (localId)
        REFERENCES local(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_localcarac_caracteristica
        FOREIGN KEY (caracteristicaId)
        REFERENCES caracteristica(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;


/*======================================================
  MÓDULO: COMENTARIOS (con moderación y calificación de 1 a 5)
======================================================*/

CREATE TABLE comentarioRestaurante (
    id INT NOT NULL AUTO_INCREMENT,
    titulo VARCHAR(150),
    comentario TEXT NOT NULL,
    calificacion TINYINT NOT NULL,
    fechaComentario DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    estado ENUM('pendiente','aprobado','rechazado') NOT NULL DEFAULT 'pendiente',

    usuarioId INT NOT NULL,
    restauranteId INT NOT NULL,

    PRIMARY KEY (id),
    UNIQUE (usuarioId, restauranteId),

    CONSTRAINT chk_comrest_calificacion CHECK (calificacion BETWEEN 1 AND 5),

    CONSTRAINT fk_comrest_usuario
        FOREIGN KEY (usuarioId)
        REFERENCES usuario(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT fk_comrest_restaurante
        FOREIGN KEY (restauranteId)
        REFERENCES restaurante(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;


CREATE TABLE comentarioLocal (
    id INT NOT NULL AUTO_INCREMENT,
    titulo VARCHAR(150),
    comentario TEXT NOT NULL,
    calificacion TINYINT NOT NULL,
    fechaComentario DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    estado ENUM('pendiente','aprobado','rechazado') NOT NULL DEFAULT 'pendiente',

    usuarioId INT NOT NULL,
    localId INT NOT NULL,

    PRIMARY KEY (id),
    UNIQUE (usuarioId, localId),

    CONSTRAINT chk_comlocal_calificacion CHECK (calificacion BETWEEN 1 AND 5),

    CONSTRAINT fk_comlocal_usuario
        FOREIGN KEY (usuarioId)
        REFERENCES usuario(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT fk_comlocal_local
        FOREIGN KEY (localId)
        REFERENCES local(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;


CREATE TABLE comentarioProducto (
    id INT NOT NULL AUTO_INCREMENT,
    titulo VARCHAR(150),
    comentario TEXT NOT NULL,
    calificacion TINYINT NOT NULL,
    fechaComentario DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    estado ENUM('pendiente','aprobado','rechazado') NOT NULL DEFAULT 'pendiente',

    usuarioId INT NOT NULL,
    productoId INT NOT NULL,

    PRIMARY KEY (id),
    UNIQUE (usuarioId, productoId),

    CONSTRAINT chk_comprod_calificacion CHECK (calificacion BETWEEN 1 AND 5),

    CONSTRAINT fk_comprod_usuario
        FOREIGN KEY (usuarioId)
        REFERENCES usuario(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT fk_comprod_producto
        FOREIGN KEY (productoId)
        REFERENCES producto(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;


CREATE TABLE comentarioNutricionista (
    id INT NOT NULL AUTO_INCREMENT,
    titulo VARCHAR(150),
    comentario TEXT NOT NULL,
    calificacion TINYINT NOT NULL,
    fechaComentario DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    estado ENUM('pendiente','aprobado','rechazado') NOT NULL DEFAULT 'pendiente',

    usuarioId INT NOT NULL,
    nutricionistaId INT NOT NULL,

    PRIMARY KEY (id),
    UNIQUE (usuarioId, nutricionistaId),

    CONSTRAINT chk_comnutri_calificacion CHECK (calificacion BETWEEN 1 AND 5),

    CONSTRAINT fk_comnutri_usuario
        FOREIGN KEY (usuarioId)
        REFERENCES usuario(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT fk_comnutri_nutricionista
        FOREIGN KEY (nutricionistaId)
        REFERENCES nutricionista(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;


/*======================================================
  MÓDULO: FAVORITOS
======================================================*/

CREATE TABLE favoritoProducto (
    usuarioId INT NOT NULL,
    productoId INT NOT NULL,
    fechaAgregado DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (usuarioId, productoId),

    CONSTRAINT fk_favprod_usuario
        FOREIGN KEY (usuarioId)
        REFERENCES usuario(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_favprod_producto
        FOREIGN KEY (productoId)
        REFERENCES producto(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;


CREATE TABLE favoritoRestaurante (
    usuarioId INT NOT NULL,
    restauranteId INT NOT NULL,
    fechaAgregado DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (usuarioId, restauranteId),

    CONSTRAINT fk_favrest_usuario
        FOREIGN KEY (usuarioId)
        REFERENCES usuario(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_favrest_restaurante
        FOREIGN KEY (restauranteId)
        REFERENCES restaurante(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;


CREATE TABLE favoritoLocal (
    usuarioId INT NOT NULL,
    localId INT NOT NULL,
    fechaAgregado DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (usuarioId, localId),

    CONSTRAINT fk_favlocal_usuario
        FOREIGN KEY (usuarioId)
        REFERENCES usuario(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_favlocal_local
        FOREIGN KEY (localId)
        REFERENCES local(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;


CREATE TABLE favoritoNutricionista (
    usuarioId INT NOT NULL,
    nutricionistaId INT NOT NULL,
    fechaAgregado DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (usuarioId, nutricionistaId),

    CONSTRAINT fk_favnutri_usuario
        FOREIGN KEY (usuarioId)
        REFERENCES usuario(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_favnutri_nutricionista
        FOREIGN KEY (nutricionistaId)
        REFERENCES nutricionista(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;

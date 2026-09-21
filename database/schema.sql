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


/*======================================================
  MÓDULO: LOCALES (TIENDAS: supermercados y dietéticas)
======================================================*/

CREATE TABLE tipoLocal (
    id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
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

    verificado BOOLEAN NOT NULL DEFAULT FALSE,
    calificacionPromedio DECIMAL(2,1) NOT NULL DEFAULT 0,
    cantidadResenas INT NOT NULL DEFAULT 0,

    tipoLocalId INT NOT NULL,
    barrioId INT NOT NULL,

    PRIMARY KEY (id),

    CONSTRAINT fk_local_tipo
        FOREIGN KEY (tipoLocalId)
        REFERENCES tipoLocal(id),

    CONSTRAINT fk_local_barrio
        FOREIGN KEY (barrioId)
        REFERENCES barrio(id)

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

    calificacionPromedio DECIMAL(2,1) NOT NULL DEFAULT 0,
    cantidadResenas INT NOT NULL DEFAULT 0,

    barrioId INT NOT NULL,

    PRIMARY KEY (id),
    UNIQUE (matricula),

    CONSTRAINT fk_nutricionista_barrio
        FOREIGN KEY (barrioId)
        REFERENCES barrio(id)

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;


/*======================================================
  MÓDULO: CARACTERÍSTICAS (servicios de restaurantes y locales)
======================================================*/

CREATE TABLE caracteristica (
    id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    icono VARCHAR(255),
    PRIMARY KEY (id)
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
        ON DELETE CASCADE,

    CONSTRAINT fk_restcarac_caracteristica
        FOREIGN KEY (caracteristicaId)
        REFERENCES caracteristica(id)
        ON DELETE CASCADE

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
        ON DELETE CASCADE,

    CONSTRAINT fk_localcarac_caracteristica
        FOREIGN KEY (caracteristicaId)
        REFERENCES caracteristica(id)
        ON DELETE CASCADE

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;


/*======================================================
  MÓDULO: COMENTARIOS
======================================================*/

CREATE TABLE comentarioRestaurante (
    id INT NOT NULL AUTO_INCREMENT,
    titulo VARCHAR(150),
    comentario TEXT NOT NULL,
    calificacion TINYINT NOT NULL,
    fechaComentario DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    activo BOOLEAN NOT NULL DEFAULT TRUE,

    usuarioId INT NOT NULL,
    restauranteId INT NOT NULL,

    PRIMARY KEY (id),

    CONSTRAINT chk_comrest_calificacion CHECK (calificacion BETWEEN 1 AND 5),

    CONSTRAINT fk_comrest_usuario
        FOREIGN KEY (usuarioId)
        REFERENCES usuario(id),

    CONSTRAINT fk_comrest_restaurante
        FOREIGN KEY (restauranteId)
        REFERENCES restaurante(id)
        ON DELETE CASCADE

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;


CREATE TABLE comentarioLocal (
    id INT NOT NULL AUTO_INCREMENT,
    titulo VARCHAR(150),
    comentario TEXT NOT NULL,
    calificacion TINYINT NOT NULL,
    fechaComentario DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    activo BOOLEAN NOT NULL DEFAULT TRUE,

    usuarioId INT NOT NULL,
    localId INT NOT NULL,

    PRIMARY KEY (id),

    CONSTRAINT chk_comlocal_calificacion CHECK (calificacion BETWEEN 1 AND 5),

    CONSTRAINT fk_comlocal_usuario
        FOREIGN KEY (usuarioId)
        REFERENCES usuario(id),

    CONSTRAINT fk_comlocal_local
        FOREIGN KEY (localId)
        REFERENCES local(id)
        ON DELETE CASCADE

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;


/*======================================================
  MÓDULO: FAVORITOS
======================================================*/

CREATE TABLE favoritoRestaurante (
    usuarioId INT NOT NULL,
    restauranteId INT NOT NULL,
    fechaAgregado DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (usuarioId, restauranteId),

    CONSTRAINT fk_favrest_usuario
        FOREIGN KEY (usuarioId)
        REFERENCES usuario(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_favrest_restaurante
        FOREIGN KEY (restauranteId)
        REFERENCES restaurante(id)
        ON DELETE CASCADE

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
        ON DELETE CASCADE,

    CONSTRAINT fk_favlocal_local
        FOREIGN KEY (localId)
        REFERENCES local(id)
        ON DELETE CASCADE

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
        ON DELETE CASCADE,

    CONSTRAINT fk_favnutri_nutricionista
        FOREIGN KEY (nutricionistaId)
        REFERENCES nutricionista(id)
        ON DELETE CASCADE

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;


/*======================================================
  MÓDULO: PROMOCIONES
======================================================*/

CREATE TABLE promocion (
    id INT NOT NULL AUTO_INCREMENT,
    titulo VARCHAR(150) NOT NULL,
    descripcion TEXT,
    imagen VARCHAR(255),
    fechaInicio DATE NOT NULL,
    fechaFin DATE NOT NULL,
    activa BOOLEAN NOT NULL DEFAULT TRUE,

    restauranteId INT NULL,
    localId INT NULL,

    PRIMARY KEY (id),

    -- Una promoción pertenece a un restaurante O a un local, nunca a ambos ni a ninguno.
    -- MySQL 8+ aplica este CHECK; si el motor no lo valida, reforzar en el backend (Sequelize).
    CONSTRAINT chk_promocion_dueno CHECK (
        (restauranteId IS NOT NULL AND localId IS NULL) OR
        (restauranteId IS NULL AND localId IS NOT NULL)
    ),

    CONSTRAINT fk_promocion_restaurante
        FOREIGN KEY (restauranteId)
        REFERENCES restaurante(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_promocion_local
        FOREIGN KEY (localId)
        REFERENCES local(id)
        ON DELETE CASCADE

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;

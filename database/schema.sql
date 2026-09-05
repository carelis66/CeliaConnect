/*
-------------------------------------------------------
 Proyecto: CeliaConnect
 Archivo : schema.sql
 Autor   : Carelis Fagundez
 Descripción:
 Script de creación de la estructura de la base de datos
-------------------------------------------------------
*/

CREATE DATABASE IF NOT EXISTS celiaconnectdb;
USE celiaconnectdb;

/*======================================================
  MÓDULO: SEGURIDAD
======================================================*/

CREATE TABLE rol (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

CREATE TABLE usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    fechaNacimiento DATE,
    fechaRegistro DATETIME DEFAULT CURRENT_TIMESTAMP,
    esActivo BOOLEAN DEFAULT TRUE,
    rolId INT NOT NULL,

    CONSTRAINT fk_usuario_rol
        FOREIGN KEY (rolId)
        REFERENCES rol(id)
);

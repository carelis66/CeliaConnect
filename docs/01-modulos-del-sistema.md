# 01 - Módulos del Sistema

## Información del documento

| Campo | Valor |
|--------|--------|
| Proyecto | CeliaConnect |
| Versión | 1.0 |
| Fecha | 31/07/2026 |
| Autor | Carelis Fagundez |
| Estado | En elaboración |

---

# 1. Introducción

Este documento describe los módulos funcionales que conforman la plataforma CeliaConnect.

Cada módulo representa un conjunto de funcionalidades relacionadas que serán desarrolladas de manera independiente y servirán como base para el diseño de la arquitectura, la base de datos, la API REST, la aplicación web y la aplicación móvil.

El objetivo es definir claramente el alcance funcional del sistema antes de iniciar el desarrollo.

---

# 2. Objetivos

Los objetivos de este documento son:

- Definir los módulos que compondrán el sistema.
- Identificar las funcionalidades de cada módulo.
- Determinar qué tipo de usuario utilizará cada funcionalidad.
- Servir como base para el diseño del software.

---

# 3. Roles del sistema

Actualmente el sistema contempla dos tipos de usuarios.

## Usuario

Persona que utilizará la aplicación para consultar información relacionada con la celiaquía.

Podrá:

- Registrarse.
- Iniciar sesión.
- Buscar productos.
- Buscar restaurantes.
- Buscar tiendas.
- Consultar nutricionistas.
- Ver promociones.
- Agregar favoritos.
- Publicar comentarios.
- Editar su perfil.

---

## Administrador

Usuario encargado de mantener actualizada la información del sistema.

Podrá:

- Administrar productos.
- Administrar restaurantes.
- Administrar tiendas.
- Administrar nutricionistas.
- Administrar promociones.
- Moderar comentarios.
- Gestionar usuarios.

---

# 4. Módulos del sistema

## 4.1 Autenticación

### Objetivo

Gestionar el acceso seguro a la plataforma.

### Funcionalidades

- Registro de usuario
- Inicio de sesión
- Recuperación de contraseña
- Cierre de sesión
- Validación mediante JWT

### Usuarios

- Usuario
- Administrador

### Dependencias

- Usuarios

---

## 4.2 Usuarios

### Objetivo

Gestionar la información personal de cada usuario.

### Funcionalidades

- Ver perfil
- Editar perfil
- Cambiar contraseña
- Cambiar foto de perfil
- Configurar preferencias

### Usuarios

- Usuario
- Administrador

### Dependencias

- Autenticación

---

## 4.3 Productos

### Objetivo

Permitir la consulta de productos aptos para personas celíacas.

### Funcionalidades

- Buscar productos
- Filtrar productos
- Consultar detalle
- Ver ingredientes
- Ver imágenes
- Consultar información nutricional
- Agregar a favoritos

### Usuarios

- Usuario
- Administrador

### Dependencias

- Favoritos
- Comentarios

---

## 4.4 Restaurantes

### Objetivo

Permitir la búsqueda de restaurantes con opciones aptas para personas celíacas.

### Funcionalidades

- Buscar restaurantes
- Consultar ubicación
- Ver información
- Ver fotografías
- Consultar horarios
- Ver opiniones
- Agregar a favoritos

### Usuarios

- Usuario
- Administrador

### Dependencias

- Comentarios
- Favoritos
- Geolocalización

---

## 4.5 Tiendas

### Objetivo

Permitir localizar comercios donde adquirir productos aptos.

### Funcionalidades

- Buscar tiendas
- Consultar ubicación
- Ver horarios
- Ver productos disponibles

### Usuarios

- Usuario
- Administrador

### Dependencias

- Geolocalización

---

## 4.6 Nutricionistas

### Objetivo

Facilitar el acceso a profesionales especializados en celiaquía.

### Funcionalidades

- Buscar profesionales
- Consultar especialidad
- Ver información de contacto
- Consultar ubicación

### Usuarios

- Usuario
- Administrador

### Dependencias

- Geolocalización

---

## 4.7 Promociones

### Objetivo

Mostrar promociones relacionadas con productos y establecimientos.

### Funcionalidades

- Consultar promociones
- Filtrar promociones
- Ver vigencia

### Usuarios

- Usuario
- Administrador

---

## 4.8 Favoritos

### Objetivo

Permitir guardar elementos de interés para futuras consultas.

### Funcionalidades

- Agregar favorito
- Eliminar favorito
- Consultar favoritos

### Usuarios

- Usuario

### Dependencias

- Productos
- Restaurantes
- Tiendas

---

## 4.9 Comentarios

### Objetivo

Permitir que los usuarios compartan experiencias y opiniones.

### Funcionalidades

- Crear comentario
- Editar comentario
- Eliminar comentario
- Calificar mediante estrellas

### Usuarios

- Usuario
- Administrador

---

## 4.10 Geolocalización

### Objetivo

Mostrar información basada en la ubicación del usuario.

### Funcionalidades

- Obtener ubicación actual
- Buscar lugares cercanos
- Mostrar mapa
- Calcular distancia

### Usuarios

- Usuario

### Dependencias

- Google Maps API

---

## 4.11 Multimedia

### Objetivo

Gestionar las imágenes utilizadas por la plataforma.

### Funcionalidades

- Subir imágenes
- Actualizar imágenes
- Eliminar imágenes

### Dependencias

- Cloudinary

---

## 4.12 Administración

### Objetivo

Permitir la gestión integral del contenido del sistema.

### Funcionalidades

- Gestionar usuarios
- Gestionar productos
- Gestionar restaurantes
- Gestionar tiendas
- Gestionar nutricionistas
- Gestionar promociones
- Moderar comentarios

### Usuarios

- Administrador

---

# 5. Relación entre módulos

| Módulo | Depende de |
|----------|----------------|
| Autenticación | Usuarios |
| Usuarios | Autenticación |
| Productos | Favoritos, Comentarios |
| Restaurantes | Favoritos, Comentarios, Geolocalización |
| Tiendas | Geolocalización |
| Nutricionistas | Geolocalización |
| Promociones | Administración |
| Favoritos | Productos, Restaurantes, Tiendas |
| Comentarios | Usuarios |
| Multimedia | Cloudinary |
| Geolocalización | Google Maps |
| Administración | Todos los módulos |

---

# 6. Consideraciones

- La plataforma contará con una versión Web y una versión Mobile.
- Ambas consumirán la misma API REST.
- La autenticación será mediante JWT.
- La información será almacenada en PostgreSQL.
- Las imágenes serán administradas mediante Cloudinary.
- La geolocalización utilizará Google Maps API.

---

# 7. Próximos pasos

A partir de este documento se desarrollarán los siguientes entregables:

- Arquitectura del sistema.
- Modelo entidad-relación.
- Diseño de la API REST.
- Diseño de interfaces.
- Desarrollo Backend.
- Desarrollo Frontend Web.
- Desarrollo Mobile.


## Información del documento

| Campo | Valor |
|--------|--------|
| Proyecto | CeliaConnect |
| Documento | Modelo de Datos |
| Versión | 2.0 |
| Fecha | 25/08/2026 |
| Autor | Carelis Fagundez |
| Estado | Finalizado |

---

# 1. Introducción

El presente documento describe el modelo de datos de CeliaConnect.

Su objetivo es definir las entidades principales del sistema, sus atributos y las relaciones existentes entre ellas, proporcionando una base sólida para el diseño e implementación de la base de datos.

El modelo fue diseñado para soportar las funcionalidades principales de la plataforma, garantizando la integridad de la información y facilitando el desarrollo del backend mediante una Base de datos relacional SQL

---

# 2. Objetivos

- Identificar las entidades principales del sistema.
- Definir los atributos de cada entidad.
- Establecer las relaciones entre las entidades.
- Garantizar la integridad referencial de la base de datos.
- Servir como base para la implementación del backend.

---

# 3. Entidades del sistema

## 3.1 Rol

Representa los perfiles de acceso del sistema.

### Atributos

- Id
- Nombre

---

## 3.2 Usuario

Representa a las personas registradas en la plataforma.

### Atributos

- Id
- Documento
- Nombre
- Apellido
- FechaNacimiento
- Genero
- Telefono
- Email
- PasswordHash
- FotoPerfil
- FechaRegistro
- RolId

---

## 3.3 Marca

Representa la marca comercial de un producto.

### Atributos

- Id
- Nombre
- Logo

---

## 3.4 Categoría

Clasifica los productos disponibles en la aplicación.

### Atributos

- Id
- Nombre

---

## 3.5 Producto

Representa un producto apto para personas celíacas.

### Atributos

- Id
- Nombre
- Descripcion
- Ingredientes
- InformacionNutricional
- Imagen
- CertificacionSinTACC
- MarcaId
- CategoriaId

---

## 3.6 Barrio

Representa los barrios de la Ciudad Autónoma de Buenos Aires.

### Atributos

- Id
- Nombre

---

## 3.7 TipoComida

Clasifica los restaurantes según el tipo de comida ofrecida.

### Atributos

- Id
- Nombre

---

## 3.8 TipoLocal

Clasifica los locales comerciales.

### Atributos

- Id
- Nombre

---

## 3.9 Característica

Representa los servicios o características que ofrece un restaurante o local.

Ejemplos:

- Menú Sin TACC
- Cocina exclusiva Sin TACC
- Opciones sin lactosa
- Opciones veganas

### Atributos

- Id
- Nombre
- Icono

---

## 3.10 Restaurante

Representa los restaurantes registrados en la plataforma.

### Atributos

- Id
- Nombre
- Descripcion
- ImagenExterior
- ImagenInterior
- Direccion
- BarrioId
- Telefono
- Email
- Instagram
- SitioWeb
- Horario
- Latitud
- Longitud
- TipoComidaId

---

## 3.11 Local

Representa supermercados y dietéticas.

### Atributos

- Id
- Nombre
- Descripcion
- Imagen
- Direccion
- BarrioId
- Telefono
- Email
- Instagram
- SitioWeb
- Horario
- Latitud
- Longitud
- TipoLocalId

---

## 3.12 Nutricionista

Representa profesionales especializados en celiaquía e intolerancias alimentarias.

### Atributos

- Id
- Nombre
- Apellido
- Matricula
- Descripcion
- FotoPerfil
- Direccion
- BarrioId
- Telefono
- TieneWhatsApp
- Email
- Instagram
- SitioWeb
- Horario
- Latitud
- Longitud

---

## 3.13 Promoción

Representa promociones publicadas por restaurantes y locales.

### Atributos

- Id
- Titulo
- Descripcion
- Imagen
- CodigoDescuento
- FechaInicio
- FechaFin
- RestauranteId
- LocalId

---

## 3.14 ComentarioRestaurante

Representa las opiniones realizadas por los usuarios sobre restaurantes.

### Atributos

- Id
- Titulo
- Comentario
- Calificacion
- FechaComentario
- UsuarioId
- RestauranteId

---

## 3.15 ComentarioLocal

Representa las opiniones realizadas por los usuarios sobre locales.

### Atributos

- Id
- Titulo
- Comentario
- Calificacion
- FechaComentario
- UsuarioId
- LocalId

---

## 3.16 FavoritoRestaurante

Representa los restaurantes guardados por un usuario.

### Atributos

- UsuarioId
- RestauranteId
- FechaAgregado

---

## 3.17 FavoritoLocal

Representa los locales guardados por un usuario.

### Atributos

- UsuarioId
- LocalId
- FechaAgregado

---

## 3.18 FavoritoNutricionista

Representa los nutricionistas guardados por un usuario.

### Atributos

- UsuarioId
- NutricionistaId
- FechaAgregado

---

## 3.19 RestauranteCaracterística

Relaciona los restaurantes con sus características.

### Atributos

- RestauranteId
- CaracteristicaId

---

## 3.20 LocalCaracterística

Relaciona los locales con sus características.

### Atributos

- LocalId
- CaracteristicaId

---

# 4. Relaciones

Las principales relaciones del modelo son:

- Un Rol puede tener muchos Usuarios.
- Una Marca puede tener muchos Productos.
- Una Categoría puede tener muchos Productos.
- Un Barrio puede tener muchos Restaurantes, Locales y Nutricionistas.
- Un Tipo de Comida puede pertenecer a muchos Restaurantes.
- Un Tipo de Local puede pertenecer a muchos Locales.
- Un Usuario puede realizar muchos Comentarios de Restaurantes y Locales.
- Un Restaurante puede recibir muchos Comentarios.
- Un Local puede recibir muchos Comentarios.
- Un Usuario puede guardar muchos Restaurantes, Locales y Nutricionistas como favoritos.
- Un Restaurante puede poseer múltiples Características.
- Un Local puede poseer múltiples Características.
- Un Restaurante o un Local pueden publicar múltiples Promociones.

---

# 5. Cardinalidades

| Relación | Cardinalidad |
|----------|--------------|
| Rol → Usuario | 1 : N |
| Marca → Producto | 1 : N |
| Categoría → Producto | 1 : N |
| Barrio → Restaurante | 1 : N |
| Barrio → Local | 1 : N |
| Barrio → Nutricionista | 1 : N |
| TipoComida → Restaurante | 1 : N |
| TipoLocal → Local | 1 : N |
| Usuario → ComentarioRestaurante | 1 : N |
| Usuario → ComentarioLocal | 1 : N |
| Restaurante → ComentarioRestaurante | 1 : N |
| Local → ComentarioLocal | 1 : N |
| Usuario ↔ Restaurante | N : N |
| Usuario ↔ Local | N : N |
| Usuario ↔ Nutricionista | N : N |
| Restaurante ↔ Característica | N : N |
| Local ↔ Característica | N : N |
| Restaurante → Promoción | 1 : N |
| Local → Promoción | 1 : N |

---

# 6. Diagrama Entidad-Relación

El Diagrama Entidad-Relación (DER) fue definido durante la etapa de diseño del sistema y representa gráficamente todas las entidades, atributos y relaciones de CeliaConnect.

El diagrama se encuentra disponible en el documento **06-DER** y en la carpeta **diagramas** del repositorio del proyecto.

---

# 7. Consideraciones

- Cada entidad posee una clave primaria.
- Las relaciones se implementan mediante claves foráneas.
- Las tablas de favoritos y características utilizan claves primarias compuestas.
- La integridad referencial será garantizada mediante restricciones en Microsoft SQL Server.
- El modelo está orientado al desarrollo de un MVP enfocado en la Ciudad Autónoma de Buenos Aires.

---

# 8. Próximos pasos

Con el modelo de datos finalizado, las siguientes etapas del proyecto serán:

- Implementación física de la base de datos en SQL Server.
- Creación del script de base de datos.
- Desarrollo del Backend.
- Desarrollo de la API REST.
- Desarrollo del Frontend Web y Mobile.

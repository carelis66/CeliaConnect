# 03 - Modelo de Datos

## Información del documento

| Campo | Valor |
|--------|--------|
| Proyecto | CeliaConnect |
| Documento | Modelo de Datos |
| Versión | 1.0 |
| Fecha | 31/07/2026 |
| Autor | Carelis Fagundez |
| Estado | En elaboración |

---

# 1. Introducción

El presente documento describe el modelo de datos de CeliaConnect.

Su objetivo es definir las entidades principales del sistema, sus atributos y las relaciones existentes entre ellas, proporcionando una base sólida para el diseño e implementación de la base de datos.

Este modelo servirá como referencia durante el desarrollo del backend y permitirá garantizar la integridad y consistencia de la información almacenada.

---

# 2. Objetivos

- Identificar las entidades principales del sistema.
- Definir los atributos de cada entidad.
- Establecer las relaciones entre las entidades.
- Facilitar el diseño de la base de datos.
- Servir como base para la implementación mediante SQL Server.

---

# 3. Entidades del sistema

## 3.1 Usuario

Representa a las personas registradas en la plataforma.

### Atributos

- Id
- Nombre
- Apellido
- Email
- Contraseña
- FotoPerfil
- FechaRegistro
- Rol
- Estado

---

## 3.2 Producto

Representa un producto apto para personas celíacas.

### Atributos

- Id
- Nombre
- Marca
- Descripción
- Ingredientes
- InformaciónNutricional
- Imagen
- Estado

---

## 3.3 Restaurante

Representa un restaurante registrado en la plataforma.

### Atributos

- Id
- Nombre
- Dirección
- Ciudad
- Provincia
- Latitud
- Longitud
- Teléfono
- SitioWeb
- Horario
- Imagen
- Estado

---

## 3.4 Tienda

Representa un comercio donde se venden productos aptos.

### Atributos

- Id
- Nombre
- Dirección
- Ciudad
- Provincia
- Latitud
- Longitud
- Teléfono
- Imagen
- Estado

---

## 3.5 Nutricionista

Representa un profesional especializado.

### Atributos

- Id
- Nombre
- Matrícula
- Especialidad
- Dirección
- Teléfono
- Email
- Imagen
- Estado

---

## 3.6 Promoción

Representa promociones publicadas por comercios.

### Atributos

- Id
- Título
- Descripción
- FechaInicio
- FechaFin
- Imagen
- Estado

---

## 3.7 Comentario

Representa opiniones realizadas por los usuarios.

### Atributos

- Id
- Descripción
- Calificación
- Fecha
- UsuarioId

---

## 3.8 Favorito

Representa los elementos guardados por un usuario.

### Atributos

- Id
- UsuarioId
- Tipo
- ElementoId
- Fecha

---

# 4. Relaciones

## Usuario

- Un usuario puede realizar muchos comentarios.
- Un usuario puede guardar muchos favoritos.

---

## Restaurante

- Un restaurante puede recibir muchos comentarios.

---

## Producto

- Un producto puede ser marcado como favorito por muchos usuarios.

---

## Tienda

- Una tienda puede tener varias promociones.

---

## Nutricionista

- Un nutricionista puede ser consultado por muchos usuarios.

---

# 5. Cardinalidades

| Relación | Cardinalidad |
|----------|--------------|
| Usuario → Comentario | 1 : N |
| Usuario → Favorito | 1 : N |
| Restaurante → Comentario | 1 : N |
| Tienda → Promoción | 1 : N |

---

# 6. Diagrama Entidad-Relación

El diagrama entidad-relación (MER) será elaborado una vez finalizado el diseño lógico de todas las entidades y relaciones del sistema.

---

# 7. Consideraciones

- Cada entidad contará con una clave primaria (Id).
- Las relaciones se implementarán mediante claves foráneas.
- La base de datos será desarrollada utilizando Microsoft SQL Server.
- El acceso a los datos será realizado mediante Prisma ORM.
- Se garantizará la integridad referencial entre todas las entidades.

---

# 8. Próximos pasos

Una vez validado el modelo de datos se procederá con:

- Diseño físico de la base de datos.
- Implementación de las tablas.
- Creación de la API REST.
- Desarrollo del Backend.

# 03 - Modelo de Datos

## Información del documento

| Campo | Valor |
|---|---|
| Proyecto | CeliaConnect |
| Documento | Modelo de Datos |
| Versión | 3.0 |
| Fecha | 12/11/2026 |
| Autor | Carelis Fagundez |
| Estado | Implementado — MVP funcional |

## 1. Introducción

El presente documento describe el modelo de datos implementado en **CeliaConnect**.

Su objetivo es documentar las principales entidades utilizadas por el sistema, sus atributos conceptuales y las relaciones existentes entre ellas.

El modelo constituye la base de persistencia de las funcionalidades disponibles en CeliaConnect, incluyendo usuarios y roles, productos, restaurantes, locales, nutricionistas, favoritos, comentarios, calificaciones y moderación.

La base de datos utiliza **MySQL/MariaDB**. Durante el desarrollo local se utiliza MySQL/MariaDB mediante XAMPP y para el entorno desplegado se utiliza una instancia MySQL alojada en Railway.

---

## 2. Objetivos

Los objetivos del modelo de datos son:

- Representar las entidades principales de CeliaConnect.
- Definir las relaciones entre los distintos elementos del sistema.
- Mantener la integridad de los datos.
- Permitir la persistencia de usuarios, contenido y operaciones.
- Soportar el sistema de autenticación y roles.
- Permitir almacenar favoritos asociados a cada usuario.
- Permitir almacenar comentarios y calificaciones.
- Soportar el flujo de moderación de opiniones.
- Proporcionar la información requerida por la API REST.
- Servir como base para las funcionalidades administrativas y el dashboard.

---

## 3. Entidades principales del sistema

### 3.1 Rol

Representa los distintos niveles de acceso disponibles en CeliaConnect.

Los roles implementados permiten diferenciar entre usuarios generales y usuarios con permisos especiales.

**Roles principales:**

- Administrador.
- Usuario.
- Moderador.

**Atributos principales:**

- Id.
- Nombre.

**Relación principal:**

Un rol puede estar asociado a múltiples usuarios.

---

### 3.2 Usuario

Representa a las personas registradas en CeliaConnect.

Almacena la información necesaria para identificar al usuario, autenticarlo y asociarlo con sus acciones dentro de la plataforma.

**Atributos principales:**

- Id.
- Documento.
- Nombre.
- Apellido.
- Fecha de nacimiento.
- Género.
- Teléfono.
- Email.
- PasswordHash.
- Foto de perfil.
- Fecha de registro.
- RolId.

La contraseña no se almacena en texto plano. El backend utiliza **bcrypt** para almacenar y verificar el hash correspondiente.

**Relaciones principales:**

Un usuario:

- Pertenece a un rol.
- Puede guardar múltiples favoritos.
- Puede publicar múltiples comentarios.
- Puede asignar calificaciones.

---

### 3.3 Marca

Representa la marca comercial asociada a un producto.

**Atributos principales:**

- Id.
- Nombre.
- Logo.

**Relación principal:**

Una marca puede estar asociada a múltiples productos.

---

### 3.4 Categoría

Permite clasificar los productos disponibles en CeliaConnect.

**Atributos principales:**

- Id.
- Nombre.

**Relación principal:**

Una categoría puede contener múltiples productos.

---

### 3.5 Producto

Representa un producto alimenticio registrado en CeliaConnect.

**Atributos principales:**

- Id.
- Nombre.
- Descripción.
- Ingredientes.
- Información nutricional.
- Imagen.
- Certificación Sin TACC.
- Código de barras.
- MarcaId.
- CategoriaId.

**Relaciones principales:**

Un producto:

- Pertenece a una marca.
- Pertenece a una categoría.
- Puede ser guardado como favorito por múltiples usuarios.
- Puede recibir múltiples comentarios y calificaciones.

---

### 3.6 Barrio

Representa una división geográfica utilizada para organizar la ubicación de establecimientos y profesionales dentro del alcance inicial del sistema.

El MVP de CeliaConnect se encuentra orientado a **Ciudad Autónoma de Buenos Aires (CABA)**.

**Atributos principales:**

- Id.
- Nombre.

**Relaciones principales:**

Un barrio puede estar asociado con múltiples:

- Restaurantes.
- Locales.
- Nutricionistas.

---

### 3.7 TipoRestaurante

Permite clasificar los restaurantes según su tipo.

**Atributos principales:**

- Id.
- Nombre.

**Relación principal:**

Un tipo de restaurante puede estar asociado a múltiples restaurantes.

---

### 3.8 TipoLocal

Permite clasificar los locales comerciales disponibles en CeliaConnect.

Ejemplos posibles incluyen dietéticas, supermercados y comercios especializados.

**Atributos principales:**

- Id.
- Nombre.

**Relación principal:**

Un tipo de local puede estar asociado a múltiples locales.

---

### 3.9 Característica

Representa características o servicios que pueden estar asociados con restaurantes y locales.

Ejemplos:

- Opciones Sin TACC.
- Opciones sin lactosa.
- Opciones veganas.
- Características específicas del establecimiento.

**Atributos principales:**

- Id.
- Nombre.
- Icono.

Las relaciones con restaurantes y locales se resuelven mediante tablas intermedias.

---

### 3.10 Restaurante

Representa los restaurantes publicados en CeliaConnect.

**Atributos principales:**

- Id.
- Nombre.
- Descripción.
- Imágenes.
- Dirección.
- BarrioId.
- Teléfono.
- Email.
- Instagram.
- Sitio web.
- Horario.
- Latitud.
- Longitud.
- TipoRestauranteId.

**Relaciones principales:**

Un restaurante:

- Pertenece a un barrio.
- Pertenece a un tipo de restaurante.
- Puede poseer múltiples características.
- Puede ser guardado como favorito por múltiples usuarios.
- Puede recibir múltiples comentarios y calificaciones.

---

### 3.11 Local

Representa los locales comerciales registrados en CeliaConnect.

Dentro del sistema se utiliza el término **Local** para identificar comercios relacionados con productos Sin TACC, como dietéticas, supermercados y otros establecimientos.

**Atributos principales:**

- Id.
- Nombre.
- Descripción.
- Imagen.
- Dirección.
- BarrioId.
- Teléfono.
- Email.
- Instagram.
- Sitio web.
- Horario.
- Latitud.
- Longitud.
- TipoLocalId.

**Relaciones principales:**

Un local:

- Pertenece a un barrio.
- Pertenece a un tipo de local.
- Puede poseer múltiples características.
- Puede ser guardado como favorito por múltiples usuarios.
- Puede recibir múltiples comentarios y calificaciones.

---

### 3.12 Nutricionista

Representa a los profesionales de nutrición publicados en CeliaConnect.

**Atributos principales:**

- Id.
- Nombre.
- Apellido.
- Matrícula.
- Descripción.
- Foto de perfil.
- Dirección.
- BarrioId.
- Teléfono.
- Disponibilidad de WhatsApp.
- Email.
- Instagram.
- Sitio web.
- Horario.
- Latitud.
- Longitud.

**Relaciones principales:**

Un nutricionista:

- Puede estar asociado a un barrio.
- Puede ser guardado como favorito por múltiples usuarios.
- Puede recibir múltiples comentarios y calificaciones.

---

## 4. Entidades de favoritos

CeliaConnect permite que los usuarios autenticados guarden distintos tipos de contenido como favoritos.

La relación entre usuarios y elementos guardados se implementa mediante tablas específicas.

### 4.1 FavoritoProducto

Relaciona usuarios con productos guardados como favoritos.

**Atributos principales:**

- UsuarioId.
- ProductoId.
- FechaAgregado.

---

### 4.2 FavoritoRestaurante

Relaciona usuarios con restaurantes guardados como favoritos.

**Atributos principales:**

- UsuarioId.
- RestauranteId.
- FechaAgregado.

---

### 4.3 FavoritoLocal

Relaciona usuarios con locales guardados como favoritos.

**Atributos principales:**

- UsuarioId.
- LocalId.
- FechaAgregado.

---

### 4.4 FavoritoNutricionista

Relaciona usuarios con nutricionistas guardados como favoritos.

**Atributos principales:**

- UsuarioId.
- NutricionistaId.
- FechaAgregado.

---

## 5. Entidades de comentarios y valoraciones

CeliaConnect almacena las opiniones de los usuarios mediante entidades asociadas a cada tipo de contenido.

Los comentarios incluyen una calificación mediante estrellas y un estado utilizado durante el proceso de moderación.

### 5.1 ComentarioProducto

Representa las opiniones realizadas por usuarios sobre productos.

**Atributos principales:**

- Id.
- Título.
- Comentario.
- Calificación.
- FechaComentario.
- Estado.
- UsuarioId.
- ProductoId.

---

### 5.2 ComentarioRestaurante

Representa las opiniones realizadas por usuarios sobre restaurantes.

**Atributos principales:**

- Id.
- Título.
- Comentario.
- Calificación.
- FechaComentario.
- Estado.
- UsuarioId.
- RestauranteId.

---

### 5.3 ComentarioLocal

Representa las opiniones realizadas por usuarios sobre locales.

**Atributos principales:**

- Id.
- Título.
- Comentario.
- Calificación.
- FechaComentario.
- Estado.
- UsuarioId.
- LocalId.

---

### 5.4 ComentarioNutricionista

Representa las opiniones realizadas por usuarios sobre nutricionistas.

**Atributos principales:**

- Id.
- Título.
- Comentario.
- Calificación.
- FechaComentario.
- Estado.
- UsuarioId.
- NutricionistaId.

---

## 6. Estados de moderación

Los comentarios publicados por los usuarios no se muestran automáticamente.

Cada comentario posee un estado que permite implementar el flujo de moderación.

Los estados funcionales principales son:

```text
Pendiente
Aprobado
Rechazado
```

El flujo general es:

```text
Usuario publica comentario
          ↓
       Pendiente
          ↓
 Moderador / Administrador
       ↙         ↘
  Aprobado      Rechazado
      ↓
Visible públicamente
```

Solo los comentarios aprobados se muestran públicamente en los detalles correspondientes.

---

## 7. Entidades de relación de características

### 7.1 RestauranteCaracterística

Resuelve la relación muchos a muchos entre restaurantes y características.

**Atributos principales:**

- RestauranteId.
- CaracteristicaId.

---

### 7.2 LocalCaracterística

Resuelve la relación muchos a muchos entre locales y características.

**Atributos principales:**

- LocalId.
- CaracteristicaId.

---

## 8. Relaciones principales

Las relaciones principales del modelo son:

- Un Rol puede tener muchos Usuarios.
- Cada Usuario pertenece a un Rol.
- Una Marca puede tener muchos Productos.
- Cada Producto pertenece a una Marca.
- Una Categoría puede tener muchos Productos.
- Cada Producto pertenece a una Categoría.
- Un Barrio puede estar asociado a múltiples Restaurantes.
- Un Barrio puede estar asociado a múltiples Locales.
- Un Barrio puede estar asociado a múltiples Nutricionistas.
- Un TipoRestaurante puede estar asociado a múltiples Restaurantes.
- Un TipoLocal puede estar asociado a múltiples Locales.
- Un Usuario puede realizar múltiples Comentarios.
- Un Producto puede recibir múltiples Comentarios.
- Un Restaurante puede recibir múltiples Comentarios.
- Un Local puede recibir múltiples Comentarios.
- Un Nutricionista puede recibir múltiples Comentarios.
- Un Usuario puede guardar múltiples Productos como favoritos.
- Un Usuario puede guardar múltiples Restaurantes como favoritos.
- Un Usuario puede guardar múltiples Locales como favoritos.
- Un Usuario puede guardar múltiples Nutricionistas como favoritos.
- Un Restaurante puede poseer múltiples Características.
- Una Característica puede estar asociada a múltiples Restaurantes.
- Un Local puede poseer múltiples Características.
- Una Característica puede estar asociada a múltiples Locales.

---

## 9. Cardinalidades

| Relación | Cardinalidad |
|---|---|
| Rol → Usuario | 1 : N |
| Marca → Producto | 1 : N |
| Categoría → Producto | 1 : N |
| Barrio → Restaurante | 1 : N |
| Barrio → Local | 1 : N |
| Barrio → Nutricionista | 1 : N |
| TipoRestaurante → Restaurante | 1 : N |
| TipoLocal → Local | 1 : N |
| Usuario → ComentarioProducto | 1 : N |
| Producto → ComentarioProducto | 1 : N |
| Usuario → ComentarioRestaurante | 1 : N |
| Restaurante → ComentarioRestaurante | 1 : N |
| Usuario → ComentarioLocal | 1 : N |
| Local → ComentarioLocal | 1 : N |
| Usuario → ComentarioNutricionista | 1 : N |
| Nutricionista → ComentarioNutricionista | 1 : N |
| Usuario ↔ Producto | N : N mediante FavoritoProducto |
| Usuario ↔ Restaurante | N : N mediante FavoritoRestaurante |
| Usuario ↔ Local | N : N mediante FavoritoLocal |
| Usuario ↔ Nutricionista | N : N mediante FavoritoNutricionista |
| Restaurante ↔ Característica | N : N mediante RestauranteCaracterística |
| Local ↔ Característica | N : N mediante LocalCaracterística |

---

## 10. Integridad referencial

La integridad referencial se implementa mediante claves primarias y claves foráneas.

Las relaciones entre entidades permiten evitar registros sin correspondencia y mantener la consistencia de la información.

Las tablas intermedias permiten representar relaciones muchos a muchos, como:

```text
Usuario ↔ Producto
Usuario ↔ Restaurante
Usuario ↔ Local
Usuario ↔ Nutricionista

Restaurante ↔ Característica
Local ↔ Característica
```

Las relaciones de comentarios permiten identificar tanto al usuario que publicó la opinión como al elemento sobre el cual fue realizada.

---

## 11. Persistencia de datos

El acceso a la base de datos se realiza desde el backend utilizando:

```text
mysql2/promise
```

La arquitectura no utiliza Sequelize ni otro ORM.

El backend ejecuta las consultas necesarias y expone los resultados mediante la API REST.

El flujo general es:

```text
Frontend Web / Android
          ↓
       API REST
          ↓
 Node.js + Express
          ↓
   MySQL2 / Promise
          ↓
       MySQL
```

---

## 12. Entorno local y producción

### Entorno local

Durante el desarrollo se utiliza:

- XAMPP.
- MySQL/MariaDB.
- Scripts SQL del proyecto.
- Backend Node.js ejecutado localmente.

### Producción

La base de datos de producción se encuentra desplegada mediante **MySQL en Railway**.

El backend desplegado utiliza variables de entorno para obtener los datos de conexión:

- Host.
- Puerto.
- Base de datos.
- Usuario.
- Contraseña.

Esto permite mantener separada la configuración del código fuente.

---

## 13. Scripts de Base de Datos

El repositorio contiene los archivos necesarios para representar y reconstruir la estructura de datos del proyecto.

Dentro del directorio:

```text
database/
```

se mantienen archivos como:

```text
schema.sql
seed.sql
celiaconnect_backup.sql
```

### schema.sql

Contiene la definición de la estructura de la base de datos.

### seed.sql

Contiene datos iniciales utilizados para poblar el sistema y facilitar las pruebas.

### Backup

Permite conservar una copia de la base utilizada durante el desarrollo.

Estos archivos forman parte del repositorio y permiten documentar la implementación física del modelo.

---

## 14. Diagrama Entidad-Relación

El Diagrama Entidad-Relación representa gráficamente las principales entidades y relaciones de CeliaConnect.

El diagrama correspondiente debe mantenerse alineado con la estructura implementada en los scripts SQL del proyecto.

Entre las relaciones principales que deben estar representadas se encuentran:

```text
Rol
 └── Usuario
      ├── Favoritos
      └── Comentarios

Marca ── Producto ── Categoría

Barrio
 ├── Restaurante
 ├── Local
 └── Nutricionista

Usuario ↔ Producto
Usuario ↔ Restaurante
Usuario ↔ Local
Usuario ↔ Nutricionista

Restaurante ↔ Característica
Local ↔ Característica
```

El diagrama se encuentra documentado dentro de los recursos correspondientes del repositorio y complementado por el documento de diagramas del sistema.

---

## 15. Alcance del modelo

El modelo de datos actual está diseñado para cubrir las funcionalidades implementadas en el MVP:

- Usuarios.
- Roles.
- Productos.
- Marcas.
- Categorías.
- Restaurantes.
- Locales.
- Nutricionistas.
- Barrios.
- Tipos de establecimientos.
- Características.
- Favoritos.
- Comentarios.
- Calificaciones.
- Moderación.

El modelo se encuentra orientado inicialmente al alcance geográfico de CABA.

---

## 16. Funcionalidades no incluidas en el modelo actual del MVP

Durante las primeras etapas del proyecto se evaluaron funcionalidades adicionales que finalmente no forman parte del alcance implementado.

Entre ellas se encuentran:

- Sistema completo de promociones.
- Cupones o códigos de descuento.
- Recuperación de contraseña.
- Gestión avanzada del perfil.
- Almacenamiento dinámico de imágenes mediante servicios externos.
- Geolocalización automática del usuario.

Estas funcionalidades pueden incorporarse posteriormente mediante nuevas entidades o ampliaciones del modelo actual.

---

## 17. Consideraciones

- Cada entidad principal posee una clave primaria.
- Las relaciones se implementan mediante claves foráneas.
- Las tablas intermedias permiten implementar relaciones muchos a muchos.
- Los comentarios se encuentran asociados al usuario y al elemento correspondiente.
- Los comentarios incluyen información necesaria para implementar el proceso de moderación.
- Los favoritos se almacenan en la base de datos y no únicamente en el navegador.
- Los roles permiten controlar diferentes niveles de acceso.
- La integridad de la información se mantiene desde MySQL y desde las validaciones realizadas por el backend.
- La Web y la aplicación Android utilizan la misma base de datos a través de la API REST.

---

## 18. Estado actual

El modelo de datos se encuentra **implementado y operativo**.

La base de datos es utilizada actualmente por:

- La aplicación Web.
- La aplicación Android.
- La API REST.
- El sistema de autenticación.
- El sistema de favoritos.
- El sistema de comentarios y calificaciones.
- El panel de moderación.
- El panel administrativo.
- El dashboard.

La conexión con la base de datos fue validada tanto en el entorno local como en el entorno desplegado en Railway.

---

## 19. Próximos pasos

Las tareas restantes relacionadas con el modelo de datos corresponden principalmente a documentación y mantenimiento:

- Mantener actualizado el Diagrama Entidad-Relación.
- Verificar que los diagramas coincidan con los scripts SQL definitivos.
- Mantener actualizado el backup de la base.
- Documentar cualquier ampliación futura del modelo.
- Conservar sincronizados `schema.sql`, `seed.sql` y la estructura utilizada en producción.

# 01 - Módulos del Sistema

## Información del documento

| Campo | Valor |
|---|---|
| Proyecto | CeliaConnect |
| Versión | 2.0 |
| Fecha | 12/11/2026 |
| Autor | Carelis Fagundez |
| Estado | Actualizado — MVP funcional |

## 1. Introducción

Este documento describe los módulos funcionales que conforman **CeliaConnect**, una plataforma web y móvil orientada a centralizar información relacionada con productos Sin TACC, restaurantes, locales comerciales y profesionales de nutrición.

Los módulos definidos representan las principales áreas funcionales implementadas en el sistema y sirven como referencia para comprender la organización de la aplicación, su API REST, el modelo de datos y los distintos niveles de acceso.

CeliaConnect cuenta actualmente con una **versión web responsive desplegada en Railway** y una **versión móvil Android desarrollada mediante Capacitor**. Ambas versiones utilizan el mismo backend y consumen la misma API REST.

La primera etapa del proyecto se encuentra enfocada en la **Ciudad Autónoma de Buenos Aires (CABA), Argentina**.

---

## 2. Objetivos

Los objetivos de este documento son:

- Identificar los módulos funcionales que componen CeliaConnect.
- Describir las principales funcionalidades implementadas en cada módulo.
- Identificar los roles que intervienen en el sistema.
- Establecer las relaciones principales entre los distintos módulos.
- Documentar el alcance funcional correspondiente al MVP.
- Servir como referencia para la arquitectura, API REST, modelo de datos y documentación funcional del proyecto.

---

## 3. Roles del sistema

CeliaConnect contempla tres roles principales: **Usuario, Moderador y Administrador**.

### 3.1 Usuario

Es la persona que utiliza CeliaConnect para consultar información y participar en las funcionalidades disponibles para la comunidad.

Puede:

- Registrarse.
- Iniciar sesión.
- Cerrar sesión.
- Buscar y consultar productos.
- Consultar restaurantes.
- Consultar locales comerciales.
- Consultar nutricionistas.
- Acceder al detalle de cada elemento.
- Guardar productos, restaurantes, locales y nutricionistas como favoritos.
- Consultar sus favoritos.
- Publicar comentarios.
- Asignar calificaciones de 1 a 5 estrellas.
- Consultar comentarios previamente aprobados.

Las opiniones publicadas por los usuarios quedan sujetas al proceso de moderación antes de mostrarse públicamente.

### 3.2 Moderador

Es el usuario encargado de revisar las opiniones enviadas por la comunidad.

Puede:

- Acceder al panel de moderación.
- Consultar comentarios pendientes.
- Visualizar información de la opinión enviada.
- Aprobar comentarios.
- Rechazar comentarios.

Los comentarios aprobados pasan a ser visibles públicamente dentro del módulo correspondiente.

### 3.3 Administrador

Es el usuario con mayores permisos dentro del sistema y se encarga de tareas generales de gestión y supervisión.

Puede:

- Acceder al panel administrativo.
- Gestionar usuarios.
- Consultar información administrativa.
- Gestionar contenido del sistema.
- Realizar tareas de moderación.
- Consultar indicadores y métricas del sistema.

---

## 4. Módulos del sistema

### 4.1 Autenticación

**Objetivo:** Gestionar el acceso seguro de los usuarios a CeliaConnect.

**Funcionalidades:**

- Registro de usuario.
- Inicio de sesión.
- Cierre de sesión.
- Persistencia de sesión.
- Validación de sesión.
- Protección de operaciones que requieren autenticación.
- Control de acceso según roles.

La autenticación se implementa mediante **JSON Web Tokens (JWT)** y las contraseñas se almacenan de forma protegida utilizando **bcrypt**.

**Usuarios:** Usuario, Moderador, Administrador.

**Dependencias:** Usuarios y Roles.

---

### 4.2 Usuarios

**Objetivo:** Gestionar las cuentas registradas y permitir su identificación dentro del sistema.

**Funcionalidades:**

- Registro de cuentas.
- Identificación del usuario autenticado.
- Asociación de roles.
- Asociación de favoritos.
- Asociación de comentarios y valoraciones.
- Gestión administrativa de usuarios.

**Usuarios:** Usuario, Moderador, Administrador.

**Dependencias:** Autenticación y Roles.

---

### 4.3 Productos

**Objetivo:** Permitir la consulta de productos relacionados con la alimentación Sin TACC.

**Funcionalidades:**

- Consultar catálogo de productos.
- Buscar productos.
- Filtrar productos.
- Ordenar resultados.
- Paginar resultados.
- Filtrar productos certificados Sin TACC.
- Consultar detalle del producto.
- Consultar marca y categoría.
- Consultar descripción.
- Consultar ingredientes.
- Consultar información nutricional.
- Consultar código de barras.
- Visualizar imágenes.
- Agregar y eliminar productos de favoritos.
- Consultar comentarios aprobados.
- Publicar comentarios.
- Asignar calificaciones.

**Usuarios:** Visitante, Usuario, Moderador, Administrador.

**Dependencias:** Categorías, Marcas, Favoritos y Comentarios.

---

### 4.4 Restaurantes

**Objetivo:** Permitir la consulta de restaurantes relacionados con opciones de alimentación Sin TACC.

**Funcionalidades:**

- Consultar restaurantes.
- Acceder al detalle del establecimiento.
- Consultar ubicación.
- Consultar información de contacto.
- Visualizar características del establecimiento.
- Visualizar imágenes.
- Acceder a información de ubicación mediante mapas.
- Agregar y eliminar restaurantes de favoritos.
- Consultar opiniones aprobadas.
- Publicar opiniones.
- Asignar calificaciones.

**Usuarios:** Visitante, Usuario, Moderador, Administrador.

**Dependencias:** Características, Favoritos y Comentarios.

---

### 4.5 Locales

**Objetivo:** Permitir la consulta de locales comerciales y dietéticas relacionadas con productos Sin TACC.

**Funcionalidades:**

- Consultar locales.
- Acceder al detalle del establecimiento.
- Consultar tipo de local.
- Consultar dirección y ubicación.
- Consultar información de contacto.
- Visualizar características.
- Visualizar imágenes.
- Acceder a información de ubicación mediante mapas.
- Agregar y eliminar locales de favoritos.
- Consultar opiniones aprobadas.
- Publicar opiniones.
- Asignar calificaciones.

**Usuarios:** Visitante, Usuario, Moderador, Administrador.

**Dependencias:** Tipo de Local, Características, Favoritos y Comentarios.

---

### 4.6 Nutricionistas

**Objetivo:** Facilitar el acceso a información sobre profesionales de nutrición vinculados con la alimentación Sin TACC.

**Funcionalidades:**

- Consultar profesionales.
- Acceder al detalle del nutricionista.
- Consultar información profesional.
- Consultar información de contacto.
- Consultar ubicación o modalidad de atención disponible.
- Agregar y eliminar nutricionistas de favoritos.
- Consultar opiniones aprobadas.
- Publicar opiniones.
- Asignar calificaciones.

**Usuarios:** Visitante, Usuario, Moderador, Administrador.

**Dependencias:** Favoritos y Comentarios.

---

### 4.7 Favoritos

**Objetivo:** Permitir que los usuarios registrados guarden elementos de interés para futuras consultas.

**Funcionalidades:**

- Agregar favoritos.
- Eliminar favoritos.
- Consultar favoritos asociados a la cuenta del usuario.
- Identificar visualmente elementos guardados.

El sistema permite guardar como favoritos:

- Productos.
- Restaurantes.
- Locales.
- Nutricionistas.

Los favoritos se almacenan en la base de datos y quedan asociados al usuario autenticado.

**Usuarios:** Usuario.

**Dependencias:** Autenticación, Productos, Restaurantes, Locales y Nutricionistas.

---

### 4.8 Comentarios y valoraciones

**Objetivo:** Permitir que los usuarios compartan experiencias y opiniones sobre los elementos publicados en CeliaConnect.

**Funcionalidades:**

- Crear comentarios.
- Asignar calificaciones de 1 a 5 estrellas.
- Enviar opiniones a moderación.
- Consultar comentarios aprobados.
- Asociar comentarios con el usuario que los publicó.
- Gestionar el estado de moderación.

Los comentarios pueden tener los siguientes estados:

```text
Pendiente → Aprobado / Rechazado
```

Cuando un usuario publica una opinión, esta queda inicialmente en estado **pendiente**.

Solamente las opiniones aprobadas por un moderador o administrador son visibles públicamente.

**Usuarios:** Usuario, Moderador, Administrador.

**Dependencias:** Usuarios, Productos, Restaurantes, Locales y Nutricionistas.

---

### 4.9 Moderación

**Objetivo:** Controlar el contenido generado por los usuarios antes de su publicación.

**Funcionalidades:**

- Consultar comentarios pendientes.
- Visualizar usuario, título, comentario y calificación.
- Aprobar comentarios.
- Rechazar comentarios.
- Actualizar el estado de moderación.
- Permitir la publicación de comentarios aprobados.

**Usuarios:** Moderador, Administrador.

**Dependencias:** Comentarios, Usuarios y Autenticación.

El flujo general de moderación es:

```text
Usuario publica opinión
        ↓
Comentario pendiente
        ↓
Moderador / Administrador revisa
        ↓
Aprobación o rechazo
        ↓
Publicación si fue aprobado
```

---

### 4.10 Ubicación y mapas

**Objetivo:** Facilitar la consulta de la ubicación de establecimientos y profesionales cuando dicha información se encuentra disponible.

**Funcionalidades:**

- Mostrar información de dirección.
- Presentar referencias de ubicación.
- Permitir acceso a mapas desde los detalles correspondientes.

La implementación utiliza enlaces e integraciones con **Google Maps** según la información disponible para cada establecimiento.

**Usuarios:** Visitante, Usuario, Moderador, Administrador.

**Dependencias:** Restaurantes, Locales y Nutricionistas.

---

### 4.11 Administración

**Objetivo:** Permitir la gestión y supervisión general de CeliaConnect.

**Funcionalidades:**

- Acceso mediante permisos administrativos.
- Gestión de usuarios.
- Gestión de contenido.
- Supervisión de información del sistema.
- Moderación de comentarios.
- Consulta de información administrativa.
- Visualización de indicadores y métricas.

**Usuarios:** Administrador.

**Dependencias:** Autenticación, Roles y módulos administrables del sistema.

---

### 4.12 Dashboard administrativo

**Objetivo:** Presentar información resumida sobre el estado y contenido de CeliaConnect.

**Funcionalidades:**

- Consultar indicadores generales.
- Visualizar información obtenida desde la base de datos.
- Facilitar el seguimiento administrativo del sistema.

**Usuarios:** Administrador.

**Dependencias:** Administración y Base de Datos.

---

### 4.13 Aplicación Web

**Objetivo:** Proporcionar acceso a CeliaConnect desde navegadores web en computadoras, tablets y dispositivos móviles.

**Características:**

- Diseño responsive.
- Navegación adaptada a diferentes tamaños de pantalla.
- Consumo de la API REST.
- Autenticación y manejo de sesión.
- Acceso a las funcionalidades públicas y privadas según el rol.

La versión web se encuentra desplegada en **Railway**.

**URL:**

```text
https://celiaconnect.up.railway.app
```

---

### 4.14 Aplicación Mobile Android

**Objetivo:** Proporcionar una versión móvil instalable de CeliaConnect para dispositivos Android.

La aplicación utiliza **Capacitor** para integrar el frontend responsive de CeliaConnect dentro de un proyecto Android.

**Características:**

- Proyecto Android generado mediante Capacitor.
- Ejecución mediante Android Studio.
- Compatibilidad con dispositivos y emuladores Android.
- Consumo de la misma API REST utilizada por la versión web.
- Acceso a autenticación, navegación, favoritos, comentarios y demás funcionalidades del sistema.

**Identificador de aplicación:**

```text
com.celiaconnect.app
```

La aplicación fue compilada, instalada y probada mediante un emulador Android.

**Dependencias:** Frontend, API REST, Autenticación y Backend desplegado.

---

## 5. Relación entre módulos

| Módulo | Principales dependencias |
|---|---|
| Autenticación | Usuarios, Roles |
| Usuarios | Autenticación, Roles |
| Productos | Categorías, Marcas, Favoritos, Comentarios |
| Restaurantes | Características, Favoritos, Comentarios |
| Locales | Tipo de Local, Características, Favoritos, Comentarios |
| Nutricionistas | Favoritos, Comentarios |
| Favoritos | Usuarios, Productos, Restaurantes, Locales, Nutricionistas |
| Comentarios y valoraciones | Usuarios, Productos, Restaurantes, Locales, Nutricionistas |
| Moderación | Comentarios, Usuarios, Autenticación |
| Ubicación y mapas | Restaurantes, Locales, Nutricionistas |
| Administración | Autenticación, Roles, Usuarios y contenido |
| Dashboard administrativo | Administración, Base de Datos |
| Aplicación Web | Frontend, API REST |
| Aplicación Mobile Android | Capacitor, Frontend, API REST |

---

## 6. Tecnologías relacionadas con los módulos

Las principales tecnologías utilizadas para implementar los módulos de CeliaConnect son:

### Frontend

- HTML5.
- CSS3.
- JavaScript Vanilla.
- Bootstrap 5.
- Bootstrap Icons.

### Backend

- Node.js.
- Express.
- MySQL2.
- bcrypt.
- JSON Web Token (JWT).
- CORS.
- dotenv.

### Base de datos

- MySQL / MariaDB.

### Mobile

- Capacitor.
- Android.
- Android Studio.
- Gradle.

### Deploy

- Railway.

---

## 7. Consideraciones de implementación

- CeliaConnect dispone de una versión Web y una versión Mobile Android.
- Ambas versiones consumen la misma API REST.
- La versión móvil se implementa mediante **Capacitor**, no mediante PWA/PWABuilder.
- La información se almacena en una base de datos **MySQL/MariaDB**.
- La autenticación se encuentra implementada mediante **JWT**.
- Las contraseñas se almacenan utilizando **bcrypt**.
- Los roles y permisos son validados desde el backend.
- Las imágenes utilizadas actualmente forman parte de los recursos del proyecto; no se utiliza Cloudinary en el MVP.
- La información de ubicación se complementa mediante integración o enlaces con Google Maps.
- El frontend, backend y base de datos cuentan con infraestructura desplegada en Railway.
- El alcance inicial del sistema se encuentra enfocado en CABA.

---

## 8. Alcance actual del MVP

Los principales módulos definidos para el MVP se encuentran implementados y funcionales:

- Autenticación.
- Usuarios y roles.
- Productos.
- Restaurantes.
- Locales.
- Nutricionistas.
- Favoritos.
- Comentarios y calificaciones.
- Moderación.
- Administración.
- Dashboard.
- Aplicación web responsive.
- Aplicación Android mediante Capacitor.

El sistema fue probado tanto desde la versión web como desde la versión Android, incluyendo el flujo completo de autenticación, navegación, favoritos, publicación de opiniones y moderación.

Algunas funcionalidades consideradas durante las primeras etapas de análisis, como recuperación de contraseña, edición avanzada de perfil, carga dinámica de imágenes, promociones completas o geolocalización automática basada en la ubicación del usuario, no forman parte del alcance implementado del MVP.

---

## 9. Estado del documento

Este documento refleja el estado funcional de **CeliaConnect correspondiente al MVP del Proyecto Final 2026**.

Los módulos aquí descriptos representan las funcionalidades implementadas y las principales relaciones existentes entre los componentes del sistema.
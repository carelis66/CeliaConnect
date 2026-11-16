# CeliaConnect

**Plataforma web y móvil de información y servicios para la comunidad celíaca**

**Proyecto Final — Analista de Sistemas**  
**Escuela Da Vinci**  
**Autora:** Carelis Fagundez  
**Año:** 2026

---

## Descripción del proyecto

**CeliaConnect** es una plataforma orientada a centralizar información útil para personas celíacas o que siguen una alimentación libre de gluten (Sin TACC).

El sistema permite consultar información sobre:

- Productos Sin TACC.
- Restaurantes.
- Locales comerciales y dietéticas.
- Profesionales de nutrición.

Además, los usuarios registrados pueden guardar favoritos, realizar valoraciones y compartir experiencias mediante comentarios y calificaciones.

CeliaConnect incorpora un sistema de moderación que permite revisar las opiniones enviadas antes de su publicación, junto con herramientas administrativas para la gestión del contenido y los usuarios.

La primera etapa del proyecto está enfocada en la **Ciudad Autónoma de Buenos Aires (CABA), Argentina**, con posibilidad de ampliar progresivamente su cobertura geográfica.

Actualmente CeliaConnect cuenta con una **versión web responsive desplegada en la nube** y una **versión móvil Android desarrollada mediante Capacitor**.

---

## Objetivo

Desarrollar una plataforma centralizada, accesible y fácil de utilizar que facilite la búsqueda de información relacionada con la alimentación Sin TACC.

El sistema integra catálogo de productos, establecimientos y profesionales, registro y autenticación de usuarios, favoritos, comentarios, calificaciones, moderación de contenido y herramientas administrativas.

---

## Acceso al sistema

### Aplicación web

CeliaConnect se encuentra desplegada en Railway y puede utilizarse desde:

**https://celiaconnect.up.railway.app**

### API REST

El backend se encuentra desplegado independientemente y disponible en:

**https://celiaconnect-production.up.railway.app**

### Aplicación Android

CeliaConnect cuenta con una versión para dispositivos Android desarrollada mediante **Capacitor**, reutilizando la interfaz web responsive de la plataforma dentro de una aplicación móvil.

El proyecto Android se encuentra incluido dentro del mismo repositorio, en la carpeta:

```text
android/
```

La aplicación fue compilada y probada mediante **Android Studio** utilizando un emulador Android.

Además, se generó un **APK Release firmado**, correspondiente a la versión **CeliaConnect v1.0.0**, disponible para su descarga desde la sección **Releases** del repositorio.

Para instalar CeliaConnect en un dispositivo Android:

1. Acceder a la sección **Releases** del repositorio.
2. Seleccionar la versión **v1.0.0**.
3. Descargar el archivo APK disponible en **Assets**.
4. Abrir el archivo descargado desde el dispositivo Android.
5. Autorizar la instalación desde esa fuente si Android lo solicita.
6. Seleccionar **Instalar**.

Una vez finalizada la instalación, CeliaConnect estará disponible entre las aplicaciones del dispositivo.

---

# Funcionalidades

## Usuarios y autenticación

- Registro de usuarios.
- Inicio de sesión mediante correo electrónico y contraseña.
- Contraseñas protegidas mediante bcrypt.
- Autenticación mediante JSON Web Tokens (JWT).
- Persistencia de sesión.
- Cierre de sesión.
- Protección de endpoints autenticados.
- Control de acceso según roles.

El sistema contempla tres roles principales:

- Usuario.
- Moderador.
- Administrador.

---

## Productos

- Consulta del catálogo de productos.
- Visualización del detalle de cada producto.
- Información de marca y categoría.
- Identificación de productos certificados Sin TACC.
- Búsqueda por producto o marca.
- Filtros.
- Ordenamiento.
- Paginación.
- Comentarios y calificaciones.
- Gestión de favoritos.

---

## Restaurantes

- Consulta de restaurantes.
- Visualización de información detallada.
- Dirección y ubicación.
- Información de contacto.
- Características del establecimiento.
- Comentarios y calificaciones.
- Gestión de favoritos.

---

## Locales

- Consulta de locales comerciales y dietéticas.
- Visualización del detalle del establecimiento.
- Dirección y ubicación.
- Información de contacto.
- Características del local.
- Comentarios y calificaciones.
- Gestión de favoritos.

---

## Nutricionistas

- Consulta de profesionales de nutrición.
- Visualización de información profesional.
- Datos de contacto.
- Información de atención.
- Comentarios y calificaciones.
- Gestión de favoritos.

---

## Favoritos

Los usuarios autenticados pueden guardar y administrar favoritos correspondientes a:

- Productos.
- Restaurantes.
- Locales.
- Nutricionistas.

Los favoritos quedan asociados a la cuenta del usuario.

---

## Comentarios y valoraciones

Los usuarios autenticados pueden compartir experiencias dentro de los distintos módulos.

El sistema permite:

- Publicar comentarios.
- Asignar calificaciones de 1 a 5 estrellas.
- Enviar opiniones a moderación.
- Consultar comentarios previamente aprobados.

Los comentarios utilizan los siguientes estados:

```text
Pendiente → Aprobado / Rechazado
```

Solamente los comentarios aprobados son visibles públicamente.

---

## Moderación

CeliaConnect cuenta con un rol específico de **moderador**.

El panel de moderación permite:

- Consultar opiniones pendientes.
- Visualizar usuario, título, comentario y calificación.
- Aprobar comentarios.
- Rechazar comentarios.
- Actualizar automáticamente el contenido visible públicamente.

El flujo completo de moderación fue probado desde la aplicación móvil:

```text
Usuario publica opinión
        ↓
Comentario pendiente
        ↓
Moderador revisa
        ↓
Aprobación / Rechazo
        ↓
Publicación del comentario aprobado
```

---

## Administración

El sistema dispone de un panel administrativo protegido mediante autenticación y control de roles.

Entre sus funcionalidades se encuentran:

- Gestión de usuarios.
- Gestión y supervisión de contenido.
- Moderación de comentarios.
- Consulta de información general del sistema.
- Visualización de indicadores y datos del sistema.

---

## Dashboard

El panel administrativo incluye indicadores obtenidos a partir de la información almacenada en la base de datos.

Esto permite visualizar métricas generales del funcionamiento de CeliaConnect y disponer de información resumida para tareas administrativas.

---

# Versión móvil Android

La aplicación móvil fue desarrollada utilizando **Capacitor**, reutilizando el frontend responsive de CeliaConnect.

Esto permite mantener una misma base funcional para la versión web y móvil.

### Tecnologías móviles

- Capacitor.
- Android.
- Android Studio.
- Gradle.
- Android Emulator.

### Identificador de aplicación

```text
com.celiaconnect.app
```

### Estructura

El proyecto nativo generado por Capacitor se encuentra en:

```text
android/
```

La configuración principal de Capacitor se encuentra en:

```text
capacitor.config.json
```

La aplicación Android consume la misma API REST desplegada en Railway que la versión web.

---

# Tecnologías utilizadas

## Frontend

- HTML5.
- CSS3.
- JavaScript Vanilla.
- Bootstrap 5.
- Bootstrap Icons.
- Diseño responsive.

## Backend

- Node.js.
- Express.
- MySQL2.
- bcrypt.
- JSON Web Token (JWT).
- dotenv.
- CORS.

La conexión con la base de datos se realiza mediante `mysql2/promise`.

## Base de datos

- MySQL / MariaDB.
- MySQL Workbench.
- SQL.
- XAMPP para el entorno local de desarrollo.

## Mobile

- Capacitor.
- Android Studio.
- Gradle.
- Android SDK.

## Deploy

- Railway.
- Servicio independiente para frontend.
- Servicio independiente para backend.
- Base de datos MySQL en la nube.

## Desarrollo y control de versiones

- Visual Studio Code.
- Git.
- GitHub.
- npm.

---

# Arquitectura del sistema

CeliaConnect utiliza una arquitectura **cliente-servidor**.

El frontend permite la interacción del usuario mediante HTML, CSS, Bootstrap y JavaScript.

El backend implementa una **API REST con Node.js y Express**, encargada de procesar las solicitudes, gestionar la autenticación, aplicar reglas de negocio y comunicarse con la base de datos.

La persistencia de información se realiza mediante MySQL/MariaDB.

### Arquitectura general

```text
                ┌──────────────────┐
                │   Web Browser    │
                └────────┬─────────┘
                         │
                         │
                ┌────────▼─────────┐
                │     Frontend     │
                │ HTML/CSS/JS/BS5 │
                └────────┬─────────┘
                         │
                         │ HTTPS / REST
                         │
                ┌────────▼─────────┐
                │ Backend Express  │
                │     Node.js      │
                └────────┬─────────┘
                         │
                         │ SQL
                         │
                ┌────────▼─────────┐
                │      MySQL       │
                └──────────────────┘
```

La aplicación Android utiliza la misma arquitectura:

```text
Android App
    │
Capacitor
    │
Frontend CeliaConnect
    │
API REST
    │
Backend Node.js / Express
    │
MySQL
```

---

# Estructura del proyecto

```text
celiaconnect/
│
├── android/
│   ├── app/
│   ├── gradle/
│   ├── build.gradle
│   ├── settings.gradle
│   └── ...
│
├── backend/
│   ├── db.js
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── database/
│   ├── celiaconnect_backup.sql
│   ├── schema.sql
│   ├── seed.sql
│   └── README.md
│
├── docs/
│
├── frontend/
│   ├── admin/
│   ├── assets/
│   ├── components/
│   ├── css/
│   ├── js/
│   ├── services/
│   ├── index.html
│   └── ...
│
├── capacitor.config.json
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

### `frontend/`

Contiene las páginas HTML, estilos, imágenes, componentes y scripts JavaScript utilizados por la interfaz web y móvil.

### `backend/`

Contiene la API REST, conexión con la base de datos, autenticación y lógica del servidor.

### `database/`

Contiene el esquema SQL, datos iniciales y respaldo utilizado durante el desarrollo.

### `android/`

Contiene el proyecto Android generado mediante Capacitor y utilizado para compilar la aplicación móvil.

### `docs/`

Contiene documentación técnica y funcional relacionada con el análisis, diseño y desarrollo de CeliaConnect.

---

# Base de datos

La base de datos `celiaconnectdb` contiene 22 tablas:

- `barrio`
- `caracteristica`
- `categoria`
- `comentariolocal`
- `comentarionutricionista`
- `comentarioproducto`
- `comentariorestaurante`
- `favoritolocal`
- `favoritonutricionista`
- `favoritoproducto`
- `favoritorestaurante`
- `local`
- `localcaracteristica`
- `marca`
- `nutricionista`
- `producto`
- `restaurante`
- `restaurantecaracteristica`
- `rol`
- `tipolocal`
- `tiporestaurante`
- `usuario`

El modelo utiliza:

- Claves primarias.
- Claves foráneas.
- Restricciones de integridad.
- Relaciones entre entidades.
- Tablas específicas para comentarios.
- Tablas específicas para favoritos.
- Roles de usuario.

El repositorio incluye datos demostrativos utilizados durante el desarrollo y las pruebas.

---

# Instalación local

## Requisitos

Para ejecutar CeliaConnect localmente se necesita:

- Git.
- Node.js.
- npm.
- MySQL o MariaDB.
- XAMPP o servidor compatible.
- Visual Studio Code.
- MySQL Workbench u otra herramienta compatible.

Para trabajar con la versión Android también se necesita:

- Android Studio.
- Android SDK.
- JDK compatible con Gradle.

El entorno principal de desarrollo fue realizado sobre Windows.

---

## 1. Clonar el repositorio

```bash
git clone https://github.com/carelis66/CeliaConnect.git
cd CeliaConnect
```

---

## 2. Instalar dependencias del backend

```bash
cd backend
npm ci
```

---

## 3. Configurar variables de entorno

Crear el archivo:

```text
backend/.env
```

Ejemplo de configuración local:

```dotenv
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=celiaconnectdb

JWT_SECRET=CONFIGURAR_UNA_CLAVE_SECRETA
```

Los valores deben adaptarse al servidor MySQL/MariaDB utilizado.

**Importante:** las credenciales y claves utilizadas en producción no deben almacenarse en el repositorio.

---

## 4. Restaurar la base de datos

El proyecto incluye el respaldo:

```text
database/celiaconnect_backup.sql
```

Puede importarse mediante MySQL Workbench u otra herramienta compatible.

El respaldo contiene la estructura de las tablas, relaciones y datos utilizados durante el desarrollo.

> El archivo puede contener instrucciones `DROP TABLE IF EXISTS`, por lo que se recomienda utilizar una base nueva o destinada a pruebas.

---

## 5. Ejecutar el backend localmente

Desde:

```text
backend/
```

ejecutar:

```bash
node server.js
```

El servidor local utiliza normalmente:

```text
http://localhost:3000
```

Cuando la conexión funciona correctamente se muestran mensajes similares a:

```text
CeliaConnect API funcionando en http://localhost:3000
Conexión exitosa a CeliaConnect DB
```

---

## 6. Ejecutar el frontend localmente

Abrir el proyecto mediante Visual Studio Code y utilizar Live Server sobre:

```text
frontend/index.html
```

Durante el desarrollo local, el frontend puede ejecutarse mediante una dirección similar a:

```text
http://127.0.0.1:5500/frontend/index.html
```

---

# Ejecución de la versión Android

Desde la raíz del proyecto se pueden sincronizar los archivos web con Android mediante:

```bash
npx cap sync android
```

Para abrir el proyecto Android:

```bash
npx cap open android
```

También puede abrirse directamente en Android Studio seleccionando:

```text
celiaconnect/android
```

Desde Android Studio se puede seleccionar un dispositivo físico o virtual y ejecutar:

```text
app
```

La aplicación Android utiliza el backend desplegado en Railway, por lo que necesita conexión a Internet para consumir la API.

---

# Endpoints principales de la API

## Autenticación

```text
POST /api/registro
POST /api/login
```

## Productos

```text
GET  /api/productos
GET  /api/productos/:id
GET  /api/productos/:id/comentarios
POST /api/productos/:id/comentarios
```

## Restaurantes

```text
GET  /api/restaurantes
GET  /api/restaurantes/:id
GET  /api/restaurantes/:id/comentarios
POST /api/restaurantes/:id/comentarios
```

## Locales

```text
GET  /api/locales
GET  /api/locales/:id
```

## Nutricionistas

```text
GET  /api/nutricionistas
GET  /api/nutricionistas/:id
```

La API también dispone de endpoints para favoritos, comentarios, moderación, usuarios y administración.

Las operaciones protegidas requieren un JWT enviado mediante:

```text
Authorization: Bearer <token>
```

---

# Roles y permisos

CeliaConnect utiliza un sistema de autorización basado en roles.

| Rol | Funciones principales |
|---|---|
| Usuario | Navegar, guardar favoritos, publicar opiniones y utilizar funcionalidades personales |
| Moderador | Revisar, aprobar y rechazar comentarios |
| Administrador | Gestionar usuarios, contenido, moderación e información administrativa |

Los permisos son validados por el backend antes de permitir operaciones protegidas.

---

# Pruebas funcionales

Durante el desarrollo se realizaron pruebas de los principales flujos del sistema.

Entre los escenarios verificados se encuentran:

- Navegación como visitante.
- Registro de usuario.
- Inicio y cierre de sesión.
- Persistencia de sesión.
- Consulta de productos.
- Consulta de restaurantes.
- Consulta de locales.
- Consulta de nutricionistas.
- Visualización de detalles.
- Búsqueda y filtros.
- Favoritos.
- Comentarios.
- Calificaciones.
- Moderación.
- Aprobación y rechazo de opiniones.
- Publicación de comentarios aprobados.
- Acceso según roles.
- Panel administrativo.
- Funcionamiento responsive.

También se verificó el flujo completo desde Android:

```text
Login
  ↓
Navegación
  ↓
Favoritos
  ↓
Publicación de opinión
  ↓
Moderación
  ↓
Aprobación
  ↓
Visualización pública
```

---

# Deploy

CeliaConnect se encuentra desplegado utilizando **Railway**.

La infraestructura se divide en:

```text
CeliaConnectFrontend
        │
        ▼
CeliaConnect Backend
        │
        ▼
      MySQL
```

Esto permite separar la interfaz, la API y la persistencia de datos.

El frontend consume la API mediante HTTPS y tanto la aplicación web como la aplicación Android utilizan el mismo backend.

---

# Estado actual del proyecto

**MVP funcional — Proyecto Final 2026.**

Actualmente se encuentran implementados:

- Frontend responsive.
- Backend REST.
- Base de datos relacional.
- Deploy en Railway.
- Registro y autenticación.
- Roles y permisos.
- Productos.
- Restaurantes.
- Locales.
- Nutricionistas.
- Favoritos.
- Comentarios.
- Calificaciones.
- Moderación.
- Administración.
- Dashboard.
- Versión Android mediante Capacitor.

La versión web fue desplegada y probada contra la infraestructura en la nube.

La versión Android fue compilada, instalada y probada mediante Android Studio y emulador Android, utilizando la misma API desplegada.

---

# Alcance del MVP

CeliaConnect se desarrolló como un proyecto académico y el alcance actual corresponde al MVP definido para el Trabajo Final.

La cobertura inicial se encuentra orientada a **CABA**.

Posibles evoluciones posteriores incluyen:

- Expansión a otras localidades de Argentina.
- Ampliación del catálogo.
- Incorporación de nuevos comercios y profesionales.
- Mejoras en perfiles de usuario.
- Nuevas herramientas de administración.
- Optimización de la experiencia móvil.
- Nuevas funcionalidades comunitarias.
- Publicación de futuras versiones móviles.

Estas funcionalidades no forman parte obligatoria del MVP actual.

---

# Documentación

La carpeta:

```text
docs/
```

contiene documentación relacionada con el análisis, diseño, planificación y desarrollo del sistema.

La carpeta:

```text
database/
```

contiene el modelo de datos, scripts SQL y respaldo de la base utilizada durante el desarrollo.

---

# Videos demostrativos

- [Demo Web](https://youtu.be/xzG4Mn4hhDs)
- [Demo Mobile](https://youtu.be/bWU5IfdM4-g)

La documentación completa de las demostraciones se encuentra en
[docs/15-videos-demostrativos.md](docs/15-videos-demostrativos.md).

---

# Consideraciones

CeliaConnect es un **proyecto académico**.

La información de productos, establecimientos, profesionales, usuarios, comentarios y valoraciones utilizada durante el desarrollo puede contener datos demostrativos y no debe interpretarse como un directorio comercial, médico o sanitario oficialmente validado.

El proyecto fue desarrollado con fines educativos como Trabajo Final de la carrera **Analista de Sistemas**.

---

## Autoría

**Carelis Fagundez**  
Trabajo Final — Analista de Sistemas  
Escuela Da Vinci  
Buenos Aires, Argentina

**CeliaConnect — Proyecto de Tesis, 2026.**

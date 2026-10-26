# CeliaConnect

**Plataforma web de información y servicios para la comunidad celíaca**

**Proyecto Final — Analista de Sistemas**  
**Escuela Da Vinci**  
**Autora:** Carelis Fagundez

---

## Descripción del proyecto

CeliaConnect es una plataforma web orientada a centralizar información sobre productos, restaurantes, locales comerciales y profesionales de nutrición relacionados con la alimentación libre de gluten (Sin TACC).

El proyecto busca facilitar la consulta de información organizada y accesible, permitiendo a los usuarios encontrar productos y servicios, consultar detalles, realizar valoraciones y compartir experiencias.

La primera etapa está enfocada en la Ciudad Autónoma de Buenos Aires (CABA), Argentina.

CeliaConnect se desarrolla como una aplicación web responsive, con posibilidad de evolucionar posteriormente hacia una aplicación web progresiva (PWA).

## Objetivo

Desarrollar una plataforma web que facilite el acceso a información sobre alimentación Sin TACC, integrando consultas de productos y establecimientos, registro de usuarios, autenticación, comentarios, calificaciones y herramientas de administración.

## Funcionalidades del sistema

### Usuarios y autenticación

- Registro de usuarios.
- Inicio de sesión mediante correo electrónico y contraseña.
- Almacenamiento de contraseñas mediante bcrypt.
- Autenticación mediante JSON Web Tokens (JWT).
- Diferenciación entre usuarios y administradores.
- Protección de endpoints que requieren autenticación.

### Productos

- Consulta del catálogo de productos.
- Visualización de información detallada.
- Búsqueda de productos.
- Filtros por categoría.
- Filtro de productos certificados Sin TACC.
- Ordenamiento de resultados.
- Paginación.
- Consulta de comentarios y calificaciones.

### Comentarios y valoraciones

- Publicación de comentarios por usuarios autenticados.
- Calificaciones de 1 a 5 estrellas.
- Estados de moderación: pendiente, aprobado y rechazado.
- Visualización pública de comentarios aprobados.
- Moderación administrativa de comentarios de productos.
- Prevención de comentarios duplicados por usuario y producto.

### Restaurantes

- Consulta de restaurantes verificados.
- Visualización de detalles de establecimientos.
- Información de ubicación y contacto.
- Consulta de comentarios aprobados.
- Publicación de opiniones por usuarios autenticados.

### Otros módulos contemplados

La base de datos incluye estructuras para:

- Locales comerciales y dietéticas.
- Nutricionistas.
- Favoritos de productos, restaurantes, locales y nutricionistas.
- Características de establecimientos.
- Roles y permisos.

Estos módulos forman parte del modelo de datos y su implementación en la interfaz y la API puede encontrarse en distintas etapas de desarrollo.

## Tecnologías utilizadas

### Frontend

- HTML5.
- CSS3.
- JavaScript vanilla.
- Bootstrap 5.
- Bootstrap Icons.
- Visual Studio Code.
- Live Server para desarrollo local.

### Backend

- Node.js.
- Express 5.
- MySQL2.
- bcrypt.
- JSON Web Token (JWT).
- dotenv.
- CORS.

La conexión con la base de datos utiliza consultas SQL mediante `mysql2/promise`.

### Base de datos

- MariaDB 10.4, mediante XAMPP en el entorno utilizado.
- MySQL Workbench para administración, consultas y exportación.
- SQL para definición de tablas, relaciones y manipulación de datos.

### Control de versiones

- Git.
- GitHub (repositorio privado).

## Arquitectura del sistema

CeliaConnect utiliza una arquitectura cliente-servidor.

El frontend presenta la información y permite la interacción del usuario mediante HTML, CSS y JavaScript.

El backend implementa una API REST con Node.js y Express, encargada de recibir solicitudes, ejecutar consultas, gestionar autenticación y devolver respuestas en formato JSON.

La persistencia de datos se realiza en MariaDB mediante el paquete MySQL2.

**Flujo general:**

Frontend → API REST (Express) → MariaDB

La autenticación utiliza JWT y las contraseñas se almacenan como hashes bcrypt.

## Estructura del proyecto

```text
celiaconnect/
├── backend/
│   ├── .env
│   ├── db.js
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
├── database/
│   ├── celiaconnect_backup.sql
│   ├── schema.sql
│   ├── seed.sql
│   └── README.md
├── docs/
├── frontend/
├── .gitignore
└── README.md
```

La carpeta `frontend` contiene las páginas, estilos, componentes y scripts de la interfaz web.

La carpeta `backend` contiene el servidor, la configuración de conexión y las dependencias de Node.js.

La carpeta `database` contiene los scripts SQL y el respaldo de la base de datos.

La carpeta `docs` contiene documentación técnica y funcional del proyecto.

## Requisitos para ejecutar CeliaConnect

Para instalar y ejecutar el proyecto en una computadora nueva se necesita:

- Git.
- Node.js y npm.
- XAMPP con MariaDB o una instalación compatible de MySQL/MariaDB.
- Visual Studio Code.
- Extensión Live Server de VS Code.
- MySQL Workbench u otra herramienta compatible para importar el respaldo SQL.

**Entorno de desarrollo utilizado:** Node.js 22, MariaDB 10.4 y Windows.

## Instalación desde GitHub

### 1. Clonar el repositorio

Abrir una terminal y ejecutar:

```bash
git clone https://github.com/carelis66/CeliaConnect.git
```

Ingresar a la carpeta:

```bash
cd CeliaConnect
```

El repositorio es privado, por lo que se necesita autorización de la cuenta propietaria para clonarlo.

### 2. Instalar las dependencias del backend

Desde la carpeta raíz del proyecto:

```bash
cd backend
npm ci
```

Este comando instala las dependencias registradas en `package-lock.json`.

No es necesario copiar la carpeta `node_modules` desde la computadora anterior.

### 3. Configurar las variables de entorno

El backend utiliza un archivo `.env` con la siguiente estructura:

```dotenv
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=celiaconnectdb

JWT_SECRET=CONFIGURAR_UNA_CLAVE_SECRETA
```

Los valores deben coincidir con la configuración de MariaDB de la computadora donde se ejecuta el proyecto.

La clave JWT debe ser privada y utilizarse exclusivamente para el entorno correspondiente.

**Nota de seguridad:** el archivo `.env` contiene configuración sensible. Aunque se haya incluido una versión de desarrollo en el repositorio privado, no se recomienda reutilizar esas credenciales en producción.

### 4. Iniciar MariaDB

Abrir el panel de control de XAMPP e iniciar el servicio MySQL/MariaDB.

Comprobar que el servicio esté funcionando en el puerto configurado, normalmente `3306`.

### 5. Restaurar la base de datos

El proyecto incluye un respaldo SQL en:

```text
database/celiaconnect_backup.sql
```

Este archivo contiene la estructura de las 22 tablas, sus relaciones y los datos utilizados durante el desarrollo.

Para restaurarlo mediante MySQL Workbench:

1. Abrir MySQL Workbench.
2. Conectarse al servidor local de MariaDB/MySQL.
3. Ingresar a **Server → Data Import**.
4. Seleccionar **Import from Self-Contained File**.
5. Buscar `database/celiaconnect_backup.sql`.
6. Verificar que el servidor de destino sea el correcto.
7. Ejecutar **Start Import**.
8. Confirmar que la importación finalice sin errores.

El respaldo incluye instrucciones para crear y seleccionar la base de datos `celiaconnectdb`.

**Importante:** el respaldo contiene instrucciones `DROP TABLE IF EXISTS`, por lo que debe restaurarse en una instalación nueva o una base de pruebas. No debe importarse sobre una base que contenga información que se quiera conservar.

### 6. Iniciar el backend

Desde la carpeta `backend`, ejecutar:

```bash
node server.js
```

El servidor utiliza el puerto `3000`.

Cuando todo funciona correctamente, la terminal muestra mensajes similares a:

```text
CeliaConnect API funcionando en http://localhost:3000
✅ Conexión exitosa a CeliaConnect DB
```

Abrir en el navegador:

http://localhost:3000

La respuesta esperada es:

```text
CeliaConnect API funcionando
```

### 7. Iniciar el frontend

1. Abrir el proyecto en Visual Studio Code.
2. Instalar la extensión Live Server si todavía no está instalada.
3. Abrir `frontend/index.html`.
4. Hacer clic derecho y seleccionar **Open with Live Server**.
5. Navegar por CeliaConnect.

El backend debe permanecer encendido para las funcionalidades que consultan la API.

La dirección exacta del frontend depende del puerto asignado por Live Server.

## Endpoints principales de la API

| Método | Endpoint                               | Descripción                              |
| ------ | -------------------------------------- | ---------------------------------------- |
| GET    | `/`                                    | Verificación de funcionamiento de la API |
| POST   | `/api/login`                           | Inicio de sesión                         |
| POST   | `/api/registro`                        | Registro de usuarios                     |
| GET    | `/api/productos`                       | Listado de productos                     |
| GET    | `/api/productos/:id`                   | Detalle de producto                      |
| GET    | `/api/productos/:id/comentarios`       | Comentarios aprobados                    |
| POST   | `/api/productos/:id/comentarios`       | Crear comentario autenticado             |
| GET    | `/api/restaurantes`                    | Restaurantes verificados                 |
| GET    | `/api/restaurantes/:id`                | Detalle de restaurante                   |
| GET    | `/api/restaurantes/:id/comentarios`    | Comentarios aprobados                    |
| POST   | `/api/restaurantes/:id/comentarios`    | Crear comentario autenticado             |
| GET    | `/api/admin/comentarios/productos`     | Consultar comentarios pendientes         |
| PATCH  | `/api/admin/comentarios/productos/:id` | Aprobar o rechazar comentarios           |

Las operaciones protegidas requieren enviar el token JWT mediante la cabecera `Authorization: Bearer`.

## Base de datos

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

El modelo utiliza claves primarias, claves foráneas, restricciones de integridad y relaciones entre las distintas entidades.

El respaldo SQL contiene datos demostrativos utilizados para el desarrollo y las pruebas.

## Verificación de funcionamiento

Después de instalar el proyecto, se recomienda comprobar:

1. Que MariaDB esté iniciado.
2. Que el backend se conecte correctamente.
3. Que `http://localhost:3000` responda.
4. Que el frontend abra mediante Live Server.
5. Que el catálogo de productos muestre información.
6. Que funcionen la búsqueda, los filtros y la paginación.
7. Que se pueda abrir el detalle de un producto.
8. Que el inicio de sesión funcione con una cuenta de prueba.
9. Que los comentarios aprobados se visualicen correctamente.
10. Que las funcionalidades de administración respondan con los permisos correspondientes.

Estas verificaciones permiten detectar problemas de instalación, conexión o configuración.

## Estado actual del proyecto

**En desarrollo — MVP universitario.**

Se encuentran implementados y probados localmente el inicio del backend, la conexión con MariaDB y la consulta de productos desde el frontend.

El código también incorpora autenticación, registro de usuarios, comentarios, moderación administrativa y endpoints para restaurantes.

El proyecto continúa evolucionando mediante la integración progresiva de sus módulos, mejoras de interfaz y pruebas funcionales.

## Documentación

La carpeta `docs` contiene materiales relacionados con el análisis, diseño, planificación y documentación técnica del sistema.

La carpeta `database` conserva el modelo de datos y los scripts SQL.

## Consideraciones

CeliaConnect es un proyecto académico en desarrollo.

La información de demostración, los establecimientos, profesionales, valoraciones y datos de prueba no deben interpretarse como un directorio comercial o sanitario validado.

Las funcionalidades futuras, como la publicación en hosting, integración de servicios externos y evolución hacia PWA, están sujetas al alcance y planificación del proyecto.

---

## Autoría

**Carelis Fagundez**  
Trabajo Final — Analista de Sistemas  
Escuela Da Vinci  
Buenos Aires, Argentina

**CeliaConnect — Proyecto académico, 2026.**

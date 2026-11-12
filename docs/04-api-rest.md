# 04 - API REST

## Información del documento

| Campo | Valor |
|---|---|
| Proyecto | CeliaConnect |
| Documento | API REST |
| Versión | 2.0 |
| Fecha | 12/11/2026 |
| Autor | Carelis Fagundez |
| Estado | Implementada y desplegada |

---

# 1. Introducción

Este documento describe la API REST implementada para **CeliaConnect**.

La API constituye el punto central de comunicación entre la aplicación Web, la aplicación Android y la base de datos MySQL.

Su función es centralizar la lógica de negocio, procesar las solicitudes realizadas por los clientes, gestionar la autenticación y autorización de usuarios y proporcionar acceso controlado a la información almacenada en el sistema.

La API fue desarrollada utilizando **Node.js y Express**, con acceso a MySQL mediante **mysql2/promise**.

Actualmente se encuentra desplegada en Railway y es utilizada tanto por la aplicación Web como por la versión Android desarrollada mediante Capacitor.

---

# 2. Objetivos

Los principales objetivos de la API REST son:

- Centralizar la lógica de negocio.
- Proporcionar un único punto de acceso a los datos.
- Separar la interfaz de usuario de la persistencia.
- Permitir que Web y Android utilicen la misma información.
- Gestionar autenticación mediante JWT.
- Controlar permisos según el rol del usuario.
- Gestionar productos, restaurantes, locales y nutricionistas.
- Gestionar favoritos.
- Gestionar comentarios y calificaciones.
- Implementar el flujo de moderación.
- Proporcionar información para las funcionalidades administrativas.
- Facilitar futuras ampliaciones del sistema.

---

# 3. Arquitectura de la API

La API utiliza una arquitectura REST sobre HTTP/HTTPS.

El intercambio de información entre cliente y servidor se realiza principalmente mediante **JSON**.

El flujo general es:

```text
Aplicación Web / Android
          ↓
     HTTP / HTTPS
          ↓
      API REST
   Node.js + Express
          ↓
     MySQL2/Promise
          ↓
        MySQL
```

El frontend nunca accede directamente a la base de datos.

Todas las operaciones que requieren información persistente son procesadas por el backend.

---

# 4. URL de la API

La API se encuentra desplegada en Railway.

## Producción

```text
https://celiaconnect-production.up.railway.app
```

Los endpoints se construyen a partir de esta URL base.

Ejemplo:

```text
https://celiaconnect-production.up.railway.app/api/productos
```

## Desarrollo local

Durante el desarrollo, el backend puede ejecutarse localmente mediante:

```text
http://localhost:3000
```

Ejemplo:

```text
http://localhost:3000/api/productos
```

---

# 5. Tecnologías utilizadas

| Componente | Tecnología |
|---|---|
| Runtime | Node.js |
| Framework Backend | Express |
| Base de Datos | MySQL / MariaDB |
| Acceso a Base de Datos | mysql2/promise |
| Autenticación | JSON Web Token (JWT) |
| Hash de contraseñas | bcrypt |
| Formato de intercambio | JSON |
| Comunicación | HTTP / HTTPS |
| CORS | Habilitado mediante middleware |
| Configuración | Variables de entorno |
| Deploy | Railway |

No se utiliza Sequelize ni otro ORM en la implementación actual.

---

# 6. Autenticación

La autenticación de CeliaConnect utiliza **JWT (JSON Web Token)**.

El usuario ingresa sus credenciales y el backend valida la información contra la base de datos.

Si las credenciales son correctas, se genera un token de autenticación.

El flujo general es:

```text
Usuario
   ↓
Login
   ↓
API REST
   ↓
Validación de email y contraseña
   ↓
bcrypt
   ↓
Generación JWT
   ↓
Token enviado al cliente
```

Para acceder a endpoints protegidos, el cliente envía el token mediante el encabezado:

```http
Authorization: Bearer {token}
```

El backend valida el token antes de permitir el acceso al recurso protegido.

---

# 7. Roles y autorización

La API contempla tres roles principales:

| Rol | Función |
|---|---|
| Usuario | Utilización general de CeliaConnect |
| Moderador | Moderación de opiniones |
| Administrador | Gestión administrativa y moderación |

La autorización se controla desde el backend.

Esto permite evitar que un usuario pueda acceder a operaciones reservadas para moderadores o administradores simplemente modificando el frontend.

---

# 8. Recursos principales

La API se encuentra organizada alrededor de los principales recursos del sistema:

- Autenticación.
- Usuarios.
- Productos.
- Restaurantes.
- Locales.
- Nutricionistas.
- Favoritos.
- Comentarios y calificaciones.
- Moderación.
- Administración.

---

# 9. Productos

La API permite consultar el catálogo de productos Sin TACC.

Entre las operaciones implementadas se encuentran la consulta general y la consulta individual.

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/productos` | Obtener listado de productos |
| GET | `/api/productos/:id` | Obtener detalle de un producto |
| GET | `/api/productos/:id/comentarios` | Obtener comentarios aprobados del producto |

Ejemplo:

```http
GET /api/productos
```

La información devuelta puede incluir datos relacionados como:

- Nombre.
- Marca.
- Categoría.
- Descripción.
- Ingredientes.
- Información nutricional.
- Código de barras.
- Certificación Sin TACC.
- Imagen.

---

# 10. Restaurantes

La API permite consultar los restaurantes registrados en CeliaConnect.

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/restaurantes` | Obtener listado de restaurantes |
| GET | `/api/restaurantes/:id` | Obtener detalle de un restaurante |

El detalle puede incluir información como:

- Nombre.
- Descripción.
- Dirección.
- Barrio.
- Tipo.
- Horarios.
- Información de contacto.
- Imágenes.
- Ubicación.
- Características.

Los restaurantes también participan en los sistemas de favoritos, comentarios y calificaciones.

---

# 11. Locales

Los comercios del sistema se representan mediante el recurso **Local**.

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/locales` | Obtener listado de locales |
| GET | `/api/locales/:id` | Obtener detalle de un local |

La información puede incluir:

- Nombre.
- Descripción.
- Dirección.
- Barrio.
- Tipo de local.
- Horarios.
- Contacto.
- Imagen.
- Ubicación.
- Características.

Los locales también pueden ser guardados como favoritos y recibir comentarios y calificaciones.

---

# 12. Nutricionistas

La API permite consultar los profesionales registrados en CeliaConnect.

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/nutricionistas` | Obtener listado de nutricionistas |
| GET | `/api/nutricionistas/:id` | Obtener detalle de un nutricionista |

La información puede incluir:

- Nombre.
- Apellido.
- Matrícula.
- Descripción.
- Información de contacto.
- Dirección.
- Barrio.
- Horarios.
- WhatsApp.
- Redes o sitio web.
- Fotografía.

Los nutricionistas pueden ser guardados como favoritos y participar del sistema de comentarios y calificaciones.

---

# 13. Favoritos

El sistema permite que los usuarios autenticados guarden elementos para consultarlos posteriormente.

Los favoritos se encuentran asociados al usuario autenticado y se almacenan en la base de datos.

Se admiten favoritos de:

- Productos.
- Restaurantes.
- Locales.
- Nutricionistas.

El flujo general es:

```text
Usuario autenticado
        ↓
Selecciona favorito
        ↓
Solicitud + JWT
        ↓
API REST
        ↓
Base de Datos
```

La API permite:

- Consultar favoritos.
- Agregar favoritos.
- Eliminar favoritos.

La operación requiere autenticación para identificar al usuario propietario de los favoritos.

---

# 14. Comentarios y calificaciones

Los usuarios autenticados pueden publicar opiniones sobre los diferentes tipos de contenido.

El sistema admite comentarios y calificaciones sobre:

- Productos.
- Restaurantes.
- Locales.
- Nutricionistas.

Una opinión contiene información como:

- Usuario.
- Título.
- Comentario.
- Calificación.
- Fecha.
- Estado de moderación.

Las calificaciones utilizan una escala de estrellas.

---

# 15. Moderación de comentarios

Los comentarios enviados por los usuarios pasan por un proceso de moderación antes de ser mostrados públicamente.

El flujo es:

```text
Usuario
   ↓
Publica opinión
   ↓
API REST
   ↓
Estado: Pendiente
   ↓
Panel de moderación
   ↓
Moderador / Administrador
   ↓
 ┌───────────┴───────────┐
 ↓                       ↓
Aprobar                Rechazar
 ↓
Visible públicamente
```

La API permite recuperar los comentarios pendientes para su revisión.

Los usuarios con permisos de moderación pueden aprobar o rechazar las opiniones.

Los endpoints públicos de comentarios devuelven las opiniones que corresponden al estado aprobado.

---

# 16. Administración

La API incluye operaciones protegidas destinadas al panel administrativo.

Estas operaciones permiten gestionar información del sistema y acceder a funcionalidades que no están disponibles para usuarios generales.

Entre las funcionalidades administrativas se encuentran:

- Gestión de usuarios.
- Consulta de información administrativa.
- Gestión del contenido disponible.
- Moderación de comentarios.
- Actualización del estado de registros.
- Obtención de información utilizada por el dashboard.

Estas operaciones requieren autenticación y permisos adecuados.

---

# 17. Registro e inicio de sesión

La API permite registrar usuarios e iniciar sesión.

## Registro

Durante el registro se reciben los datos requeridos del usuario.

El backend:

1. Valida la información.
2. Verifica los datos necesarios.
3. Genera el hash de la contraseña mediante bcrypt.
4. Registra el usuario en MySQL.

## Inicio de sesión

Durante el login:

1. El usuario envía sus credenciales.
2. El backend busca el usuario.
3. bcrypt compara la contraseña ingresada con el hash almacenado.
4. Si las credenciales son válidas, se genera un JWT.
5. El token es enviado al cliente.
6. El frontend utiliza el token para las operaciones protegidas.

---

# 18. Sesión del cliente

El frontend gestiona el token recibido luego del inicio de sesión.

Dependiendo de la opción utilizada durante el login, el token puede almacenarse en:

```javascript
localStorage
```

o:

```javascript
sessionStorage
```

Las solicitudes que requieren autenticación recuperan el token y lo envían al backend.

El cierre de sesión se realiza eliminando la información de autenticación almacenada en el cliente.

Por este motivo, no es necesario mantener una sesión tradicional en memoria del servidor.

---

# 19. Formato de respuestas

Las respuestas de la API utilizan JSON.

Un ejemplo conceptual de respuesta exitosa es:

```json
{
  "success": true,
  "data": {}
}
```

Dependiendo del endpoint, también pueden devolverse directamente objetos o colecciones JSON.

Ejemplo conceptual de error:

```json
{
  "success": false,
  "message": "Recurso no encontrado."
}
```

Los mensajes pueden variar según la operación y la validación realizada.

---

# 20. Códigos HTTP

La API utiliza códigos HTTP para indicar el resultado de las solicitudes.

| Código | Significado |
|---|---|
| 200 | Operación realizada correctamente |
| 201 | Recurso creado correctamente |
| 400 | Solicitud inválida |
| 401 | Usuario no autenticado o token inválido |
| 403 | Usuario sin permisos suficientes |
| 404 | Recurso no encontrado |
| 500 | Error interno del servidor |

El código utilizado depende de la operación realizada y del resultado de las validaciones.

---

# 21. Validación de datos

El backend realiza validaciones antes de ejecutar operaciones sobre la base de datos.

Entre las validaciones se encuentran:

- Campos obligatorios.
- Credenciales.
- Existencia de registros.
- Identificación del usuario autenticado.
- Roles y permisos.
- Datos de comentarios.
- Calificaciones.
- Estados de moderación.

Estas validaciones evitan depender únicamente de las restricciones implementadas en el frontend.

---

# 22. Seguridad

La API implementa diferentes mecanismos de seguridad.

## JWT

Permite identificar al usuario autenticado sin mantener una sesión tradicional en el servidor.

## bcrypt

Las contraseñas son almacenadas utilizando hashes generados mediante bcrypt.

## Roles

Los endpoints administrativos y de moderación validan los permisos del usuario.

## Variables de entorno

La configuración sensible de producción, como las credenciales de la base de datos y el secreto utilizado para JWT, se administra mediante variables de entorno.

## HTTPS

La comunicación con la API desplegada en Railway se realiza mediante HTTPS.

## CORS

El backend utiliza configuración CORS para permitir la comunicación entre los clientes y la API.

---

# 23. Acceso a la base de datos

La API se comunica con MySQL utilizando:

```javascript
mysql2/promise
```

El backend utiliza un pool de conexiones para realizar las operaciones necesarias.

El flujo es:

```text
Endpoint
   ↓
Express
   ↓
Lógica / validación
   ↓
Pool MySQL
   ↓
Consulta SQL
   ↓
Resultado
   ↓
Respuesta JSON
```

No se utiliza Sequelize en la implementación actual.

---

# 24. Variables de entorno

El backend utiliza variables de entorno para separar la configuración sensible del código fuente.

Entre las variables utilizadas se encuentran las correspondientes a:

```text
DB_HOST
DB_PORT
DB_NAME
DB_USER
DB_PASSWORD
JWT_SECRET
```

En producción, los valores correspondientes a la conexión MySQL son proporcionados por Railway.

---

# 25. Consumo desde la aplicación Web

El frontend Web consume directamente la API desplegada.

Ejemplo:

```javascript
fetch("https://celiaconnect-production.up.railway.app/api/productos")
```

La información obtenida es utilizada para construir dinámicamente las distintas interfaces.

---

# 26. Consumo desde Android

La aplicación Android utiliza el mismo frontend de CeliaConnect mediante Capacitor.

Por lo tanto, consume la misma API REST desplegada en Railway:

```text
Aplicación Android
        ↓
Capacitor / WebView
        ↓
HTTPS
        ↓
API REST Railway
        ↓
MySQL Railway
```

Esto permite que la aplicación Android funcione sin necesidad de ejecutar el backend localmente.

Durante las pruebas realizadas desde el emulador Android se verificó el acceso a los datos y las principales operaciones del sistema.

---

# 27. Pruebas realizadas

La API fue probada durante el desarrollo y posteriormente contra el entorno desplegado.

Se verificaron, entre otras operaciones:

- Consulta de productos.
- Detalle de productos.
- Consulta de restaurantes.
- Detalle de restaurantes.
- Consulta de locales.
- Detalle de locales.
- Consulta de nutricionistas.
- Detalle de nutricionistas.
- Registro e inicio de sesión.
- Persistencia de sesión.
- Favoritos.
- Envío de opiniones.
- Comentarios pendientes.
- Aprobación mediante moderación.
- Visualización pública de comentarios aprobados.
- Acceso al panel administrativo.
- Información del dashboard.

Las pruebas fueron realizadas tanto desde la aplicación Web como desde la aplicación Android para validar el funcionamiento compartido del backend.

---

# 28. Estado actual

La API REST de CeliaConnect se encuentra **implementada, desplegada y operativa**.

Actualmente permite la comunicación entre:

```text
Frontend Web
      │
      ├──────────────┐
      │              ↓
      │         API REST
      │              ↓
      │            MySQL
      │              ↑
      │              │
Aplicación Android ──┘
```

La misma API y base de datos son utilizadas por ambos clientes.

---

# 29. Funcionalidades fuera del alcance actual

Algunas funcionalidades evaluadas durante las primeras etapas del proyecto no forman parte de la API implementada para el MVP.

Entre ellas:

- Sistema completo de promociones.
- Cupones.
- Recuperación de contraseña.
- Carga dinámica de imágenes mediante servicios externos.
- Geolocalización automática.
- Funcionalidades sociales avanzadas.

Estas funcionalidades pueden incorporarse en futuras versiones mediante nuevos endpoints.

---

# 30. Próximos pasos

La API principal necesaria para el MVP se encuentra implementada.

Los próximos pasos corresponden principalmente a:

- Mantener actualizada la documentación de endpoints.
- Completar las pruebas finales.
- Mantener sincronizada la API con el modelo de datos.
- Documentar cualquier nuevo endpoint incorporado.
- Mantener las variables sensibles fuera del código fuente.
- Realizar mantenimiento y ampliaciones posteriores al MVP.
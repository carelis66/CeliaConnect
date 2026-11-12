# 02 - Arquitectura del Sistema

## Información del documento

| Campo | Valor |
|---|---|
| Proyecto | CeliaConnect |
| Documento | Arquitectura del Sistema |
| Versión | 2.0 |
| Fecha | 12/11/2026 |
| Autor | Carelis Fagundez |
| Estado | Actualizado — MVP funcional y desplegado |

## 1. Introducción

Este documento describe la arquitectura técnica implementada en **CeliaConnect**.

Su objetivo es documentar cómo se encuentra construido el sistema, cómo se comunican sus principales componentes y qué tecnologías se utilizan en la versión actual del proyecto.

CeliaConnect utiliza una arquitectura cliente-servidor organizada principalmente en **Frontend, Backend/API REST y Base de Datos**.

El mismo frontend responsive se utiliza como base para la aplicación web y para la aplicación Android. Para la versión móvil se utiliza **Capacitor**, que integra los recursos web dentro de un proyecto Android ejecutable mediante Android Studio.

El backend y la base de datos centralizan la lógica y la información utilizada por ambas versiones.

---

## 2. Objetivos de la arquitectura

Los principales objetivos de la arquitectura son:

- Separar las responsabilidades entre Frontend, Backend y Base de Datos.
- Centralizar la lógica de negocio mediante una API REST.
- Permitir que la versión Web y la versión Android consuman el mismo backend.
- Reutilizar el frontend responsive existente para la aplicación móvil.
- Facilitar el mantenimiento del proyecto.
- Mantener una estructura organizada y modular.
- Permitir futuras ampliaciones del sistema.
- Facilitar el despliegue de los componentes en infraestructura cloud.

---

## 3. Arquitectura general

CeliaConnect utiliza una arquitectura cliente-servidor compuesta por las siguientes capas principales:

```text
┌─────────────────────────────┐
│        USUARIOS             │
└──────────────┬──────────────┘
               │
       ┌───────┴────────┐
       │                │
       ▼                ▼
┌─────────────┐   ┌─────────────────┐
│ Aplicación  │   │ Aplicación      │
│ Web         │   │ Android         │
│ Responsive  │   │ Capacitor       │
└──────┬──────┘   └────────┬────────┘
       │                   │
       └─────────┬─────────┘
                 │
                 │ HTTPS / JSON
                 ▼
        ┌─────────────────┐
        │    API REST     │
        │ Node.js/Express │
        └────────┬────────┘
                 │
                 ▼
        ┌─────────────────┐
        │ MySQL / MariaDB │
        │ Base de Datos   │
        └─────────────────┘
```

Tanto la aplicación Web como la aplicación Android consumen la misma API REST.

El backend procesa las solicitudes, aplica las reglas de negocio, valida autenticación y permisos y realiza las operaciones necesarias sobre la base de datos.

---

## 4. Componentes del sistema

### 4.1 Frontend Web

**Tecnologías:**

- HTML5.
- CSS3.
- Bootstrap 5.
- JavaScript Vanilla.
- Bootstrap Icons.

**Responsabilidades:**

- Presentar la interfaz de usuario.
- Gestionar la navegación.
- Adaptar la interfaz a diferentes tamaños de pantalla.
- Consumir la API REST mediante solicitudes HTTP.
- Gestionar la sesión del usuario en el cliente.
- Mostrar información obtenida desde la base de datos a través del backend.
- Gestionar interacciones como búsquedas, filtros, favoritos y opiniones.

El frontend fue desarrollado sin frameworks JavaScript adicionales.

La interfaz utiliza un diseño **responsive**, permitiendo su utilización desde computadoras, tablets y teléfonos.

---

### 4.2 Aplicación Mobile Android

La versión móvil de CeliaConnect utiliza el mismo frontend responsive de la aplicación Web.

**Tecnologías:**

- Capacitor.
- Android.
- Android Studio.
- Gradle.
- HTML/CSS/Bootstrap/JavaScript como contenido de la aplicación.

Capacitor genera y mantiene el proyecto Android que contiene los recursos web de CeliaConnect.

La aplicación utiliza el identificador:

```text
com.celiaconnect.app
```

**Responsabilidades:**

- Ejecutar CeliaConnect como aplicación Android.
- Reutilizar la interfaz responsive existente.
- Consumir la misma API REST que la versión Web.
- Permitir la instalación de CeliaConnect en dispositivos Android.
- Proporcionar acceso a las funcionalidades del sistema desde un entorno móvil.

La aplicación Android fue compilada e instalada correctamente en un emulador mediante Android Studio y se verificó el funcionamiento de las principales funcionalidades del sistema.

No se mantiene un segundo frontend desarrollado en Kotlin u otro framework móvil. El proyecto Android actúa como contenedor de la aplicación web mediante Capacitor.

---

### 4.3 Backend

**Tecnologías:**

- Node.js.
- Express.
- MySQL2.
- JSON Web Token.
- bcrypt.
- CORS.
- dotenv.

**Responsabilidades:**

- Exponer los endpoints de la API REST.
- Implementar la lógica de negocio.
- Validar los datos recibidos.
- Gestionar la autenticación.
- Gestionar autorización y roles.
- Procesar favoritos.
- Procesar comentarios y valoraciones.
- Gestionar el flujo de moderación.
- Proporcionar información al panel administrativo.
- Comunicarse con la base de datos MySQL.

El backend utiliza el paquete **mysql2/promise** para realizar la comunicación con la base de datos.

No se utiliza Sequelize en la implementación actual.

---

### 4.4 API REST

La API REST constituye el punto de comunicación entre los clientes y la capa de datos.

Las aplicaciones cliente realizan solicitudes HTTP al backend y reciben respuestas principalmente en formato **JSON**.

La API permite trabajar con recursos relacionados con:

- Usuarios.
- Autenticación.
- Productos.
- Restaurantes.
- Locales.
- Nutricionistas.
- Favoritos.
- Comentarios.
- Valoraciones.
- Moderación.
- Administración.

La API se encuentra desplegada en Railway.

**Backend público:**

```text
https://celiaconnect-production.up.railway.app
```

---

### 4.5 Base de Datos

**Motor:**

- MySQL / MariaDB.

En el entorno local se utiliza MySQL/MariaDB mediante XAMPP.

En producción se utiliza una instancia MySQL desplegada en Railway.

**Responsabilidades:**

- Almacenar la información del sistema.
- Mantener las relaciones entre entidades.
- Gestionar usuarios y roles.
- Almacenar productos y sus datos relacionados.
- Almacenar restaurantes.
- Almacenar locales.
- Almacenar nutricionistas.
- Gestionar favoritos.
- Gestionar comentarios y valoraciones.
- Mantener el estado de moderación de las opiniones.

El backend es el encargado de acceder a la base de datos. Los clientes Web y Android no acceden directamente a ella.

---

## 5. Tecnologías seleccionadas

| Componente | Tecnología |
|---|---|
| Frontend Web | HTML5 + CSS3 + Bootstrap 5 + JavaScript Vanilla |
| Mobile | Capacitor + Android |
| Backend | Node.js + Express |
| Acceso a datos | MySQL2 / Promise |
| Base de Datos | MySQL / MariaDB |
| Autenticación | JWT |
| Protección de contraseñas | bcrypt |
| Mapas | Google Maps |
| Imágenes | Recursos estáticos del proyecto |
| Control de versiones | Git + GitHub |
| Deploy Web | Railway |
| Deploy Backend | Railway |
| Base de Datos Cloud | Railway MySQL |
| Desarrollo Android | Android Studio + Gradle |

---

## 6. Comunicación entre componentes

La comunicación general del sistema sigue el siguiente flujo:

```text
Usuario
   ↓
Web / Aplicación Android
   ↓
Solicitud HTTP
   ↓
API REST
   ↓
Validación y lógica de negocio
   ↓
MySQL
   ↓
Respuesta del Backend
   ↓
JSON
   ↓
Frontend
   ↓
Interfaz actualizada
```

Por ejemplo, al consultar productos:

1. El usuario accede al catálogo.
2. El frontend realiza una solicitud a la API REST.
3. El backend recibe la solicitud.
4. El backend consulta la base de datos.
5. MySQL devuelve los registros correspondientes.
6. El backend genera una respuesta JSON.
7. El frontend procesa la respuesta.
8. Los productos son presentados en pantalla.

Este mismo mecanismo es utilizado tanto por la aplicación Web como por la aplicación Android.

---

## 7. Arquitectura de autenticación

CeliaConnect utiliza autenticación mediante **JSON Web Token (JWT)**.

El flujo general es:

```text
Usuario
   ↓
Login
   ↓
Backend valida credenciales
   ↓
bcrypt verifica contraseña
   ↓
Backend genera JWT
   ↓
Token enviado al cliente
   ↓
Cliente almacena sesión
   ↓
Token enviado en solicitudes protegidas
   ↓
Backend valida token y rol
```

El token contiene la información necesaria para identificar al usuario y su rol.

Las contraseñas no se almacenan en texto plano. Se utiliza **bcrypt** para realizar el hash correspondiente.

---

## 8. Roles y autorización

El sistema contempla tres roles:

### Usuario

Accede a las funcionalidades generales de CeliaConnect y puede realizar acciones autenticadas como gestionar favoritos y publicar opiniones.

### Moderador

Puede acceder al panel de moderación y aprobar o rechazar opiniones enviadas por los usuarios.

### Administrador

Posee permisos administrativos y puede acceder a las funcionalidades de gestión, moderación y dashboard.

La validación de permisos se realiza desde el backend para las operaciones protegidas.

---

## 9. Comentarios y moderación

La arquitectura contempla un flujo específico para el contenido generado por los usuarios.

```text
Usuario
   ↓
Envía comentario + calificación
   ↓
API REST
   ↓
Base de Datos
   ↓
Estado: Pendiente
   ↓
Panel de Moderación
   ↓
Moderador / Administrador
   ↓
Aprobar ──────── Rechazar
   ↓
Comentario público
```

Este mecanismo permite evitar que una opinión sea publicada directamente sin revisión.

---

## 10. Favoritos

Los favoritos se gestionan desde el backend y quedan asociados al usuario autenticado.

El sistema permite guardar:

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
Frontend / Android
        ↓
API REST + JWT
        ↓
Backend
        ↓
Base de Datos
```

Esto permite que los favoritos sean persistentes y estén asociados a la cuenta del usuario.

---

## 11. Servicios e integraciones externas

### 11.1 Google Maps

CeliaConnect utiliza Google Maps para complementar la información de ubicación de establecimientos y profesionales.

La implementación permite acceder a información geográfica desde los detalles correspondientes.

El MVP no depende de un sistema de geolocalización automática del dispositivo ni del cálculo automático de distancias.

### 11.2 Imágenes

Las imágenes utilizadas por el MVP se encuentran almacenadas como recursos estáticos dentro del proyecto.

No se utiliza actualmente un servicio externo como Cloudinary para el almacenamiento dinámico de imágenes.

### 11.3 Railway

Railway se utiliza como infraestructura cloud para los principales componentes desplegados del proyecto:

- Frontend Web.
- Backend Node.js/Express.
- Base de Datos MySQL.

---

## 12. Organización del proyecto

CeliaConnect utiliza un único repositorio que contiene los distintos componentes del sistema.

La estructura general es:

```text
celiaconnect/
│
├── android/
│   └── Proyecto Android generado mediante Capacitor
│
├── backend/
│   └── API REST Node.js + Express
│
├── database/
│   ├── schema.sql
│   ├── seed.sql
│   └── backup de base de datos
│
├── docs/
│   ├── diagramas/
│   ├── mockups/
│   └── documentación técnica y funcional
│
├── frontend/
│   ├── admin/
│   ├── assets/
│   ├── components/
│   ├── css/
│   ├── js/
│   ├── services/
│   └── archivos HTML
│
├── capacitor.config.json
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

Esta organización permite mantener en un único repositorio el código correspondiente a Web, Backend, Base de Datos, Android y documentación.

---

## 13. Repositorio

El código fuente del proyecto se encuentra versionado mediante Git y alojado en GitHub.

Repositorio:

```text
https://github.com/carelis66/CeliaConnect
```

La rama principal utilizada es:

```text
main
```

El repositorio contiene tanto el código fuente Web como Backend, scripts de base de datos, documentación y proyecto Android.

---

## 14. Estrategia de despliegue

### 14.1 Frontend Web

El frontend se encuentra desplegado como servicio en Railway.

**URL pública:**

```text
https://celiaconnect.up.railway.app
```

### 14.2 Backend

El backend Node.js/Express se encuentra desplegado en Railway.

**URL pública:**

```text
https://celiaconnect-production.up.railway.app
```

### 14.3 Base de Datos

La base de datos MySQL se encuentra desplegada mediante un servicio MySQL de Railway.

El backend utiliza variables de entorno para establecer la conexión con la base de datos.

### 14.4 Mobile

La aplicación Android se genera mediante **Capacitor y Android Studio**.

El proceso general es:

```text
Frontend CeliaConnect
        ↓
Capacitor
        ↓
Proyecto Android
        ↓
Gradle
        ↓
Aplicación Android / APK
```

La publicación en Google Play no forma parte de los requisitos necesarios para el MVP.

---

## 15. Entornos

### Desarrollo local

En el entorno local se utilizan:

- Visual Studio Code.
- Node.js.
- Express.
- XAMPP.
- MySQL/MariaDB.
- Navegador Web.
- Android Studio.
- Emulador Android.

### Producción

En producción se utilizan:

- Railway para Frontend.
- Railway para Backend.
- Railway para MySQL.
- HTTPS para la comunicación entre los clientes y los servicios desplegados.

La aplicación Android consume el backend desplegado, por lo que no necesita que el servidor local se encuentre ejecutándose para utilizar las funcionalidades principales.

---

## 16. Alcance geográfico del MVP

La primera versión de CeliaConnect se encuentra orientada a la **Ciudad Autónoma de Buenos Aires (CABA)**.

Esta decisión permite limitar el alcance inicial y concentrar la información en una región específica.

La arquitectura permite ampliar posteriormente la cobertura geográfica incorporando nuevos registros y, si fuera necesario, ampliando el modelo de ubicación.

---

## 17. Decisiones de diseño

### 17.1 JavaScript Vanilla en el frontend

Se decidió utilizar JavaScript Vanilla junto con HTML, CSS y Bootstrap para mantener una arquitectura frontend simple y adecuada al alcance académico del proyecto.

Esto evita introducir frameworks adicionales que no son necesarios para cubrir los requerimientos del MVP.

### 17.2 API REST centralizada

La aplicación Web y la aplicación Android utilizan la misma API REST.

Esta decisión evita duplicar la lógica de negocio y permite mantener un único backend.

### 17.3 Capacitor para Mobile

Inicialmente se evaluó una implementación basada en PWA y PWABuilder.

Durante el desarrollo se decidió utilizar **Capacitor** para generar la versión Android.

Esta alternativa permite:

- Reutilizar el frontend responsive.
- Mantener una única interfaz principal.
- Generar un proyecto Android real.
- Ejecutar la aplicación desde Android Studio.
- Generar un APK instalable.
- Evitar reescribir la aplicación en Kotlin, React Native u otro framework móvil.

### 17.4 Acceso directo mediante MySQL2

El backend utiliza **MySQL2/Promise** para acceder a MySQL.

No se utiliza un ORM como Sequelize.

Esta decisión mantiene el acceso a datos explícito y adecuado a la dimensión actual del proyecto.

### 17.5 Repositorio unificado

Frontend, Backend, Base de Datos, documentación y Android se mantienen dentro del mismo repositorio Git.

Esto simplifica el versionado y permite presentar el proyecto completo desde una única fuente.

---

## 18. Beneficios de la arquitectura

La arquitectura implementada permite:

- Separar claramente interfaz, lógica de negocio y persistencia.
- Reutilizar el frontend entre Web y Android.
- Centralizar la lógica mediante una única API REST.
- Compartir la misma base de datos entre los distintos clientes.
- Mantener autenticación y autorización centralizadas.
- Desplegar los componentes principales en infraestructura cloud.
- Facilitar pruebas desde diferentes dispositivos.
- Mantener el proyecto organizado en un único repositorio.
- Incorporar futuras funcionalidades sin modificar completamente la arquitectura existente.

---

## 19. Estado actual

La arquitectura principal se encuentra implementada.

Actualmente se dispone de:

- Frontend Web funcional.
- Diseño responsive.
- Backend Node.js/Express funcional.
- API REST funcional.
- Base de Datos MySQL funcional.
- Autenticación mediante JWT.
- Roles Usuario, Moderador y Administrador.
- Favoritos persistentes.
- Comentarios y valoraciones.
- Flujo de moderación.
- Panel administrativo.
- Dashboard.
- Frontend desplegado en Railway.
- Backend desplegado en Railway.
- Base de Datos desplegada en Railway.
- Proyecto Android generado mediante Capacitor.
- Aplicación ejecutada y probada en emulador Android.

La arquitectura se encuentra preparada para la generación y distribución del APK correspondiente a la versión Mobile del proyecto.

---

## 20. Próximos pasos

Los siguientes pasos corresponden principalmente al cierre técnico y documental del proyecto:

- Generar la versión final del APK.
- Completar las pruebas finales de la aplicación Android.
- Mantener actualizada la documentación técnica.
- Actualizar diagramas y modelos según la implementación definitiva.
- Preparar los entregables finales del Proyecto CeliaConnect.
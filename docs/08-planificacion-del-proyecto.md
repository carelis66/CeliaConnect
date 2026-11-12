# 08 - Planificación del Proyecto (Gantt)

## Información del documento

| Campo | Valor |
|---|---|
| Proyecto | CeliaConnect |
| Documento | Planificación del Proyecto |
| Versión | 2.0 |
| Fecha | 12/11/2026 |
| Autor | Carelis Fagundez |
| Estado | En ejecución — etapa final |

---

# 1. Objetivo

El presente documento describe la planificación general del desarrollo de **CeliaConnect**, desde las primeras etapas de investigación y análisis hasta la implementación, despliegue, pruebas, documentación y presentación final.

La planificación fue organizada mediante un **Diagrama de Gantt**, utilizado como referencia para distribuir las principales actividades del proyecto a lo largo del período comprendido entre agosto y diciembre de 2026.

Durante el desarrollo, algunas decisiones técnicas fueron modificadas respecto de la planificación inicial. Estas modificaciones respondieron a la evolución del MVP y a las necesidades detectadas durante la implementación.

---

# 2. Período del proyecto

**Fecha de inicio:** 18/07/2026  
**Fecha de entrega final:** 18/12/2026

El proyecto se desarrolla de manera individual.

**Responsable:** Carelis Fagundez.

---

# 3. Diagrama de Gantt

![Diagrama de Gantt](diagramas/Gantt.png)

El Diagrama de Gantt representa la planificación temporal general del proyecto.

Las actividades fueron distribuidas entre agosto y diciembre de 2026, contemplando etapas de:

- Investigación.
- Análisis.
- Diseño.
- Desarrollo.
- Integración.
- Testing.
- Correcciones.
- Documentación.
- Presentación final.

La planificación se utilizó como guía de trabajo y fue adaptándose a medida que avanzó la implementación.

---

# 4. Etapas del proyecto

## 4.1 Investigación y relevamiento

Durante la primera etapa se realizó el relevamiento del problema que dio origen a CeliaConnect.

Se identificó la necesidad de contar con información centralizada relacionada con:

- Productos Sin TACC.
- Restaurantes.
- Locales.
- Profesionales de nutrición.

También se analizaron aplicaciones, sitios y soluciones existentes con el objetivo de identificar funcionalidades, fortalezas y oportunidades de mejora.

Como resultado se definió el enfoque inicial de CeliaConnect y se estableció **Ciudad Autónoma de Buenos Aires (CABA)** como alcance geográfico del MVP.

---

## 4.2 Análisis del problema y benchmarking

Se analizaron soluciones existentes relacionadas con alimentación Sin TACC y celiaquía.

Esta etapa permitió:

- Identificar necesidades de los usuarios.
- Comparar funcionalidades existentes.
- Definir oportunidades para CeliaConnect.
- Delimitar el alcance inicial.
- Establecer los principales módulos del sistema.

---

## 4.3 Definición de requisitos

Se definieron los requisitos funcionales y no funcionales del sistema.

A partir de ellos se determinaron las principales funcionalidades relacionadas con:

- Usuarios.
- Autenticación.
- Productos.
- Restaurantes.
- Locales.
- Nutricionistas.
- Favoritos.
- Comentarios y calificaciones.
- Moderación.
- Administración.

Los requisitos sirvieron como base para el diseño y desarrollo posterior.

---

## 4.4 Modelo funcional

Se definió el comportamiento esperado de CeliaConnect desde la perspectiva de sus diferentes actores.

Los actores contemplados en el MVP son:

- Visitante.
- Usuario.
- Moderador.
- Administrador.

El modelo funcional se encuentra documentado en `05-modelo-funcional.md`.

---

## 4.5 Modelo de datos

Se diseñó el modelo de datos necesario para representar la información administrada por CeliaConnect.

Posteriormente se realizó la implementación física de la base de datos utilizando **MySQL/MariaDB**.

El modelo contempla, entre otros elementos:

- Usuarios y roles.
- Productos.
- Marcas.
- Categorías.
- Restaurantes.
- Locales.
- Nutricionistas.
- Barrios.
- Favoritos.
- Comentarios.
- Calificaciones.
- Estados de moderación.

La documentación correspondiente se encuentra en `03-modelo-de-datos.md`.

---

## 4.6 Arquitectura del sistema

Se definió una arquitectura cliente-servidor compuesta por:

```text id="qpx2jr"
Aplicación Web / Android
          ↓
       API REST
          ↓
 Node.js + Express
          ↓
        MySQL
```

La arquitectura permite que la aplicación Web y la aplicación Android compartan el mismo backend y la misma base de datos.

La arquitectura completa se encuentra documentada en `02-arquitectura-del-sistema.md`.

---

## 4.7 Diagramas UML

Durante la etapa de diseño se planificó la elaboración de diagramas para representar diferentes aspectos del sistema.

Entre ellos:

- Casos de uso.
- Modelo de datos.
- Arquitectura.
- Componentes y relaciones relevantes.

Los diagramas son utilizados como complemento de la documentación técnica y deben mantenerse alineados con la versión final implementada.

La documentación correspondiente se encuentra en `06-diagramas-y-UML.md`.

---

## 4.8 Diseño de API REST

Se diseñó e implementó una API REST como punto central de comunicación entre los clientes y la base de datos.

La API fue desarrollada utilizando:

- Node.js.
- Express.
- mysql2/promise.
- JWT.
- bcrypt.
- CORS.
- Variables de entorno.

La API permite gestionar las operaciones necesarias para el funcionamiento del MVP.

La documentación correspondiente se encuentra en `04-api-rest.md`.

---

## 4.9 Mockups y diseño UI/UX

Durante las primeras etapas se diseñaron wireframes y mockups para establecer la estructura visual de las principales pantallas.

Se trabajó sobre interfaces correspondientes a:

- Login.
- Home.
- Productos.
- Restaurantes.
- Otras pantallas principales.

Estos diseños sirvieron como referencia para el desarrollo posterior de la interfaz.

La documentación se encuentra en `09-mockups.md`.

---

# 5. Desarrollo

## 5.1 Desarrollo Frontend Web

La interfaz Web fue desarrollada utilizando:

- HTML5.
- CSS3.
- Bootstrap 5.
- JavaScript vanilla.
- Bootstrap Icons.

Se implementaron las principales pantallas del sistema y posteriormente se conectaron con la API REST.

Entre los módulos desarrollados se encuentran:

- Home.
- Productos.
- Restaurantes.
- Locales.
- Nutricionistas.
- Login.
- Registro.
- Favoritos.
- Comentarios y calificaciones.
- Administración.
- Moderación.
- Dashboard.

El diseño fue adaptado para funcionar de forma responsive en distintos tamaños de pantalla.

---

## 5.2 Desarrollo de Base de Datos

La base de datos fue implementada utilizando MySQL/MariaDB.

Durante esta etapa se trabajó sobre:

- Creación de tablas.
- Relaciones.
- Claves primarias.
- Claves foráneas.
- Datos iniciales.
- Datos de prueba.
- Scripts SQL.
- Backups.

Los scripts se mantienen dentro del directorio:

```text id="s3qptb"
database/
```

---

## 5.3 Desarrollo Backend

El backend fue desarrollado utilizando:

```text id="09wgvf"
Node.js
Express
mysql2/promise
JWT
bcrypt
CORS
dotenv
```

Durante esta etapa se implementaron:

- Conexión con MySQL.
- API REST.
- Autenticación.
- Roles y permisos.
- Consultas de contenido.
- Favoritos.
- Comentarios y calificaciones.
- Moderación.
- Funcionalidades administrativas.
- Información utilizada por el dashboard.

No se utiliza Sequelize en la versión implementada.

---

# 6. Integración

La integración consistió en conectar completamente:

```text id="m0v8fq"
Frontend
   ↓
API REST
   ↓
Base de Datos
```

Se reemplazaron los datos utilizados durante las primeras etapas de desarrollo por información obtenida desde la base de datos real.

La integración permitió verificar los principales flujos de punta a punta.

---

# 7. Despliegue

Durante la evolución del proyecto se incorporó una etapa de despliegue para permitir que CeliaConnect pudiera utilizarse fuera del entorno local.

Se utilizó **Railway** para desplegar:

- Frontend Web.
- Backend.
- Base de datos MySQL.

## Aplicación Web

```text id="4dkkr3"
https://celiaconnect.up.railway.app
```

## Backend / API REST

```text id="ntm00p"
https://celiaconnect-production.up.railway.app
```

Esto permitió validar el funcionamiento del sistema utilizando infraestructura remota y HTTPS.

---

# 8. Desarrollo de la aplicación Android

La planificación inicial contemplaba evaluar una solución PWA/PWABuilder para generar una versión instalable.

Durante el desarrollo esta decisión fue modificada.

La solución finalmente utilizada fue **Capacitor**, permitiendo reutilizar el frontend responsive existente y generar un proyecto Android.

La versión móvil utiliza:

- Capacitor.
- Android.
- Android Studio.
- Gradle.

El identificador de la aplicación es:

```text id="a6yhtp"
com.celiaconnect.app
```

La aplicación Android consume la misma API REST desplegada en Railway que la aplicación Web.

El flujo es:

```text id="4ebz7j"
Android
   ↓
Capacitor
   ↓
Frontend CeliaConnect
   ↓
API REST Railway
   ↓
MySQL
```

La aplicación fue ejecutada y probada mediante un emulador Android.

---

# 9. Testing

Durante el proyecto se realizaron pruebas funcionales y de integración sobre los principales módulos.

Entre las funcionalidades verificadas se encuentran:

- Registro.
- Login.
- Sesión.
- Logout.
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
- Navegación responsive.

También se realizaron pruebas desde Android para validar que la aplicación móvil pudiera utilizar correctamente el backend desplegado.

Los casos de prueba se documentan en `10-casos-de-prueba.md`.

---

# 10. Pruebas de integración de punta a punta

Se validó el flujo completo entre los diferentes componentes del sistema.

Un ejemplo del flujo probado es:

```text id="6npfyu"
Aplicación Android
       ↓
Inicio de sesión
       ↓
API REST
       ↓
MySQL
       ↓
Agregar favorito
       ↓
Publicar opinión
       ↓
Opinión pendiente
       ↓
Moderador
       ↓
Aprobar opinión
       ↓
Opinión visible públicamente
```

Este flujo permitió comprobar la comunicación entre aplicación móvil, backend, base de datos y sistema de moderación.

---

# 11. Correcciones y ajustes

Durante el testing se realizaron diferentes correcciones sobre:

- Consultas SQL.
- Nombres de tablas.
- Compatibilidad entre entorno local y producción.
- Alias utilizados en consultas.
- Interfaz responsive.
- Navegación móvil.
- Manejo de sesión.
- Favoritos.
- Comentarios.
- Moderación.
- Integración frontend/backend.

Estas correcciones permitieron estabilizar el MVP antes de la entrega final.

---

# 12. Documentación final

La documentación técnica se fue desarrollando en paralelo con el proyecto y se actualiza durante la etapa final para reflejar el sistema realmente implementado.

Incluye documentación relacionada con:

- Módulos.
- Arquitectura.
- Modelo de datos.
- API REST.
- Modelo funcional.
- Diagramas.
- Casos de uso.
- Planificación.
- Mockups.
- Casos de prueba.
- Requisitos funcionales.
- Aplicación Android.

También se mantiene actualizado el `README.md` principal del repositorio.

---

# 13. Presentación y defensa

La última etapa corresponde a la preparación de la presentación final del proyecto.

Incluye:

- Revisión final del sistema.
- Preparación del material de exposición.
- Preparación del pitch.
- Demostración de la aplicación Web.
- Demostración de la aplicación Android.
- Presentación de la arquitectura y principales funcionalidades.
- Preparación del repositorio y enlaces de acceso.
- Defensa del proyecto.

La fecha prevista para la entrega final es:

**18 de diciembre de 2026.**

---

# 14. Evolución respecto de la planificación inicial

La planificación funcionó como una guía general del proyecto.

Durante la implementación se realizaron algunas modificaciones técnicas.

| Planificación inicial | Implementación final |
|---|---|
| PWA / PWABuilder | Capacitor + Android Studio |
| Sequelize | mysql2/promise |
| Web + futura versión mobile | Web + aplicación Android |
| Entorno principalmente local | Aplicación desplegada en Railway |
| Usuario y Administrador | Usuario, Moderador y Administrador |
| Comentarios limitados | Comentarios y calificaciones en los principales módulos |
| Favoritos limitados | Productos, restaurantes, locales y nutricionistas |
| Promociones dentro del MVP | Fuera del alcance del MVP final |

Estas modificaciones no alteraron el objetivo principal del proyecto y permitieron adaptar la solución a las necesidades surgidas durante el desarrollo.

---

# 15. Estado actual del proyecto

Se encuentran implementados:

- Frontend Web.
- Backend.
- API REST.
- Base de datos.
- Autenticación.
- Roles.
- Productos.
- Restaurantes.
- Locales.
- Nutricionistas.
- Favoritos.
- Comentarios y calificaciones.
- Moderación.
- Administración.
- Dashboard.
- Despliegue Web.
- Despliegue del backend.
- Base de datos en producción.
- Proyecto Android mediante Capacitor.
- Ejecución y pruebas en emulador Android.

Las actividades restantes se concentran principalmente en:

- Finalización del APK.
- Pruebas finales.
- Actualización de documentación.
- Revisión de diagramas.
- Preparación de la entrega.
- Preparación de la defensa.

---

# 16. Estado del documento

**Versión:** 2.0

**Estado:** En ejecución — etapa final.

La planificación se mantiene como referencia del desarrollo original y este documento registra también las principales adaptaciones realizadas durante la implementación.
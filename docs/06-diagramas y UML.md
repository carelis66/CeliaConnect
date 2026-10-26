# 06 - Diagramas y UML

## Información del documento

| Campo | Valor |
|---|---|
| Proyecto | CeliaConnect |
| Documento | Diagramas y UML |
| Versión | 2.0 |
| Fecha | 08/10/2026 |
| Autor | Carelis Fagundez |
| Estado | En elaboración |

## 1. Introducción

El presente documento reúne los principales diagramas desarrollados durante las etapas de análisis y diseño de CeliaConnect. Cada uno representa una perspectiva distinta del sistema (datos, funcionalidades, clases, arquitectura y planificación) y sirve de guía para la construcción, las pruebas y el mantenimiento.

**Cambios de la versión 2.0:** la base de datos pasa a MySQL (antes se mencionaba SQL Server), se elimina el módulo de promociones, se incorporan favoritos y comentarios para los cuatro tipos de ítem (producto, restaurante, local y nutricionista), y la versión móvil se resuelve como PWA.

## 2. Diagrama Entidad-Relación (DER)

El DER representa el modelo lógico y físico de la base de datos `celiaconnectdb`, implementada en MySQL. Está compuesto por 22 tablas, organizadas en:

- **Usuarios:** `rol`, `usuario`.
- **Catálogos:** `barrio`, `categoria`, `marca`, `tipoRestaurante`, `tipoLocal`, `caracteristica`.
- **Contenido:** `producto`, `restaurante`, `local`, `nutricionista`, y las tablas intermedias `restauranteCaracteristica` y `localCaracteristica`.
- **Interacción:** `favoritoProducto`, `favoritoRestaurante`, `favoritoLocal`, `favoritoNutricionista` y `comentarioProducto`, `comentarioRestaurante`, `comentarioLocal`, `comentarioNutricionista`.

Reglas principales: los comentarios de un usuario no se pueden borrar en cascada (`ON DELETE RESTRICT` hacia `usuario`); al eliminar un ítem se eliminan sus comentarios y favoritos; los catálogos están protegidos con `RESTRICT`. Los comentarios tienen calificación de 1 a 5 y un estado (pendiente, aprobado, rechazado) para la moderación. Restaurantes, locales y nutricionistas tienen un estado de verificación.

![DER detallado](diagramas/er_detallado.png)

Versión simplificada (solo tablas y relaciones):

![DER general](diagramas/er_general.png)

## 3. Diagrama de Casos de Uso

Actores del sistema:

| Actor | Descripción |
|---|---|
| Visitante | Persona que navega la plataforma sin iniciar sesión. |
| Usuario registrado | Visitante con cuenta e inicio de sesión. Hereda todo lo del visitante. |
| Administrador | Usuario con rol de administrador. Hereda lo del usuario registrado y gestiona el sistema. |

Funcionalidades por actor:

- **Visitante:** ver inicio; consultar productos, restaurantes, locales y nutricionistas; buscar y filtrar; ver detalle y reseñas; registrarse; iniciar sesión.
- **Usuario registrado:** gestionar favoritos; comentar y calificar; editar perfil; cerrar sesión.
- **Administrador:** ver el panel; gestionar productos, restaurantes, locales, nutricionistas, catálogos y usuarios; moderar comentarios; verificar comercios y nutricionistas.

![Casos de uso](diagramas/casos_uso.png)

## 4. Diagrama de Clases

Las clases corresponden a las entidades del modelo de datos (`database/schema.sql`). `Comentario` y `Favorito` se representan como una sola clase cada una, asociada a `Usuario` y a los cuatro tipos de ítem (producto, restaurante, local y nutricionista); en la base se guardan en cuatro tablas por tipo. Las clases en gris son catálogos.

![Clases](diagramas/clases.png)

## 5. Diagrama de Componentes

Arquitectura cliente-servidor desacoplada y en capas:

- **Cliente web** (HTML, CSS, Bootstrap 5, JavaScript) con capa `services/`.
- **App móvil instalable (PWA)**, empaquetada para Android con PWABuilder.
- **API REST** (Node.js + Express) que responde en JSON.
- **Autenticación y autorización** con JWT y bcrypt, con control por rol.
- **Lógica de negocio** y **acceso a datos** con Sequelize.
- **Base de datos MySQL** y almacenamiento de imágenes en el servidor.

![Componentes](diagramas/componentes.png)

## 6. Diagrama de Gantt

La planificación toma como hito final el **18 de diciembre**, fecha de la entrega del trabajo y de la exposición. El desarrollo y la documentación principal se concentran hasta la última semana de noviembre, y el tiempo restante se usa para ajustes y la preparación de la exposición. La documentación se desarrolla en paralelo desde el inicio y ya tiene un avance importante; además, el análisis, el diseño de base de datos y las primeras pantallas del front ya están realizados. Quedan por delante: front restante, backend, integración, PWA, publicación, pruebas y documentación, y luego la preparación de la exposición.

![Gantt](diagramas/gantt.png)

## 7. Próximos diagramas

Según las necesidades de la implementación podrán sumarse diagramas de secuencia (por ejemplo, inicio de sesión y publicación de un comentario), de actividad y de despliegue.

## 8. Consideraciones finales

Los diagramas son una representación del diseño actual y se actualizan si el sistema cambia. La fuente de verdad del modelo de datos es `database/schema.sql`.

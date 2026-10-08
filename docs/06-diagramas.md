# 06 - Diagramas

## Información del documento

| Campo | Valor |
|---|---|
| Proyecto | CeliaConnect |
| Documento | Diagramas |
| Versión | 2.0 |
| Fecha | 08/10/2026 |
| Autor | Carelis Fagundez |
| Estado | En elaboración |

## 1. Introducción

El presente documento reúne los principales diagramas desarrollados durante las etapas de análisis y diseño de CeliaConnect. Cada uno representa una perspectiva distinta del sistema (datos y planificación; el UML está en el documento 07) y sirve de guía para la construcción, las pruebas y el mantenimiento.

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

## 3. Diagramas UML

Los diagramas UML de CeliaConnect (casos de uso, clases y componentes) se encuentran en un documento aparte: [07 - Diagramas UML](07-UML.md).

## 4. Diagrama de Gantt

La planificación toma como hito final el **18 de diciembre**, fecha de la entrega del trabajo y de la exposición. El desarrollo y la documentación principal se concentran hasta la última semana de noviembre, y el tiempo restante se usa para ajustes y la preparación de la exposición. La documentación se desarrolla en paralelo desde el inicio y ya tiene un avance importante; además, el análisis, el diseño de base de datos y las primeras pantallas del front ya están realizados. Quedan por delante: front restante, backend, integración, PWA, publicación, pruebas y documentación, y luego la preparación de la exposición.

![Gantt](diagramas/gantt.png)

## 5. Próximos diagramas

Según las necesidades de la implementación podrán sumarse diagramas UML adicionales de secuencia (por ejemplo, inicio de sesión y publicación de un comentario), de actividad y de despliegue.

## 6. Consideraciones finales

Los diagramas son una representación del diseño actual y se actualizan si el sistema cambia. La fuente de verdad del modelo de datos es `database/schema.sql`.

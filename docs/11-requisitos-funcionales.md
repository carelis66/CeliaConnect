# 11 - Requisitos Funcionales

## Información del documento

| Campo | Valor |
|--------|--------|
| Proyecto | CeliaConnect |
| Documento | Requisitos Funcionales |
| Versión | 1.1 |
| Fecha | 15/09/2026 |
| Autor | Carelis Fagundez |
| Estado | En elaboración |

---

# 1. Introducción

Los requisitos funcionales describen las funcionalidades que deberá proporcionar CeliaConnect para satisfacer las necesidades identificadas durante el análisis del proyecto.

Estos requisitos constituyen la base para el desarrollo del sistema, la elaboración de historias de usuario, casos de uso y casos de prueba.

---

# 2. Requisitos Funcionales

| ID | Nombre | Descripción | Prioridad |
|----|---------|-------------|-----------|
| RF-001 | Registro de usuario | El sistema deberá permitir la creación de cuentas mediante correo electrónico y contraseña. | Alta |
| RF-002 | Inicio de sesión | El sistema deberá permitir autenticar usuarios registrados para acceder a funcionalidades personalizadas. | Alta |
| RF-003 | Recuperación de contraseña | El sistema deberá permitir recuperar el acceso a la cuenta mediante correo electrónico. | Media |
| RF-004 | Gestión de perfil | El usuario podrá consultar y actualizar sus datos personales. | Media |
| RF-005 | Consulta de productos | El sistema deberá permitir visualizar productos aptos para personas celíacas. | Alta |
| RF-006 | Búsqueda de productos | El sistema deberá permitir buscar productos por nombre, categoría o palabra clave. | Alta |
| RF-007 | Detalle de producto | El sistema deberá mostrar información detallada de cada producto. | Alta |
| RF-008 | Consulta de restaurantes | El sistema deberá permitir visualizar restaurantes con opciones aptas para personas celíacas. | Alta |
| RF-009 | Detalle de restaurante | El sistema deberá mostrar información detallada de cada establecimiento registrado. | Media |
| RF-010 | Consulta de locales | El sistema deberá permitir visualizar locales (supermercados y dietéticas) con productos aptos para personas celíacas. | Alta |
| RF-011 | Detalle de local | El sistema deberá mostrar información detallada de cada local registrado. | Media |
| RF-012 | Consulta de nutricionistas | El sistema deberá permitir visualizar perfiles de nutricionistas especializados en celiaquía. | Media |
| RF-013 | Consulta de promociones | El sistema deberá permitir visualizar promociones y beneficios disponibles, publicadas por restaurantes y locales. | Baja |
| RF-014 | Gestión de favoritos | El usuario podrá guardar restaurantes, locales y nutricionistas como favoritos, y consultar o eliminar su lista de favoritos. | Media |
| RF-015 | Gestión de comentarios | El usuario podrá publicar comentarios y calificaciones sobre restaurantes y locales. | Media |
| RF-016 | Panel de administración | El administrador podrá gestionar la información publicada en la plataforma (usuarios, productos, restaurantes, locales, nutricionistas, promociones y catálogos). | Alta |

---

# 3. Distribución por Plataforma

## Funcionalidades Web

- Registro de usuario
- Inicio de sesión
- Recuperación de contraseña
- Gestión de perfil
- Consulta de productos
- Búsqueda de productos
- Consulta de restaurantes
- Consulta de locales
- Consulta de nutricionistas
- Consulta de promociones
- Gestión de favoritos
- Gestión de comentarios
- Panel de administración

---

## Funcionalidades Mobile (PWA instalable)

- Registro de usuario
- Inicio de sesión
- Recuperación de contraseña
- Gestión de perfil
- Consulta de productos
- Búsqueda de productos
- Consulta de restaurantes
- Consulta de locales
- Consulta de nutricionistas
- Consulta de promociones
- Gestión de favoritos
- Gestión de comentarios

> **Nota:** El Panel de Administración estará disponible únicamente en la versión Web. La versión mobile es la misma aplicación web instalada como PWA (Progressive Web App), generada con PWABuilder — no es un desarrollo nativo aparte.

---

# 4. Observaciones

Los requisitos funcionales podrán evolucionar durante el desarrollo del proyecto conforme se identifiquen nuevas necesidades o mejoras derivadas de las pruebas funcionales y la retroalimentación de los usuarios.

Recetas fue evaluado durante el análisis pero quedó fuera del alcance de esta versión (v1.1) del sistema CeliaConnect.

Las funcionalidades descritas constituyen la versión actual (v1.1) del sistema CeliaConnect.

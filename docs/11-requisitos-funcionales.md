# 11 - Requisitos Funcionales

## Información del documento

| Campo | Valor |
|---|---|
| Proyecto | CeliaConnect |
| Documento | Requisitos Funcionales |
| Versión | 2.0 |
| Fecha | 12/11/2026 |
| Autor | Carelis Fagundez |
| Estado | Actualizado — MVP funcional |

---

# 1. Introducción

Los requisitos funcionales describen las funcionalidades que debe proporcionar **CeliaConnect** para satisfacer las necesidades identificadas durante el análisis del proyecto.

Estos requisitos constituyen la base para:

- El modelo funcional.
- Los casos de uso.
- Los casos de prueba.
- El desarrollo del frontend.
- El desarrollo del backend.
- La implementación de la aplicación Android.

La presente versión refleja el alcance real del MVP implementado.

---

# 2. Actores relacionados

Los requisitos funcionales contemplan los siguientes actores:

- **Visitante:** persona que utiliza las funcionalidades públicas sin iniciar sesión.
- **Usuario:** persona registrada que puede utilizar funcionalidades personalizadas.
- **Moderador:** usuario encargado de revisar contenido generado por otros usuarios.
- **Administrador:** usuario con acceso a las funciones administrativas del sistema.

---

# 3. Requisitos Funcionales

| ID | Nombre | Descripción | Prioridad | Estado |
|---|---|---|---|---|
| RF-001 | Registro de usuario | El sistema permite crear una cuenta mediante los datos requeridos para el registro. | Alta | Implementado |
| RF-002 | Inicio de sesión | El sistema permite autenticar usuarios registrados mediante email y contraseña. | Alta | Implementado |
| RF-003 | Cierre de sesión | El sistema permite finalizar la sesión activa del usuario. | Alta | Implementado |
| RF-004 | Control de acceso por rol | El sistema habilita funcionalidades de acuerdo con el rol del usuario autenticado. | Alta | Implementado |
| RF-005 | Consulta de productos | El sistema permite visualizar los productos registrados. | Alta | Implementado |
| RF-006 | Búsqueda y filtrado de productos | El sistema permite buscar, filtrar y ordenar productos según los criterios disponibles. | Alta | Implementado |
| RF-007 | Detalle de producto | El sistema permite consultar la información detallada de un producto. | Alta | Implementado |
| RF-008 | Consulta de restaurantes | El sistema permite visualizar los restaurantes registrados. | Alta | Implementado |
| RF-009 | Detalle de restaurante | El sistema permite consultar la información detallada de un restaurante. | Alta | Implementado |
| RF-010 | Consulta de locales | El sistema permite visualizar locales relacionados con productos Sin TACC. | Alta | Implementado |
| RF-011 | Detalle de local | El sistema permite consultar la información detallada de un local. | Alta | Implementado |
| RF-012 | Consulta de nutricionistas | El sistema permite visualizar profesionales de nutrición registrados. | Alta | Implementado |
| RF-013 | Detalle de nutricionista | El sistema permite consultar la información detallada de un nutricionista. | Alta | Implementado |
| RF-014 | Gestión de favoritos | El usuario autenticado puede agregar, consultar y eliminar elementos de favoritos. | Alta | Implementado |
| RF-015 | Favoritos de productos | El usuario autenticado puede guardar productos como favoritos. | Media | Implementado |
| RF-016 | Favoritos de restaurantes | El usuario autenticado puede guardar restaurantes como favoritos. | Media | Implementado |
| RF-017 | Favoritos de locales | El usuario autenticado puede guardar locales como favoritos. | Media | Implementado |
| RF-018 | Favoritos de nutricionistas | El usuario autenticado puede guardar nutricionistas como favoritos. | Media | Implementado |
| RF-019 | Publicación de comentarios | El usuario autenticado puede publicar opiniones sobre los contenidos habilitados. | Alta | Implementado |
| RF-020 | Calificación | El usuario autenticado puede asignar una calificación de 1 a 5 estrellas. | Alta | Implementado |
| RF-021 | Comentarios de productos | Los usuarios autenticados pueden publicar opiniones sobre productos. | Media | Implementado |
| RF-022 | Comentarios de restaurantes | Los usuarios autenticados pueden publicar opiniones sobre restaurantes. | Media | Implementado |
| RF-023 | Comentarios de locales | Los usuarios autenticados pueden publicar opiniones sobre locales. | Media | Implementado |
| RF-024 | Comentarios de nutricionistas | Los usuarios autenticados pueden publicar opiniones sobre nutricionistas. | Media | Implementado |
| RF-025 | Moderación de comentarios | Las nuevas opiniones deben quedar pendientes hasta ser revisadas por un usuario autorizado. | Alta | Implementado |
| RF-026 | Consulta de opiniones pendientes | El Moderador y el Administrador pueden consultar las opiniones pendientes. | Alta | Implementado |
| RF-027 | Aprobación de opiniones | El Moderador y el Administrador pueden aprobar opiniones pendientes. | Alta | Implementado |
| RF-028 | Rechazo de opiniones | El Moderador y el Administrador pueden rechazar opiniones pendientes. | Alta | Implementado |
| RF-029 | Visualización de opiniones aprobadas | El sistema muestra públicamente las opiniones que fueron aprobadas. | Alta | Implementado |
| RF-030 | Panel administrativo | El Administrador puede acceder a las funcionalidades de administración. | Alta | Implementado |
| RF-031 | Gestión de usuarios | El Administrador puede consultar y utilizar las funciones de gestión disponibles sobre los usuarios. | Alta | Implementado |
| RF-032 | Gestión de contenido | El Administrador puede gestionar la información habilitada desde el panel administrativo. | Alta | Implementado |
| RF-033 | Dashboard administrativo | El Administrador puede consultar indicadores generales obtenidos desde la información del sistema. | Alta | Implementado |
| RF-034 | Ubicación de establecimientos | El sistema permite acceder a información de ubicación de establecimientos y profesionales cuando se encuentra disponible. | Media | Implementado |
| RF-035 | Interfaz responsive | La interfaz debe adaptarse a computadoras, tablets y dispositivos móviles. | Alta | Implementado |
| RF-036 | Aplicación Android | El sistema debe poder ejecutarse como aplicación Android mediante Capacitor. | Alta | Implementado |
| RF-037 | Consumo compartido de API | La aplicación Web y Android deben consumir la misma API REST. | Alta | Implementado |
| RF-038 | Persistencia compartida | La aplicación Web y Android deben utilizar la misma información persistente almacenada en la base de datos. | Alta | Implementado |

---

# 4. Registro y autenticación

## RF-001 - Registro de usuario

El sistema permite que un visitante cree una cuenta.

Durante el registro se solicitan los datos definidos por la aplicación y la contraseña es almacenada de manera segura mediante hash.

---

## RF-002 - Inicio de sesión

El usuario registrado puede autenticarse utilizando sus credenciales.

Una autenticación exitosa genera un token JWT utilizado para acceder a las funcionalidades protegidas.

---

## RF-003 - Cierre de sesión

El usuario puede finalizar su sesión.

Al cerrar sesión se elimina la información de autenticación almacenada en el cliente.

---

## RF-004 - Control de acceso por rol

El sistema distingue los siguientes roles registrados:

- Usuario.
- Moderador.
- Administrador.

Las funcionalidades disponibles se habilitan de acuerdo con los permisos correspondientes.

---

# 5. Productos

El sistema permite:

- Consultar productos.
- Buscar productos.
- Aplicar filtros.
- Filtrar por certificación Sin TACC.
- Ordenar resultados.
- Utilizar paginación.
- Acceder al detalle.
- Agregar productos a favoritos.
- Consultar opiniones aprobadas.
- Publicar comentarios y calificaciones cuando el usuario se encuentra autenticado.

---

# 6. Restaurantes

El sistema permite:

- Consultar restaurantes.
- Acceder al detalle.
- Consultar información de contacto.
- Consultar información de ubicación.
- Agregar restaurantes a favoritos.
- Consultar opiniones aprobadas.
- Publicar comentarios.
- Asignar calificaciones.

---

# 7. Locales

El sistema permite:

- Consultar locales.
- Acceder al detalle.
- Consultar información del establecimiento.
- Consultar ubicación.
- Agregar locales a favoritos.
- Consultar opiniones aprobadas.
- Publicar comentarios.
- Asignar calificaciones.

---

# 8. Nutricionistas

El sistema permite:

- Consultar nutricionistas.
- Acceder al detalle profesional.
- Consultar información de contacto.
- Consultar información de ubicación.
- Agregar nutricionistas a favoritos.
- Consultar opiniones aprobadas.
- Publicar comentarios.
- Asignar calificaciones.

---

# 9. Favoritos

Los usuarios autenticados pueden mantener una selección personal de favoritos.

Se admiten:

- Productos.
- Restaurantes.
- Locales.
- Nutricionistas.

El usuario puede:

1. Agregar un elemento.
2. Consultar sus favoritos.
3. Eliminar un elemento.

Los favoritos quedan asociados a la cuenta correspondiente.

---

# 10. Comentarios y calificaciones

Los usuarios autenticados pueden publicar opiniones sobre:

- Productos.
- Restaurantes.
- Locales.
- Nutricionistas.

Cada opinión puede contener:

- Título.
- Comentario.
- Calificación.
- Fecha.
- Usuario.
- Estado.

La calificación utiliza una escala de **1 a 5 estrellas**.

---

# 11. Moderación

Los comentarios generados por usuarios no deben publicarse automáticamente.

El flujo funcional es:

```text id="g2qlrf"
Usuario
   ↓
Publica opinión
   ↓
Estado Pendiente
   ↓
Moderador / Administrador
       ↙          ↘
   Aprobar       Rechazar
      ↓
Visible públicamente
```

Solo las opiniones aprobadas se muestran en las pantallas públicas.

---

# 12. Administración

El Administrador dispone de acceso a un panel específico.

Desde este entorno puede utilizar las funcionalidades administrativas implementadas, incluyendo:

- Gestión de usuarios.
- Gestión de información del sistema.
- Gestión de contenido.
- Moderación.
- Consulta del dashboard.

Las operaciones administrativas requieren autenticación y rol autorizado.

---

# 13. Dashboard

El sistema dispone de un dashboard para el Administrador.

El dashboard utiliza información obtenida desde el backend y la base de datos para presentar indicadores generales del sistema.

Su acceso está restringido a usuarios autorizados.

---

# 14. Distribución por Plataforma

## 14.1 Aplicación Web

La versión Web permite utilizar las funcionalidades del sistema de acuerdo con el rol del usuario.

Incluye:

- Registro.
- Login.
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

La aplicación Web se encuentra desplegada en Railway.

```text id="9kz71d"
https://celiaconnect.up.railway.app
```

---

## 14.2 Aplicación Android

La versión Mobile se implementó como una aplicación Android mediante **Capacitor**.

No se utiliza PWA/PWABuilder en la solución final.

La aplicación Android reutiliza el frontend responsive de CeliaConnect y consume la misma API REST desplegada.

Entre las funcionalidades verificadas desde Android se encuentran:

- Navegación.
- Productos.
- Restaurantes.
- Locales.
- Nutricionistas.
- Login.
- Sesión.
- Favoritos.
- Comentarios.
- Calificaciones.

La aplicación fue ejecutada y validada mediante Android Studio y un emulador Android.

---

# 15. Requisitos relacionados con integración

## RF-037 - Consumo compartido de API

La aplicación Web y la aplicación Android utilizan la misma API REST.

```text id="w1yy8s"
Web ────────┐
            ↓
         API REST
            ↓
          MySQL
            ↑
Android ────┘
```

Esto permite centralizar la lógica de negocio y evitar duplicación de servicios.

---

## RF-038 - Persistencia compartida

Los cambios realizados desde un cliente deben persistirse en la misma base de datos y estar disponibles para el resto del sistema según las reglas de negocio.

Por ejemplo:

```text id="bws0gp"
Android
   ↓
Publicar opinión
   ↓
API REST
   ↓
MySQL
   ↓
Moderación Web
   ↓
Aprobación
   ↓
Visible públicamente
```

Este flujo fue validado durante las pruebas de integración.

---

# 16. Funcionalidades excluidas del MVP

Durante las primeras etapas se analizaron funcionalidades que finalmente no fueron incluidas en el alcance del MVP.

Entre ellas:

| Funcionalidad | Estado |
|---|---|
| Recuperación de contraseña | Fuera del MVP |
| Gestión avanzada de perfil | Fuera del MVP |
| Promociones | Fuera del MVP |
| Cupones / códigos de descuento | Fuera del MVP |
| Recetas | Fuera del MVP |
| Geolocalización automática | Fuera del MVP |
| Carga dinámica de imágenes | Fuera del MVP |
| Funcionalidades sociales avanzadas | Fuera del MVP |

Estas funcionalidades pueden considerarse para futuras versiones del sistema.

---

# 17. Trazabilidad

Los requisitos funcionales se relacionan con los demás documentos del proyecto.

```text id="2mhb1g"
Requisitos Funcionales
          ↓
    Modelo Funcional
          ↓
     Casos de Uso
          ↓
    Casos de Prueba
          ↓
      Implementación
```

La relación principal se establece con:

- `05-modelo-funcional.md`
- `07-casos-de-uso.md`
- `10-casos-de-prueba.md`

Esto permite verificar que las funcionalidades definidas se encuentren representadas en el análisis y contempladas durante las pruebas.

---

# 18. Estado de cumplimiento

Los requisitos correspondientes al alcance definido para el MVP se encuentran implementados.

| Área | Estado |
|---|---|
| Autenticación | Implementado |
| Roles | Implementado |
| Productos | Implementado |
| Restaurantes | Implementado |
| Locales | Implementado |
| Nutricionistas | Implementado |
| Favoritos | Implementado |
| Comentarios | Implementado |
| Calificaciones | Implementado |
| Moderación | Implementado |
| Administración | Implementado |
| Dashboard | Implementado |
| Responsive | Implementado |
| Web | Implementado |
| Android | Implementado |
| Integración Web/API/DB | Implementado |
| Integración Android/API/DB | Implementado |

---

# 19. Observaciones

Los requisitos funcionales evolucionaron durante el desarrollo del proyecto.

Algunas funcionalidades inicialmente previstas fueron retiradas del alcance, mientras que otras fueron incorporadas como resultado de la evolución del MVP.

Entre los principales cambios respecto de la planificación inicial se encuentran:

- Incorporación del rol Moderador.
- Incorporación de comentarios y calificaciones en los cuatro módulos principales.
- Ampliación de favoritos a productos.
- Incorporación del flujo de moderación.
- Incorporación del dashboard administrativo.
- Despliegue del sistema en Railway.
- Desarrollo de la aplicación Android mediante Capacitor.
- Reemplazo de la estrategia PWA/PWABuilder originalmente evaluada.

---

# 20. Estado del documento

**Versión:** 2.0

**Estado:** Actualizado — MVP funcional.

Los requisitos incluidos en esta versión representan el alcance funcional implementado de CeliaConnect para el Proyecto Final 2026.
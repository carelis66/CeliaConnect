# 12 - Requisitos Funcionales APK

## Información del documento

| Campo | Valor |
|---|---|
| Proyecto | CeliaConnect |
| Documento | Requisitos Funcionales APK |
| Versión | 2.0 |
| Fecha | 12/11/2026 |
| Autor | Carelis Fagundez |
| Estado | Implementado — Aplicación Android funcional |

---

# 1. Introducción

Este documento describe los requisitos funcionales específicos de la aplicación Android de **CeliaConnect**.

La solución móvil fue implementada utilizando **Capacitor**, permitiendo reutilizar el frontend responsive desarrollado para CeliaConnect dentro de un proyecto Android.

La aplicación utiliza la misma API REST y la misma base de datos que la versión Web.

La arquitectura general es:

```text
Aplicación Android
        ↓
     Capacitor
        ↓
Frontend CeliaConnect
        ↓
      HTTPS
        ↓
API REST - Railway
        ↓
      MySQL
```

La aplicación fue generada como proyecto Android, abierta mediante Android Studio y ejecutada satisfactoriamente en un emulador Android.

---

# 2. Objetivo

El objetivo de la aplicación Android es proporcionar acceso móvil a las principales funcionalidades de CeliaConnect sin desarrollar un segundo sistema independiente.

La solución permite:

- Reutilizar la interfaz responsive.
- Reutilizar la lógica existente del frontend.
- Consumir la misma API REST.
- Compartir la misma base de datos.
- Mantener consistencia entre Web y Android.
- Generar una aplicación instalable para dispositivos Android.

---

# 3. Tecnología Mobile

La versión móvil utiliza:

| Componente | Tecnología |
|---|---|
| Interfaz | HTML, CSS, Bootstrap y JavaScript |
| Empaquetado Mobile | Capacitor |
| Plataforma | Android |
| Entorno de desarrollo | Android Studio |
| Sistema de compilación | Gradle |
| Backend | Node.js + Express |
| Comunicación | HTTPS / API REST |
| Base de datos | MySQL |
| Backend y datos en producción | Railway |

El identificador de la aplicación Android es:

```text
com.celiaconnect.app
```

---

# 4. Requisitos Funcionales APK

| ID | Nombre | Descripción | Prioridad | Estado |
|---|---|---|---|---|
| RFAPK-001 | Inicio de sesión | La aplicación permite que un usuario registrado inicie sesión mediante sus credenciales. | Alta | Implementado |
| RFAPK-002 | Registro de usuario | La aplicación permite acceder al proceso de registro desde un dispositivo móvil. | Alta | Implementado |
| RFAPK-003 | Mantener sesión iniciada | La aplicación conserva la información de sesión según el mecanismo implementado por CeliaConnect. | Alta | Implementado |
| RFAPK-004 | Cierre de sesión | La aplicación permite finalizar la sesión activa. | Alta | Implementado |
| RFAPK-005 | Consulta de productos | La aplicación permite visualizar los productos registrados. | Alta | Implementado |
| RFAPK-006 | Búsqueda y filtrado de productos | La aplicación permite utilizar las funciones disponibles de búsqueda y filtrado. | Alta | Implementado |
| RFAPK-007 | Detalle de producto | La aplicación permite visualizar la información detallada de un producto. | Alta | Implementado |
| RFAPK-008 | Consulta de restaurantes | La aplicación permite visualizar los restaurantes registrados. | Alta | Implementado |
| RFAPK-009 | Detalle de restaurante | La aplicación permite consultar la información de un restaurante. | Alta | Implementado |
| RFAPK-010 | Consulta de locales | La aplicación permite visualizar los locales registrados. | Alta | Implementado |
| RFAPK-011 | Detalle de local | La aplicación permite consultar la información detallada de un local. | Alta | Implementado |
| RFAPK-012 | Consulta de nutricionistas | La aplicación permite visualizar profesionales registrados. | Alta | Implementado |
| RFAPK-013 | Detalle de nutricionista | La aplicación permite consultar la información del profesional seleccionado. | Alta | Implementado |
| RFAPK-014 | Gestión de favoritos | El usuario autenticado puede utilizar favoritos desde la aplicación móvil. | Alta | Implementado |
| RFAPK-015 | Favoritos de productos | El usuario puede guardar productos como favoritos. | Media | Implementado |
| RFAPK-016 | Favoritos de restaurantes | El usuario puede guardar restaurantes como favoritos. | Media | Implementado |
| RFAPK-017 | Favoritos de locales | El usuario puede guardar locales como favoritos. | Media | Implementado |
| RFAPK-018 | Favoritos de nutricionistas | El usuario puede guardar nutricionistas como favoritos. | Media | Implementado |
| RFAPK-019 | Publicación de comentarios | El usuario autenticado puede enviar opiniones desde Android. | Alta | Implementado |
| RFAPK-020 | Calificaciones | El usuario puede asignar calificaciones de 1 a 5 estrellas. | Alta | Implementado |
| RFAPK-021 | Moderación | Las opiniones enviadas desde Android quedan sujetas al mismo proceso de moderación que las enviadas desde Web. | Alta | Implementado |
| RFAPK-022 | Navegación móvil | La aplicación proporciona una interfaz adaptada para dispositivos móviles y navegación táctil. | Alta | Implementado |
| RFAPK-023 | Consumo de API REST | La aplicación consume la información mediante la API REST de CeliaConnect. | Alta | Implementado |
| RFAPK-024 | Sincronización de datos | Web y Android utilizan la misma información almacenada en la base de datos. | Alta | Implementado |
| RFAPK-025 | Ejecución como aplicación Android | CeliaConnect puede ejecutarse dentro de un proyecto Android generado mediante Capacitor. | Alta | Implementado |
| RFAPK-026 | Comunicación con producción | La aplicación Android puede comunicarse con el backend desplegado en Railway. | Alta | Implementado |

---

# 5. Autenticación

La aplicación Android utiliza el mismo mecanismo de autenticación que la aplicación Web.

El flujo es:

```text
Usuario
   ↓
Login Android
   ↓
API REST
   ↓
Validación de credenciales
   ↓
JWT
   ↓
Sesión autenticada
```

Una vez iniciada la sesión, el usuario puede acceder a las funcionalidades protegidas.

La autenticación se realiza contra el backend desplegado y no requiere ejecutar un servidor local.

---

# 6. Productos

Desde Android el usuario puede:

- Consultar productos.
- Utilizar búsqueda.
- Utilizar filtros.
- Navegar por el listado.
- Acceder al detalle.
- Consultar información del producto.
- Agregar productos a favoritos.
- Consultar opiniones aprobadas.
- Publicar opiniones cuando se encuentra autenticado.
- Asignar calificaciones.

La carga de productos desde la API fue verificada desde el emulador Android.

---

# 7. Restaurantes

Desde Android el usuario puede:

- Consultar restaurantes.
- Acceder al detalle.
- Navegar por la información.
- Consultar datos de contacto y ubicación disponibles.
- Utilizar favoritos.
- Consultar comentarios aprobados.
- Publicar opiniones.
- Asignar calificaciones.

El listado y el detalle fueron probados desde la aplicación Android.

---

# 8. Locales

La aplicación permite:

- Consultar locales.
- Acceder al detalle.
- Navegar por la información del establecimiento.
- Utilizar favoritos.
- Consultar comentarios.
- Publicar opiniones.
- Asignar calificaciones.

El módulo fue probado desde Android.

---

# 9. Nutricionistas

La aplicación permite:

- Consultar nutricionistas.
- Acceder al detalle.
- Consultar información profesional.
- Consultar medios de contacto disponibles.
- Utilizar favoritos.
- Consultar opiniones.
- Publicar opiniones.
- Asignar calificaciones.

El listado y detalle fueron validados desde Android.

---

# 10. Favoritos

El usuario autenticado puede utilizar favoritos desde la aplicación Android.

Los tipos admitidos son:

- Productos.
- Restaurantes.
- Locales.
- Nutricionistas.

Los favoritos quedan asociados a la cuenta del usuario y son persistidos mediante la API REST.

Por utilizar la misma base de datos, la información puede ser utilizada independientemente del cliente desde el cual se acceda al sistema.

---

# 11. Comentarios y calificaciones

Los usuarios autenticados pueden publicar opiniones desde la aplicación Android.

El flujo es:

```text
Usuario Android
      ↓
Completa opinión
      ↓
Selecciona estrellas
      ↓
Envía
      ↓
API REST
      ↓
MySQL
      ↓
Estado Pendiente
```

La opinión no se publica automáticamente.

---

# 12. Moderación

Las opiniones enviadas desde Android utilizan exactamente el mismo proceso de moderación que las generadas desde la versión Web.

```text
Android
   ↓
Nueva opinión
   ↓
Pendiente
   ↓
Moderador / Administrador
       ↙          ↘
   Aprobar       Rechazar
      ↓
Publicación
```

Esto permite mantener una única regla de negocio independientemente del cliente utilizado.

---

# 13. Navegación móvil

La aplicación utiliza el frontend responsive de CeliaConnect.

La interfaz se adapta al tamaño de pantalla del dispositivo y permite navegación táctil.

Durante las pruebas se verificaron:

- Home.
- Menú de navegación.
- Productos.
- Detalle de producto.
- Restaurantes.
- Detalle de restaurante.
- Locales.
- Detalle de local.
- Nutricionistas.
- Detalle de nutricionista.
- Login.
- Favoritos.
- Comentarios.

También se verificó el desplazamiento vertical en las pantallas de detalle.

---

# 14. Consumo de API REST

La aplicación Android consume la API REST desplegada en Railway.

URL del backend:

```text
https://celiaconnect-production.up.railway.app
```

El flujo de comunicación es:

```text
Android
   ↓
Capacitor / WebView
   ↓
HTTPS
   ↓
API REST Railway
   ↓
MySQL Railway
```

Esto permite utilizar la aplicación sin necesidad de tener el backend ejecutándose localmente.

---

# 15. Sincronización con la versión Web

La versión Web y Android no mantienen bases de datos independientes.

Ambas utilizan:

- La misma API REST.
- La misma lógica de negocio.
- La misma base de datos MySQL.

Por ejemplo:

```text
Android
   ↓
Usuario publica opinión
   ↓
MySQL
   ↓
Moderador accede desde Web
   ↓
Aprueba opinión
   ↓
La opinión queda disponible públicamente
```

Este flujo fue validado durante las pruebas End-to-End.

---

# 16. Prueba End-to-End Android

Se realizó una prueba funcional completa desde la aplicación Android.

El flujo probado incluyó:

1. Inicio de la aplicación.
2. Navegación.
3. Inicio de sesión.
4. Consulta de contenido.
5. Acceso a favoritos.
6. Publicación de una opinión.
7. Asignación de una calificación.
8. Persistencia de la opinión en la base de datos.
9. Visualización de la opinión en el panel de moderación.
10. Aprobación de la opinión.
11. Visualización pública de la opinión aprobada.

Resultado:

**Prueba satisfactoria.**

Esto permitió validar la comunicación entre:

```text
Android
   ↓
Frontend
   ↓
API REST
   ↓
Railway
   ↓
MySQL
   ↓
Moderación
   ↓
Publicación
```

---

# 17. Diferencia respecto de la planificación inicial

La planificación original contemplaba generar la aplicación mediante:

```text
PWA + PWABuilder
```

Durante el desarrollo se evaluó nuevamente esta decisión y se optó por:

```text
Capacitor + Android Studio
```

Esta solución permitió mantener el frontend responsive existente y generar un proyecto Android dentro del mismo repositorio.

Por lo tanto:

| Plan inicial | Implementación final |
|---|---|
| PWA | Aplicación Android mediante Capacitor |
| PWABuilder | Android Studio |
| Instalación desde navegador | Proyecto Android compilable |
| Web instalada como PWA | Frontend integrado mediante Capacitor |
| Manifest + Service Worker como base del empaquetado | Proyecto Android + Gradle |

---

# 18. Estructura del proyecto Android

El código correspondiente a Android se encuentra dentro del repositorio principal de CeliaConnect.

```text
celiaconnect/
├── android/
├── backend/
├── database/
├── docs/
├── frontend/
├── capacitor.config.json
├── package.json
└── package-lock.json
```

El directorio:

```text
android/
```

contiene el proyecto Android generado mediante Capacitor.

La configuración principal de Capacitor se encuentra en:

```text
capacitor.config.json
```

---

# 19. Repositorio

La versión Web y la versión Android comparten el mismo repositorio de código fuente.

Repositorio:

```text
https://github.com/carelis66/CeliaConnect
```

Esto permite mantener en un único proyecto:

- Frontend.
- Backend.
- Base de datos.
- Documentación.
- Proyecto Android.
- Configuración de Capacitor.

---

# 20. Restricciones

La aplicación Android presenta las siguientes restricciones dentro del alcance actual:

- Requiere conexión a Internet para utilizar la información desplegada.
- Consume la API REST de CeliaConnect.
- Utiliza la misma base de datos que la aplicación Web.
- Depende de la disponibilidad del backend desplegado.
- No implementa funcionamiento offline completo.
- No implementa sincronización offline.
- No utiliza una interfaz nativa independiente desarrollada en Kotlin.
- No utiliza PWABuilder.
- No se distribuye mediante Google Play dentro del alcance académico actual.

---

# 21. Funcionalidades fuera del alcance del APK

Las siguientes funcionalidades no forman parte del MVP Android actual:

- Recuperación de contraseña.
- Gestión avanzada de perfil.
- Promociones.
- Recetas.
- Geolocalización automática.
- Funcionamiento offline completo.
- Notificaciones push.
- Carga dinámica de imágenes.
- Distribución mediante Google Play.

Estas funcionalidades pueden evaluarse en futuras versiones.

---

# 22. Estado actual

La versión Android de CeliaConnect se encuentra implementada mediante Capacitor.

Se completaron:

- Configuración de Capacitor.
- Generación del proyecto Android.
- Integración del frontend.
- Sincronización de recursos Web.
- Apertura del proyecto mediante Android Studio.
- Configuración del entorno Android.
- Ejecución mediante emulador.
- Navegación.
- Login.
- Consulta de contenido.
- Favoritos.
- Comentarios.
- Calificaciones.
- Integración con Railway.
- Prueba End-to-End.

La aplicación se encuentra en etapa final de preparación para la entrega académica.

---

# 23. Próximos pasos

Los pasos restantes corresponden principalmente a la preparación final del artefacto Android:

- Finalizar ajustes visuales del icono.
- Realizar una última validación.
- Generar el APK final.
- Verificar la instalación del APK.
- Incorporar el archivo o enlace correspondiente a la entrega.
- Preparar la demostración Mobile para la defensa.

Estas actividades no requieren modificar la arquitectura actual del sistema.

---

# 24. Estado del documento

**Versión:** 2.0

**Estado:** Implementado — Aplicación Android funcional.

Este documento refleja los requisitos y el estado real de la versión Android de CeliaConnect correspondiente al Proyecto Final 2026.
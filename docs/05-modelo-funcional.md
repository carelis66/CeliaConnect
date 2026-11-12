# 05 - Modelo Funcional - CeliaConnect

## Información del documento

| Campo | Valor |
|---|---|
| Proyecto | CeliaConnect |
| Documento | Modelo Funcional |
| Versión | 2.0 |
| Fecha | 12/11/2026 |
| Autor | Carelis Fagundez |
| Estado | Implementado — MVP funcional |

---

# 1. Objetivo

El modelo funcional describe las principales funcionalidades implementadas en **CeliaConnect** y el comportamiento esperado del sistema desde la perspectiva de sus distintos tipos de usuario.

El sistema permite consultar información relacionada con productos Sin TACC, restaurantes, locales y profesionales de nutrición.

Además, incorpora autenticación, favoritos, comentarios, calificaciones, moderación de contenido y funcionalidades administrativas.

El mismo modelo funcional se encuentra disponible desde la aplicación Web responsive y desde la aplicación Android desarrollada mediante Capacitor.

---

# 2. Actores del sistema

CeliaConnect contempla cuatro tipos de interacción:

- Visitante.
- Usuario registrado.
- Moderador.
- Administrador.

---

## 2.1 Visitante

Es una persona que accede a CeliaConnect sin iniciar sesión.

Puede:

- Acceder a la página principal.
- Consultar productos.
- Buscar y filtrar productos.
- Consultar el detalle de productos.
- Consultar restaurantes.
- Consultar el detalle de restaurantes.
- Consultar locales.
- Consultar el detalle de locales.
- Consultar nutricionistas.
- Consultar el detalle de nutricionistas.
- Visualizar comentarios previamente aprobados.
- Acceder a información pública disponible.

Para utilizar funcionalidades personales como favoritos o publicación de opiniones debe registrarse e iniciar sesión.

---

## 2.2 Usuario registrado

Es un usuario que posee una cuenta y se encuentra autenticado.

Además de las funcionalidades disponibles para visitantes, puede:

- Iniciar sesión.
- Cerrar sesión.
- Mantener una sesión activa.
- Guardar productos como favoritos.
- Guardar restaurantes como favoritos.
- Guardar locales como favoritos.
- Guardar nutricionistas como favoritos.
- Consultar sus favoritos.
- Eliminar elementos de favoritos.
- Publicar opiniones.
- Asignar calificaciones de 1 a 5 estrellas.

Las opiniones enviadas por los usuarios quedan pendientes de moderación antes de ser visibles públicamente.

El usuario no puede aprobar sus propias opiniones ni acceder a funciones administrativas.

---

## 2.3 Moderador

El moderador es responsable de revisar el contenido generado por los usuarios.

Puede:

- Iniciar sesión.
- Acceder al panel de moderación.
- Consultar opiniones pendientes.
- Visualizar información del comentario.
- Visualizar la calificación asignada.
- Aprobar comentarios.
- Rechazar comentarios.

Una opinión aprobada pasa a estar disponible públicamente.

Una opinión rechazada no se publica.

---

## 2.4 Administrador

El administrador posee los permisos de gestión del sistema.

Puede:

- Iniciar sesión.
- Acceder al panel administrativo.
- Gestionar usuarios.
- Consultar y gestionar información del sistema.
- Gestionar contenido.
- Acceder a funcionalidades de moderación.
- Aprobar o rechazar comentarios.
- Consultar indicadores y métricas.
- Acceder al dashboard administrativo.

Las funciones administrativas se encuentran protegidas mediante autenticación y validación de roles.

---

# 3. Módulos funcionales

## 3.1 Autenticación

Permite identificar a los usuarios y controlar el acceso a funcionalidades protegidas.

### Funcionalidades

- Registro de usuario.
- Inicio de sesión.
- Persistencia de sesión.
- Cierre de sesión.
- Identificación del rol.
- Protección de operaciones autenticadas.

La autenticación utiliza **JWT** y las contraseñas se almacenan mediante hash utilizando **bcrypt**.

---

# 4. Productos

El módulo de Productos permite consultar información relacionada con productos Sin TACC.

Cada producto puede mostrar información como:

- Imagen.
- Nombre.
- Marca.
- Categoría.
- Descripción.
- Ingredientes.
- Información nutricional.
- Código de barras.
- Certificación Sin TACC.

### Funcionalidades de consulta

El usuario puede:

- Consultar el catálogo.
- Buscar productos.
- Filtrar resultados.
- Filtrar productos certificados Sin TACC.
- Ordenar resultados.
- Navegar mediante paginación.
- Acceder al detalle del producto.

### Funcionalidades para usuarios autenticados

El usuario puede:

- Agregar el producto a favoritos.
- Eliminarlo de favoritos.
- Publicar una opinión.
- Asignar una calificación de 1 a 5 estrellas.

Los comentarios aprobados se muestran públicamente dentro del detalle correspondiente.

---

# 5. Restaurantes

El módulo de Restaurantes permite consultar establecimientos gastronómicos incluidos en CeliaConnect.

Cada restaurante puede mostrar información como:

- Nombre.
- Descripción.
- Imágenes.
- Tipo de restaurante.
- Dirección.
- Barrio.
- Teléfono.
- Email.
- Instagram.
- Sitio web.
- Horario de atención.
- Información de ubicación.
- Características del establecimiento.
- Comentarios aprobados.
- Calificaciones.

### Funcionalidades

Los usuarios pueden:

- Consultar restaurantes.
- Acceder al detalle.
- Consultar información de contacto.
- Consultar ubicación.
- Visualizar características.
- Consultar opiniones aprobadas.

Los usuarios autenticados también pueden:

- Agregar restaurantes a favoritos.
- Eliminar restaurantes de favoritos.
- Publicar comentarios.
- Asignar calificaciones de 1 a 5 estrellas.

---

# 6. Locales

El módulo de Locales permite consultar comercios relacionados con productos Sin TACC.

Entre ellos pueden encontrarse dietéticas, supermercados y otros establecimientos.

Cada local puede mostrar información como:

- Nombre.
- Descripción.
- Imagen.
- Tipo de local.
- Dirección.
- Barrio.
- Teléfono.
- Email.
- Instagram.
- Sitio web.
- Horario.
- Información de ubicación.
- Características.
- Comentarios aprobados.
- Calificaciones.

### Funcionalidades

Los usuarios pueden:

- Consultar locales.
- Acceder al detalle.
- Consultar información de contacto.
- Consultar ubicación.
- Visualizar características.
- Consultar opiniones aprobadas.

Los usuarios autenticados también pueden:

- Agregar locales a favoritos.
- Eliminar locales de favoritos.
- Publicar comentarios.
- Asignar calificaciones.

---

# 7. Nutricionistas

El módulo de Nutricionistas permite consultar información sobre profesionales de nutrición.

Cada profesional puede mostrar información como:

- Fotografía.
- Nombre y apellido.
- Matrícula profesional.
- Descripción.
- Dirección o información de atención.
- Barrio.
- Teléfono.
- WhatsApp.
- Email.
- Instagram.
- Sitio web.
- Horario.
- Información de ubicación.
- Comentarios aprobados.
- Calificaciones.

### Funcionalidades

Los usuarios pueden:

- Consultar profesionales.
- Acceder al detalle.
- Consultar información profesional.
- Consultar medios de contacto.
- Consultar opiniones aprobadas.

Los usuarios autenticados también pueden:

- Agregar nutricionistas a favoritos.
- Eliminar nutricionistas de favoritos.
- Publicar comentarios.
- Asignar calificaciones.

---

# 8. Favoritos

El módulo de Favoritos permite que cada usuario registrado mantenga una selección personal de elementos de interés.

Se pueden guardar:

- Productos.
- Restaurantes.
- Locales.
- Nutricionistas.

### Comportamiento funcional

Para utilizar favoritos el usuario debe estar autenticado.

El flujo general es:

```text
Usuario autenticado
        ↓
Selecciona un elemento
        ↓
Agregar a favoritos
        ↓
Favorito asociado a su cuenta
        ↓
Disponible en su sección de favoritos
```

El usuario también puede eliminar elementos previamente guardados.

Los favoritos se almacenan en la base de datos y quedan asociados a la cuenta correspondiente.

---

# 9. Comentarios y calificaciones

El sistema permite que los usuarios registrados compartan experiencias mediante opiniones.

Las opiniones pueden realizarse sobre:

- Productos.
- Restaurantes.
- Locales.
- Nutricionistas.

Una opinión puede contener:

- Título.
- Comentario.
- Calificación.
- Usuario.
- Fecha.
- Estado de moderación.

La calificación utiliza una escala de:

```text
★
★★
★★★
★★★★
★★★★★
```

equivalente a valores de **1 a 5 estrellas**.

---

# 10. Moderación

Las opiniones no son publicadas automáticamente.

Cuando un usuario envía una opinión:

```text
Usuario escribe opinión
          ↓
Selecciona calificación
          ↓
Envía opinión
          ↓
Estado: Pendiente
          ↓
Panel de Moderación
          ↓
Moderador / Administrador
       ↙          ↘
  Aprobar         Rechazar
     ↓
Visible públicamente
```

### Reglas funcionales

- Toda nueva opinión queda pendiente de revisión.
- Los usuarios generales no pueden aprobar comentarios.
- Los moderadores pueden revisar opiniones pendientes.
- Los administradores también pueden realizar tareas de moderación.
- Solo las opiniones aprobadas son visibles públicamente.
- Las opiniones rechazadas no se muestran en las pantallas públicas.

---

# 11. Administración

El módulo administrativo permite gestionar y supervisar el contenido del sistema.

### Funcionalidades

El administrador puede:

- Consultar usuarios.
- Gestionar usuarios.
- Gestionar información del sistema.
- Gestionar contenido disponible.
- Acceder a moderación.
- Consultar información administrativa.
- Acceder al dashboard.

El acceso a estas funcionalidades requiere un usuario con rol de administrador.

---

# 12. Dashboard

El sistema cuenta con un dashboard administrativo que presenta información resumida obtenida desde la base de datos.

Su objetivo es facilitar la visualización del estado general del sistema mediante indicadores.

El dashboard forma parte de las funcionalidades reservadas al administrador.

---

# 13. Ubicación y mapas

Los módulos correspondientes a establecimientos y profesionales pueden incluir información de ubicación.

CeliaConnect permite utilizar referencias y enlaces de Google Maps cuando se encuentran disponibles.

El MVP no requiere obtener automáticamente la ubicación actual del usuario ni calcular distancias en tiempo real.

---

# 14. Aplicación Web

CeliaConnect dispone de una aplicación Web responsive.

La interfaz se adapta a:

- Computadoras.
- Tablets.
- Teléfonos móviles.

La versión Web permite acceder a las funcionalidades correspondientes según el estado de autenticación y el rol del usuario.

La aplicación se encuentra desplegada en Railway:

```text
https://celiaconnect.up.railway.app
```

---

# 15. Aplicación Android

CeliaConnect cuenta con una versión Android desarrollada mediante **Capacitor**.

La aplicación reutiliza el frontend responsive y consume la misma API REST utilizada por la versión Web.

Esto permite disponer de las mismas funcionalidades principales sin mantener un segundo frontend desarrollado desde cero.

La aplicación Android permite:

- Navegar por CeliaConnect.
- Consultar productos.
- Consultar restaurantes.
- Consultar locales.
- Consultar nutricionistas.
- Iniciar sesión.
- Gestionar favoritos.
- Publicar opiniones.
- Utilizar las funcionalidades habilitadas según el rol.

La aplicación fue ejecutada y probada mediante Android Studio y un emulador Android.

---

# 16. Reglas de negocio

Las principales reglas de negocio implementadas son:

1. El sistema contempla tres roles registrados: **Usuario, Moderador y Administrador**.

2. Los visitantes pueden consultar información pública sin iniciar sesión.

3. Para utilizar favoritos es necesario estar autenticado.

4. Para publicar comentarios y calificaciones es necesario estar autenticado.

5. Los productos pueden agregarse a favoritos.

6. Los restaurantes pueden agregarse a favoritos.

7. Los locales pueden agregarse a favoritos.

8. Los nutricionistas pueden agregarse a favoritos.

9. Productos, restaurantes, locales y nutricionistas pueden recibir comentarios y calificaciones.

10. Las calificaciones utilizan valores de 1 a 5 estrellas.

11. Toda nueva opinión queda inicialmente pendiente de moderación.

12. Solo las opiniones aprobadas se muestran públicamente.

13. Los moderadores pueden aprobar o rechazar opiniones.

14. Los administradores pueden acceder a funciones administrativas y de moderación.

15. Cada producto pertenece a una categoría y puede estar asociado a una marca.

16. Cada restaurante pertenece a un tipo de restaurante.

17. Cada local pertenece a un tipo de local.

18. Restaurantes y locales pueden poseer múltiples características.

19. Los favoritos quedan asociados al usuario que los agregó.

20. Los comentarios quedan asociados al usuario que los publicó.

21. La aplicación Web y la aplicación Android utilizan la misma API REST y la misma información persistente.

22. La aplicación se encuentra orientada inicialmente a **Ciudad Autónoma de Buenos Aires (CABA)**.

---

# 17. Funcionalidades fuera del alcance del MVP

Durante las primeras etapas del análisis se contemplaron funcionalidades que finalmente no forman parte del MVP implementado.

Entre ellas:

- Sistema completo de promociones.
- Cupones y códigos de descuento.
- Recuperación de contraseña.
- Edición avanzada del perfil.
- Cambio de fotografía de perfil por parte del usuario.
- Geolocalización automática del dispositivo.
- Cálculo automático de distancias.
- Carga dinámica de imágenes mediante servicios externos.
- Funcionalidades sociales avanzadas.

Estas funcionalidades pueden considerarse como posibles ampliaciones futuras del proyecto.

---

# 18. Flujo funcional general

El funcionamiento general de CeliaConnect puede representarse de la siguiente manera:

```text
                    CeliaConnect
                         │
          ┌──────────────┴──────────────┐
          │                             │
      Visitante                  Usuario registrado
          │                             │
          │                      Login / Sesión
          │                             │
          └──────────────┬──────────────┘
                         │
              Consulta de contenido
                         │
       ┌─────────┬───────┼────────┬───────────┐
       ↓         ↓       ↓        ↓           │
   Productos Restaurantes Locales Nutricionistas
       │         │       │                    │
       └─────────┴───────┴────────────────────┘
                         │
              Usuario autenticado
                         │
                ┌────────┴────────┐
                ↓                 ↓
            Favoritos          Opiniones
                                  │
                               Pendiente
                                  │
                              Moderación
                             ↙          ↘
                       Aprobado       Rechazado
                          │
                  Publicación pública
```

---

# 19. Estado actual

El modelo funcional correspondiente al MVP se encuentra implementado.

Se encuentran operativas las funcionalidades principales de:

- Registro.
- Login.
- Sesión.
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
- Aplicación Web.
- Aplicación Android.

Los principales flujos fueron verificados tanto desde la versión Web como desde la aplicación Android.

---

# 20. Estado del documento

**Versión:** 2.0

**Estado:** Actualizado — MVP funcional.

Este documento refleja el comportamiento funcional implementado en CeliaConnect correspondiente al Proyecto Final 2026.
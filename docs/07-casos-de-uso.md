# 07 - Casos de Uso

## Información del documento

| Campo | Valor |
|---|---|
| Proyecto | CeliaConnect |
| Documento | Casos de Uso |
| Versión | 2.0 |
| Fecha | 12/11/2026 |
| Autor | Carelis Fagundez |
| Estado | Actualizado — MVP funcional |

---

# 1. Introducción

El presente documento describe los principales casos de uso implementados en **CeliaConnect**.

Cada caso de uso representa una funcionalidad disponible para los distintos actores del sistema y describe el comportamiento esperado durante la interacción con la plataforma.

Los casos de uso reflejan el estado actual del MVP y sirven como referencia para:

- Validar los requisitos funcionales.
- Documentar el comportamiento del sistema.
- Relacionar funcionalidades con actores.
- Definir escenarios de prueba.
- Documentar los flujos principales y alternativos.

Las funcionalidades pueden utilizarse desde la aplicación Web y, cuando corresponde, desde la aplicación Android desarrollada mediante Capacitor.

---

# 2. Actores

## 2.1 Visitante

Persona que accede a CeliaConnect sin iniciar sesión.

Puede consultar información pública sobre:

- Productos.
- Restaurantes.
- Locales.
- Nutricionistas.
- Comentarios aprobados.

No puede utilizar funcionalidades personales como favoritos o publicación de opiniones.

---

## 2.2 Usuario

Persona registrada y autenticada en CeliaConnect.

Además de consultar información pública, puede:

- Gestionar favoritos.
- Publicar opiniones.
- Asignar calificaciones.

---

## 2.3 Moderador

Usuario con permisos especiales para revisar el contenido generado por los usuarios.

Puede:

- Consultar opiniones pendientes.
- Aprobar opiniones.
- Rechazar opiniones.

---

## 2.4 Administrador

Usuario con permisos administrativos.

Puede:

- Acceder al panel administrativo.
- Gestionar información del sistema.
- Gestionar usuarios.
- Acceder a moderación.
- Consultar el dashboard.

---

# 3. Casos de Uso

## CU-001 – Registrar Usuario

### Objetivo

Permitir que una persona cree una cuenta en CeliaConnect.

### Actor principal

Visitante.

### Precondiciones

- El usuario no debe encontrarse registrado.
- Debe proporcionar la información obligatoria solicitada.

### Flujo principal

1. El visitante selecciona **Registrarse**.
2. El sistema muestra el formulario de registro.
3. El usuario completa los datos solicitados.
4. El sistema valida la información.
5. El sistema verifica que los datos únicos no se encuentren registrados previamente.
6. La contraseña es procesada de forma segura.
7. El sistema registra la cuenta.
8. Se informa que el registro fue realizado correctamente.

### Flujos alternativos

- El correo electrónico ya se encuentra registrado.
- El documento ya se encuentra registrado.
- Existen campos obligatorios incompletos.
- Los datos ingresados no cumplen las validaciones.

### Postcondiciones

El usuario queda registrado y puede iniciar sesión.

---

## CU-002 – Iniciar Sesión

### Objetivo

Permitir que un usuario registrado acceda a las funcionalidades autenticadas.

### Actor principal

Usuario.

### Precondiciones

- El usuario debe estar registrado.

### Flujo principal

1. El usuario selecciona **Iniciar sesión**.
2. Ingresa su correo electrónico y contraseña.
3. El sistema envía las credenciales al backend.
4. El backend valida las credenciales.
5. El sistema genera un token de autenticación.
6. Se inicia la sesión.
7. Las funcionalidades disponibles se habilitan según el rol del usuario.

### Flujos alternativos

- El correo electrónico no corresponde a un usuario registrado.
- La contraseña es incorrecta.
- Los datos ingresados son inválidos.

### Postcondiciones

El usuario posee una sesión autenticada.

---

## CU-003 – Cerrar Sesión

### Objetivo

Permitir que un usuario finalice su sesión.

### Actor principal

Usuario, Moderador o Administrador.

### Precondiciones

- Debe existir una sesión activa.

### Flujo principal

1. El usuario selecciona **Cerrar sesión**.
2. El sistema elimina la información de autenticación almacenada en el cliente.
3. Se finaliza la sesión.
4. El usuario vuelve al estado de visitante.

### Flujos alternativos

- Ninguno.

### Postcondiciones

El usuario debe volver a iniciar sesión para acceder a funcionalidades protegidas.

---

## CU-004 – Buscar Productos

### Objetivo

Permitir localizar productos registrados en CeliaConnect.

### Actor principal

Visitante o Usuario.

### Precondiciones

Ninguna.

### Flujo principal

1. El usuario accede a **Productos**.
2. El sistema muestra el catálogo.
3. El usuario ingresa un criterio de búsqueda o utiliza filtros.
4. Puede seleccionar el filtro de productos certificados Sin TACC.
5. Puede seleccionar opciones de ordenamiento.
6. El sistema procesa los criterios.
7. Se muestran los productos correspondientes.

### Flujos alternativos

- No existen productos que coincidan con los criterios seleccionados.

### Postcondiciones

El usuario obtiene un listado de productos correspondiente a su búsqueda.

---

## CU-005 – Ver Detalle del Producto

### Objetivo

Permitir consultar la información completa de un producto.

### Actor principal

Visitante o Usuario.

### Precondiciones

- El producto debe existir.

### Flujo principal

1. El usuario selecciona un producto.
2. El sistema consulta su información.
3. Se muestra el detalle disponible, incluyendo información como:
   - Nombre.
   - Marca.
   - Categoría.
   - Descripción.
   - Ingredientes.
   - Información nutricional.
   - Código de barras.
   - Certificación Sin TACC.
   - Imagen.
4. Se muestran las opiniones aprobadas disponibles.

### Flujos alternativos

- El producto solicitado no existe.
- No existen opiniones aprobadas.

### Postcondiciones

El usuario visualiza la información del producto.

---

## CU-006 – Buscar Restaurantes

### Objetivo

Permitir consultar los restaurantes disponibles en CeliaConnect.

### Actor principal

Visitante o Usuario.

### Precondiciones

Ninguna.

### Flujo principal

1. El usuario accede a **Restaurantes**.
2. El sistema muestra los restaurantes disponibles.
3. El usuario puede realizar una búsqueda o utilizar las opciones disponibles.
4. El sistema actualiza los resultados.

### Flujos alternativos

- No existen restaurantes que coincidan con la búsqueda.

### Postcondiciones

El usuario visualiza los restaurantes encontrados.

---

## CU-007 – Ver Detalle del Restaurante

### Objetivo

Permitir consultar la información disponible de un restaurante.

### Actor principal

Visitante o Usuario.

### Precondiciones

- El restaurante debe existir.

### Flujo principal

1. El usuario selecciona un restaurante.
2. El sistema consulta su información.
3. Se muestra el detalle correspondiente.
4. El usuario puede consultar información de contacto y ubicación.
5. Se muestran las opiniones aprobadas disponibles.

### Flujos alternativos

- El restaurante solicitado no existe.
- No existen comentarios aprobados.

### Postcondiciones

El usuario visualiza el detalle del restaurante.

---

## CU-008 – Buscar Locales

### Objetivo

Permitir consultar locales relacionados con productos Sin TACC.

### Actor principal

Visitante o Usuario.

### Precondiciones

Ninguna.

### Flujo principal

1. El usuario accede a **Locales**.
2. El sistema muestra los establecimientos disponibles.
3. El usuario utiliza las opciones de búsqueda disponibles.
4. El sistema procesa la consulta.
5. Se muestran los resultados correspondientes.

### Flujos alternativos

- No existen locales que coincidan con la búsqueda.

### Postcondiciones

El usuario visualiza los locales disponibles.

---

## CU-009 – Ver Detalle del Local

### Objetivo

Permitir consultar la información completa de un local.

### Actor principal

Visitante o Usuario.

### Precondiciones

- El local debe existir.

### Flujo principal

1. El usuario selecciona un local.
2. El sistema consulta su información.
3. Se muestra el detalle.
4. El usuario puede consultar información de contacto y ubicación.
5. Se muestran las opiniones aprobadas disponibles.

### Flujos alternativos

- El local solicitado no existe.
- No existen opiniones aprobadas.

### Postcondiciones

El usuario visualiza la información del local.

---

## CU-010 – Buscar Nutricionistas

### Objetivo

Permitir consultar profesionales de nutrición registrados en CeliaConnect.

### Actor principal

Visitante o Usuario.

### Precondiciones

Ninguna.

### Flujo principal

1. El usuario accede a **Nutricionistas**.
2. El sistema muestra los profesionales disponibles.
3. El usuario utiliza las opciones de búsqueda disponibles.
4. El sistema procesa la consulta.
5. Se muestran los resultados correspondientes.

### Flujos alternativos

- No existen profesionales que coincidan con la búsqueda.

### Postcondiciones

El usuario visualiza los nutricionistas disponibles.

---

## CU-011 – Ver Detalle del Nutricionista

### Objetivo

Permitir consultar la información de un nutricionista.

### Actor principal

Visitante o Usuario.

### Precondiciones

- El nutricionista debe existir.

### Flujo principal

1. El usuario selecciona un nutricionista.
2. El sistema consulta su información.
3. Se muestra información como:
   - Nombre y apellido.
   - Matrícula.
   - Descripción.
   - Fotografía.
   - Información de contacto.
   - WhatsApp, cuando corresponda.
   - Dirección.
   - Horarios.
4. Se muestran las opiniones aprobadas disponibles.

### Flujos alternativos

- El profesional solicitado no existe.
- No existen opiniones aprobadas.

### Postcondiciones

El usuario visualiza el detalle del profesional.

---

# 4. Casos de Uso de Favoritos

## CU-012 – Agregar Producto a Favoritos

### Objetivo

Permitir guardar un producto como favorito.

### Actor principal

Usuario.

### Precondiciones

- El usuario debe haber iniciado sesión.
- El producto debe existir.

### Flujo principal

1. El usuario selecciona un producto.
2. Selecciona la opción correspondiente para agregarlo a favoritos.
3. El sistema identifica al usuario mediante su sesión.
4. Se registra la asociación.
5. El producto queda disponible en los favoritos del usuario.

### Flujos alternativos

- El producto ya se encuentra en favoritos.
- La sesión no es válida.

### Postcondiciones

El producto queda asociado al usuario como favorito.

---

## CU-013 – Agregar Restaurante a Favoritos

### Objetivo

Permitir guardar un restaurante como favorito.

### Actor principal

Usuario.

### Precondiciones

- El usuario debe haber iniciado sesión.
- El restaurante debe existir.

### Flujo principal

1. El usuario accede al restaurante.
2. Selecciona la opción para agregarlo a favoritos.
3. El sistema registra la asociación.

### Flujos alternativos

- El restaurante ya se encuentra en favoritos.
- La sesión no es válida.

### Postcondiciones

El restaurante queda asociado a los favoritos del usuario.

---

## CU-014 – Agregar Local a Favoritos

### Objetivo

Permitir guardar un local como favorito.

### Actor principal

Usuario.

### Precondiciones

- El usuario debe haber iniciado sesión.
- El local debe existir.

### Flujo principal

1. El usuario accede al local.
2. Selecciona la opción para agregarlo a favoritos.
3. El sistema registra la asociación.

### Flujos alternativos

- El local ya se encuentra en favoritos.
- La sesión no es válida.

### Postcondiciones

El local queda asociado a los favoritos del usuario.

---

## CU-015 – Agregar Nutricionista a Favoritos

### Objetivo

Permitir guardar un nutricionista como favorito.

### Actor principal

Usuario.

### Precondiciones

- El usuario debe haber iniciado sesión.
- El nutricionista debe existir.

### Flujo principal

1. El usuario accede al nutricionista.
2. Selecciona la opción para agregarlo a favoritos.
3. El sistema registra la asociación.

### Flujos alternativos

- El profesional ya se encuentra en favoritos.
- La sesión no es válida.

### Postcondiciones

El nutricionista queda asociado a los favoritos del usuario.

---

## CU-016 – Consultar Mis Favoritos

### Objetivo

Permitir al usuario consultar los elementos guardados.

### Actor principal

Usuario.

### Precondiciones

- El usuario debe haber iniciado sesión.

### Flujo principal

1. El usuario accede a **Mis Favoritos**.
2. El sistema identifica al usuario autenticado.
3. Consulta sus favoritos.
4. Muestra los elementos guardados correspondientes a:
   - Productos.
   - Restaurantes.
   - Locales.
   - Nutricionistas.

### Flujos alternativos

- El usuario todavía no posee favoritos.

### Postcondiciones

El usuario visualiza sus elementos favoritos.

---

## CU-017 – Eliminar Favorito

### Objetivo

Permitir eliminar un elemento de favoritos.

### Actor principal

Usuario.

### Precondiciones

- El usuario debe estar autenticado.
- El elemento debe encontrarse entre sus favoritos.

### Flujo principal

1. El usuario selecciona la opción para quitar el favorito.
2. El sistema identifica la asociación correspondiente.
3. Elimina la asociación.
4. La interfaz refleja el cambio.

### Flujos alternativos

- El elemento ya no se encuentra en favoritos.
- La sesión dejó de ser válida.

### Postcondiciones

El elemento deja de estar asociado a los favoritos del usuario.

---

# 5. Casos de Uso de Comentarios y Calificaciones

## CU-018 – Comentar y Calificar Producto

### Objetivo

Permitir publicar una opinión sobre un producto.

### Actor principal

Usuario.

### Precondiciones

- El usuario debe haber iniciado sesión.
- El producto debe existir.

### Flujo principal

1. El usuario accede al detalle del producto.
2. Selecciona la opción para dejar una opinión.
3. Ingresa la información solicitada.
4. Asigna una calificación de 1 a 5 estrellas.
5. Envía la opinión.
6. El sistema registra el comentario con estado pendiente.
7. Se informa que la opinión será revisada.

### Flujos alternativos

- Existen datos obligatorios incompletos.
- La calificación es inválida.
- La sesión no es válida.

### Postcondiciones

La opinión queda registrada y pendiente de moderación.

---

## CU-019 – Comentar y Calificar Restaurante

### Objetivo

Permitir publicar una opinión sobre un restaurante.

### Actor principal

Usuario.

### Precondiciones

- El usuario debe haber iniciado sesión.
- El restaurante debe existir.

### Flujo principal

1. El usuario accede al detalle del restaurante.
2. Selecciona la opción para dejar una opinión.
3. Ingresa un título y comentario.
4. Asigna una calificación de 1 a 5 estrellas.
5. Envía la opinión.
6. El sistema registra el comentario como pendiente.

### Flujos alternativos

- El comentario no contiene la información requerida.
- La calificación es inválida.
- La sesión no es válida.

### Postcondiciones

La opinión queda pendiente de moderación.

---

## CU-020 – Comentar y Calificar Local

### Objetivo

Permitir publicar una opinión sobre un local.

### Actor principal

Usuario.

### Precondiciones

- El usuario debe haber iniciado sesión.
- El local debe existir.

### Flujo principal

1. El usuario accede al detalle del local.
2. Selecciona la opción para dejar una opinión.
3. Completa los datos.
4. Asigna una calificación.
5. Envía la opinión.
6. El sistema registra el comentario como pendiente.

### Flujos alternativos

- El comentario está incompleto.
- La calificación es inválida.
- La sesión no es válida.

### Postcondiciones

La opinión queda pendiente de moderación.

---

## CU-021 – Comentar y Calificar Nutricionista

### Objetivo

Permitir publicar una opinión sobre un nutricionista.

### Actor principal

Usuario.

### Precondiciones

- El usuario debe haber iniciado sesión.
- El nutricionista debe existir.

### Flujo principal

1. El usuario accede al detalle del nutricionista.
2. Selecciona la opción para dejar una opinión.
3. Completa la información solicitada.
4. Asigna una calificación de 1 a 5 estrellas.
5. Envía la opinión.
6. El sistema registra la opinión como pendiente.

### Flujos alternativos

- Existen datos obligatorios incompletos.
- La calificación es inválida.
- La sesión no es válida.

### Postcondiciones

La opinión queda pendiente de moderación.

---

# 6. Casos de Uso de Moderación

## CU-022 – Consultar Opiniones Pendientes

### Objetivo

Permitir revisar las opiniones que esperan moderación.

### Actor principal

Moderador o Administrador.

### Precondiciones

- El actor debe estar autenticado.
- Debe poseer permisos de moderación.

### Flujo principal

1. El actor accede al panel correspondiente.
2. El sistema valida su sesión y rol.
3. Consulta las opiniones pendientes.
4. Muestra la información necesaria para su revisión.

### Flujos alternativos

- No existen opiniones pendientes.
- El usuario no posee permisos suficientes.

### Postcondiciones

El moderador o administrador visualiza las opiniones pendientes.

---

## CU-023 – Aprobar Opinión

### Objetivo

Permitir aprobar una opinión enviada por un usuario.

### Actor principal

Moderador o Administrador.

### Precondiciones

- El actor debe poseer permisos de moderación.
- La opinión debe encontrarse pendiente.

### Flujo principal

1. El actor selecciona una opinión.
2. Revisa su contenido y calificación.
3. Selecciona **Aprobar**.
4. El sistema actualiza su estado.
5. La opinión queda disponible públicamente.

### Flujos alternativos

- La opinión ya fue procesada.
- La sesión no posee permisos suficientes.

### Postcondiciones

La opinión queda aprobada y puede visualizarse públicamente.

---

## CU-024 – Rechazar Opinión

### Objetivo

Permitir rechazar una opinión enviada por un usuario.

### Actor principal

Moderador o Administrador.

### Precondiciones

- El actor debe poseer permisos de moderación.
- La opinión debe encontrarse pendiente.

### Flujo principal

1. El actor selecciona una opinión.
2. Revisa su contenido.
3. Selecciona **Rechazar**.
4. El sistema actualiza el estado.

### Flujos alternativos

- La opinión ya fue procesada.
- El actor no posee permisos suficientes.

### Postcondiciones

La opinión queda rechazada y no se muestra públicamente.

---

# 7. Casos de Uso Administrativos

## CU-025 – Acceder al Panel Administrativo

### Objetivo

Permitir que el administrador acceda a las herramientas de administración.

### Actor principal

Administrador.

### Precondiciones

- Debe haber iniciado sesión.
- Debe poseer rol de administrador.

### Flujo principal

1. El administrador inicia sesión.
2. Accede al panel administrativo.
3. El sistema valida su rol.
4. Se muestran las opciones disponibles.

### Flujos alternativos

- El usuario no posee permisos administrativos.

### Postcondiciones

El administrador accede a las funciones habilitadas.

---

## CU-026 – Gestionar Usuarios

### Objetivo

Permitir al administrador consultar y gestionar usuarios registrados.

### Actor principal

Administrador.

### Precondiciones

- Debe haber iniciado sesión como administrador.

### Flujo principal

1. El administrador accede a la gestión de usuarios.
2. El sistema muestra los registros disponibles.
3. El administrador realiza una acción habilitada sobre el usuario.
4. El sistema registra los cambios.

### Flujos alternativos

- Los datos ingresados son inválidos.
- El registro solicitado no existe.

### Postcondiciones

La información correspondiente queda actualizada.

---

## CU-027 – Gestionar Contenido

### Objetivo

Permitir al administrador gestionar información publicada en CeliaConnect.

### Actor principal

Administrador.

### Precondiciones

- Debe haber iniciado sesión.
- Debe poseer permisos administrativos.

### Flujo principal

1. El administrador accede al panel.
2. Selecciona el tipo de contenido.
3. Consulta la información disponible.
4. Realiza las operaciones habilitadas.
5. Guarda los cambios.
6. El sistema actualiza la información correspondiente.

### Contenido involucrado

Puede incluir:

- Productos.
- Restaurantes.
- Locales.
- Nutricionistas.
- Información auxiliar utilizada por el sistema.

### Flujos alternativos

- La información ingresada no es válida.
- Existen datos obligatorios incompletos.
- El registro solicitado no existe.

### Postcondiciones

La información del sistema queda actualizada.

---

## CU-028 – Consultar Dashboard

### Objetivo

Permitir al administrador visualizar indicadores generales de CeliaConnect.

### Actor principal

Administrador.

### Precondiciones

- Debe haber iniciado sesión.
- Debe poseer permisos administrativos.

### Flujo principal

1. El administrador accede al dashboard.
2. El sistema valida sus permisos.
3. El backend consulta la información necesaria.
4. El sistema muestra los indicadores disponibles.

### Flujos alternativos

- El usuario no posee permisos.
- No existe información para alguno de los indicadores.

### Postcondiciones

El administrador visualiza información resumida del sistema.

---

# 8. Matriz Resumen de Casos de Uso

| ID | Caso de Uso | Actor principal |
|---|---|---|
| CU-001 | Registrar Usuario | Visitante |
| CU-002 | Iniciar Sesión | Usuario |
| CU-003 | Cerrar Sesión | Usuario / Moderador / Administrador |
| CU-004 | Buscar Productos | Visitante / Usuario |
| CU-005 | Ver Detalle del Producto | Visitante / Usuario |
| CU-006 | Buscar Restaurantes | Visitante / Usuario |
| CU-007 | Ver Detalle del Restaurante | Visitante / Usuario |
| CU-008 | Buscar Locales | Visitante / Usuario |
| CU-009 | Ver Detalle del Local | Visitante / Usuario |
| CU-010 | Buscar Nutricionistas | Visitante / Usuario |
| CU-011 | Ver Detalle del Nutricionista | Visitante / Usuario |
| CU-012 | Agregar Producto a Favoritos | Usuario |
| CU-013 | Agregar Restaurante a Favoritos | Usuario |
| CU-014 | Agregar Local a Favoritos | Usuario |
| CU-015 | Agregar Nutricionista a Favoritos | Usuario |
| CU-016 | Consultar Mis Favoritos | Usuario |
| CU-017 | Eliminar Favorito | Usuario |
| CU-018 | Comentar y Calificar Producto | Usuario |
| CU-019 | Comentar y Calificar Restaurante | Usuario |
| CU-020 | Comentar y Calificar Local | Usuario |
| CU-021 | Comentar y Calificar Nutricionista | Usuario |
| CU-022 | Consultar Opiniones Pendientes | Moderador / Administrador |
| CU-023 | Aprobar Opinión | Moderador / Administrador |
| CU-024 | Rechazar Opinión | Moderador / Administrador |
| CU-025 | Acceder al Panel Administrativo | Administrador |
| CU-026 | Gestionar Usuarios | Administrador |
| CU-027 | Gestionar Contenido | Administrador |
| CU-028 | Consultar Dashboard | Administrador |

---

# 9. Funcionalidades fuera del alcance del MVP

Los siguientes casos de uso fueron considerados durante etapas anteriores del proyecto, pero no forman parte del MVP implementado:

- Recuperar contraseña.
- Edición avanzada del perfil.
- Gestión completa de promociones.
- Cupones o códigos de descuento.
- Carga dinámica de imágenes.
- Geolocalización automática.
- Funcionalidades sociales avanzadas.

Estos casos pueden incorporarse en futuras versiones de CeliaConnect.

---

# 10. Estado actual

Los casos de uso documentados corresponden a las funcionalidades principales implementadas en el MVP de CeliaConnect.

Los principales flujos fueron probados tanto desde la aplicación Web como desde la aplicación Android, incluyendo:

- Consulta de contenido.
- Inicio de sesión.
- Favoritos.
- Publicación de opiniones.
- Calificaciones.
- Moderación.
- Aprobación de opiniones.
- Visualización pública posterior a la aprobación.
- Funciones administrativas.
- Dashboard.

El documento se encuentra alineado con el modelo funcional, la arquitectura, el modelo de datos y la API REST del proyecto.

---

# 11. Estado del documento

**Versión:** 2.0

**Estado:** Actualizado — MVP funcional.

Los casos de uso deberán mantenerse sincronizados con futuras modificaciones funcionales de CeliaConnect.
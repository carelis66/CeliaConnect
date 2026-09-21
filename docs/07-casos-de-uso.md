# 07 - Casos de Uso

## Información del documento

| Campo | Valor |
|--------|--------|
| Proyecto | CeliaConnect |
| Documento | Casos de Uso |
| Versión | 1.2 |
| Fecha | 15/09/2026 |
| Autor | Carelis Fagundez |
| Estado | En elaboración |

---

# 1. Introducción

El presente documento describe los principales casos de uso de CeliaConnect.

Cada caso de uso representa una funcionalidad disponible para los distintos actores del sistema y define el comportamiento esperado durante la interacción con la plataforma.

Su objetivo es servir como referencia para el desarrollo del sistema, la validación de los requisitos funcionales y la planificación de las pruebas.

---

# 2. Actores

## Usuario

Persona registrada en la plataforma que puede consultar información sobre productos, restaurantes, locales y nutricionistas, además de administrar sus favoritos y publicar comentarios.

## Administrador

Responsable de gestionar la información disponible en la plataforma y mantener actualizado el contenido publicado para los usuarios.

---

# 3. Casos de Uso

## CU-001 – Registrar Usuario

### Objetivo
Permitir que una persona cree una cuenta en CeliaConnect para acceder a las funcionalidades de la plataforma.

### Actor principal
Usuario.

### Precondiciones
- El usuario no debe encontrarse registrado.
- Debe disponer de un correo electrónico válido.

### Flujo principal
1. El usuario selecciona la opción **Registrarse**.
2. El sistema muestra el formulario de registro.
3. El usuario completa la información solicitada.
4. El sistema valida los datos ingresados.
5. El sistema verifica que el documento y el correo electrónico no existan previamente.
6. El sistema crea la cuenta del usuario.
7. El sistema informa que el registro fue realizado correctamente.

### Flujos alternativos
- El correo electrónico ya se encuentra registrado.
- El documento pertenece a otro usuario.
- Existen campos obligatorios sin completar.

### Postcondiciones
El usuario queda registrado y puede iniciar sesión en la plataforma.

---

## CU-002 – Iniciar Sesión

### Objetivo
Permitir que un usuario autenticado acceda a las funcionalidades disponibles en CeliaConnect.

### Actor principal
Usuario.

### Precondiciones
- El usuario debe estar registrado.

### Flujo principal
1. El usuario selecciona **Iniciar sesión**.
2. Ingresa su correo electrónico y contraseña.
3. El sistema valida las credenciales.
4. Se concede acceso al sistema.
5. El usuario visualiza la pantalla principal.

### Flujos alternativos
- Correo electrónico inexistente.
- Contraseña incorrecta.

### Postcondiciones
El usuario inicia una sesión válida en la plataforma.

---

## CU-003 – Recuperar Contraseña

### Objetivo
Permitir al usuario recuperar el acceso a su cuenta.

### Actor principal
Usuario.

### Precondiciones
- El usuario debe encontrarse registrado.

### Flujo principal
1. El usuario selecciona la opción **¿Olvidaste tu contraseña?**
2. Ingresa su correo electrónico.
3. El sistema verifica la existencia de la cuenta.
4. El sistema envía un enlace para restablecer la contraseña.
5. El usuario establece una nueva contraseña.

### Flujos alternativos
- El correo ingresado no pertenece a ninguna cuenta registrada.

### Postcondiciones
La contraseña queda actualizada correctamente.

---

## CU-004 – Editar Perfil

### Objetivo
Permitir al usuario actualizar su información personal.

### Actor principal
Usuario.

### Precondiciones
- El usuario debe haber iniciado sesión.

### Flujo principal
1. El usuario accede a la sección **Mi Perfil**.
2. Selecciona la opción **Editar perfil**.
3. Modifica la información permitida.
4. Guarda los cambios.
5. El sistema valida la información.
6. El sistema actualiza los datos.

### Flujos alternativos
- El correo electrónico ya pertenece a otro usuario.
- Los datos ingresados son inválidos.

### Postcondiciones
La información del perfil queda actualizada.

---

## CU-005 – Buscar Productos

### Objetivo
Permitir al usuario localizar productos aptos para personas celíacas e intolerantes alimentarios.

### Actor principal
Usuario.

### Precondiciones
Ninguna.

### Flujo principal
1. El usuario accede a la sección **Productos**.
2. Ingresa un criterio de búsqueda o utiliza los filtros disponibles.
3. El sistema procesa la búsqueda.
4. Se muestra el listado de productos encontrados.

### Flujos alternativos
- No existen productos que coincidan con la búsqueda realizada.

### Postcondiciones
El usuario obtiene un listado de productos.

---

## CU-006 – Ver Detalle del Producto

### Objetivo
Permitir al usuario consultar la información completa de un producto.

### Actor principal
Usuario.

### Precondiciones
- El producto debe encontrarse registrado.

### Flujo principal
1. El usuario selecciona un producto.
2. El sistema muestra: nombre, marca, categoría, descripción, ingredientes, información nutricional, certificación Sin TACC e imagen.

### Flujos alternativos
- El producto ya no se encuentra disponible.

### Postcondiciones
El usuario visualiza la información detallada del producto.

---

## CU-007 – Buscar Restaurantes

### Objetivo
Permitir localizar restaurantes aptos para personas celíacas e intolerantes alimentarios.

### Actor principal
Usuario.

### Precondiciones
Ninguna.

### Flujo principal
1. El usuario accede a la sección **Restaurantes**.
2. Ingresa un criterio de búsqueda o aplica filtros.
3. El sistema procesa la consulta.
4. Se muestran los restaurantes encontrados.

### Flujos alternativos
- No existen restaurantes que coincidan con la búsqueda.

### Postcondiciones
El usuario visualiza el listado de restaurantes.

---

## CU-008 – Ver Detalle del Restaurante

### Objetivo
Permitir consultar toda la información disponible de un restaurante.

### Actor principal
Usuario.

### Precondiciones
- El restaurante debe encontrarse registrado.

### Flujo principal
1. El usuario selecciona un restaurante.
2. El sistema muestra: nombre, descripción, imágenes, dirección, teléfono, email, Instagram, sitio web, horario de atención, ubicación, características, calificación promedio y comentarios de otros usuarios.

### Flujos alternativos
- El restaurante deja de estar disponible.

### Postcondiciones
El usuario consulta la información completa del restaurante.

---

## CU-009 – Agregar Restaurante a Favoritos

### Objetivo
Permitir al usuario guardar un restaurante dentro de su lista de favoritos.

### Actor principal
Usuario.

### Precondiciones
- El usuario debe haber iniciado sesión.
- El restaurante debe existir.

### Flujo principal
1. El usuario accede al detalle del restaurante.
2. Selecciona **Agregar a favoritos**.
3. El sistema registra la acción.
4. El restaurante pasa a formar parte de la lista de favoritos del usuario.

### Flujos alternativos
- El restaurante ya se encuentra agregado a favoritos.

### Postcondiciones
El restaurante queda asociado a la cuenta del usuario.

---

## CU-010 – Comentar Restaurante

### Objetivo
Permitir al usuario publicar una opinión sobre un restaurante.

### Actor principal
Usuario.

### Precondiciones
- El usuario debe haber iniciado sesión.
- El restaurante debe encontrarse registrado.

### Flujo principal
1. El usuario accede al detalle del restaurante.
2. Selecciona **Escribir comentario**.
3. Ingresa un título para el comentario.
4. Escribe su opinión.
5. Asigna una calificación entre una y cinco estrellas.
6. Publica el comentario.
7. El sistema registra la información.

### Flujos alternativos
- El comentario no contiene información suficiente.
- La calificación ingresada es inválida.

### Postcondiciones
El comentario queda publicado y disponible para los demás usuarios.

---

## CU-011 – Buscar Locales

### Objetivo
Permitir al usuario localizar supermercados y dietéticas registrados en CeliaConnect.

### Actor principal
Usuario.

### Precondiciones
Ninguna.

### Flujo principal
1. El usuario accede a la sección **Locales**.
2. Ingresa un criterio de búsqueda o utiliza los filtros disponibles.
3. El sistema procesa la consulta.
4. Se muestra el listado de locales encontrados.

### Flujos alternativos
- No existen locales que coincidan con la búsqueda realizada.

### Postcondiciones
El usuario obtiene el listado de locales disponibles.

---

## CU-012 – Ver Detalle del Local

### Objetivo
Permitir al usuario consultar la información completa de un local.

### Actor principal
Usuario.

### Precondiciones
- El local debe encontrarse registrado.

### Flujo principal
1. El usuario selecciona un local.
2. El sistema muestra: nombre, descripción, imagen, dirección, teléfono, email, Instagram, sitio web, horario, características, calificación promedio y comentarios.

### Flujos alternativos
- El local deja de encontrarse disponible.

### Postcondiciones
El usuario consulta la información completa del local.

---

## CU-013 – Agregar Local a Favoritos

### Objetivo
Permitir al usuario guardar un local dentro de su lista de favoritos.

### Actor principal
Usuario.

### Precondiciones
- El usuario debe haber iniciado sesión.
- El local debe existir.

### Flujo principal
1. El usuario accede al detalle del local.
2. Selecciona **Agregar a favoritos**.
3. El sistema registra la acción.

### Flujos alternativos
- El local ya se encuentra agregado a favoritos.

### Postcondiciones
El local queda asociado a la cuenta del usuario.

---

## CU-014 – Comentar Local

### Objetivo
Permitir al usuario publicar una opinión sobre un local.

### Actor principal
Usuario.

### Precondiciones
- El usuario debe haber iniciado sesión.
- El local debe existir.

### Flujo principal
1. El usuario accede al detalle del local.
2. Selecciona **Escribir comentario**.
3. Ingresa un título.
4. Escribe el comentario.
5. Asigna una calificación entre una y cinco estrellas.
6. Publica el comentario.

### Flujos alternativos
- La calificación es inválida.
- El comentario está vacío.

### Postcondiciones
El comentario queda registrado.

---

## CU-015 – Buscar Nutricionistas

### Objetivo
Permitir localizar nutricionistas especializados registrados en CeliaConnect.

### Actor principal
Usuario.

### Precondiciones
Ninguna.

### Flujo principal
1. El usuario accede a la sección **Nutricionistas**.
2. Ingresa un criterio de búsqueda.
3. El sistema procesa la consulta.
4. Se muestran los profesionales encontrados.

### Flujos alternativos
- No existen nutricionistas que coincidan con la búsqueda.

### Postcondiciones
El usuario visualiza el listado de profesionales.

---

## CU-016 – Ver Perfil del Nutricionista

### Objetivo
Permitir consultar la información completa de un nutricionista.

### Actor principal
Usuario.

### Precondiciones
- El profesional debe encontrarse registrado.

### Flujo principal
1. El usuario selecciona un nutricionista.
2. El sistema muestra: nombre, matrícula, descripción, foto, dirección, teléfono, WhatsApp, email, Instagram, sitio web y horarios de atención.

### Flujos alternativos
- El profesional ya no se encuentra disponible.

### Postcondiciones
El usuario consulta el perfil del profesional.

---

## CU-017 – Agregar Nutricionista a Favoritos

### Objetivo
Permitir guardar un nutricionista dentro de la lista de favoritos.

### Actor principal
Usuario.

### Precondiciones
- El usuario debe haber iniciado sesión.
- El profesional debe existir.

### Flujo principal
1. El usuario accede al perfil del nutricionista.
2. Selecciona **Agregar a favoritos**.
3. El sistema registra la acción.

### Flujos alternativos
- El profesional ya fue agregado anteriormente.

### Postcondiciones
El nutricionista queda almacenado en los favoritos del usuario.

---

## CU-018 – Ver Promociones

### Objetivo
Permitir visualizar las promociones publicadas por restaurantes y locales.

### Actor principal
Usuario.

### Precondiciones
Ninguna.

### Flujo principal
1. El usuario accede a la sección **Promociones**.
2. El sistema consulta las promociones vigentes.
3. Se muestran las promociones disponibles.

### Flujos alternativos
- No existen promociones activas.

### Postcondiciones
El usuario visualiza las promociones publicadas.

---

## CU-019 – Gestionar Usuarios

### Objetivo
Permitir al administrador administrar la información de los usuarios registrados.

### Actor principal
Administrador.

### Precondiciones
- El administrador debe haber iniciado sesión.

### Flujo principal
1. Accede al módulo de usuarios.
2. Consulta la información.
3. Crea, modifica o desactiva registros.
4. Guarda los cambios.

### Flujos alternativos
- Los datos ingresados no son válidos.

### Postcondiciones
La información queda actualizada.

---

## CU-020 – Gestionar Productos

### Objetivo
Permitir administrar los productos publicados en CeliaConnect.

### Actor principal
Administrador.

### Precondiciones
- El administrador debe haber iniciado sesión.

### Flujo principal
1. Accede al módulo Productos.
2. Registra nuevos productos o modifica los existentes.
3. Guarda la información.

### Flujos alternativos
- Existen datos obligatorios incompletos.

### Postcondiciones
La información del producto queda actualizada.

---

## CU-021 – Gestionar Restaurantes

### Objetivo
Permitir administrar la información de los restaurantes.

### Actor principal
Administrador.

### Precondiciones
- Haber iniciado sesión.

### Flujo principal
1. Accede al módulo Restaurantes.
2. Crea, modifica o elimina registros.
3. Guarda los cambios.

### Flujos alternativos
- Información incompleta.

### Postcondiciones
La información queda actualizada.

---

## CU-022 – Gestionar Locales

### Objetivo
Permitir administrar supermercados y dietéticas registrados.

### Actor principal
Administrador.

### Precondiciones
- Haber iniciado sesión.

### Flujo principal
1. Accede al módulo Locales.
2. Gestiona la información.
3. Guarda los cambios.

### Flujos alternativos
- Datos inválidos.

### Postcondiciones
La información queda actualizada.

---

## CU-023 – Gestionar Nutricionistas

### Objetivo
Permitir administrar la información de los profesionales registrados.

### Actor principal
Administrador.

### Precondiciones
- Haber iniciado sesión.

### Flujo principal
1. Accede al módulo Nutricionistas.
2. Gestiona la información.
3. Guarda los cambios.

### Flujos alternativos
- Matrícula inválida.
- Datos incompletos.

### Postcondiciones
La información queda actualizada.

---

## CU-024 – Gestionar Promociones

### Objetivo
Permitir administrar las promociones publicadas.

### Actor principal
Administrador.

### Precondiciones
- Haber iniciado sesión.

### Flujo principal
1. Accede al módulo Promociones.
2. Crea, modifica o elimina promociones.
3. Guarda los cambios.

### Flujos alternativos
- Fechas inválidas.
- Información incompleta.

### Postcondiciones
Las promociones quedan actualizadas.

---

## CU-025 – Gestionar Catálogos

### Objetivo
Permitir administrar la información de apoyo utilizada por el sistema.

### Actor principal
Administrador.

### Precondiciones
- Haber iniciado sesión.

### Flujo principal
1. Accede al módulo Catálogos.
2. Gestiona:
   - Marcas.
   - Categorías.
   - Barrios.
   - Tipos de restaurante.
   - Tipos de locales.
   - Características.
3. Guarda los cambios.

### Flujos alternativos
- Existen registros duplicados.
- Datos obligatorios incompletos.

### Postcondiciones
Los catálogos quedan actualizados y disponibles para el resto del sistema.

---

## CU-026 – Cerrar Sesión

### Objetivo
Permitir al usuario finalizar su sesión activa en la plataforma.

### Actor principal
Usuario.

### Precondiciones
- El usuario debe haber iniciado sesión.

### Flujo principal
1. El usuario selecciona la opción **Cerrar sesión**.
2. El sistema invalida la sesión activa.
3. El sistema redirige al usuario a la pantalla principal como visitante no autenticado.

### Flujos alternativos
- Ninguno.

### Postcondiciones
La sesión del usuario queda finalizada y debe volver a iniciar sesión para acceder a las funcionalidades que lo requieran.

---

## CU-027 – Consultar Mis Favoritos

### Objetivo
Permitir al usuario visualizar el listado completo de restaurantes, locales y nutricionistas que guardó como favoritos.

### Actor principal
Usuario.

### Precondiciones
- El usuario debe haber iniciado sesión.

### Flujo principal
1. El usuario accede a la sección **Mis Favoritos**.
2. El sistema consulta los restaurantes, locales y nutricionistas guardados por el usuario.
3. El sistema muestra el listado agrupado o filtrable por tipo (Restaurantes / Locales / Nutricionistas).

### Flujos alternativos
- El usuario no tiene favoritos guardados: el sistema muestra un mensaje indicándolo.

### Postcondiciones
El usuario visualiza el listado completo de sus favoritos.

---

## CU-028 – Eliminar Favorito

### Objetivo
Permitir al usuario quitar un restaurante, local o nutricionista de su lista de favoritos.

### Actor principal
Usuario.

### Precondiciones
- El usuario debe haber iniciado sesión.
- El elemento debe encontrarse actualmente en la lista de favoritos del usuario.

### Flujo principal
1. El usuario accede a la sección **Mis Favoritos** (o al detalle del elemento).
2. Selecciona **Quitar de favoritos**.
3. El sistema elimina la asociación entre el usuario y el elemento.
4. El elemento deja de figurar en la lista de favoritos.

### Flujos alternativos
- El elemento ya no se encuentra en la lista de favoritos (por ejemplo, si se eliminó desde otra sesión).

### Postcondiciones
El elemento queda desasociado de la cuenta del usuario.

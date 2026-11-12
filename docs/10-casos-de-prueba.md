# 10 - Casos de Prueba

## Información del documento

| Campo | Valor |
|---|---|
| Proyecto | CeliaConnect |
| Documento | Casos de Prueba |
| Versión | 2.0 |
| Fecha | 12/11/2026 |
| Autor | Carelis Fagundez |
| Estado | Ejecutado — MVP funcional |

---

# 1. Introducción

El presente documento describe los principales casos de prueba funcionales y de integración utilizados para validar el MVP de **CeliaConnect**.

Las pruebas tienen como objetivo verificar el correcto funcionamiento de:

- Autenticación.
- Productos.
- Restaurantes.
- Locales.
- Nutricionistas.
- Favoritos.
- Comentarios y calificaciones.
- Moderación.
- Administración.
- Dashboard.
- Navegación responsive.
- Aplicación Android.
- Integración con backend y base de datos desplegados.

Los casos de prueba se encuentran relacionados con los casos de uso definidos en `07-casos-de-uso.md`.

---

# 2. Entornos de prueba

Las pruebas fueron realizadas en diferentes etapas y entornos.

## 2.1 Entorno local

Durante el desarrollo se utilizó:

- Frontend ejecutado localmente.
- Backend Node.js + Express.
- Base de datos MySQL/MariaDB.
- Navegador Web.

## 2.2 Entorno desplegado

Posteriormente se realizaron pruebas sobre los componentes desplegados en Railway.

### Frontend

```text id="f67dmz"
https://celiaconnect.up.railway.app
```

### Backend / API REST

```text id="1x7e80"
https://celiaconnect-production.up.railway.app
```

## 2.3 Entorno Android

La aplicación móvil fue probada mediante:

- Android Studio.
- Emulador Android.
- Capacitor.
- Backend desplegado en Railway.
- Base de datos MySQL desplegada.

---

# 3. Casos de Prueba

## CP-001 - Registro de usuario exitoso

| Campo | Valor |
|---|---|
| ID | CP-001 |
| Módulo | Usuarios |
| Caso de Uso | CU-001 - Registrar Usuario |
| Prioridad | Alta |
| Estado | Aprobado |

### Precondiciones

- El usuario no posee una cuenta registrada.

### Pasos

1. Acceder a la pantalla de registro.
2. Completar los campos obligatorios.
3. Ingresar datos válidos.
4. Confirmar el registro.

### Resultado esperado

El sistema registra correctamente al usuario y permite utilizar la cuenta creada.

### Resultado obtenido

El registro se realiza correctamente.

---

## CP-002 - Registro con email existente

| Campo | Valor |
|---|---|
| ID | CP-002 |
| Módulo | Usuarios |
| Caso de Uso | CU-001 - Registrar Usuario |
| Prioridad | Alta |
| Estado | Aprobado |

### Pasos

1. Acceder al registro.
2. Ingresar un correo electrónico perteneciente a un usuario existente.
3. Intentar completar el registro.

### Resultado esperado

El sistema impide crear una cuenta duplicada e informa el inconveniente.

### Resultado obtenido

El registro duplicado es rechazado correctamente.

---

## CP-003 - Inicio de sesión exitoso

| Campo | Valor |
|---|---|
| ID | CP-003 |
| Módulo | Autenticación |
| Caso de Uso | CU-002 - Iniciar Sesión |
| Prioridad | Alta |
| Estado | Aprobado |

### Precondiciones

- El usuario debe encontrarse registrado.

### Pasos

1. Acceder al login.
2. Ingresar email.
3. Ingresar contraseña válida.
4. Seleccionar **Iniciar sesión**.

### Resultado esperado

El sistema autentica al usuario y habilita las funcionalidades correspondientes a su rol.

### Resultado obtenido

El inicio de sesión funciona correctamente.

---

## CP-004 - Inicio de sesión con credenciales inválidas

| Campo | Valor |
|---|---|
| ID | CP-004 |
| Módulo | Autenticación |
| Caso de Uso | CU-002 - Iniciar Sesión |
| Prioridad | Alta |
| Estado | Aprobado |

### Pasos

1. Acceder al login.
2. Ingresar credenciales incorrectas.
3. Intentar iniciar sesión.

### Resultado esperado

El sistema rechaza la autenticación e informa que las credenciales no son válidas.

### Resultado obtenido

El acceso es rechazado correctamente.

---

## CP-005 - Cerrar sesión

| Campo | Valor |
|---|---|
| ID | CP-005 |
| Módulo | Autenticación |
| Caso de Uso | CU-003 - Cerrar Sesión |
| Prioridad | Alta |
| Estado | Aprobado |

### Precondiciones

- Debe existir una sesión activa.

### Pasos

1. Iniciar sesión.
2. Seleccionar la opción de cerrar sesión.

### Resultado esperado

La sesión finaliza y las funcionalidades protegidas dejan de estar disponibles para el usuario.

### Resultado obtenido

La sesión se cierra correctamente.

---

# 4. Pruebas de Productos

## CP-006 - Consultar productos

| Campo | Valor |
|---|---|
| ID | CP-006 |
| Módulo | Productos |
| Caso de Uso | CU-004 - Buscar Productos |
| Prioridad | Alta |
| Estado | Aprobado |

### Pasos

1. Acceder al módulo Productos.
2. Esperar la carga de información.

### Resultado esperado

Se muestran los productos obtenidos desde la API.

### Resultado obtenido

Los productos se cargan correctamente.

---

## CP-007 - Buscar y filtrar productos

| Campo | Valor |
|---|---|
| ID | CP-007 |
| Módulo | Productos |
| Caso de Uso | CU-004 - Buscar Productos |
| Prioridad | Alta |
| Estado | Aprobado |

### Pasos

1. Acceder a Productos.
2. Utilizar el buscador.
3. Aplicar filtros.
4. Activar, cuando corresponda, el filtro de certificación Sin TACC.

### Resultado esperado

El listado se actualiza según los criterios seleccionados.

### Resultado obtenido

La búsqueda y los filtros funcionan correctamente.

---

## CP-008 - Paginación y ordenamiento de productos

| Campo | Valor |
|---|---|
| ID | CP-008 |
| Módulo | Productos |
| Caso de Uso | CU-004 - Buscar Productos |
| Prioridad | Media |
| Estado | Aprobado |

### Resultado esperado

El usuario puede navegar entre resultados y utilizar las opciones de ordenamiento disponibles.

### Resultado obtenido

La paginación y el ordenamiento funcionan correctamente.

---

## CP-009 - Ver detalle de producto

| Campo | Valor |
|---|---|
| ID | CP-009 |
| Módulo | Productos |
| Caso de Uso | CU-005 - Ver Detalle del Producto |
| Prioridad | Alta |
| Estado | Aprobado |

### Pasos

1. Acceder al listado de productos.
2. Seleccionar un producto.

### Resultado esperado

Se muestra la información correspondiente al producto seleccionado.

### Resultado obtenido

El detalle se visualiza correctamente.

---

# 5. Pruebas de Restaurantes

## CP-010 - Consultar restaurantes

| Campo | Valor |
|---|---|
| ID | CP-010 |
| Módulo | Restaurantes |
| Caso de Uso | CU-006 - Buscar Restaurantes |
| Prioridad | Alta |
| Estado | Aprobado |

### Resultado esperado

El sistema muestra los restaurantes disponibles.

### Resultado obtenido

El listado carga correctamente.

---

## CP-011 - Ver detalle de restaurante

| Campo | Valor |
|---|---|
| ID | CP-011 |
| Módulo | Restaurantes |
| Caso de Uso | CU-007 - Ver Detalle del Restaurante |
| Prioridad | Alta |
| Estado | Aprobado |

### Pasos

1. Acceder al listado.
2. Seleccionar un restaurante.
3. Navegar por su información.

### Resultado esperado

Se muestra correctamente la información del establecimiento.

### Resultado obtenido

El detalle funciona correctamente.

---

# 6. Pruebas de Locales

## CP-012 - Consultar locales

| Campo | Valor |
|---|---|
| ID | CP-012 |
| Módulo | Locales |
| Caso de Uso | CU-008 - Buscar Locales |
| Prioridad | Alta |
| Estado | Aprobado |

### Resultado esperado

El sistema muestra los locales disponibles.

### Resultado obtenido

El listado se carga correctamente.

---

## CP-013 - Ver detalle de local

| Campo | Valor |
|---|---|
| ID | CP-013 |
| Módulo | Locales |
| Caso de Uso | CU-009 - Ver Detalle del Local |
| Prioridad | Alta |
| Estado | Aprobado |

### Resultado esperado

Se visualiza la información correspondiente al local seleccionado.

### Resultado obtenido

El detalle funciona correctamente.

---

# 7. Pruebas de Nutricionistas

## CP-014 - Consultar nutricionistas

| Campo | Valor |
|---|---|
| ID | CP-014 |
| Módulo | Nutricionistas |
| Caso de Uso | CU-010 - Buscar Nutricionistas |
| Prioridad | Alta |
| Estado | Aprobado |

### Resultado esperado

Se muestran los profesionales disponibles.

### Resultado obtenido

El listado carga correctamente.

---

## CP-015 - Ver detalle de nutricionista

| Campo | Valor |
|---|---|
| ID | CP-015 |
| Módulo | Nutricionistas |
| Caso de Uso | CU-011 - Ver Detalle del Nutricionista |
| Prioridad | Alta |
| Estado | Aprobado |

### Resultado esperado

Se muestra correctamente la información del profesional.

### Resultado obtenido

El detalle funciona correctamente.

---

# 8. Pruebas de Favoritos

## CP-016 - Agregar producto a favoritos

| Campo | Valor |
|---|---|
| ID | CP-016 |
| Módulo | Favoritos |
| Caso de Uso | CU-012 |
| Prioridad | Alta |
| Estado | Aprobado |

### Precondiciones

- Usuario autenticado.

### Resultado esperado

El producto queda asociado a los favoritos del usuario.

### Resultado obtenido

El producto se agrega correctamente.

---

## CP-017 - Agregar restaurante a favoritos

| Campo | Valor |
|---|---|
| ID | CP-017 |
| Módulo | Favoritos |
| Caso de Uso | CU-013 |
| Prioridad | Alta |
| Estado | Aprobado |

### Resultado esperado

El restaurante queda almacenado como favorito.

### Resultado obtenido

Funciona correctamente.

---

## CP-018 - Agregar local a favoritos

| Campo | Valor |
|---|---|
| ID | CP-018 |
| Módulo | Favoritos |
| Caso de Uso | CU-014 |
| Prioridad | Alta |
| Estado | Aprobado |

### Resultado esperado

El local queda almacenado como favorito.

### Resultado obtenido

Funciona correctamente.

---

## CP-019 - Agregar nutricionista a favoritos

| Campo | Valor |
|---|---|
| ID | CP-019 |
| Módulo | Favoritos |
| Caso de Uso | CU-015 |
| Prioridad | Alta |
| Estado | Aprobado |

### Resultado esperado

El nutricionista queda almacenado como favorito.

### Resultado obtenido

Funciona correctamente.

---

## CP-020 - Consultar mis favoritos

| Campo | Valor |
|---|---|
| ID | CP-020 |
| Módulo | Favoritos |
| Caso de Uso | CU-016 - Consultar Mis Favoritos |
| Prioridad | Alta |
| Estado | Aprobado |

### Resultado esperado

Se muestran los productos, restaurantes, locales y nutricionistas guardados por el usuario.

### Resultado obtenido

Los favoritos se muestran correctamente.

---

## CP-021 - Eliminar favorito

| Campo | Valor |
|---|---|
| ID | CP-021 |
| Módulo | Favoritos |
| Caso de Uso | CU-017 - Eliminar Favorito |
| Prioridad | Media |
| Estado | Aprobado |

### Resultado esperado

El elemento deja de estar asociado a los favoritos del usuario.

### Resultado obtenido

La eliminación funciona correctamente.

---

# 9. Pruebas de Comentarios y Calificaciones

## CP-022 - Publicar opinión sobre producto

| Campo | Valor |
|---|---|
| ID | CP-022 |
| Módulo | Comentarios |
| Caso de Uso | CU-018 |
| Prioridad | Alta |
| Estado | Aprobado |

### Precondiciones

- Usuario autenticado.

### Pasos

1. Acceder al producto.
2. Completar la opinión.
3. Seleccionar una calificación.
4. Enviar.

### Resultado esperado

La opinión se registra con estado pendiente y no se publica automáticamente.

### Resultado obtenido

La opinión queda pendiente de moderación.

---

## CP-023 - Publicar opinión sobre restaurante

| Campo | Valor |
|---|---|
| ID | CP-023 |
| Módulo | Comentarios |
| Caso de Uso | CU-019 |
| Prioridad | Alta |
| Estado | Aprobado |

### Resultado esperado

La opinión queda pendiente de moderación.

### Resultado obtenido

Funciona correctamente.

---

## CP-024 - Publicar opinión sobre local

| Campo | Valor |
|---|---|
| ID | CP-024 |
| Módulo | Comentarios |
| Caso de Uso | CU-020 |
| Prioridad | Alta |
| Estado | Aprobado |

### Resultado esperado

La opinión queda pendiente de moderación.

### Resultado obtenido

Funciona correctamente.

---

## CP-025 - Publicar opinión sobre nutricionista

| Campo | Valor |
|---|---|
| ID | CP-025 |
| Módulo | Comentarios |
| Caso de Uso | CU-021 |
| Prioridad | Alta |
| Estado | Aprobado |

### Resultado esperado

La opinión queda pendiente de moderación.

### Resultado obtenido

Funciona correctamente.

---

# 10. Pruebas de Moderación

## CP-026 - Consultar opiniones pendientes

| Campo | Valor |
|---|---|
| ID | CP-026 |
| Módulo | Moderación |
| Caso de Uso | CU-022 |
| Prioridad | Alta |
| Estado | Aprobado |

### Precondiciones

- Sesión iniciada con rol Moderador o Administrador.

### Resultado esperado

El sistema muestra las opiniones pendientes de revisión.

### Resultado obtenido

Las opiniones pendientes se visualizan correctamente.

---

## CP-027 - Aprobar opinión

| Campo | Valor |
|---|---|
| ID | CP-027 |
| Módulo | Moderación |
| Caso de Uso | CU-023 |
| Prioridad | Alta |
| Estado | Aprobado |

### Pasos

1. Acceder a moderación.
2. Seleccionar una opinión pendiente.
3. Aprobar la opinión.
4. Acceder nuevamente al detalle público correspondiente.

### Resultado esperado

La opinión cambia a estado aprobado y queda visible públicamente.

### Resultado obtenido

La opinión aprobada aparece correctamente en el detalle público.

---

## CP-028 - Rechazar opinión

| Campo | Valor |
|---|---|
| ID | CP-028 |
| Módulo | Moderación |
| Caso de Uso | CU-024 |
| Prioridad | Alta |
| Estado | Aprobado |

### Resultado esperado

La opinión cambia a estado rechazado y no se muestra públicamente.

### Resultado obtenido

El rechazo funciona correctamente.

---

# 11. Pruebas Administrativas

## CP-029 - Acceder al panel administrativo

| Campo | Valor |
|---|---|
| ID | CP-029 |
| Módulo | Administración |
| Caso de Uso | CU-025 |
| Prioridad | Alta |
| Estado | Aprobado |

### Precondiciones

- Usuario autenticado con rol Administrador.

### Resultado esperado

El administrador puede acceder a las funciones administrativas.

### Resultado obtenido

El panel administrativo carga correctamente.

---

## CP-030 - Gestionar usuarios

| Campo | Valor |
|---|---|
| ID | CP-030 |
| Módulo | Administración |
| Caso de Uso | CU-026 |
| Prioridad | Alta |
| Estado | Aprobado |

### Resultado esperado

El administrador puede consultar y utilizar las acciones de gestión disponibles sobre los usuarios.

### Resultado obtenido

La funcionalidad opera correctamente.

---

## CP-031 - Gestionar contenido

| Campo | Valor |
|---|---|
| ID | CP-031 |
| Módulo | Administración |
| Caso de Uso | CU-027 |
| Prioridad | Alta |
| Estado | Aprobado |

### Resultado esperado

Las operaciones administrativas habilitadas actualizan correctamente la información correspondiente.

### Resultado obtenido

Las funciones implementadas operan correctamente.

---

## CP-032 - Consultar dashboard

| Campo | Valor |
|---|---|
| ID | CP-032 |
| Módulo | Dashboard |
| Caso de Uso | CU-028 |
| Prioridad | Alta |
| Estado | Aprobado |

### Resultado esperado

El dashboard muestra indicadores obtenidos desde la información real del sistema.

### Resultado obtenido

El dashboard carga correctamente.

---

# 12. Pruebas de Navegación y Responsive

## CP-033 - Navegación general Web

| Campo | Valor |
|---|---|
| ID | CP-033 |
| Módulo | General |
| Prioridad | Alta |
| Estado | Aprobado |

### Pasos

1. Acceder a la aplicación Web.
2. Navegar por las principales secciones.
3. Acceder a listados y detalles.
4. Utilizar el menú y enlaces disponibles.

### Resultado esperado

La navegación se realiza sin enlaces rotos ni errores que impidan utilizar el sistema.

### Resultado obtenido

La navegación principal funciona correctamente.

---

## CP-034 - Diseño responsive

| Campo | Valor |
|---|---|
| ID | CP-034 |
| Módulo | Interfaz |
| Prioridad | Alta |
| Estado | Aprobado |

### Resultado esperado

Las principales pantallas se adaptan correctamente a tamaños de pantalla reducidos.

### Resultado obtenido

La revisión responsive fue completada satisfactoriamente.

---

# 13. Pruebas de API y despliegue

## CP-035 - Consultar productos desde API desplegada

| Campo | Valor |
|---|---|
| ID | CP-035 |
| Módulo | API REST |
| Prioridad | Alta |
| Estado | Aprobado |

### Endpoint validado

```text id="futmd3"
/api/productos
```

### Resultado esperado

La API responde con la información almacenada en la base de datos desplegada.

### Resultado obtenido

Respuesta correcta.

---

## CP-036 - Consultar detalle de producto desde API

| Campo | Valor |
|---|---|
| ID | CP-036 |
| Módulo | API REST |
| Prioridad | Alta |
| Estado | Aprobado |

### Endpoint validado

```text id="5zjv69"
/api/productos/1
```

### Resultado obtenido

Respuesta correcta.

---

## CP-037 - Consultar restaurantes desde API

| Campo | Valor |
|---|---|
| ID | CP-037 |
| Módulo | API REST |
| Prioridad | Alta |
| Estado | Aprobado |

### Endpoints validados

```text id="s01ikg"
/api/restaurantes
/api/restaurantes/1
```

### Resultado obtenido

Respuestas correctas.

---

## CP-038 - Consultar locales desde API

| Campo | Valor |
|---|---|
| ID | CP-038 |
| Módulo | API REST |
| Prioridad | Alta |
| Estado | Aprobado |

### Endpoints validados

```text id="a4qk31"
/api/locales
/api/locales/1
```

### Resultado obtenido

Respuestas correctas.

---

## CP-039 - Consultar nutricionistas desde API

| Campo | Valor |
|---|---|
| ID | CP-039 |
| Módulo | API REST |
| Prioridad | Alta |
| Estado | Aprobado |

### Endpoints validados

```text id="p8x4ue"
/api/nutricionistas
/api/nutricionistas/2
```

### Resultado obtenido

Respuestas correctas.

---

# 14. Pruebas Android

## CP-040 - Inicio de aplicación Android

| Campo | Valor |
|---|---|
| ID | CP-040 |
| Módulo | Android |
| Prioridad | Alta |
| Estado | Aprobado |

### Precondiciones

- Aplicación instalada en emulador Android.

### Pasos

1. Ejecutar CeliaConnect.
2. Esperar la carga inicial.

### Resultado esperado

La aplicación inicia y muestra correctamente la interfaz de CeliaConnect.

### Resultado obtenido

La aplicación inicia correctamente.

---

## CP-041 - Navegación Android

| Campo | Valor |
|---|---|
| ID | CP-041 |
| Módulo | Android |
| Prioridad | Alta |
| Estado | Aprobado |

### Pasos

1. Abrir el menú.
2. Acceder a Productos.
3. Acceder a Restaurantes.
4. Acceder a Locales.
5. Acceder a Nutricionistas.
6. Abrir diferentes pantallas de detalle.
7. Realizar desplazamiento vertical.

### Resultado esperado

La navegación funciona correctamente en el dispositivo móvil.

### Resultado obtenido

Las pantallas y detalles funcionan correctamente en el emulador.

---

## CP-042 - Login desde Android

| Campo | Valor |
|---|---|
| ID | CP-042 |
| Módulo | Android / Autenticación |
| Prioridad | Alta |
| Estado | Aprobado |

### Resultado esperado

El usuario puede iniciar sesión desde la aplicación Android utilizando el backend desplegado.

### Resultado obtenido

Login realizado correctamente.

---

## CP-043 - Favoritos desde Android

| Campo | Valor |
|---|---|
| ID | CP-043 |
| Módulo | Android / Favoritos |
| Prioridad | Alta |
| Estado | Aprobado |

### Precondiciones

- Usuario autenticado desde Android.

### Resultado esperado

Los favoritos pueden consultarse y gestionarse desde la aplicación Android.

### Resultado obtenido

Funcionalidad validada correctamente.

---

## CP-044 - Publicar opinión desde Android

| Campo | Valor |
|---|---|
| ID | CP-044 |
| Módulo | Android / Comentarios |
| Prioridad | Alta |
| Estado | Aprobado |

### Pasos

1. Iniciar sesión desde Android.
2. Acceder al detalle correspondiente.
3. Completar una opinión.
4. Seleccionar una calificación.
5. Enviar.

### Resultado esperado

La opinión se almacena en la base de datos con estado pendiente.

### Resultado obtenido

La opinión fue registrada correctamente y apareció en el panel de moderación.

---

# 15. Prueba End-to-End

## CP-045 - Flujo completo Android → Moderación → Publicación

| Campo | Valor |
|---|---|
| ID | CP-045 |
| Tipo | Integración End-to-End |
| Prioridad | Crítica |
| Estado | Aprobado |

### Objetivo

Validar el funcionamiento conjunto de la aplicación Android, autenticación, API REST, base de datos, comentarios y moderación.

### Pasos

1. Ejecutar CeliaConnect desde Android.
2. Iniciar sesión con un usuario registrado.
3. Acceder a un elemento del sistema.
4. Utilizar favoritos.
5. Publicar una opinión y asignar una calificación.
6. Verificar que la opinión quede pendiente.
7. Acceder al panel con permisos de moderación.
8. Consultar las opiniones pendientes.
9. Localizar la opinión creada desde Android.
10. Aprobar la opinión.
11. Volver al detalle público correspondiente.
12. Verificar la publicación.

### Resultado esperado

El flujo debe funcionar correctamente entre todos los componentes:

```text id="zzvuy9"
Android
   ↓
Autenticación
   ↓
Frontend
   ↓
API REST Railway
   ↓
MySQL
   ↓
Comentario pendiente
   ↓
Moderación
   ↓
Aprobación
   ↓
Publicación
```

### Resultado obtenido

**Prueba completada satisfactoriamente.**

La opinión creada desde Android fue almacenada, visualizada como pendiente en el panel de moderación, aprobada y posteriormente mostrada de forma pública.

---

# 16. Resumen de ejecución

| Área | Estado |
|---|---|
| Registro | Aprobado |
| Autenticación | Aprobado |
| Productos | Aprobado |
| Restaurantes | Aprobado |
| Locales | Aprobado |
| Nutricionistas | Aprobado |
| Favoritos | Aprobado |
| Comentarios | Aprobado |
| Calificaciones | Aprobado |
| Moderación | Aprobado |
| Administración | Aprobado |
| Dashboard | Aprobado |
| Navegación Web | Aprobado |
| Responsive | Aprobado |
| API desplegada | Aprobado |
| Android | Aprobado |
| Integración End-to-End | Aprobado |

---

# 17. Cobertura

La versión actual contiene **45 casos de prueba documentados**.

La cobertura contempla los principales casos de uso correspondientes al MVP y pruebas adicionales necesarias para validar:

- API REST.
- Despliegue.
- Responsive.
- Android.
- Integración entre componentes.

Los casos de prueba que correspondían a funcionalidades eliminadas del alcance, como recuperación de contraseña y promociones, fueron retirados de la versión actual.

---

# 18. Conclusión

Las pruebas realizadas permitieron verificar el funcionamiento de los principales módulos de CeliaConnect y la integración entre los diferentes componentes del sistema.

La validación End-to-End permitió comprobar especialmente la comunicación entre:

```text id="49u8tx"
Aplicación Web / Android
          ↓
       API REST
          ↓
       Railway
          ↓
        MySQL
          ↓
   Moderación / Admin
```

Los resultados obtenidos permiten considerar funcional el MVP dentro del alcance definido para la entrega académica.

---

# 19. Estado del documento

**Versión:** 2.0

**Estado:** Ejecutado — MVP funcional.

Los casos documentados reflejan las pruebas realizadas sobre las funcionalidades principales implementadas en CeliaConnect.
# 10 - Casos de Prueba

## Información del documento

| Campo | Valor |
|--------|--------|
| Proyecto | CeliaConnect |
| Documento | Casos de Prueba |
| Versión | 1.1 |
| Fecha | 15/09/2026 |
| Autor | Carelis Fagundez |
| Estado | En elaboración |

---

# 1. Introducción

El presente documento describe los casos de prueba funcionales definidos para validar las principales funcionalidades de CeliaConnect.

Cada caso de prueba está asociado a uno o más casos de uso del documento 07-casos-de-uso y tiene como objetivo verificar que el sistema responda correctamente ante distintos escenarios de uso.

---

# 2. Casos de Prueba

## CP-001 - Registro de usuario exitoso

| Campo | Valor |
|--------|--------|
| ID | CP-001 |
| Módulo | Usuarios |
| Caso de Uso | CU-001 - Registrar Usuario |
| Prioridad | Alta |

**Precondiciones**
- El usuario no posee una cuenta registrada.

**Pasos**
1. Acceder a la pantalla de registro.
2. Completar todos los campos obligatorios.
3. Presionar **Registrarme**.

**Resultado esperado**
El sistema registra correctamente al usuario y muestra un mensaje de confirmación.

---

## CP-002 - Registro con email existente

| Campo | Valor |
|--------|--------|
| ID | CP-002 |
| Módulo | Usuarios |
| Caso de Uso | CU-001 |
| Prioridad | Alta |

**Resultado esperado**
El sistema informa que el correo electrónico ya se encuentra registrado.

---

## CP-003 - Inicio de sesión exitoso

| Campo | Valor |
|--------|--------|
| ID | CP-003 |
| Módulo | Autenticación |
| Caso de Uso | CU-002 - Iniciar Sesión |
| Prioridad | Alta |

**Resultado esperado**
El usuario accede correctamente a la plataforma.

---

## CP-004 - Inicio de sesión con credenciales inválidas

| Campo | Valor |
|--------|--------|
| Caso de Uso | CU-002 |

**Resultado esperado**
El sistema muestra un mensaje indicando que las credenciales son incorrectas.

---

## CP-005 - Recuperación de contraseña

| Campo | Valor |
|--------|--------|
| Caso de Uso | CU-003 |

**Resultado esperado**
El sistema envía correctamente el enlace para restablecer la contraseña.

---

## CP-006 - Editar perfil

| Campo | Valor |
|--------|--------|
| Caso de Uso | CU-004 |

**Resultado esperado**
Los cambios realizados por el usuario son almacenados correctamente.

---

## CP-007 - Buscar productos

| Campo | Valor |
|--------|--------|
| Caso de Uso | CU-005 |

**Resultado esperado**
El sistema muestra únicamente los productos que coinciden con el criterio de búsqueda.

---

## CP-008 - Ver detalle de producto

| Campo | Valor |
|--------|--------|
| Caso de Uso | CU-006 |

**Resultado esperado**
Se visualiza toda la información del producto seleccionado.

---

## CP-009 - Buscar restaurantes

| Campo | Valor |
|--------|--------|
| Caso de Uso | CU-007 |

**Resultado esperado**
El sistema devuelve restaurantes que cumplen con los filtros seleccionados.

---

## CP-010 - Ver detalle de restaurante

| Campo | Valor |
|--------|--------|
| Caso de Uso | CU-008 |

**Resultado esperado**
Se muestra la información completa del restaurante.

---

## CP-011 - Agregar restaurante a favoritos

| Campo | Valor |
|--------|--------|
| Caso de Uso | CU-009 |

**Resultado esperado**
El restaurante queda almacenado en la lista de favoritos del usuario.

---

## CP-012 - Publicar comentario de restaurante

| Campo | Valor |
|--------|--------|
| Caso de Uso | CU-010 |

**Resultado esperado**
El comentario se registra correctamente y queda visible para otros usuarios.

---

## CP-013 - Buscar nutricionistas

| Campo | Valor |
|--------|--------|
| Caso de Uso | CU-015 |

**Resultado esperado**
El sistema muestra los profesionales disponibles según los criterios seleccionados.

---

## CP-014 - Agregar nutricionista a favoritos

| Campo | Valor |
|--------|--------|
| Caso de Uso | CU-017 |

**Resultado esperado**
El nutricionista queda agregado correctamente a la lista de favoritos.

---

## CP-015 - Consultar promociones

| Campo | Valor |
|--------|--------|
| Caso de Uso | CU-018 |

**Resultado esperado**
Se muestran únicamente las promociones vigentes.

---

## CP-016 - Administrar productos

| Campo | Valor |
|--------|--------|
| Caso de Uso | CU-020 - Gestionar Productos |

**Resultado esperado**
El administrador puede crear, modificar y eliminar productos correctamente.

---

## CP-017 - Administrar restaurantes

| Campo | Valor |
|--------|--------|
| Caso de Uso | CU-021 |

**Resultado esperado**
El administrador puede gestionar la información de los restaurantes.

---

## CP-018 - Administrar promociones

| Campo | Valor |
|--------|--------|
| Caso de Uso | CU-024 |

**Resultado esperado**
El administrador puede crear, modificar y eliminar promociones.

---

## CP-019 - Administrar usuarios

| Campo | Valor |
|--------|--------|
| Caso de Uso | CU-019 |

**Resultado esperado**
El administrador puede consultar y gestionar los usuarios registrados.

---

## CP-020 - Navegación general del sistema

| Campo | Valor |
|--------|--------|
| ID | CP-020 |
| Módulo | General |
| Prioridad | Alta |

**Resultado esperado**
El usuario puede navegar correctamente entre los módulos del sistema sin errores ni enlaces rotos.

---

## CP-021 - Buscar locales

| Campo | Valor |
|--------|--------|
| Módulo | Locales |
| Caso de Uso | CU-011 - Buscar Locales |
| Prioridad | Alta |

**Resultado esperado**
El sistema devuelve locales (supermercados/dietéticas) que cumplen con los filtros seleccionados.

---

## CP-022 - Ver detalle de local

| Campo | Valor |
|--------|--------|
| Módulo | Locales |
| Caso de Uso | CU-012 |
| Prioridad | Media |

**Resultado esperado**
Se muestra la información completa del local seleccionado.

---

## CP-023 - Agregar local a favoritos

| Campo | Valor |
|--------|--------|
| Módulo | Locales |
| Caso de Uso | CU-013 |
| Prioridad | Media |

**Resultado esperado**
El local queda almacenado en la lista de favoritos del usuario.

---

## CP-024 - Publicar comentario de local

| Campo | Valor |
|--------|--------|
| Módulo | Locales |
| Caso de Uso | CU-014 |
| Prioridad | Media |

**Resultado esperado**
El comentario se registra correctamente y queda visible para otros usuarios.

---

## CP-025 - Administrar locales

| Campo | Valor |
|--------|--------|
| Módulo | Administración |
| Caso de Uso | CU-022 - Gestionar Locales |
| Prioridad | Alta |

**Resultado esperado**
El administrador puede crear, modificar y eliminar locales correctamente.

---

## CP-026 - Administrar nutricionistas

| Campo | Valor |
|--------|--------|
| Módulo | Administración |
| Caso de Uso | CU-023 - Gestionar Nutricionistas |
| Prioridad | Alta |

**Resultado esperado**
El administrador puede crear, modificar y eliminar nutricionistas, validando la matrícula profesional.

---

## CP-027 - Administrar catálogos

| Campo | Valor |
|--------|--------|
| Módulo | Administración |
| Caso de Uso | CU-025 - Gestionar Catálogos |
| Prioridad | Media |

**Resultado esperado**
El administrador puede gestionar marcas, categorías, barrios, tipos de restaurante, tipos de locales y características sin generar registros duplicados.

---

## CP-028 - Cerrar sesión

| Campo | Valor |
|--------|--------|
| Módulo | Autenticación |
| Caso de Uso | CU-026 - Cerrar Sesión |
| Prioridad | Alta |

**Resultado esperado**
La sesión del usuario queda invalidada y es redirigido a la pantalla principal sin acceso a funcionalidades que requieran autenticación.

---

## CP-029 - Consultar mis favoritos

| Campo | Valor |
|--------|--------|
| Módulo | Favoritos |
| Caso de Uso | CU-027 - Consultar Mis Favoritos |
| Prioridad | Media |

**Resultado esperado**
Se muestra el listado completo de restaurantes, locales y nutricionistas guardados por el usuario. Si no tiene favoritos, se muestra un mensaje indicándolo.

---

## CP-030 - Eliminar favorito

| Campo | Valor |
|--------|--------|
| Módulo | Favoritos |
| Caso de Uso | CU-028 - Eliminar Favorito |
| Prioridad | Media |

**Resultado esperado**
El elemento queda desasociado de la cuenta del usuario y ya no figura en la lista de favoritos.

---

# 3. Consideraciones

Los casos de prueba definidos en este documento representan los escenarios funcionales más importantes del sistema y servirán como base para la ejecución de pruebas durante el desarrollo de CeliaConnect.

La cobertura actual (CP-001 a CP-030) alcanza todos los casos de uso definidos en el documento 07, incluyendo el módulo de Locales y los casos de sesión/favoritos incorporados más recientemente.

A medida que se implementen nuevas funcionalidades, se incorporarán nuevos casos de prueba para garantizar la cobertura funcional del sistema.

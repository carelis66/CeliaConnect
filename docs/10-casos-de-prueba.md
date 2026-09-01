# 10 - Casos de Prueba

## Información del documento

| Campo | Valor |
|--------|--------|
| Proyecto | CeliaConnect |
| Documento | Casos de Prueba |
| Versión | 1.0 |
| Fecha | 28/08/2026 |
| Autor | Carelis Fagundez |
| Estado | En elaboración |

---

# 1. Introducción

El presente documento describe los casos de prueba funcionales definidos para validar las principales funcionalidades de CeliaConnect.

Cada caso de prueba está asociado a uno o más casos de uso y tiene como objetivo verificar que el sistema responda correctamente ante distintos escenarios de uso.

---

# 2. Casos de Prueba

## CP-001 - Registro de usuario exitoso

| Campo | Valor |
|--------|--------|
| ID | CP-001 |
| Módulo | Usuarios |
| Caso de Uso | UC-001 - Registrarse |
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
| Caso de Uso | UC-001 |
| Prioridad | Alta |

**Resultado esperado**

El sistema informa que el correo electrónico ya se encuentra registrado.

---

## CP-003 - Inicio de sesión exitoso

| Campo | Valor |
|--------|--------|
| ID | CP-003 |
| Módulo | Autenticación |
| Caso de Uso | UC-002 - Iniciar sesión |
| Prioridad | Alta |

**Resultado esperado**

El usuario accede correctamente a la plataforma.

---

## CP-004 - Inicio de sesión con credenciales inválidas

**Resultado esperado**

El sistema muestra un mensaje indicando que las credenciales son incorrectas.

---

## CP-005 - Recuperación de contraseña

**Resultado esperado**

El sistema envía correctamente el enlace para restablecer la contraseña.

---

## CP-006 - Editar perfil

**Resultado esperado**

Los cambios realizados por el usuario son almacenados correctamente.

---

## CP-007 - Buscar productos

**Resultado esperado**

El sistema muestra únicamente los productos que coinciden con el criterio de búsqueda.

---

## CP-008 - Ver detalle de producto

**Resultado esperado**

Se visualiza toda la información del producto seleccionado.

---

## CP-009 - Buscar restaurantes

**Resultado esperado**

El sistema devuelve restaurantes que cumplen con los filtros seleccionados.

---

## CP-010 - Ver detalle de restaurante

**Resultado esperado**

Se muestra la información completa del restaurante.

---

## CP-011 - Agregar restaurante a favoritos

**Resultado esperado**

El restaurante queda almacenado en la lista de favoritos del usuario.

---

## CP-012 - Publicar comentario de restaurante

**Resultado esperado**

El comentario se registra correctamente y queda visible para otros usuarios.

---

## CP-013 - Buscar nutricionistas

**Resultado esperado**

El sistema muestra los profesionales disponibles según los criterios seleccionados.

---

## CP-014 - Agregar nutricionista a favoritos

**Resultado esperado**

El nutricionista queda agregado correctamente a la lista de favoritos.

---

## CP-015 - Consultar promociones

**Resultado esperado**

Se muestran únicamente las promociones vigentes.

---

## CP-016 - Administrar productos

**Caso de Uso**

UC-020 - Gestionar productos

**Resultado esperado**

El administrador puede crear, modificar y eliminar productos correctamente.

---

## CP-017 - Administrar restaurantes

**Resultado esperado**

El administrador puede gestionar la información de los restaurantes.

---

## CP-018 - Administrar promociones

**Resultado esperado**

El administrador puede crear, modificar y eliminar promociones.

---

## CP-019 - Administrar usuarios

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

# 3. Consideraciones

Los casos de prueba definidos en este documento representan los escenarios funcionales más importantes del sistema y servirán como base para la ejecución de pruebas durante el desarrollo de CeliaConnect.

A medida que se implementen nuevas funcionalidades, se incorporarán nuevos casos de prueba para garantizar la cobertura funcional del sistema.

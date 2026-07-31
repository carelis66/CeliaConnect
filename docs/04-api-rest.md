# 04 - API REST

## Información del documento

| Campo | Valor |
|--------|--------|
| Proyecto | CeliaConnect |
| Documento | API REST |
| Versión | 1.0 |
| Fecha | 31/07/2026 |
| Autor | Carelis Fagundez |
| Estado | En elaboración |

---

# 1. Introducción

Este documento describe el diseño de la API REST de CeliaConnect.

La API será el punto de comunicación entre la aplicación web, la aplicación móvil y la base de datos, centralizando la lógica de negocio y garantizando el acceso seguro a la información.

---

# 2. Objetivos

- Centralizar la lógica de negocio.
- Proporcionar un único punto de acceso a los datos.
- Permitir que la aplicación Web y Mobile compartan la misma información.
- Facilitar futuras integraciones.

---

# 3. Arquitectura de la API

La API seguirá una arquitectura REST utilizando el protocolo HTTP y el intercambio de información en formato JSON.

Cada recurso será representado mediante un conjunto de endpoints.

---

# 4. Autenticación

La autenticación se realizará mediante JWT (JSON Web Token).

Una vez autenticado, el usuario recibirá un token que deberá enviar en cada solicitud protegida.

Ejemplo:

Authorization: Bearer {token}

---

# 5. Recursos

La API estará organizada en los siguientes recursos:

- Autenticación
- Usuarios
- Productos
- Restaurantes
- Tiendas
- Nutricionistas
- Promociones
- Comentarios
- Favoritos

---

# 6. Endpoints

## 6.1 Autenticación

| Método | Endpoint | Descripción |
|----------|----------------------|--------------------------|
| POST | /api/auth/register | Registrar usuario |
| POST | /api/auth/login | Iniciar sesión |
| POST | /api/auth/logout | Cerrar sesión |

---

## 6.2 Usuarios

| Método | Endpoint | Descripción |
|----------|---------------------|-----------------------|
| GET | /api/users/me | Obtener perfil |
| PUT | /api/users/me | Actualizar perfil |
| DELETE | /api/users/me | Eliminar cuenta |

---

## 6.3 Productos

| Método | Endpoint | Descripción |
|----------|-------------------------|------------------------------|
| GET | /api/products | Obtener productos |
| GET | /api/products/{id} | Obtener producto |
| POST | /api/products | Crear producto |
| PUT | /api/products/{id} | Actualizar producto |
| DELETE | /api/products/{id} | Eliminar producto |

---

## 6.4 Restaurantes

| Método | Endpoint |
|----------|------------------------------|
| GET | /api/restaurants |
| GET | /api/restaurants/{id} |
| POST | /api/restaurants |
| PUT | /api/restaurants/{id} |
| DELETE | /api/restaurants/{id} |

---

## 6.5 Tiendas

| Método | Endpoint |
|----------|---------------------|
| GET | /api/stores |
| GET | /api/stores/{id} |
| POST | /api/stores |
| PUT | /api/stores/{id} |
| DELETE | /api/stores/{id} |

---

## 6.6 Nutricionistas

| Método | Endpoint |
|----------|------------------------------|
| GET | /api/nutritionists |
| GET | /api/nutritionists/{id} |
| POST | /api/nutritionists |
| PUT | /api/nutritionists/{id} |
| DELETE | /api/nutritionists/{id} |

---

## 6.7 Promociones

| Método | Endpoint |
|----------|---------------------------|
| GET | /api/promotions |
| GET | /api/promotions/{id} |
| POST | /api/promotions |
| PUT | /api/promotions/{id} |
| DELETE | /api/promotions/{id} |

---

## 6.8 Comentarios

| Método | Endpoint |
|----------|---------------------------|
| GET | /api/comments |
| POST | /api/comments |
| PUT | /api/comments/{id} |
| DELETE | /api/comments/{id} |

---

## 6.9 Favoritos

| Método | Endpoint |
|----------|----------------------------|
| GET | /api/favorites |
| POST | /api/favorites |
| DELETE | /api/favorites/{id} |

---

# 7. Formato de respuestas

Las respuestas de la API se devolverán en formato JSON.

Ejemplo:

{
    "success": true,
    "data": { }
}

En caso de error:

{
    "success": false,
    "message": "Recurso no encontrado."
}

---

# 8. Códigos HTTP

| Código | Significado |
|---------|-------------|
| 200 | OK |
| 201 | Created |
| 204 | No Content |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Internal Server Error |

---

# 9. Seguridad

La API implementará:

- Autenticación mediante JWT.
- Validación de datos de entrada.
- Control de permisos según el rol del usuario.
- Comunicación mediante HTTPS.

---

# 10. Próximos pasos

Una vez definida la API REST se procederá con:

- Implementación del Backend.
- Desarrollo del Frontend Web.
- Desarrollo de la Aplicación Mobile.
- Integración con SQL Server.

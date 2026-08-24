# Modelo Funcional - CeliaConnect

## Objetivo

El modelo funcional describe las funcionalidades principales de CeliaConnect y el comportamiento esperado del sistema desde la perspectiva del usuario y del administrador.

---

# Roles del sistema

## Usuario

El usuario podrá:

- Registrarse en la aplicación.
- Iniciar sesión.
- Editar su perfil.
- Buscar productos Sin TACC.
- Buscar restaurantes.
- Buscar locales.
- Buscar nutricionistas.
- Visualizar promociones.
- Agregar restaurantes, locales y nutricionistas a favoritos.
- Publicar comentarios y calificaciones sobre restaurantes y locales.

No podrá modificar la información del sistema.

---

## Admin

El administrador tendrá acceso completo al sistema.

Podrá:

- Gestionar productos.
- Gestionar marcas.
- Gestionar categorías.
- Gestionar restaurantes.
- Gestionar locales.
- Gestionar nutricionistas.
- Gestionar promociones.
- Gestionar características de establecimientos.
- Gestionar la información publicada en la plataforma.

---

# Módulos funcionales

## Productos

Permite consultar información de productos aptos para personas celíacas.

Cada producto mostrará:

- Imagen
- Marca
- Categoría
- Descripción
- Ingredientes
- Información nutricional
- Certificación Sin TACC

Los productos no recibirán comentarios ni podrán agregarse a favoritos.

---

## Restaurantes

Permite consultar establecimientos gastronómicos aptos para personas celíacas.

Cada restaurante mostrará:

- Imagen exterior
- Imagen interior
- Tipo de comida
- Dirección
- Barrio
- Teléfono
- Email
- Instagram
- Sitio web
- Horario de atención
- Ubicación mediante Google Maps
- Calificación promedio
- Comentarios de usuarios
- Promociones disponibles
- Características del establecimiento

Los usuarios podrán:

- Calificar el restaurante.
- Escribir comentarios.
- Guardarlo como favorito.

---

## Locales

Permite consultar supermercados y dietéticas.

Cada local mostrará:

- Imagen
- Tipo de local
- Dirección
- Barrio
- Teléfono
- Email
- Instagram
- Sitio web
- Horario de atención
- Ubicación mediante Google Maps
- Calificación promedio
- Comentarios de usuarios
- Promociones disponibles
- Características del establecimiento

Los usuarios podrán:

- Calificar el local.
- Escribir comentarios.
- Guardarlo como favorito.

---

## Nutricionistas

Permite consultar profesionales especializados en celiaquía e intolerancias alimentarias.

Cada nutricionista mostrará:

- Foto de perfil
- Nombre y apellido
- Matrícula profesional
- Descripción
- Dirección
- Barrio
- Teléfono
- Contacto por WhatsApp
- Email
- Instagram
- Sitio web
- Horario de atención
- Ubicación mediante Google Maps

Los usuarios podrán agregar nutricionistas a favoritos.

---

## Promociones

Los restaurantes y locales podrán publicar promociones.

Cada promoción incluirá:

- Imagen
- Título
- Descripción
- Código de descuento (opcional)
- Fecha de inicio
- Fecha de finalización

---

## Favoritos

Cada usuario podrá guardar como favoritos:

- Restaurantes
- Locales
- Nutricionistas

---

# Reglas de negocio

- El sistema contará con dos roles: **Admin** y **Usuario**.
- Los comentarios estarán disponibles únicamente para restaurantes y locales.
- Los productos no recibirán comentarios.
- Los productos no podrán agregarse a favoritos.
- Los restaurantes y locales podrán recibir calificaciones de 1 a 5 estrellas.
- La calificación promedio se calculará a partir de las opiniones de los usuarios.
- Las características mostradas en restaurantes y locales serán información proporcionada por el establecimiento.
- Cada restaurante pertenecerá a un único tipo de comida.
- Cada local pertenecerá a un único tipo de local.
- Los nutricionistas publicados estarán orientados a personas con celiaquía e intolerancias alimentarias.
- La aplicación estará enfocada inicialmente en la Ciudad Autónoma de Buenos Aires (CABA).

---

# Estado del documento

**Versión:** 1.0

**Estado:** En desarrollo.

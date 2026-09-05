# 02 - Arquitectura del Sistema

## Información del documento

| Campo | Valor |
|--------|--------|
| Proyecto | CeliaConnect |
| Documento | Arquitectura del Sistema |
| Versión | 1.0 |
| Fecha | 31/07/2026 |
| Autor | Carelis Fagundez |
| Estado | En elaboración |

---

# 1. Introducción

Este documento describe la arquitectura técnica de CeliaConnect.

Su objetivo es definir cómo estará construido el sistema, cómo se comunicarán sus componentes y qué tecnologías serán utilizadas durante el desarrollo.

La arquitectura propuesta busca facilitar el mantenimiento, la escalabilidad y la reutilización del código, permitiendo compartir un mismo backend entre la aplicación web y la aplicación móvil.

---

# 2. Objetivos

Los objetivos de la arquitectura son:

- Definir la estructura general del sistema.
- Permitir reutilizar la lógica de negocio entre Web y Mobile.
- Facilitar el mantenimiento del proyecto.
- Separar responsabilidades entre Frontend, Backend y Base de Datos.
- Permitir el crecimiento futuro de la plataforma.

---

# 3. Arquitectura General

La solución estará compuesta por cuatro capas principales.

- Aplicación Web
- Aplicación Mobile
- API REST
- Base de Datos

Las aplicaciones Web y Mobile consumirán la misma API REST, evitando duplicar lógica de negocio y garantizando la consistencia de los datos.

---

# 4. Componentes del sistema

## 4.1 Aplicación Web

Tecnología propuesta:

- React
- Vite
- TypeScript

Responsabilidades:

- Mostrar la interfaz web.
- Consumir la API REST.
- Gestionar la autenticación.
- Permitir la administración del sistema.

---

## 4.2 Aplicación Mobile

Tecnología propuesta:

- React Native
- Expo
- TypeScript

Responsabilidades:

- Proporcionar una experiencia optimizada para dispositivos móviles.
- Consumir la misma API REST utilizada por la aplicación web.
- Acceder a funcionalidades propias del dispositivo cuando sea necesario.

---

## 4.3 Backend

Tecnología propuesta:

- Node.js
- Express

Responsabilidades:

- Implementar la lógica de negocio.
- Validar la información recibida.
- Gestionar la autenticación.
- Exponer la API REST.
- Comunicarse con la base de datos.

---

## 4.4 Base de Datos

Motor seleccionado:

- Microsoft SQL Server

Responsabilidades:

- Almacenar la información del sistema.
- Mantener la integridad de los datos.
- Gestionar las relaciones entre las entidades.

---

# 5. Tecnologías seleccionadas

| Componente | Tecnología |
|------------|------------|
| Frontend Web | React + Vite + TypeScript |
| Mobile | React Native + Expo |
| Backend | Node.js + Express |
| Base de Datos | Microsoft SQL Server |
| ORM | Prisma |
| Autenticación | JWT |
| Mapas | Google Maps API |
| Imágenes | Cloudinary |
| Control de versiones | GitHub |

---

# 6. Comunicación entre componentes

El usuario podrá acceder al sistema desde la aplicación Web o Mobile.

Ambas aplicaciones consumirán una única API REST.

La API procesará la lógica de negocio y realizará las operaciones correspondientes sobre la base de datos.

Los servicios externos serán utilizados únicamente cuando la funcionalidad lo requiera.

---

# 7. Servicios externos

## Google Maps API

Se utilizará para:

- Mostrar mapas.
- Obtener ubicaciones.
- Buscar restaurantes cercanos.
- Buscar tiendas cercanas.
- Calcular distancias.

---

## Cloudinary

Se utilizará para almacenar imágenes de:

- Productos.
- Restaurantes.
- Tiendas.
- Usuarios.

---

# 8. Seguridad

La autenticación del sistema se realizará mediante JWT (JSON Web Token).

Las contraseñas no serán almacenadas en texto plano, sino utilizando algoritmos de hash seguros.

El sistema contemplará dos perfiles:

- Usuario
- Administrador

Cada perfil tendrá permisos específicos para acceder a determinadas funcionalidades.

---

# 9. Organización del proyecto

El repositorio estará organizado en diferentes módulos con el objetivo de separar responsabilidades y facilitar el mantenimiento.

La estructura general será la siguiente:

```text
CeliaConnect/

apps/
   web/
   mobile/

server/

database/

docs/

assets/

.github/
```

---

# 10. Estrategia de despliegue

La solución será desplegada utilizando servicios en la nube.

- Aplicación Web.
- Backend.
- Base de Datos.
- Aplicación Android publicada en Google Play.

La versión Web y Mobile compartirán la misma infraestructura backend.

---

# 11. Beneficios de la arquitectura

La arquitectura seleccionada permitirá:
- Separar responsabilidades entre los distintos componentes.
- Reutilizar la lógica de negocio.
- Facilitar futuras ampliaciones.
- Mejorar el mantenimiento del sistema.
- Centralizar el acceso a la información.
- Escalar el proyecto de forma ordenada.

---
# 12. Decisiones de Diseño

Consideraciones de Arquitectura:
# Alcance Geográfico del MVP

La primera versión de CeliaConnect estará orientada exclusivamente a la Ciudad Autónoma de Buenos Aires (CABA).
Esta decisión permite reducir la complejidad inicial del sistema y enfocar el desarrollo en una zona con una amplia oferta de productos, restaurantes y comercios aptos para personas celíacas.
Como consecuencia, el modelo de datos incorpora la entidad **Barrio** para representar la ubicación de los establecimientos, evitando una estructura más compleja compuesta por País, Provincia y Ciudad.

La arquitectura del sistema fue diseñada para permitir una futura expansión hacia otras provincias y países mediante la incorporación de nuevas entidades geográficas sin afectar el funcionamiento actual del sistema.

---
# 13. Próximos pasos

Una vez aprobada la arquitectura técnica, se continuará con:

- Modelo de Datos.
- Diseño de la API REST.
- Diseño de interfaces.
- Desarrollo del Backend.
- Desarrollo del Frontend Web.
- Desarrollo de la Aplicación Mobile.

# 02 - Arquitectura del Sistema

## Información del documento

| Campo | Valor |
|---|---|
| Proyecto | CeliaConnect |
| Documento | Arquitectura del Sistema |
| Versión | 1.1 |
| Fecha | 15/09/2026 |
| Autor | Carelis Fagundez |
| Estado | En elaboración |

## 1. Introducción

Este documento describe la arquitectura técnica de CeliaConnect.

Su objetivo es definir cómo estará construido el sistema, cómo se comunicarán sus componentes y qué tecnologías serán utilizadas durante el desarrollo.

La arquitectura propuesta busca facilitar el mantenimiento y la escalabilidad, reutilizando el mismo código web tanto para la versión de escritorio como para la versión mobile instalable.

## 2. Objetivos

- Definir la estructura general del sistema.
- Permitir reutilizar el mismo frontend entre Web y Mobile (vía PWA).
- Facilitar el mantenimiento del proyecto.
- Separar responsabilidades entre Frontend, Backend y Base de Datos.
- Permitir el crecimiento futuro de la plataforma.

## 3. Arquitectura General

La solución está compuesta por tres capas principales:

- **Frontend** (Web, instalable como PWA en mobile)
- **API REST**
- **Base de Datos**

No hay una aplicación mobile con codebase separado: la versión mobile es el mismo sitio web empaquetado como PWA instalable (manifest.json + service worker, generado con PWABuilder), no una app nativa escrita aparte.

## 4. Componentes del sistema

### 4.1 Frontend Web

**Tecnología:**
- HTML5, CSS3, Bootstrap 5.3.7
- JavaScript vanilla (sin frameworks)
- Bootstrap Icons

**Responsabilidades:**
- Mostrar la interfaz.
- Consumir la API REST (vía capa `services/`, hoy sobre mocks).
- Gestionar la sesión del usuario en el cliente.

### 4.2 Versión Mobile

**Tecnología:**
- PWA (manifest.json + service worker) generada a partir del mismo frontend web.
- Empaquetado con **PWABuilder** para generar el instalable Android.

**Responsabilidades:**
- Misma experiencia que la Web, optimizada para instalación en dispositivos móviles.
- Consume la misma API REST.

> Pendiente de confirmar: si el instalable Android generado con PWABuilder se publica finalmente en Google Play (vía TWA) o queda solo como instalable directo. No bloquea el desarrollo actual.

### 4.3 Backend

**Tecnología confirmada:**
- Node.js + Express
- Sequelize (ORM)
- MySQL (motor provisto por XAMPP en el entorno de desarrollo)

**Responsabilidades:**
- Implementar la lógica de negocio.
- Validar la información recibida.
- Gestionar la autenticación (JWT).
- Exponer la API REST.
- Comunicarse con la base de datos vía Sequelize.

### 4.4 Base de Datos

**Motor:** MySQL (XAMPP en desarrollo).

**Responsabilidades:**
- Almacenar la información del sistema.
- Mantener la integridad de los datos.
- Gestionar las relaciones entre las entidades.

## 5. Tecnologías seleccionadas

| Componente | Tecnología |
|---|---|
| Frontend Web | HTML5 + CSS3 + Bootstrap 5.3.7 + JavaScript vanilla |
| Mobile | PWA (mismo frontend), empaquetado con PWABuilder |
| Backend | Node.js + Express |
| ORM | Sequelize |
| Base de Datos | MySQL |
| Autenticación | JWT |
| Mapas | Google Maps API |
| Imágenes | *Sin definir todavía* |
| Control de versiones | GitHub |

## 6. Comunicación entre componentes

El usuario accede al sistema desde el navegador, tanto en desktop como en la versión instalada como PWA.

El frontend consume una única API REST, que procesa la lógica de negocio y realiza las operaciones correspondientes sobre la base de datos MySQL.

Los servicios externos se utilizan únicamente cuando la funcionalidad lo requiere.

## 7. Servicios externos

### Google Maps API
Se utilizará para:
- Mostrar mapas.
- Obtener ubicaciones.
- Buscar restaurantes y tiendas cercanas.
- Calcular distancias.

### Almacenamiento de imágenes
Aún sin definir el proveedor (se evaluará al construir el backend).

## 8. Seguridad

La autenticación del sistema se realizará mediante JWT (JSON Web Token).

Las contraseñas no serán almacenadas en texto plano, sino utilizando algoritmos de hash seguros.

El sistema contempla dos perfiles: Usuario y Administrador, cada uno con permisos específicos.

## 9. Organización del proyecto

Estructura real del repositorio del frontend (ver también README.md):

```
celiaconnect/
├── assets/
│   └── images/
├── components/
│   ├── header.html
│   └── footer.html
├── css/
│   └── style.css
├── js/
│   └── app.js
├── mocks/
├── services/
├── index.html
├── login.html
├── registro.html
├── productos.html
└── README.md
```

El backend se desarrollará como un proyecto separado (Node.js + Express + Sequelize), que expondrá la API REST consumida por este frontend. Su ubicación final dentro o fuera del mismo repositorio queda pendiente de definir al momento de construirlo.

## 10. Estrategia de despliegue

- **Frontend**: hosting estático (tipo Vercel o Netlify).
- **Backend + Base de Datos**: servicio en la nube (tipo Railway o Render).
- **Mobile**: instalable generado con PWABuilder a partir del sitio publicado; publicación en Google Play, pendiente de confirmar (ver sección 4.2).

## 11. Beneficios de la arquitectura

- Separa responsabilidades entre frontend, backend y base de datos.
- Reutiliza el 100% del código web para la versión mobile, sin mantener un codebase nativo aparte.
- Facilita futuras ampliaciones.
- Permite reemplazar los mocks por la API real sin modificar HTML/CSS.
- Centraliza el acceso a la información.

## 12. Decisiones de Diseño

### Alcance Geográfico del MVP

La primera versión de CeliaConnect estará orientada exclusivamente a la Ciudad Autónoma de Buenos Aires (CABA). Esta decisión permite reducir la complejidad inicial del sistema y enfocar el desarrollo en una zona con una amplia oferta de productos, restaurantes y comercios aptos para personas celíacas. Como consecuencia, el modelo de datos incorpora la entidad `Barrio` para representar la ubicación de los establecimientos, evitando una estructura más compleja compuesta por País, Provincia y Ciudad.

La arquitectura fue pensada para permitir una futura expansión hacia otras zonas mediante la incorporación de nuevas entidades geográficas, sin afectar el funcionamiento actual del sistema.

### Por qué no React Native

La especificación funcional original define el stack como HTML/CSS/Bootstrap/JS + backend + MySQL, sin mencionar React Native. Usar PWABuilder para generar el instalable reutiliza el 100% del código web ya construido, sin reescribir nada en un framework nativo aparte.

## 13. Próximos pasos

- Modelo de Datos (incorporando la entidad `Tienda`, ver documento 01).
- Diseño de la API REST.
- Diseño de interfaces restantes (Restaurantes, Nutricionistas, Detalle, Perfil/Favoritos).
- Desarrollo del Backend (Node.js + Express + Sequelize + MySQL).
- Conexión de `services/` a la API real.

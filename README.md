# CeliaConnect

## Descripción

CeliaConnect es una plataforma web (con proyección a versión mobile instalable como PWA) diseñada para centralizar información confiable para personas con celiaquía e intolerancia al gluten.

El objetivo del proyecto es facilitar el acceso a productos, restaurantes, locales (tiendas) y nutricionistas aptos para personas que siguen una alimentación libre de gluten, ofreciendo información centralizada en una única plataforma. La primera etapa del proyecto está acotada a CABA (Ciudad Autónoma de Buenos Aires, Argentina).

Entre sus principales funcionalidades se encuentran:

* 🥫 Consulta de productos Sin TACC.
* 🍽️ Búsqueda de restaurantes.
* 🛒 Consulta de locales (supermercados y dietéticas).
* 👩‍⚕️ Directorio de nutricionistas.
* 🎁 Promociones (banners informativos).
* ⭐ Gestión de favoritos.
* 💬 Comentarios y valoraciones de la comunidad.

> Nota: Recetas quedó fuera del alcance de este MVP.

## Objetivo

Desarrollar una solución tecnológica que permita centralizar información confiable para la comunidad celíaca, mejorando la experiencia de búsqueda de productos y servicios mediante una plataforma intuitiva, moderna y responsive.

## Tecnologías

### Frontend

* HTML5, CSS3, Bootstrap 5.3.7
* JavaScript vanilla (sin frameworks)
* Bootstrap Icons
* Proyección a instalable mobile como PWA (manifest.json + service worker), generado con **PWABuilder** — no hay un codebase mobile separado (sin React Native).

### Backend

* Node.js + Express
* Sequelize (ORM)
* Autenticación mediante JWT

### Base de Datos

* MySQL (motor provisto por XAMPP en el entorno de desarrollo; MySQL Workbench para diseño/revisión de tablas)

### Servicios

* **Google Maps API** — geolocalización de restaurantes, locales y nutricionistas (confirmado).
* Almacenamiento de imágenes — aún sin definir el proveedor.

## Arquitectura

Cliente-servidor desacoplado, con arquitectura en capas: presentación (frontend estático), acceso a datos del frontend (capa `services/`, hoy sobre mocks y luego sobre la API real), lógica de negocio (backend) y acceso a datos del backend sobre MySQL vía Sequelize.

## Estructura del repositorio

```
CeliaConnect/
├── docs/                    ← documentación técnica (ver abajo)
│   ├── diagramas/
│   ├── mockups/
│   └── 01 a 11 (.md)
├── database/
│   ├── schema.sql            ← estructura de la base de datos (en construcción)
│   ├── seed.sql               ← datos iniciales
│   └── README.md
├── assets/
│   └── images/
├── components/                ← Header y footer reutilizables
│   ├── header.html
│   └── footer.html
├── css/
│   └── style.css
├── js/
│   └── app.js
├── mocks/                      ← datos falsos en JSON para desarrollar sin backend
├── services/                    ← capa de abstracción de datos (hoy lee mocks/, mañana la API)
├── index.html                   (Home)
├── login.html
├── registro.html
├── productos.html                (listado de Productos)
└── README.md
```

## Documentación

La documentación técnica del proyecto se encuentra disponible en la carpeta `docs/`.

* 📄 01 - Módulos del Sistema
* 📄 02 - Arquitectura del Sistema
* 📄 03 - Modelo de Datos
* 📄 04 - API REST
* 📄 05 - Modelo Funcional
* 📄 06 - Diagramas
* 📄 07 - Casos de Uso
* 📄 08 - Planificación del Proyecto
* 📄 09 - Mockups
* 📄 10 - Casos de Prueba
* 📄 11 - Requisitos Funcionales

## Estado del Proyecto

🚧 En desarrollo.

Actualmente el frontend se está construyendo sobre datos mock (`mocks/`), con una capa de abstracción (`services/`) preparada para conectarse a la API real sin modificar el HTML/CSS cuando el backend esté disponible.

**Completado:**
* Home
* Login y Registro
* Listado de Productos (filtros y orden aún no conectados a datos reales — es maqueta funcional)
* Documentación técnica (01 a 11) revisada y sincronizada con las decisiones actuales del proyecto
* `database/schema.sql`: tablas de Seguridad, Productos y Restaurantes (parcial); `database/seed.sql` completo para lo ya modelado

**Pendiente:**
* Listado de Restaurantes, Locales, Nutricionistas
* Detalle de Producto / Restaurante / Local / Nutricionista
* Perfil y Favoritos
* Completar `schema.sql`: `tipoLocal`, `local`, `nutricionista`, `caracteristica`, `restauranteCaracteristica`, `localCaracteristica`, `comentarioRestaurante`, `comentarioLocal`, `favoritoRestaurante`, `favoritoLocal`, `favoritoNutricionista`, `promocion`
* Backend (Node.js + Express + Sequelize + MySQL)
* Conexión de `services/` a la API real
* Publicación (hosting) y conversión a PWA instalable

## Autor

Carelis Fagundez
Trabajo Final - Analista de Sistemas
Escuela Da Vinci

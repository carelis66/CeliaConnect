# Database

Scripts SQL del proyecto CeliaConnect.

## Motor

MySQL (se usa el motor provisto por XAMPP en el entorno de desarrollo). MySQL Workbench se utiliza para diseñar y revisar las tablas visualmente antes de pasarlas a script.

## Archivos

* **`schema.sql`** — Estructura de la base de datos (creación de tablas, claves primarias y foráneas). Actualmente en construcción: contiene las tablas de los módulos Seguridad (`rol`, `usuario`), Productos (`categoria`, `marca`, `producto`) y Restaurantes (`tipoRestaurante`, `barrio`, `restaurante`). Faltan las tablas de Locales, Nutricionistas, Características, Comentarios, Favoritos y Promociones — ver el modelo completo en `docs/03-modelo-de-datos.md`.
* **`seed.sql`** — Datos iniciales necesarios para que la aplicación funcione (roles, categorías, marcas, tipos de restaurante, barrios de CABA). Se actualizará a medida que se sumen las tablas pendientes de `schema.sql`.

## Cómo ejecutar

1. Correr `schema.sql` primero, para crear la base y las tablas.
2. Correr `seed.sql` después, para cargar los datos iniciales.

## Ver también

* `docs/03-modelo-de-datos.md` — modelo entidad-relación completo, entidades y atributos.
* `docs/02-arquitectura-del-sistema.md` — cómo se conecta esta base con el backend (Node.js + Express + Sequelize).

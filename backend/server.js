const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('./db');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// ==========================================
// VERIFICAR TOKEN JWT
// ==========================================

function verificarToken(req, res, next) {

    const authorization =
        req.headers.authorization;


    if (!authorization) {

        return res.status(401).json({
            mensaje: 'Debés iniciar sesión'
        });

    }


    const partes =
        authorization.split(' ');


    if (
        partes.length !== 2 ||
        partes[0] !== 'Bearer'
    ) {

        return res.status(401).json({
            mensaje: 'Token inválido'
        });

    }


    const token =
        partes[1];


    try {

        const usuario =
            jwt.verify(
                token,
                process.env.JWT_SECRET
            );


        req.usuario =
            usuario;


        next();


    } catch (error) {

        return res.status(401).json({
            mensaje: 'Sesión inválida o vencida'
        });

    }

}

// ==========================================
// VERIFICAR ADMINISTRADOR
// ==========================================

function verificarAdmin(req, res, next) {

    if (
        !req.usuario ||
        Number(req.usuario.rolId) !== 1
    ) {

        return res.status(403).json({
            mensaje:
                'No tenés permisos de administrador'
        });

    }

    next();
}

// ==========================================
// RUTA DE PRUEBA
// ==========================================

app.get('/', (req, res) => {

    res.send('CeliaConnect API funcionando');

});


// ==========================================
// LOGIN
// ==========================================

app.post('/api/login', async (req, res) => {

    try {

        const { email, password } = req.body;


        // Validar campos obligatorios
        if (!email || !password) {

            return res.status(400).json({
                mensaje: 'Email y contraseña son obligatorios'
            });

        }


        // Buscar usuario por email
        const [usuarios] = await pool.query(`
            SELECT
                id,
                nombre,
                apellido,
                email,
                password,
                esActivo,
                rolId
            FROM usuario
            WHERE email = ?
            LIMIT 1
        `, [email]);


        // Usuario inexistente
        if (usuarios.length === 0) {

            return res.status(401).json({
                mensaje: 'Email o contraseña incorrectos'
            });

        }


        const usuario = usuarios[0];


        // Verificar que el usuario esté activo
        if (Number(usuario.esActivo) !== 1) {

            return res.status(403).json({
                mensaje: 'El usuario se encuentra inactivo'
            });

        }


        // Comparar contraseña con el hash bcrypt
        const passwordCorrecta =
            await bcrypt.compare(
                password,
                usuario.password
            );


        // Contraseña incorrecta
        if (!passwordCorrecta) {

            return res.status(401).json({
                mensaje: 'Email o contraseña incorrectos'
            });

        }


        // Login correcto
        // Generar token de autenticación
const token = jwt.sign(
    {
        id: usuario.id,
        rolId: usuario.rolId
    },
    process.env.JWT_SECRET,
    {
        expiresIn: '8h'
    }
);


// Login correcto
res.json({

    mensaje: 'Inicio de sesión correcto',

    token: token,

    usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        rolId: usuario.rolId
    }

});


    } catch (error) {

        console.error(
            'Error al iniciar sesión:',
            error
        );

        res.status(500).json({
            mensaje: 'Error al iniciar sesión'
        });

    }

});

// ==========================================
// REGISTRO DE USUARIO
// ==========================================

app.post('/api/registro', async (req, res) => {

    try {

        const {
            nombre,
            apellido,
            documento,
            email,
            password
        } = req.body;


        // Validar campos obligatorios
        if (
            !nombre ||
            !apellido ||
            !documento ||
            !email ||
            !password
        ) {

            return res.status(400).json({
                mensaje: 'Todos los campos son obligatorios'
            });

        }


        // Validar longitud de contraseña
        if (password.length < 8) {

            return res.status(400).json({
                mensaje: 'La contraseña debe tener al menos 8 caracteres'
            });

        }


        // Normalizar datos
        const emailNormalizado =
            email.trim().toLowerCase();

        const documentoNormalizado =
            documento.trim();


        // Verificar si ya existe el email
        const [usuariosEmail] =
            await pool.query(`
                SELECT id
                FROM usuario
                WHERE email = ?
                LIMIT 1
            `, [emailNormalizado]);


        if (usuariosEmail.length > 0) {

            return res.status(409).json({
                mensaje: 'Ya existe una cuenta con ese correo electrónico'
            });

        }


        // Verificar si ya existe el documento
        const [usuariosDocumento] =
            await pool.query(`
                SELECT id
                FROM usuario
                WHERE documento = ?
                LIMIT 1
            `, [documentoNormalizado]);


        if (usuariosDocumento.length > 0) {

            return res.status(409).json({
                mensaje: 'Ya existe una cuenta con ese documento'
            });

        }


        // Encriptar contraseña
        const passwordHash =
            await bcrypt.hash(
                password,
                10
            );


        // Crear usuario
        const [resultado] =
            await pool.query(`
                INSERT INTO usuario (
                    documento,
                    nombre,
                    apellido,
                    email,
                    password,
                    esActivo,
                    rolId
                )
                VALUES (?, ?, ?, ?, ?, 1, 2)
            `, [
                documentoNormalizado,
                nombre.trim(),
                apellido.trim(),
                emailNormalizado,
                passwordHash
            ]);


        // Registro correcto
        res.status(201).json({

            mensaje: 'Cuenta creada correctamente',

            usuario: {
                id: resultado.insertId,
                nombre: nombre.trim(),
                apellido: apellido.trim(),
                email: emailNormalizado,
                rolId: 2
            }

        });


    } catch (error) {

        console.error(
            'Error al registrar usuario:',
            error
        );


        res.status(500).json({
            mensaje: 'Error al crear la cuenta'
        });

    }

});

// ==========================================
// ADMIN - OBTENER COMENTARIOS PENDIENTES
// ==========================================

app.get(
    '/api/admin/comentarios/productos',
    verificarToken,
    verificarAdmin,
    async (req, res) => {

        try {

            const [comentarios] =
                await pool.query(`
                    SELECT
                        cp.id,
                        cp.titulo,
                        cp.comentario,
                        cp.calificacion,
                        cp.fechaComentario,
                        cp.estado,

                        u.id AS usuarioId,
                        u.nombre AS usuarioNombre,
                        u.apellido AS usuarioApellido,

                        p.id AS productoId,
                        p.nombre AS productoNombre,

                        m.nombre AS marca

                    FROM comentarioProducto cp

                    INNER JOIN usuario u
                        ON cp.usuarioId = u.id

                    INNER JOIN producto p
                        ON cp.productoId = p.id

                    INNER JOIN marca m
                        ON p.marcaId = m.id

                    WHERE cp.estado = 'pendiente'

                    ORDER BY cp.fechaComentario DESC
                `);


            res.json(comentarios);


        } catch (error) {

            console.error(
                'Error al obtener comentarios pendientes:',
                error
            );

            res.status(500).json({
                mensaje:
                    'Error al obtener los comentarios pendientes'
            });

        }

    }
);

// ==========================================
// ADMIN - MODERAR COMENTARIO DE PRODUCTO
// ==========================================

app.patch(
    '/api/admin/comentarios/productos/:id',
    verificarToken,
    verificarAdmin,
    async (req, res) => {

        try {

            const comentarioId =
                Number(req.params.id);

            const { estado } =
                req.body;


            // ==================================
            // VALIDAR ID
            // ==================================

            if (
                !Number.isInteger(comentarioId) ||
                comentarioId <= 0
            ) {

                return res.status(400).json({
                    mensaje:
                        'ID de comentario inválido'
                });

            }


            // ==================================
            // VALIDAR ESTADO
            // ==================================

            if (
                estado !== 'aprobado' &&
                estado !== 'rechazado'
            ) {

                return res.status(400).json({
                    mensaje:
                        'Estado de moderación inválido'
                });

            }


            // ==================================
            // BUSCAR COMENTARIO
            // ==================================

            const [comentarios] =
                await pool.query(`
                    SELECT
                        id,
                        estado
                    FROM comentarioProducto
                    WHERE id = ?
                    LIMIT 1
                `, [comentarioId]);


            if (comentarios.length === 0) {

                return res.status(404).json({
                    mensaje:
                        'Comentario no encontrado'
                });

            }


            // ==================================
            // SOLO MODERAR PENDIENTES
            // ==================================

            if (
                comentarios[0].estado !==
                'pendiente'
            ) {

                return res.status(409).json({
                    mensaje:
                        'El comentario ya fue moderado'
                });

            }


            // ==================================
            // ACTUALIZAR ESTADO
            // ==================================

            await pool.query(`
                UPDATE comentarioProducto
                SET estado = ?
                WHERE id = ?
            `, [
                estado,
                comentarioId
            ]);


            // ==================================
            // RESPUESTA
            // ==================================

            res.json({
                mensaje:
                    estado === 'aprobado'
                        ? 'Comentario aprobado correctamente'
                        : 'Comentario rechazado correctamente'
            });


        } catch (error) {

            console.error(
                'Error al moderar comentario:',
                error
            );


            res.status(500).json({
                mensaje:
                    'Error al moderar el comentario'
            });

        }

    }
);

// ==========================================
// OBTENER TODOS LOS PRODUCTOS
// ==========================================

app.get('/api/productos', async (req, res) => {

    try {

        const [productos] = await pool.query(`
            SELECT
                p.id,
                p.nombre,
                p.descripcion,
                p.ingredientes,
                p.informacionNutricional,
                p.imagen,
                p.codigoBarras,
                p.certificadoSinTacc,
                m.nombre AS marca,
                c.nombre AS categoria
            FROM producto p
            INNER JOIN marca m
                ON p.marcaId = m.id
            INNER JOIN categoria c
                ON p.categoriaId = c.id
            ORDER BY p.id
        `);

        res.json(productos);

    } catch (error) {

        console.error(
            'Error al obtener productos:',
            error
        );

        res.status(500).json({
            mensaje: 'Error al obtener los productos'
        });

    }

});



// ==========================================
// OBTENER COMENTARIOS APROBADOS DE UN PRODUCTO
// ==========================================

app.get('/api/productos/:id/comentarios', async (req, res) => {

    try {

        const { id } = req.params;

        const productoId = Number(id);


        // Validar ID
        if (
            !Number.isInteger(productoId) ||
            productoId <= 0
        ) {

            return res.status(400).json({
                mensaje: 'ID de producto inválido'
            });

        }


        // Buscar comentarios aprobados
        const [comentarios] = await pool.query(`
            SELECT
                cp.id,
                cp.titulo,
                cp.comentario,
                cp.calificacion,
                cp.fechaComentario,
                u.nombre,
                u.apellido
            FROM comentarioProducto cp
            INNER JOIN usuario u
                ON cp.usuarioId = u.id
            WHERE cp.productoId = ?
                AND cp.estado = 'aprobado'
            ORDER BY cp.fechaComentario DESC
        `, [productoId]);


        res.json(comentarios);


    } catch (error) {

        console.error(
            'Error al obtener comentarios:',
            error
        );

        res.status(500).json({
            mensaje: 'Error al obtener los comentarios'
        });

    }

});

// ==========================================
// CREAR COMENTARIO DE UN PRODUCTO
// ==========================================

app.post(
    '/api/productos/:id/comentarios',
    verificarToken,
    async (req, res) => {

        try {

            const { id } = req.params;

            const {
                titulo,
                comentario,
                calificacion
            } = req.body;


            const productoId =
                Number(id);

            const usuarioId =
                Number(req.usuario.id);

            const calificacionNumero =
                Number(calificacion);


            // ==================================
            // VALIDAR PRODUCTO
            // ==================================

            if (
                !Number.isInteger(productoId) ||
                productoId <= 0
            ) {

                return res.status(400).json({
                    mensaje:
                        'ID de producto inválido'
                });

            }


            // ==================================
            // VALIDAR CAMPOS
            // ==================================

            if (
                !titulo ||
                !titulo.trim() ||
                !comentario ||
                !comentario.trim()
            ) {

                return res.status(400).json({
                    mensaje:
                        'Título y comentario son obligatorios'
                });

            }


            if (
                !Number.isInteger(
                    calificacionNumero
                ) ||
                calificacionNumero < 1 ||
                calificacionNumero > 5
            ) {

                return res.status(400).json({
                    mensaje:
                        'La calificación debe ser entre 1 y 5 estrellas'
                });

            }


            // ==================================
            // VERIFICAR QUE EXISTA EL PRODUCTO
            // ==================================

            const [productos] =
                await pool.query(`
                    SELECT id
                    FROM producto
                    WHERE id = ?
                    LIMIT 1
                `, [productoId]);


            if (productos.length === 0) {

                return res.status(404).json({
                    mensaje:
                        'Producto no encontrado'
                });

            }


            // ==================================
            // VERIFICAR COMENTARIO EXISTENTE
            // ==================================

            const [comentariosExistentes] =
                await pool.query(`
                    SELECT id
                    FROM comentarioProducto
                    WHERE usuarioId = ?
                        AND productoId = ?
                    LIMIT 1
                `, [
                    usuarioId,
                    productoId
                ]);


            if (
                comentariosExistentes.length > 0
            ) {

                return res.status(409).json({
                    mensaje:
                        'Ya dejaste una opinión para este producto'
                });

            }


            // ==================================
            // CREAR COMENTARIO
            // ==================================

            const [resultado] =
                await pool.query(`
                    INSERT INTO comentarioProducto (
                        titulo,
                        comentario,
                        calificacion,
                        estado,
                        usuarioId,
                        productoId
                    )
                    VALUES (?, ?, ?, 'pendiente', ?, ?)
                `, [
                    titulo.trim(),
                    comentario.trim(),
                    calificacionNumero,
                    usuarioId,
                    productoId
                ]);


            // ==================================
            // RESPUESTA
            // ==================================

            res.status(201).json({

                mensaje:
                    'Tu opinión fue enviada y está pendiente de aprobación',

                comentario: {
                    id: resultado.insertId,
                    titulo: titulo.trim(),
                    comentario:
                        comentario.trim(),
                    calificacion:
                        calificacionNumero,
                    estado: 'pendiente',
                    productoId:
                        productoId
                }

            });


        } catch (error) {

            console.error(
                'Error al crear comentario:',
                error
            );


            res.status(500).json({
                mensaje:
                    'Error al enviar la opinión'
            });

        }

    }
);

// ==========================================
// OBTENER UN PRODUCTO POR ID
// ==========================================

app.get('/api/productos/:id', async (req, res) => {

    try {

        const { id } = req.params;


        // Validar que el ID sea un número válido
        const productoId = Number(id);

        if (
            !Number.isInteger(productoId) ||
            productoId <= 0
        ) {

            return res.status(400).json({
                mensaje: 'ID de producto inválido'
            });

        }


        const [productos] = await pool.query(`
            SELECT
                p.id,
                p.nombre,
                p.descripcion,
                p.ingredientes,
                p.informacionNutricional,
                p.imagen,
                p.codigoBarras,
                p.certificadoSinTacc,
                m.nombre AS marca,
                c.nombre AS categoria
            FROM producto p
            INNER JOIN marca m
                ON p.marcaId = m.id
            INNER JOIN categoria c
                ON p.categoriaId = c.id
            WHERE p.id = ?
        `, [productoId]);


        // Si el producto no existe
        if (productos.length === 0) {

            return res.status(404).json({
                mensaje: 'Producto no encontrado'
            });

        }


        // Devolver un solo producto
        res.json(productos[0]);


    } catch (error) {

        console.error(
            'Error al obtener el producto:',
            error
        );

        res.status(500).json({
            mensaje: 'Error al obtener el producto'
        });

    }

});

// ==========================================
// OBTENER TODOS LOS RESTAURANTES VERIFICADOS
// ==========================================

app.get('/api/restaurantes', async (req, res) => {

    try {

        const [restaurantes] = await pool.query(`
            SELECT
                r.id,
                r.nombre,
                r.descripcion,
                r.direccion,
                r.imagenExterior,
                r.imagenInterior,
                r.sitioWeb,
                r.horario,
                r.latitud,
                r.longitud,
                r.instagram,
                r.email,
                r.telefono,
                r.estadoVerificacion,
                r.calificacionPromedio,
                r.cantidadResenas,
                tr.nombre AS tipoRestaurante,
                b.nombre AS barrio
            FROM restaurante r
            INNER JOIN tipoRestaurante tr
                ON r.tipoRestauranteId = tr.id
            INNER JOIN barrio b
                ON r.barrioId = b.id
            WHERE r.estadoVerificacion = 'verificado'
            ORDER BY r.nombre ASC
        `);

        res.json(restaurantes);

    } catch (error) {

        console.error(
            'Error al obtener restaurantes:',
            error
        );

        res.status(500).json({
            mensaje: 'Error al obtener los restaurantes'
        });

    }

});

// ==========================================
// OBTENER COMENTARIOS APROBADOS DE UN RESTAURANTE
// ==========================================

app.get('/api/restaurantes/:id/comentarios', async (req, res) => {

    try {

        const restauranteId =
            Number(req.params.id);


        // Validar ID
        if (
            !Number.isInteger(restauranteId) ||
            restauranteId <= 0
        ) {

            return res.status(400).json({
                mensaje: 'ID de restaurante inválido'
            });

        }


        // Buscar comentarios aprobados
        const [comentarios] = await pool.query(`
            SELECT
                cr.id,
                cr.titulo,
                cr.comentario,
                cr.calificacion,
                cr.fechaComentario,
                u.nombre,
                u.apellido
            FROM comentarioRestaurante cr
            INNER JOIN usuario u
                ON cr.usuarioId = u.id
            INNER JOIN restaurante r
                ON cr.restauranteId = r.id
            WHERE cr.restauranteId = ?
                AND cr.estado = 'aprobado'
                AND r.estadoVerificacion = 'verificado'
            ORDER BY cr.fechaComentario DESC
        `, [restauranteId]);


        res.json(comentarios);


    } catch (error) {

        console.error(
            'Error al obtener comentarios del restaurante:',
            error
        );

        res.status(500).json({
            mensaje: 'Error al obtener los comentarios'
        });

    }

});

// ==========================================
// CREAR COMENTARIO DE UN RESTAURANTE
// ==========================================

app.post(
    '/api/restaurantes/:id/comentarios',
    verificarToken,
    async (req, res) => {

        try {

            const restauranteId =
                Number(req.params.id);

            const usuarioId =
                Number(req.usuario.id);

            const {
                titulo,
                comentario,
                calificacion
            } = req.body;

            const calificacionNumero =
                Number(calificacion);


            // ==================================
            // VALIDAR RESTAURANTE
            // ==================================

            if (
                !Number.isInteger(restauranteId) ||
                restauranteId <= 0
            ) {

                return res.status(400).json({
                    mensaje:
                        'ID de restaurante inválido'
                });

            }


            // ==================================
            // VALIDAR CAMPOS
            // ==================================

            if (
                !titulo ||
                !titulo.trim() ||
                !comentario ||
                !comentario.trim()
            ) {

                return res.status(400).json({
                    mensaje:
                        'Título y comentario son obligatorios'
                });

            }


            if (titulo.trim().length > 150) {

                return res.status(400).json({
                    mensaje:
                        'El título no puede superar los 150 caracteres'
                });

            }


            if (
                !Number.isInteger(calificacionNumero) ||
                calificacionNumero < 1 ||
                calificacionNumero > 5
            ) {

                return res.status(400).json({
                    mensaje:
                        'La calificación debe ser entre 1 y 5 estrellas'
                });

            }


            // ==================================
            // VERIFICAR RESTAURANTE
            // ==================================

            const [restaurantes] =
                await pool.query(`
                    SELECT id
                    FROM restaurante
                    WHERE id = ?
                        AND estadoVerificacion = 'verificado'
                    LIMIT 1
                `, [restauranteId]);


            if (restaurantes.length === 0) {

                return res.status(404).json({
                    mensaje:
                        'Restaurante no encontrado'
                });

            }


            // ==================================
            // VERIFICAR OPINIÓN EXISTENTE
            // ==================================

            const [comentariosExistentes] =
                await pool.query(`
                    SELECT id
                    FROM comentarioRestaurante
                    WHERE usuarioId = ?
                        AND restauranteId = ?
                    LIMIT 1
                `, [
                    usuarioId,
                    restauranteId
                ]);


            if (comentariosExistentes.length > 0) {

                return res.status(409).json({
                    mensaje:
                        'Ya dejaste una opinión para este restaurante'
                });

            }


            // ==================================
            // CREAR COMENTARIO
            // ==================================

            const [resultado] =
                await pool.query(`
                    INSERT INTO comentarioRestaurante (
                        titulo,
                        comentario,
                        calificacion,
                        estado,
                        usuarioId,
                        restauranteId
                    )
                    VALUES (?, ?, ?, 'pendiente', ?, ?)
                `, [
                    titulo.trim(),
                    comentario.trim(),
                    calificacionNumero,
                    usuarioId,
                    restauranteId
                ]);


            // ==================================
            // RESPUESTA
            // ==================================

            res.status(201).json({

                mensaje:
                    'Tu opinión fue enviada y está pendiente de aprobación',

                comentario: {
                    id: resultado.insertId,
                    titulo: titulo.trim(),
                    comentario: comentario.trim(),
                    calificacion: calificacionNumero,
                    estado: 'pendiente',
                    restauranteId: restauranteId
                }

            });


        } catch (error) {

            console.error(
                'Error al crear comentario de restaurante:',
                error
            );


            res.status(500).json({
                mensaje:
                    'Error al enviar la opinión'
            });

        }

    }
);

// ==========================================
// OBTENER UN RESTAURANTE POR ID
// ==========================================

app.get('/api/restaurantes/:id', async (req, res) => {

    try {

        const { id } = req.params;

        const restauranteId = Number(id);

        // Validar ID
        if (
            !Number.isInteger(restauranteId) ||
            restauranteId <= 0
        ) {

            return res.status(400).json({
                mensaje: 'ID de restaurante inválido'
            });

        }


        // Buscar restaurante
        const [restaurantes] = await pool.query(`
            SELECT
                r.id,
                r.nombre,
                r.descripcion,
                r.direccion,
                r.imagenExterior,
                r.imagenInterior,
                r.sitioWeb,
                r.horario,
                r.latitud,
                r.longitud,
                r.instagram,
                r.email,
                r.telefono,
                r.estadoVerificacion,
                r.calificacionPromedio,
                r.cantidadResenas,
                tr.nombre AS tipoRestaurante,
                b.nombre AS barrio
            FROM restaurante r
            INNER JOIN tipoRestaurante tr
                ON r.tipoRestauranteId = tr.id
            INNER JOIN barrio b
                ON r.barrioId = b.id
            WHERE r.id = ?
                AND r.estadoVerificacion = 'verificado'
            LIMIT 1
        `, [restauranteId]);


        // Restaurante inexistente o no verificado
        if (restaurantes.length === 0) {

            return res.status(404).json({
                mensaje: 'Restaurante no encontrado'
            });

        }


        // Devolver un solo restaurante
        res.json(restaurantes[0]);


    } catch (error) {

        console.error(
            'Error al obtener el restaurante:',
            error
        );

        res.status(500).json({
            mensaje: 'Error al obtener el restaurante'
        });

    }

});

// ==========================================
// INICIAR SERVIDOR
// ==========================================

app.listen(PORT, () => {

    console.log(
        `CeliaConnect API funcionando en http://localhost:${PORT}`
    );

});
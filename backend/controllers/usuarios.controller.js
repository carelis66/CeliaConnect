const pool = require('../db');
const bcrypt = require('bcrypt');


// ==========================================
// ADMIN - OBTENER USUARIOS
// ==========================================

async function obtenerUsuarios(req, res) {

    try {

        const [usuarios] = await pool.query(`
            SELECT
                u.id,
                u.documento,
                u.nombre,
                u.apellido,
                u.genero,
                u.email,
                u.telefono,
                u.fotoPerfil,
                u.fechaNacimiento,
                u.fechaRegistro,
                u.esActivo,
                u.rolId,
                r.nombre AS rol
            FROM usuario u
            INNER JOIN rol r
                ON u.rolId = r.id
            ORDER BY u.fechaRegistro DESC
        `);


        res.json(usuarios);


    } catch (error) {

        console.error(
            'Error al obtener usuarios para admin:',
            error
        );


        res.status(500).json({
            mensaje:
                'Error al obtener los usuarios'
        });

    }

}


// ==========================================
// ADMIN - CREAR USUARIO
// ==========================================

async function crearUsuario(req, res) {

    try {

        const {
            documento,
            nombre,
            apellido,
            genero,
            email,
            password,
            telefono,
            fechaNacimiento,
            rolId
        } = req.body;


        // CAMPOS OBLIGATORIOS
        if (
            !documento ||
            !nombre ||
            !apellido ||
            !email ||
            !password ||
            !rolId
        ) {

            return res.status(400).json({
                mensaje:
                    'Completá todos los campos obligatorios'
            });

        }


        // VALIDAR ROL
        const rolNumero =
            Number(rolId);


        if (
            rolNumero !== 1 &&
            rolNumero !== 2 &&
            rolNumero !== 3
        ) {

            return res.status(400).json({
                mensaje:
                    'Rol inválido'
            });

        }


        // VERIFICAR EMAIL
        const [emailExistente] =
            await pool.query(
                `
                    SELECT id
                    FROM usuario
                    WHERE email = ?
                    LIMIT 1
                `,
                [email]
            );


        if (emailExistente.length > 0) {

            return res.status(409).json({
                mensaje:
                    'Ya existe un usuario con ese email'
            });

        }


        // VERIFICAR DOCUMENTO
        const [documentoExistente] =
            await pool.query(
                `
                    SELECT id
                    FROM usuario
                    WHERE documento = ?
                    LIMIT 1
                `,
                [documento]
            );


        if (documentoExistente.length > 0) {

            return res.status(409).json({
                mensaje:
                    'Ya existe un usuario con ese documento'
            });

        }


        // ENCRIPTAR CONTRASEÑA
        const passwordHash =
            await bcrypt.hash(
                password,
                10
            );


        // CREAR USUARIO
        const [resultado] =
            await pool.query(
                `
                    INSERT INTO usuario (
                        documento,
                        nombre,
                        apellido,
                        genero,
                        email,
                        password,
                        telefono,
                        fechaNacimiento,
                        esActivo,
                        rolId
                    )
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1, ?)
                `,
                [
                    documento,
                    nombre,
                    apellido,
                    genero || null,
                    email,
                    passwordHash,
                    telefono || null,
                    fechaNacimiento || null,
                    rolNumero
                ]
            );


        res.status(201).json({
            mensaje:
                'Usuario creado correctamente',

            id:
                resultado.insertId
        });


    } catch (error) {

        console.error(
            'Error al crear usuario:',
            error
        );


        res.status(500).json({
            mensaje:
                'Error al crear el usuario'
        });

    }

}


// ==========================================
// ADMIN - ACTUALIZAR USUARIO
// ==========================================

async function actualizarUsuario(req, res) {

    try {

        const usuarioId =
            Number(req.params.id);


        const {
            documento,
            nombre,
            apellido,
            genero,
            email,
            telefono,
            fechaNacimiento,
            rolId,
            esActivo
        } = req.body;


        // VALIDAR ID
        if (
            !Number.isInteger(usuarioId) ||
            usuarioId <= 0
        ) {

            return res.status(400).json({
                mensaje:
                    'Usuario inválido'
            });

        }


        // CAMPOS OBLIGATORIOS
        if (
            !documento ||
            !nombre ||
            !apellido ||
            !email ||
            !rolId
        ) {

            return res.status(400).json({
                mensaje:
                    'Completá todos los campos obligatorios'
            });

        }


        // VERIFICAR QUE EL USUARIO EXISTA
        const [usuarioExistente] =
            await pool.query(
                `
                    SELECT id
                    FROM usuario
                    WHERE id = ?
                    LIMIT 1
                `,
                [usuarioId]
            );


        if (usuarioExistente.length === 0) {

            return res.status(404).json({
                mensaje:
                    'El usuario no existe'
            });

        }


        // VALIDAR ROL
        const rolNumero =
            Number(rolId);


        if (
            rolNumero !== 1 &&
            rolNumero !== 2 &&
            rolNumero !== 3
        ) {

            return res.status(400).json({
                mensaje:
                    'Rol inválido'
            });

        }


        // VERIFICAR EMAIL DUPLICADO
        const [emailExistente] =
            await pool.query(
                `
                    SELECT id
                    FROM usuario
                    WHERE email = ?
                    AND id <> ?
                    LIMIT 1
                `,
                [
                    email,
                    usuarioId
                ]
            );


        if (emailExistente.length > 0) {

            return res.status(409).json({
                mensaje:
                    'Ya existe otro usuario con ese email'
            });

        }


        // VERIFICAR DOCUMENTO DUPLICADO
        const [documentoExistente] =
            await pool.query(
                `
                    SELECT id
                    FROM usuario
                    WHERE documento = ?
                    AND id <> ?
                    LIMIT 1
                `,
                [
                    documento,
                    usuarioId
                ]
            );


        if (documentoExistente.length > 0) {

            return res.status(409).json({
                mensaje:
                    'Ya existe otro usuario con ese documento'
            });

        }


        // NORMALIZAR ESTADO
        const activo =
            Number(esActivo) === 1
                ? 1
                : 0;


        // ACTUALIZAR USUARIO
        await pool.query(
            `
                UPDATE usuario
                SET
                    documento = ?,
                    nombre = ?,
                    apellido = ?,
                    genero = ?,
                    email = ?,
                    telefono = ?,
                    fechaNacimiento = ?,
                    esActivo = ?,
                    rolId = ?
                WHERE id = ?
            `,
            [
                documento,
                nombre,
                apellido,
                genero || null,
                email,
                telefono || null,
                fechaNacimiento || null,
                activo,
                rolNumero,
                usuarioId
            ]
        );


        res.json({
            mensaje:
                'Usuario actualizado correctamente'
        });


    } catch (error) {

        console.error(
            'Error al actualizar usuario:',
            error
        );


        res.status(500).json({
            mensaje:
                'Error al actualizar el usuario'
        });

    }

}


// ==========================================
// EXPORTAR CONTROLADORES
// ==========================================

module.exports = {
    obtenerUsuarios,
    crearUsuario,
    actualizarUsuario
};
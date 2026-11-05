const express = require('express');

const router = express.Router();

const {
    obtenerUsuarios,
    crearUsuario,
    actualizarUsuario
} = require('../controllers/usuarios.controller');

const {
    verificarToken,
    verificarAdmin
} = require('../middleware/auth.middleware');


// ==========================================
// ADMIN - OBTENER USUARIOS
// ==========================================

router.get(
    '/',
    verificarToken,
    verificarAdmin,
    obtenerUsuarios
);


// ==========================================
// ADMIN - CREAR USUARIO
// ==========================================

router.post(
    '/',
    verificarToken,
    verificarAdmin,
    crearUsuario
);


// ==========================================
// ADMIN - ACTUALIZAR USUARIO
// ==========================================

router.put(
    '/:id',
    verificarToken,
    verificarAdmin,
    actualizarUsuario
);


module.exports = router;
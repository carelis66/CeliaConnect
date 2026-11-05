const jwt = require('jsonwebtoken');


// ==========================================
// VERIFICAR TOKEN
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
// VERIFICAR ADMINISTRADOR O MODERADOR
// ==========================================

function verificarAdminOModerador(req, res, next) {

    if (!req.usuario) {

        return res.status(401).json({
            mensaje:
                'Debés iniciar sesión'
        });

    }


    const rolId =
        Number(req.usuario.rolId);


    if (
        rolId !== 1 &&
        rolId !== 3
    ) {

        return res.status(403).json({
            mensaje:
                'No tenés permisos para realizar esta acción'
        });

    }


    next();

}


// ==========================================
// EXPORTAR MIDDLEWARE
// ==========================================

module.exports = {
    verificarToken,
    verificarAdmin,
    verificarAdminOModerador
};
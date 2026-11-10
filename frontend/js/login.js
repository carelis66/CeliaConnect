const API_LOGIN =
    'https://celiaconnect-production.up.railway.app/api/login';


// ==========================================
// INICIAR LOGIN
// ==========================================

document.addEventListener(
    'DOMContentLoaded',
    () => {

        const formulario =
            document.getElementById(
                'login-form'
            );

        if (!formulario) return;

        formulario.addEventListener(
            'submit',
            iniciarSesion
        );

    }
);


// ==========================================
// INICIAR SESIÓN
// ==========================================

async function iniciarSesion(evento) {

    evento.preventDefault();


    const email =
        document.getElementById(
            'email'
        ).value.trim();


    const password =
        document.getElementById(
            'password'
        ).value;


    const recordarme =
        document.getElementById(
            'recordarme'
        ).checked;


    const boton =
        document.getElementById(
            'btn-login'
        );


    ocultarMensaje();


    // ==========================================
    // VALIDAR EMAIL
    // ==========================================

    if (!email) {

        mostrarMensaje(
            'Ingresá tu correo electrónico.',
            'danger'
        );

        document
            .getElementById('email')
            .focus();

        return;
    }


    const emailValido =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailValido.test(email)) {

        mostrarMensaje(
            'Ingresá un correo electrónico válido.',
            'danger'
        );

        document
            .getElementById('email')
            .focus();

        return;
    }


    // ==========================================
    // VALIDAR CONTRASEÑA
    // ==========================================

    if (!password) {

        mostrarMensaje(
            'Ingresá tu contraseña.',
            'danger'
        );

        document
            .getElementById('password')
            .focus();

        return;
    }


    if (password.length < 8) {

        mostrarMensaje(
            'La contraseña debe tener al menos 8 caracteres.',
            'danger'
        );

        document
            .getElementById('password')
            .focus();

        return;
    }


    // ==========================================
    // ENVIAR LOGIN
    // ==========================================

    boton.disabled = true;

    boton.innerHTML = `
        <span
            class="spinner-border spinner-border-sm me-2"
            aria-hidden="true">
        </span>
        Ingresando...
    `;


    try {

        const respuesta =
            await fetch(
                API_LOGIN,
                {
                    method: 'POST',

                    headers: {
                        'Content-Type':
                            'application/json'
                    },

                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );


        const datos =
            await respuesta.json();


        if (!respuesta.ok) {

            mostrarMensaje(
                datos.mensaje ||
                'No se pudo iniciar sesión',
                'danger'
            );

            return;
        }


        // ==========================================
        // GUARDAR USUARIO Y TOKEN
        // ==========================================

        const usuarioJSON =
            JSON.stringify(
                datos.usuario
            );


        if (recordarme) {

            localStorage.setItem(
                'celiaUsuario',
                usuarioJSON
            );

            localStorage.setItem(
                'celiaToken',
                datos.token
            );


            sessionStorage.removeItem(
                'celiaUsuario'
            );

            sessionStorage.removeItem(
                'celiaToken'
            );

        } else {

            sessionStorage.setItem(
                'celiaUsuario',
                usuarioJSON
            );

            sessionStorage.setItem(
                'celiaToken',
                datos.token
            );


            localStorage.removeItem(
                'celiaUsuario'
            );

            localStorage.removeItem(
                'celiaToken'
            );

        }


        mostrarMensaje(
            `¡Bienvenida, ${datos.usuario.nombre}!`,
            'success'
        );


        // ==========================================
        // REDIRECCIÓN SEGÚN ROL
        // ==========================================

        setTimeout(
            () => {

                if (
                    Number(datos.usuario.rolId) === 1
                ) {

                    // Administrador
                    window.location.href =
                        'admin/index.html';

                } else {

                    // Usuario común / moderador
                    window.location.href =
                        'index.html';

                }

            },
            2000
        );


    } catch (error) {

        console.error(
            'Error en login:',
            error
        );


        mostrarMensaje(
            'No se pudo conectar con el servidor.',
            'danger'
        );


    } finally {

        boton.disabled = false;

        boton.innerHTML = `
            Ingresar
            <i class="bi bi-arrow-right ms-1"></i>
        `;

    }

}


// ==========================================
// MOSTRAR MENSAJE
// ==========================================

function mostrarMensaje(
    texto,
    tipo
) {

    const mensaje =
        document.getElementById(
            'login-mensaje'
        );


    mensaje.textContent =
        texto;


    mensaje.className =
        `alert alert-${tipo}`;

}


// ==========================================
// OCULTAR MENSAJE
// ==========================================

function ocultarMensaje() {

    const mensaje =
        document.getElementById(
            'login-mensaje'
        );


    mensaje.textContent = '';

    mensaje.className =
        'alert d-none';

}
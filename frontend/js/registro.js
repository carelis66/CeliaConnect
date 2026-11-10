const API_REGISTRO =
    'https://celiaconnect-production.up.railway.app/api/registro';


document.addEventListener(
    'DOMContentLoaded',
    () => {

        const formulario =
            document.getElementById(
                'registro-form'
            );

        if (!formulario) return;


        formulario.addEventListener(
            'submit',
            registrarUsuario
        );

    }
);


async function registrarUsuario(evento) {

    evento.preventDefault();


    const nombre =
        document.getElementById(
            'nombre'
        ).value.trim();

    const apellido =
        document.getElementById(
            'apellido'
        ).value.trim();

    const documento =
        document.getElementById(
            'documento'
        ).value.trim();

    const email =
        document.getElementById(
            'email'
        ).value.trim();

    const password =
        document.getElementById(
            'password'
        ).value;

    const password2 =
        document.getElementById(
            'password2'
        ).value;

    const terminos =
        document.getElementById(
            'terminos'
        ).checked;

    const boton =
        document.getElementById(
            'btn-registro'
        );


    ocultarMensaje();


    // ==========================================
    // VALIDAR CAMPOS OBLIGATORIOS
    // ==========================================

    if (!nombre) {

        mostrarMensaje(
            'Ingresá tu nombre.',
            'danger'
        );

        document
            .getElementById('nombre')
            .focus();

        return;
    }


    if (!apellido) {

        mostrarMensaje(
            'Ingresá tu apellido.',
            'danger'
        );

        document
            .getElementById('apellido')
            .focus();

        return;
    }


    if (!documento) {

        mostrarMensaje(
            'Ingresá tu documento.',
            'danger'
        );

        document
            .getElementById('documento')
            .focus();

        return;
    }


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
            'Ingresá una contraseña.',
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
    // VALIDAR REPETIR CONTRASEÑA
    // ==========================================

    if (!password2) {

        mostrarMensaje(
            'Repetí tu contraseña.',
            'danger'
        );

        document
            .getElementById('password2')
            .focus();

        return;
    }


    if (password !== password2) {

        mostrarMensaje(
            'Las contraseñas no coinciden.',
            'danger'
        );

        document
            .getElementById('password2')
            .focus();

        return;
    }


    // ==========================================
    // VALIDAR TÉRMINOS
    // ==========================================

    if (!terminos) {

        mostrarMensaje(
            'Debés aceptar los Términos y condiciones y la Política de privacidad.',
            'danger'
        );

        document
            .getElementById('terminos')
            .focus();

        return;
    }


    // ==========================================
    // ENVIAR REGISTRO
    // ==========================================

    boton.disabled = true;

    boton.innerHTML = `
        <span
            class="spinner-border spinner-border-sm me-2"
            aria-hidden="true">
        </span>
        Creando cuenta...
    `;


    try {

        const respuesta =
            await fetch(
                API_REGISTRO,
                {
                    method: 'POST',

                    headers: {
                        'Content-Type':
                            'application/json'
                    },

                    body: JSON.stringify({
                        nombre,
                        apellido,
                        documento,
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
                'No se pudo crear la cuenta.',
                'danger'
            );

            return;
        }


        mostrarMensaje(
            '¡Cuenta creada correctamente! Ya podés iniciar sesión.',
            'success'
        );


        document
            .getElementById(
                'registro-form'
            )
            .reset();


        setTimeout(
            () => {

                window.location.href =
                    'login.html';

            },
            5000
        );


    } catch (error) {

        console.error(
            'Error en registro:',
            error
        );


        mostrarMensaje(
            'No se pudo conectar con el servidor.',
            'danger'
        );


    } finally {

        boton.disabled = false;

        boton.innerHTML = `
            Crear cuenta
            <i class="bi bi-arrow-right ms-1"></i>
        `;

    }
}


function mostrarMensaje(texto, tipo) {

    const mensaje =
        document.getElementById(
            'registro-mensaje'
        );


    mensaje.textContent =
        texto;

    mensaje.className =
        `alert alert-${tipo}`;

}


function ocultarMensaje() {

    const mensaje =
        document.getElementById(
            'registro-mensaje'
        );


    mensaje.textContent = '';

    mensaje.className =
        'alert d-none';

}
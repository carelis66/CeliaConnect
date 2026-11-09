// ==========================================
// CELIACONNECT - CONTACTO
// ==========================================


// ==========================================
// ELEMENTOS DEL DOM
// ==========================================

const formularioContacto =
    document.getElementById('contacto-form');

const mensajeExito =
    document.getElementById('contacto-exito');

const nombre =
    document.getElementById('contacto-nombre');

const email =
    document.getElementById('contacto-email');

const motivo =
    document.getElementById('contacto-motivo');

const mensaje =
    document.getElementById('contacto-mensaje');


// ==========================================
// VALIDAR EMAIL
// ==========================================

function emailValido(valor) {

    const expresion =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return expresion.test(valor);
}


// ==========================================
// MARCAR CAMPO INVÁLIDO
// ==========================================

function marcarInvalido(campo) {

    campo.classList.add('is-invalid');

    campo.classList.remove('is-valid');
}


// ==========================================
// MARCAR CAMPO VÁLIDO
// ==========================================

function marcarValido(campo) {

    campo.classList.remove('is-invalid');

    campo.classList.add('is-valid');
}


// ==========================================
// LIMPIAR ESTADO DE CAMPO
// ==========================================

function limpiarEstado(campo) {

    campo.classList.remove(
        'is-invalid',
        'is-valid'
    );
}


// ==========================================
// VALIDAR FORMULARIO
// ==========================================

function validarFormulario() {

    let formularioValido = true;


    // Nombre

    if (nombre.value.trim().length < 2) {

        marcarInvalido(nombre);

        formularioValido = false;

    } else {

        marcarValido(nombre);
    }


    // Email

    if (!emailValido(email.value.trim())) {

        marcarInvalido(email);

        formularioValido = false;

    } else {

        marcarValido(email);
    }


    // Motivo

    if (!motivo.value) {

        marcarInvalido(motivo);

        formularioValido = false;

    } else {

        marcarValido(motivo);
    }


    // Mensaje

    if (mensaje.value.trim().length < 5) {

        marcarInvalido(mensaje);

        formularioValido = false;

    } else {

        marcarValido(mensaje);
    }


    return formularioValido;
}


// ==========================================
// QUITAR ERROR AL CORREGIR
// ==========================================

nombre.addEventListener('input', () => {

    if (nombre.value.trim().length >= 2) {

        limpiarEstado(nombre);
    }
});


email.addEventListener('input', () => {

    if (emailValido(email.value.trim())) {

        limpiarEstado(email);
    }
});


motivo.addEventListener('change', () => {

    if (motivo.value) {

        limpiarEstado(motivo);
    }
});


mensaje.addEventListener('input', () => {

    if (mensaje.value.trim().length >= 5) {

        limpiarEstado(mensaje);
    }
});


// ==========================================
// ENVIAR FORMULARIO
// ==========================================

formularioContacto.addEventListener(
    'submit',
    event => {

        event.preventDefault();


        // Ocultar mensaje anterior

        mensajeExito.classList.add('d-none');


        // Validar

        const esValido =
            validarFormulario();


        if (!esValido) {

            const primerCampoInvalido =
                formularioContacto.querySelector(
                    '.is-invalid'
                );


            if (primerCampoInvalido) {

                primerCampoInvalido.focus();
            }


            return;
        }


        // Mostrar confirmación

        mensajeExito.classList.remove('d-none');


        // Limpiar formulario

        formularioContacto.reset();


        // Limpiar estilos de validación

        [
            nombre,
            email,
            motivo,
            mensaje
        ].forEach(campo => {

            limpiarEstado(campo);
        });


        // Llevar suavemente al mensaje

        mensajeExito.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest'
        });
    }
);
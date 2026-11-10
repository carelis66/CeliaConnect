// ==========================================
// CELIACONNECT - DETALLE DE RESTAURANTE
// ==========================================

const API_RESTAURANTES =
    'https://celiaconnect-production.up.railway.app/api/restaurantes';


// ==========================================
// OBTENER ID DESDE LA URL
// ==========================================

const parametros =
    new URLSearchParams(window.location.search);

const restauranteId =
    Number(parametros.get('id'));


// ==========================================
// ELEMENTOS DEL DOM
// ==========================================

const cargando =
    document.getElementById('restaurante-cargando');

const error =
    document.getElementById('restaurante-error');

const detalle =
    document.getElementById('restaurante-detalle');

const breadcrumb =
    document.getElementById('breadcrumb-restaurante');

const imagen =
    document.getElementById('restaurante-imagen');

const tipo =
    document.getElementById('restaurante-tipo');

const nombre =
    document.getElementById('restaurante-nombre');

const calificacion =
    document.getElementById('restaurante-calificacion');

const descripcion =
    document.getElementById('restaurante-descripcion');

const direccion =
    document.getElementById('restaurante-direccion');

const barrio =
    document.getElementById('restaurante-barrio');

const horario =
    document.getElementById('restaurante-horario');

const telefonoContainer =
    document.getElementById(
        'restaurante-telefono-container'
    );

const telefono =
    document.getElementById('restaurante-telefono');

const emailContainer =
    document.getElementById(
        'restaurante-email-container'
    );

const email =
    document.getElementById('restaurante-email');

const webContainer =
    document.getElementById(
        'restaurante-web-container'
    );

const web =
    document.getElementById('restaurante-web');

const instagramContainer =
    document.getElementById(
        'restaurante-instagram-container'
    );

const instagram =
    document.getElementById('restaurante-instagram');

const mapaContainer =
    document.getElementById(
        'restaurante-mapa-container'
    );

const mapaVacio =
    document.getElementById(
        'restaurante-mapa-vacio'
    );

const mapa =
    document.getElementById('restaurante-mapa');

const comoLlegar =
    document.getElementById(
        'restaurante-como-llegar'
    );


// ==========================================
// ELEMENTOS DE OPINIONES
// ==========================================

const opinionFormulario =
    document.getElementById('opinion-formulario');

const opinionMensaje =
    document.getElementById('opinion-mensaje');

const opinionCalificacion =
    document.getElementById('opinion-calificacion');

const opinionTitulo =
    document.getElementById('opinion-titulo');

const opinionComentario =
    document.getElementById('opinion-comentario');

const btnEnviarOpinion =
    document.getElementById('btn-enviar-opinion');

const comentariosCargando =
    document.getElementById('comentarios-cargando');

const comentariosError =
    document.getElementById('comentarios-error');

const comentariosVacio =
    document.getElementById('comentarios-vacio');

const comentariosContainer =
    document.getElementById('comentarios-container');


// ==========================================
// OBTENER TOKEN DEL USUARIO
// ==========================================

function obtenerToken() {

    return (
        sessionStorage.getItem('celiaToken') ||
        localStorage.getItem('celiaToken')
    );

}


// ==========================================
// MOSTRAR ERROR
// ==========================================

function mostrarError(mensaje) {

    cargando.classList.add('d-none');

    detalle.classList.add('d-none');

    error.textContent = mensaje;

    error.classList.remove('d-none');

}


// ==========================================
// MOSTRAR CALIFICACIÓN
// ==========================================

function mostrarCalificacion(restaurante) {

    const valor =
        Number(restaurante.calificacionPromedio) || 0;

    const cantidad =
        Number(restaurante.cantidadResenas) || 0;


    if (cantidad === 0 || valor === 0) {

        calificacion.innerHTML = `
            <span class="text-muted">
                Sin reseñas
            </span>
        `;

        return;
    }


    calificacion.innerHTML = `
        <span class="text-warning">
            <i class="bi bi-star-fill"></i>
        </span>

        <strong class="ms-1">
            ${valor.toFixed(1)}
        </strong>

        <span class="text-muted ms-1">
            (${cantidad}
            ${cantidad === 1 ? 'reseña' : 'reseñas'})
        </span>
    `;

}


// ==========================================
// MOSTRAR FOTO DEL INTERIOR
// ==========================================

function mostrarImagen(restaurante) {

    if (
        restaurante.imagenInterior &&
        restaurante.imagenInterior.trim() !== ''
    ) {

        imagen.innerHTML = `
            <img
                src="${restaurante.imagenInterior}"
                alt="Interior de ${restaurante.nombre}"
                class="img-fluid w-100 h-100"
                style="object-fit: cover;"
            >
        `;

        return;
    }


    // Si el restaurante no tiene foto interior,
    // mostramos el icono por defecto.

    imagen.innerHTML = `
        <i
            class="bi bi-shop text-secondary"
            style="font-size: 6rem;"
        ></i>
    `;

}


// ==========================================
// MOSTRAR CONTACTO
// ==========================================

function mostrarContacto(restaurante) {

    if (restaurante.telefono) {

        telefono.textContent =
            restaurante.telefono;

        telefono.href =
            `tel:${restaurante.telefono}`;

    } else {

        telefonoContainer.classList.add('d-none');

    }


    if (restaurante.email) {

        email.textContent =
            restaurante.email;

        email.href =
            `mailto:${restaurante.email}`;

    } else {

        emailContainer.classList.add('d-none');

    }


    if (restaurante.sitioWeb) {

        web.href =
            restaurante.sitioWeb;

    } else {

        webContainer.classList.add('d-none');

    }


    if (restaurante.instagram) {

        const usuarioInstagram =
            restaurante.instagram
                .replace('@', '')
                .trim();

        instagram.textContent =
            `@${usuarioInstagram}`;

        instagram.href =
            `https://www.instagram.com/${usuarioInstagram}/`;

    } else {

        instagramContainer.classList.add('d-none');

    }

}


// ==========================================
// MOSTRAR MAPA
// ==========================================

function mostrarMapa(restaurante) {

    const latitud =
        Number(restaurante.latitud);

    const longitud =
        Number(restaurante.longitud);


    if (
        !Number.isFinite(latitud) ||
        !Number.isFinite(longitud)
    ) {

        mapaContainer.classList.add('d-none');

        mapaVacio.classList.remove('d-none');

        return;
    }


    const coordenadas =
        `${latitud},${longitud}`;


    mapa.src =
        `https://www.google.com/maps?q=${encodeURIComponent(
            coordenadas
        )}&z=16&output=embed`;


    comoLlegar.href =
        `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
            coordenadas
        )}`;


    mapaVacio.classList.add('d-none');

    mapaContainer.classList.remove('d-none');

}


// ==========================================
// MOSTRAR RESTAURANTE
// ==========================================

function mostrarRestaurante(restaurante) {

    breadcrumb.textContent =
        restaurante.nombre;

    tipo.textContent =
        restaurante.tipoRestaurante;

    nombre.textContent =
        restaurante.nombre;

    descripcion.textContent =
        restaurante.descripcion ||
        'Sin descripción disponible.';

    direccion.textContent =
        restaurante.direccion ||
        'Dirección no disponible';

    barrio.textContent =
        restaurante.barrio || '';

    horario.textContent =
        restaurante.horario ||
        'Horario no disponible';


    mostrarCalificacion(restaurante);

    mostrarImagen(restaurante);

    mostrarContacto(restaurante);

    mostrarMapa(restaurante);


    document.title =
        `${restaurante.nombre} | CeliaConnect`;


    cargando.classList.add('d-none');

    error.classList.add('d-none');

    detalle.classList.remove('d-none');

}


// ==========================================
// CREAR ESTRELLAS DE UNA OPINIÓN
// ==========================================

function crearEstrellasOpinion(calificacion) {

    const cantidad =
        Number(calificacion);

    let estrellas = '';

    for (let i = 1; i <= 5; i++) {

        if (i <= cantidad) {

            estrellas += `
                <i class="bi bi-star-fill text-warning"></i>
            `;

        } else {

            estrellas += `
                <i class="bi bi-star text-warning"></i>
            `;

        }

    }

    return estrellas;

}


// ==========================================
// FORMATEAR FECHA
// ==========================================

function formatearFecha(fecha) {

    const fechaComentario =
        new Date(fecha);

    return fechaComentario.toLocaleDateString(
        'es-AR',
        {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }
    );

}


// ==========================================
// MOSTRAR COMENTARIOS
// ==========================================

function mostrarComentarios(comentarios) {

    comentariosContainer.innerHTML = '';

    comentariosCargando.classList.add('d-none');

    comentariosError.classList.add('d-none');


    if (comentarios.length === 0) {

        comentariosVacio.classList.remove('d-none');

        return;
    }


    comentariosVacio.classList.add('d-none');


    comentarios.forEach(comentario => {

        const tarjeta = `
            <div class="col-12">

                <div class="card border-0 shadow-sm">

                    <div class="card-body p-4">

                        <div
                            class="d-flex justify-content-between
                                   align-items-start flex-wrap gap-2 mb-2"
                        >

                            <div>

                                <h5 class="fw-bold mb-1">
                                    ${comentario.titulo}
                                </h5>

                                <p class="text-muted small mb-0">
                                    ${comentario.nombre}
                                    ${comentario.apellido}
                                </p>

                            </div>


                            <div class="text-nowrap">

                                ${crearEstrellasOpinion(
                                    comentario.calificacion
                                )}

                            </div>

                        </div>


                        <p class="mb-2">
                            ${comentario.comentario}
                        </p>


                        <small class="text-muted">
                            ${formatearFecha(
                                comentario.fechaComentario
                            )}
                        </small>

                    </div>

                </div>

            </div>
        `;


        comentariosContainer.insertAdjacentHTML(
            'beforeend',
            tarjeta
        );

    });

}


// ==========================================
// CARGAR COMENTARIOS
// ==========================================

async function cargarComentarios() {

    comentariosCargando.classList.remove('d-none');

    comentariosError.classList.add('d-none');

    comentariosVacio.classList.add('d-none');


    try {

        const respuesta =
            await fetch(
                `${API_RESTAURANTES}/${restauranteId}/comentarios`
            );


        if (!respuesta.ok) {

            throw new Error(
                'No se pudieron obtener los comentarios'
            );

        }


        const comentarios =
            await respuesta.json();


        mostrarComentarios(comentarios);


    } catch (err) {

        console.error(
            'Error al cargar comentarios:',
            err
        );


        comentariosCargando.classList.add('d-none');

        comentariosVacio.classList.add('d-none');

        comentariosError.classList.remove('d-none');

    }

}


// ==========================================
// MOSTRAR MENSAJE DEL FORMULARIO
// ==========================================

function mostrarMensajeOpinion(
    mensaje,
    tipo
) {

    opinionMensaje.textContent =
        mensaje;

    opinionMensaje.className =
        `alert alert-${tipo}`;

}


// ==========================================
// ENVIAR OPINIÓN
// ==========================================

async function enviarOpinion(evento) {

    evento.preventDefault();


    const token =
        obtenerToken();


    if (!token) {

        mostrarMensajeOpinion(
            'Debés iniciar sesión para dejar una opinión.',
            'warning'
        );

        return;
    }


    const titulo =
        opinionTitulo.value.trim();

    const comentario =
        opinionComentario.value.trim();

    const calificacion =
        Number(opinionCalificacion.value);


    if (
        !titulo ||
        !comentario ||
        !Number.isInteger(calificacion) ||
        calificacion < 1 ||
        calificacion > 5
    ) {

        mostrarMensajeOpinion(
            'Completá todos los campos correctamente.',
            'warning'
        );

        return;
    }


    btnEnviarOpinion.disabled = true;

    btnEnviarOpinion.innerHTML = `
        <span
            class="spinner-border spinner-border-sm me-1"
            aria-hidden="true"
        ></span>
        Enviando...
    `;


    try {

        const respuesta =
            await fetch(
                `${API_RESTAURANTES}/${restauranteId}/comentarios`,
                {
                    method: 'POST',

                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },

                    body: JSON.stringify({
                        titulo,
                        comentario,
                        calificacion
                    })
                }
            );


        const datos =
            await respuesta.json();


        if (!respuesta.ok) {

            mostrarMensajeOpinion(
                datos.mensaje ||
                'No se pudo enviar la opinión.',
                respuesta.status === 409
                    ? 'warning'
                    : 'danger'
            );

            return;
        }


        mostrarMensajeOpinion(
            datos.mensaje,
            'success'
        );


        opinionFormulario.reset();


        /*
            La opinión queda pendiente de moderación.
            Aparecerá públicamente cuando el
            administrador la apruebe.
        */


    } catch (err) {

        console.error(
            'Error al enviar opinión:',
            err
        );


        mostrarMensajeOpinion(
            'No se pudo enviar la opinión.',
            'danger'
        );


    } finally {

        btnEnviarOpinion.disabled = false;

        btnEnviarOpinion.innerHTML = `
            <i class="bi bi-send me-1"></i>
            Enviar opinión
        `;

    }

}


// ==========================================
// CARGAR RESTAURANTE
// ==========================================

async function cargarRestaurante() {

    if (
        !Number.isInteger(restauranteId) ||
        restauranteId <= 0
    ) {

        mostrarError(
            'El restaurante solicitado no es válido.'
        );

        return;
    }


    try {

        const respuesta =
            await fetch(
                `${API_RESTAURANTES}/${restauranteId}`
            );


        if (respuesta.status === 404) {

            mostrarError(
                'El restaurante no fue encontrado.'
            );

            return;
        }


        if (!respuesta.ok) {

            throw new Error(
                'No se pudo obtener el restaurante'
            );

        }


        const restaurante =
            await respuesta.json();


        mostrarRestaurante(restaurante);

        await cargarComentarios();


    } catch (err) {

        console.error(
            'Error al cargar restaurante:',
            err
        );


        mostrarError(
            'No se pudo cargar el restaurante.'
        );

    }

}


// ==========================================
// EVENTO DEL FORMULARIO
// ==========================================

opinionFormulario.addEventListener(
    'submit',
    enviarOpinion
);


// ==========================================
// INICIAR
// ==========================================

cargarRestaurante();
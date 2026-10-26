// ==========================================
// CELIACONNECT - DETALLE DE LOCAL
// ==========================================

const API_LOCALES = 'http://localhost:3000/api/locales';


// ==========================================
// OBTENER ID DEL LOCAL
// ==========================================

const parametros = new URLSearchParams(
    window.location.search
);

const localId = parametros.get('id');


// ==========================================
// ELEMENTOS DEL DOM
// ==========================================

const cargando =
    document.getElementById('local-cargando');

const errorLocal =
    document.getElementById('local-error');

const detalleLocal =
    document.getElementById('local-detalle');

const breadcrumbLocal =
    document.getElementById('breadcrumb-local');

const localImagen =
    document.getElementById('local-imagen');

const localTipo =
    document.getElementById('local-tipo');

const localNombre =
    document.getElementById('local-nombre');

const localCalificacion =
    document.getElementById('local-calificacion');

const localDescripcion =
    document.getElementById('local-descripcion');

const localDireccion =
    document.getElementById('local-direccion');

const localBarrio =
    document.getElementById('local-barrio');

const localHorario =
    document.getElementById('local-horario');

const telefonoContainer =
    document.getElementById('local-telefono-container');

const localTelefono =
    document.getElementById('local-telefono');

const emailContainer =
    document.getElementById('local-email-container');

const localEmail =
    document.getElementById('local-email');

const webContainer =
    document.getElementById('local-web-container');

const localWeb =
    document.getElementById('local-web');

const instagramContainer =
    document.getElementById('local-instagram-container');

const localInstagram =
    document.getElementById('local-instagram');


// ==========================================
// MAPA
// ==========================================

const mapaContainer =
    document.getElementById('local-mapa-container');

const mapaVacio =
    document.getElementById('local-mapa-vacio');

const mapa =
    document.getElementById('local-mapa');

const comoLlegar =
    document.getElementById('local-como-llegar');


// ==========================================
// COMENTARIOS
// ==========================================

const comentariosCargando =
    document.getElementById('comentarios-cargando');

const comentariosError =
    document.getElementById('comentarios-error');

const comentariosVacio =
    document.getElementById('comentarios-vacio');

const comentariosContainer =
    document.getElementById('comentarios-container');


// ==========================================
// FORMULARIO
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


// ==========================================
// TOKEN
// ==========================================

function obtenerToken() {

    return (
        localStorage.getItem('celiaToken') ||
        sessionStorage.getItem('celiaToken')
    );

}


// ==========================================
// CARGAR LOCAL
// ==========================================

async function cargarLocal() {

    if (!localId) {

        mostrarErrorLocal(
            'No se indicó ningún local.'
        );

        return;
    }


    try {

        const respuesta =
            await fetch(
                `${API_LOCALES}/${localId}`
            );


        if (!respuesta.ok) {

            throw new Error(
                'Local no encontrado'
            );

        }


        const local =
            await respuesta.json();


        mostrarLocal(local);

        await cargarComentarios();


    } catch (error) {

        console.error(
            'Error al cargar local:',
            error
        );


        mostrarErrorLocal(
            'No se pudo cargar el local.'
        );

    }

}


// ==========================================
// MOSTRAR LOCAL
// ==========================================

function mostrarLocal(local) {

    cargando.classList.add('d-none');

    errorLocal.classList.add('d-none');

    detalleLocal.classList.remove('d-none');


    breadcrumbLocal.textContent =
        local.nombre;


    localTipo.textContent =
        local.tipoLocal;


    localNombre.textContent =
        local.nombre;


    localDescripcion.textContent =
        local.descripcion ||
        'Sin descripción disponible.';


    localDireccion.textContent =
        local.direccion ||
        'Dirección no disponible.';


    localBarrio.textContent =
        local.barrio ||
        '';


    localHorario.textContent =
        local.horario ||
        'Horario no disponible.';


    mostrarCalificacion(local);

    mostrarImagen(local);

    mostrarContacto(local);

    mostrarMapa(local);

}


// ==========================================
// CALIFICACIÓN
// ==========================================

function mostrarCalificacion(local) {

    const promedio =
        Number(local.calificacionPromedio);

    const cantidad =
        Number(local.cantidadResenas);


    if (cantidad === 0) {

        localCalificacion.innerHTML = `
            <span class="text-muted">
                Sin reseñas
            </span>
        `;

        return;
    }


    localCalificacion.innerHTML = `
        <span class="fw-semibold">
            <i class="bi bi-star-fill text-warning"></i>
            ${promedio.toFixed(1)}
        </span>

        <span class="text-muted ms-1">
            (${cantidad}
            ${cantidad === 1
                ? 'reseña'
                : 'reseñas'})
        </span>
    `;

}


// ==========================================
// IMAGEN
// ==========================================

function mostrarImagen(local) {

    if (!local.imagen) {

        localImagen.innerHTML = `
            <i
                class="bi bi-shop"
                style="font-size: 6rem;"
            ></i>
        `;

        return;
    }


    localImagen.innerHTML = `
        <img
            src="${local.imagen}"
            alt="${local.nombre}"
            class="img-fluid w-100 h-100"
            style="object-fit: cover;"
        >
    `;

}


// ==========================================
// CONTACTO
// ==========================================

function mostrarContacto(local) {

    // Teléfono
    if (local.telefono) {

        localTelefono.textContent =
            local.telefono;

        localTelefono.href =
            `tel:${local.telefono}`;

        telefonoContainer.classList.remove(
            'd-none'
        );

    } else {

        telefonoContainer.classList.add(
            'd-none'
        );

    }


    // Email
    if (local.email) {

        localEmail.textContent =
            local.email;

        localEmail.href =
            `mailto:${local.email}`;

        emailContainer.classList.remove(
            'd-none'
        );

    } else {

        emailContainer.classList.add(
            'd-none'
        );

    }


    // Sitio web
    if (local.sitioWeb) {

        localWeb.href =
            local.sitioWeb;

        webContainer.classList.remove(
            'd-none'
        );

    } else {

        webContainer.classList.add(
            'd-none'
        );

    }


    // Instagram
    if (local.instagram) {

        const usuarioInstagram =
            local.instagram.replace(
                /^@/,
                ''
            );


        localInstagram.textContent =
            `@${usuarioInstagram}`;


        localInstagram.href =
            `https://www.instagram.com/${usuarioInstagram}`;


        instagramContainer.classList.remove(
            'd-none'
        );

    } else {

        instagramContainer.classList.add(
            'd-none'
        );

    }

}


// ==========================================
// MAPA
// ==========================================

function mostrarMapa(local) {

    const latitud =
        Number(local.latitud);

    const longitud =
        Number(local.longitud);


    if (
        !Number.isFinite(latitud) ||
        !Number.isFinite(longitud)
    ) {

        mapaContainer.classList.add(
            'd-none'
        );

        mapaVacio.classList.remove(
            'd-none'
        );

        return;
    }


    mapaVacio.classList.add(
        'd-none'
    );

    mapaContainer.classList.remove(
        'd-none'
    );


    mapa.src =
        `https://www.google.com/maps?q=${latitud},${longitud}&z=16&output=embed`;


    comoLlegar.href =
        `https://www.google.com/maps/dir/?api=1&destination=${latitud},${longitud}`;

}


// ==========================================
// CARGAR COMENTARIOS
// ==========================================

async function cargarComentarios() {

    comentariosCargando.classList.remove(
        'd-none'
    );

    comentariosError.classList.add(
        'd-none'
    );

    comentariosVacio.classList.add(
        'd-none'
    );

    comentariosContainer.innerHTML = '';


    try {

        const respuesta =
            await fetch(
                `${API_LOCALES}/${localId}/comentarios`
            );


        if (!respuesta.ok) {

            throw new Error(
                'No se pudieron cargar los comentarios'
            );

        }


        const comentarios =
            await respuesta.json();


        comentariosCargando.classList.add(
            'd-none'
        );


        mostrarComentarios(comentarios);


    } catch (error) {

        console.error(
            'Error al cargar comentarios:',
            error
        );


        comentariosCargando.classList.add(
            'd-none'
        );


        comentariosError.classList.remove(
            'd-none'
        );

    }

}


// ==========================================
// MOSTRAR COMENTARIOS
// ==========================================

function mostrarComentarios(comentarios) {

    comentariosContainer.innerHTML = '';


    if (comentarios.length === 0) {

        comentariosVacio.classList.remove(
            'd-none'
        );

        return;
    }


    comentariosVacio.classList.add(
        'd-none'
    );


    comentarios.forEach(comentario => {

        const columna =
            document.createElement('div');


        columna.className =
            'col-12';


        const estrellas =
            '★'.repeat(
                Number(comentario.calificacion)
            ) +
            '☆'.repeat(
                5 -
                Number(comentario.calificacion)
            );


        const fecha =
            new Date(
                comentario.fechaComentario
            );


        const fechaFormateada =
            fecha.toLocaleDateString(
                'es-AR',
                {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                }
            );


        columna.innerHTML = `
            <div
                class="card border-0 shadow-sm"
            >

                <div class="card-body">

                    <div
                        class="d-flex justify-content-between align-items-start gap-3 mb-2"
                    >

                        <div>

                            <h5
                                class="fw-bold mb-1"
                            >
                                ${comentario.titulo}
                            </h5>

                            <div
                                class="text-warning"
                            >
                                ${estrellas}
                            </div>

                        </div>


                        <span
                            class="text-muted small"
                        >
                            ${fechaFormateada}
                        </span>

                    </div>


                    <p class="mb-2">
                        ${comentario.comentario}
                    </p>


                    <span
                        class="text-muted small"
                    >
                        ${comentario.usuarioNombre}
                        ${comentario.usuarioApellido}
                    </span>

                </div>

            </div>
        `;


        comentariosContainer.appendChild(
            columna
        );

    });

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
            'Tenés que iniciar sesión para dejar una opinión.',
            'warning'
        );

        return;
    }


    const calificacion =
        Number(
            opinionCalificacion.value
        );

    const titulo =
        opinionTitulo.value.trim();

    const comentario =
        opinionComentario.value.trim();


    if (
        !calificacion ||
        !titulo ||
        !comentario
    ) {

        mostrarMensajeOpinion(
            'Completá todos los campos.',
            'warning'
        );

        return;
    }


    try {

        btnEnviarOpinion.disabled =
            true;


        const respuesta =
            await fetch(
                `${API_LOCALES}/${localId}/comentarios`,
                {
                    method: 'POST',

                    headers: {
                        'Content-Type':
                            'application/json',

                        'Authorization':
                            `Bearer ${token}`
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

            throw new Error(
                datos.mensaje ||
                'No se pudo enviar la opinión'
            );

        }


        mostrarMensajeOpinion(
            'Tu opinión fue enviada y quedó pendiente de moderación.',
            'success'
        );


        opinionFormulario.reset();


    } catch (error) {

        console.error(
            'Error al enviar opinión:',
            error
        );


        mostrarMensajeOpinion(
            error.message,
            'danger'
        );


    } finally {

        btnEnviarOpinion.disabled =
            false;

    }

}


// ==========================================
// EVENTO FORMULARIO
// ==========================================

opinionFormulario.addEventListener(
    'submit',
    enviarOpinion
);


// ==========================================
// INICIAR
// ==========================================

cargarLocal();
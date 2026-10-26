// ==========================================
// CELIACONNECT - DETALLE DE NUTRICIONISTA
// ==========================================

const API_NUTRICIONISTAS =
    'http://localhost:3000/api/nutricionistas';


// ==========================================
// OBTENER ID
// ==========================================

const parametros =
    new URLSearchParams(window.location.search);

const nutricionistaId =
    parametros.get('id');


// ==========================================
// ELEMENTOS DEL DOM
// ==========================================

const cargando =
    document.getElementById('nutricionista-cargando');

const errorNutricionista =
    document.getElementById('nutricionista-error');

const detalleNutricionista =
    document.getElementById('nutricionista-detalle');

const breadcrumbNutricionista =
    document.getElementById('breadcrumb-nutricionista');

const nutricionistaImagen =
    document.getElementById('nutricionista-imagen');

const nutricionistaNombre =
    document.getElementById('nutricionista-nombre');

const nutricionistaMatricula =
    document.getElementById('nutricionista-matricula');

const nutricionistaCalificacion =
    document.getElementById('nutricionista-calificacion');

const nutricionistaDescripcion =
    document.getElementById('nutricionista-descripcion');

const nutricionistaDireccion =
    document.getElementById('nutricionista-direccion');

const nutricionistaBarrio =
    document.getElementById('nutricionista-barrio');

const nutricionistaHorario =
    document.getElementById('nutricionista-horario');


// ==========================================
// CONTACTO
// ==========================================

const telefonoContainer =
    document.getElementById(
        'nutricionista-telefono-container'
    );

const nutricionistaTelefono =
    document.getElementById(
        'nutricionista-telefono'
    );

const whatsappContainer =
    document.getElementById(
        'nutricionista-whatsapp-container'
    );

const nutricionistaWhatsapp =
    document.getElementById(
        'nutricionista-whatsapp'
    );

const emailContainer =
    document.getElementById(
        'nutricionista-email-container'
    );

const nutricionistaEmail =
    document.getElementById(
        'nutricionista-email'
    );

const webContainer =
    document.getElementById(
        'nutricionista-web-container'
    );

const nutricionistaWeb =
    document.getElementById(
        'nutricionista-web'
    );

const instagramContainer =
    document.getElementById(
        'nutricionista-instagram-container'
    );

const nutricionistaInstagram =
    document.getElementById(
        'nutricionista-instagram'
    );


// ==========================================
// MAPA
// ==========================================

const mapaContainer =
    document.getElementById(
        'nutricionista-mapa-container'
    );

const mapaVacio =
    document.getElementById(
        'nutricionista-mapa-vacio'
    );

const mapa =
    document.getElementById(
        'nutricionista-mapa'
    );

const comoLlegar =
    document.getElementById(
        'nutricionista-como-llegar'
    );


// ==========================================
// COMENTARIOS
// ==========================================

const comentariosCargando =
    document.getElementById(
        'comentarios-cargando'
    );

const comentariosError =
    document.getElementById(
        'comentarios-error'
    );

const comentariosVacio =
    document.getElementById(
        'comentarios-vacio'
    );

const comentariosContainer =
    document.getElementById(
        'comentarios-container'
    );


// ==========================================
// FORMULARIO
// ==========================================

const opinionFormulario =
    document.getElementById(
        'opinion-formulario'
    );

const opinionMensaje =
    document.getElementById(
        'opinion-mensaje'
    );

const opinionCalificacion =
    document.getElementById(
        'opinion-calificacion'
    );

const opinionTitulo =
    document.getElementById(
        'opinion-titulo'
    );

const opinionComentario =
    document.getElementById(
        'opinion-comentario'
    );

const btnEnviarOpinion =
    document.getElementById(
        'btn-enviar-opinion'
    );


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
// CARGAR NUTRICIONISTA
// ==========================================

async function cargarNutricionista() {

    if (!nutricionistaId) {

        mostrarErrorNutricionista(
            'No se indicó ningún nutricionista.'
        );

        return;
    }


    try {

        const respuesta =
            await fetch(
                `${API_NUTRICIONISTAS}/${nutricionistaId}`
            );


        if (!respuesta.ok) {

            throw new Error(
                'Nutricionista no encontrado'
            );

        }


        const nutricionista =
            await respuesta.json();


        mostrarNutricionista(
            nutricionista
        );


        await cargarComentarios();


    } catch (error) {

        console.error(
            'Error al cargar nutricionista:',
            error
        );


        mostrarErrorNutricionista(
            'No se pudo cargar el nutricionista.'
        );

    }

}


// ==========================================
// MOSTRAR ERROR
// ==========================================

function mostrarErrorNutricionista(mensaje) {

    cargando.classList.add('d-none');

    detalleNutricionista.classList.add(
        'd-none'
    );

    errorNutricionista.textContent =
        mensaje;

    errorNutricionista.classList.remove(
        'd-none'
    );

}


// ==========================================
// MOSTRAR NUTRICIONISTA
// ==========================================

function mostrarNutricionista(
    nutricionista
) {

    cargando.classList.add('d-none');

    errorNutricionista.classList.add(
        'd-none'
    );

    detalleNutricionista.classList.remove(
        'd-none'
    );


    breadcrumbNutricionista.textContent =
        `${nutricionista.nombre} ${nutricionista.apellido}`;


    nutricionistaNombre.textContent =
        `${nutricionista.nombre} ${nutricionista.apellido}`;


    nutricionistaMatricula.textContent =
        nutricionista.matricula ||
        'No disponible';


    nutricionistaDescripcion.textContent =
        nutricionista.descripcion ||
        'Sin descripción disponible.';


    nutricionistaDireccion.textContent =
        nutricionista.direccion ||
        'Dirección no disponible.';


    nutricionistaBarrio.textContent =
        nutricionista.barrio || '';


    nutricionistaHorario.textContent =
        nutricionista.horario ||
        'Horario no disponible.';


    mostrarCalificacion(
        nutricionista
    );

    mostrarImagen(
        nutricionista
    );

    mostrarContacto(
        nutricionista
    );

    mostrarMapa(
        nutricionista
    );

}


// ==========================================
// CALIFICACIÓN
// ==========================================

function mostrarCalificacion(
    nutricionista
) {

    const promedio =
        Number(
            nutricionista.calificacionPromedio
        );

    const cantidad =
        Number(
            nutricionista.cantidadResenas
        );


    if (cantidad === 0) {

        nutricionistaCalificacion.innerHTML = `
            <span class="text-muted">
                Sin reseñas
            </span>
        `;

        return;
    }


    nutricionistaCalificacion.innerHTML = `
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

function mostrarImagen(
    nutricionista
) {

    if (!nutricionista.fotoPerfil) {

        nutricionistaImagen.innerHTML = `
            <i
                class="bi bi-person-circle"
                style="font-size: 7rem;"
            ></i>
        `;

        return;
    }


    nutricionistaImagen.innerHTML = `
        <img
            src="${nutricionista.fotoPerfil}"
            alt="${nutricionista.nombre} ${nutricionista.apellido}"
            class="img-fluid w-100 h-100"
            style="object-fit: cover;"
        >
    `;

}


// ==========================================
// CONTACTO
// ==========================================

function mostrarContacto(
    nutricionista
) {

    // TELÉFONO

    if (nutricionista.telefono) {

        nutricionistaTelefono.textContent =
            nutricionista.telefono;

        nutricionistaTelefono.href =
            `tel:${nutricionista.telefono}`;

        telefonoContainer.classList.remove(
            'd-none'
        );

    } else {

        telefonoContainer.classList.add(
            'd-none'
        );

    }


    // WHATSAPP

    if (
        Number(nutricionista.tieneWhatsapp) === 1 &&
        nutricionista.telefono
    ) {

        const telefonoLimpio =
            nutricionista.telefono.replace(
                /\D/g,
                ''
            );


        nutricionistaWhatsapp.href =
            `https://wa.me/${telefonoLimpio}`;

        whatsappContainer.classList.remove(
            'd-none'
        );

    } else {

        whatsappContainer.classList.add(
            'd-none'
        );

    }


    // EMAIL

    if (nutricionista.email) {

        nutricionistaEmail.textContent =
            nutricionista.email;

        nutricionistaEmail.href =
            `mailto:${nutricionista.email}`;

        emailContainer.classList.remove(
            'd-none'
        );

    } else {

        emailContainer.classList.add(
            'd-none'
        );

    }


    // SITIO WEB

    if (nutricionista.sitioWeb) {

        nutricionistaWeb.href =
            nutricionista.sitioWeb;

        webContainer.classList.remove(
            'd-none'
        );

    } else {

        webContainer.classList.add(
            'd-none'
        );

    }


    // INSTAGRAM

    if (nutricionista.instagram) {

        const usuarioInstagram =
            nutricionista.instagram.replace(
                /^@/,
                ''
            );


        nutricionistaInstagram.textContent =
            `@${usuarioInstagram}`;


        nutricionistaInstagram.href =
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

function mostrarMapa(
    nutricionista
) {

    const latitud =
        Number(
            nutricionista.latitud
        );

    const longitud =
        Number(
            nutricionista.longitud
        );


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
                `${API_NUTRICIONISTAS}/${nutricionistaId}/comentarios`
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


        mostrarComentarios(
            comentarios
        );


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

function mostrarComentarios(
    comentarios
) {

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


    comentarios.forEach(
        comentario => {

            const columna =
                document.createElement('div');


            columna.className =
                'col-12';


            const estrellas =
                '★'.repeat(
                    Number(
                        comentario.calificacion
                    )
                ) +
                '☆'.repeat(
                    5 -
                    Number(
                        comentario.calificacion
                    )
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

                                <h5 class="fw-bold mb-1">
                                    ${comentario.titulo}
                                </h5>

                                <div class="text-warning">
                                    ${estrellas}
                                </div>

                            </div>


                            <span class="text-muted small">
                                ${fechaFormateada}
                            </span>

                        </div>


                        <p class="mb-2">
                            ${comentario.comentario}
                        </p>


                        <span class="text-muted small">
                            ${comentario.usuarioNombre}
                            ${comentario.usuarioApellido}
                        </span>

                    </div>

                </div>
            `;


            comentariosContainer.appendChild(
                columna
            );

        }
    );

}


// ==========================================
// MENSAJE FORMULARIO
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

async function enviarOpinion(
    evento
) {

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
                `${API_NUTRICIONISTAS}/${nutricionistaId}/comentarios`,
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

cargarNutricionista();
const API_PRODUCTOS =
    'http://localhost:3000/api/productos';


// ==========================================
// OBTENER ID DESDE LA URL
// ==========================================

function obtenerProductoId() {

    const parametros =
        new URLSearchParams(
            window.location.search
        );

    return parametros.get('id');
}


// ==========================================
// OBTENER TOKEN
// ==========================================

function obtenerToken() {

    return (
        sessionStorage.getItem(
            'celiaToken'
        ) ||
        localStorage.getItem(
            'celiaToken'
        )
    );
}


// ==========================================
// GENERAR ESTRELLAS
// ==========================================

function generarEstrellas(calificacion) {

    const cantidad =
        Number(calificacion);

    let estrellas = '';

    for (let i = 1; i <= 5; i++) {

        if (i <= cantidad) {

            estrellas +=
                '<i class="bi bi-star-fill text-warning"></i>';

        } else {

            estrellas +=
                '<i class="bi bi-star text-warning"></i>';

        }

    }

    return estrellas;
}


// ==========================================
// FORMATEAR FECHA
// ==========================================

function formatearFecha(fecha) {

    if (!fecha) {
        return '';
    }

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
// MOSTRAR MENSAJE DE OPINIÓN
// ==========================================

function mostrarMensajeOpinion(
    texto,
    tipo
) {

    const mensaje =
        document.getElementById(
            'opinion-mensaje'
        );

    if (!mensaje) {
        return;
    }

    mensaje.textContent =
        texto;

    mensaje.className =
        `alert alert-${tipo}`;
}


// ==========================================
// OCULTAR MENSAJE DE OPINIÓN
// ==========================================

function ocultarMensajeOpinion() {

    const mensaje =
        document.getElementById(
            'opinion-mensaje'
        );

    if (!mensaje) {
        return;
    }

    mensaje.textContent = '';

    mensaje.className =
        'alert d-none';
}


// ==========================================
// ENVIAR OPINIÓN
// ==========================================

async function enviarOpinion(evento) {

    evento.preventDefault();

    ocultarMensajeOpinion();


    const productoId =
        obtenerProductoId();

    const token =
        obtenerToken();


    // ==================================
    // VERIFICAR SESIÓN
    // ==================================

    if (!token) {

        mostrarMensajeOpinion(
            'Debés iniciar sesión para dejar una opinión.',
            'warning'
        );

        return;
    }


    // ==================================
    // OBTENER DATOS
    // ==================================

    const calificacion =
        document.getElementById(
            'opinion-calificacion'
        ).value;

    const titulo =
        document.getElementById(
            'opinion-titulo'
        ).value.trim();

    const comentario =
        document.getElementById(
            'opinion-comentario'
        ).value.trim();

    const boton =
        document.getElementById(
            'btn-enviar-opinion'
        );


    // ==================================
    // VALIDAR
    // ==================================

    if (
        !calificacion ||
        !titulo ||
        !comentario
    ) {

        mostrarMensajeOpinion(
            'Completá la calificación, el título y el comentario.',
            'warning'
        );

        return;
    }


    boton.disabled = true;

    boton.innerHTML = `
        <span
            class="spinner-border spinner-border-sm me-2"
            aria-hidden="true"
        ></span>
        Enviando...
    `;


    try {

        const respuesta =
            await fetch(
                `${API_PRODUCTOS}/${productoId}/comentarios`,
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
                        calificacion:
                            Number(calificacion)
                    })
                }
            );


        const datos =
            await respuesta.json();


        // ==================================
        // SESIÓN VENCIDA
        // ==================================

        if (
            respuesta.status === 401
        ) {

            sessionStorage.removeItem(
                'celiaToken'
            );

            localStorage.removeItem(
                'celiaToken'
            );

            mostrarMensajeOpinion(
                'Tu sesión venció. Iniciá sesión nuevamente para dejar una opinión.',
                'warning'
            );

            return;
        }


        // ==================================
        // OTRO ERROR
        // ==================================

        if (!respuesta.ok) {

            mostrarMensajeOpinion(
                datos.mensaje ||
                'No se pudo enviar la opinión.',
                'danger'
            );

            return;
        }


        // ==================================
        // OPINIÓN ENVIADA
        // ==================================

        mostrarMensajeOpinion(
            datos.mensaje ||
            'Tu opinión fue enviada y está pendiente de aprobación.',
            'success'
        );


        document.getElementById(
            'opinion-formulario'
        ).reset();


    } catch (error) {

        console.error(
            'Error al enviar opinión:',
            error
        );

        mostrarMensajeOpinion(
            'No se pudo conectar con el servidor.',
            'danger'
        );


    } finally {

        boton.disabled = false;

        boton.innerHTML = `
            <i class="bi bi-send me-1"></i>
            Enviar opinión
        `;

    }

}


// ==========================================
// CARGAR COMENTARIOS
// ==========================================

async function cargarComentarios(productoId) {

    const cargando =
        document.getElementById(
            'comentarios-cargando'
        );

    const error =
        document.getElementById(
            'comentarios-error'
        );

    const vacio =
        document.getElementById(
            'comentarios-vacio'
        );

    const contenedor =
        document.getElementById(
            'comentarios-container'
        );


    // Estado inicial
    cargando.classList.remove('d-none');
    error.classList.add('d-none');
    vacio.classList.add('d-none');

    contenedor.innerHTML = '';


    try {

        const respuesta =
            await fetch(
                `${API_PRODUCTOS}/${productoId}/comentarios`
            );


        if (!respuesta.ok) {

            throw new Error(
                'No se pudieron obtener los comentarios'
            );

        }


        const comentarios =
            await respuesta.json();


        // Ocultar mensaje de carga
        cargando.classList.add('d-none');


        // Si no existen comentarios aprobados
        if (comentarios.length === 0) {

            vacio.classList.remove('d-none');

            return;
        }


        // Mostrar comentarios
        comentarios.forEach(comentario => {

            const nombreCompleto =
                `${comentario.nombre} ${comentario.apellido}`;


            const tarjeta =
                document.createElement('div');

            tarjeta.className =
                'col-12';


            tarjeta.innerHTML = `
                <div class="card border-0 shadow-sm">
                    <div class="card-body p-4">

                        <div
                            class="d-flex flex-column flex-md-row justify-content-between gap-2 mb-3"
                        >

                            <div>

                                <div class="mb-2">
                                    ${generarEstrellas(
                                        comentario.calificacion
                                    )}
                                </div>

                                <h5 class="fw-bold mb-1">
                                    ${comentario.titulo || 'Opinión'}
                                </h5>

                            </div>


                            <small class="text-muted">
                                ${formatearFecha(
                                    comentario.fechaComentario
                                )}
                            </small>

                        </div>


                        <p class="mb-3">
                            ${comentario.comentario}
                        </p>


                        <p class="text-muted mb-0">
                            <i class="bi bi-person-circle me-1"></i>
                            ${nombreCompleto}
                        </p>

                    </div>
                </div>
            `;


            contenedor.appendChild(
                tarjeta
            );

        });


    } catch (err) {

        console.error(
            'Error al cargar comentarios:',
            err
        );


        cargando.classList.add('d-none');

        vacio.classList.add('d-none');

        error.classList.remove('d-none');

    }

}


// ==========================================
// CARGAR PRODUCTO
// ==========================================

async function cargarProducto() {

    const cargando =
        document.getElementById(
            'producto-cargando'
        );

    const error =
        document.getElementById(
            'producto-error'
        );

    const detalle =
        document.getElementById(
            'producto-detalle'
        );


    // Obtener ID de la URL
    const productoId =
        obtenerProductoId();


    // Si no existe ID
    if (!productoId) {

        cargando.classList.add('d-none');

        error.classList.remove('d-none');

        error.textContent =
            'No se indicó qué producto mostrar.';

        return;
    }


    try {

        // Consultar API
        const respuesta =
            await fetch(
                `${API_PRODUCTOS}/${productoId}`
            );


        // Producto inexistente
        if (respuesta.status === 404) {

            throw new Error(
                'Producto no encontrado'
            );

        }


        // Otro error del servidor
        if (!respuesta.ok) {

            throw new Error(
                'No se pudo obtener el producto'
            );

        }


        const producto =
            await respuesta.json();

        // ==================================
// IMAGEN DEL PRODUCTO
// ==================================

const imagenProducto =
    document.getElementById(
        'producto-imagen'
    );

if (producto.imagen) {

    imagenProducto.src =
        producto.imagen;

    imagenProducto.alt =
        producto.nombre;

} else {

    imagenProducto.style.display =
        'none';

}


        // ==================================
        // MOSTRAR DATOS
        // ==================================

        document.getElementById(
            'producto-categoria'
        ).textContent =
            producto.categoria ||
            'Sin categoría';


        document.getElementById(
            'producto-nombre'
        ).textContent =
            producto.nombre ||
            'Producto';


        document.getElementById(
            'producto-marca'
        ).textContent =
            producto.marca ||
            'Sin marca';


        document.getElementById(
            'producto-descripcion'
        ).textContent =
            producto.descripcion ||
            'Sin descripción disponible.';


        document.getElementById(
            'producto-ingredientes'
        ).textContent =
            producto.ingredientes ||
            'Sin información disponible.';


        document.getElementById(
            'producto-informacion-nutricional'
        ).textContent =
            producto.informacionNutricional ||
            'Sin información disponible.';


        document.getElementById(
            'producto-codigo-barras'
        ).textContent =
            producto.codigoBarras ||
            'No disponible';


        // ==================================
        // CERTIFICACIÓN
        // ==================================

        const certificacion =
            document.getElementById(
                'producto-certificacion'
            );


        if (
            Number(
                producto.certificadoSinTacc
            ) === 1
        ) {

            certificacion.textContent =
                'Sin TACC';

        } else {

            certificacion.textContent =
                'Certificación pendiente';

        }


        // ==================================
        // BREADCRUMB
        // ==================================

        document.getElementById(
            'breadcrumb-producto'
        ).textContent =
            producto.nombre;


        // ==================================
        // TÍTULO DEL NAVEGADOR
        // ==================================

        document.title =
            `${producto.nombre} | CeliaConnect`;


        // ==================================
        // MOSTRAR PRODUCTO
        // ==================================

        cargando.classList.add('d-none');

        error.classList.add('d-none');

        detalle.classList.remove('d-none');


        // ==================================
        // CARGAR COMENTARIOS
        // ==================================

        cargarComentarios(productoId);


    } catch (err) {

        console.error(
            'Error al cargar producto:',
            err
        );


        cargando.classList.add('d-none');

        detalle.classList.add('d-none');

        error.classList.remove('d-none');


        if (
            err.message ===
            'Producto no encontrado'
        ) {

            error.textContent =
                'El producto solicitado no existe.';

        } else {

            error.textContent =
                'No se pudo cargar el producto. Verificá que el servidor esté funcionando.';

        }

    }

}


// ==========================================
// INICIAR DETALLE
// ==========================================

document.addEventListener(
    'DOMContentLoaded',
    () => {

        cargarProducto();


        const formulario =
            document.getElementById(
                'opinion-formulario'
            );


        if (formulario) {

            formulario.addEventListener(
                'submit',
                enviarOpinion
            );

        }

    }
);
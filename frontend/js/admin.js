/* =====================================================
   CELIACONNECT - ADMIN.JS
   Lógica del panel de administración.
   Requiere cargar ../js/app.js ANTES.
===================================================== */

const API_ADMIN_COMENTARIOS =
    'http://localhost:3000/api/admin/comentarios/productos';

let comentarioSeleccionado = null;
let estadoSeleccionado = null;


// ==========================================
// OBTENER TOKEN
// ==========================================

function obtenerTokenAdmin() {

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
// OBTENER USUARIO GUARDADO
// ==========================================

function obtenerUsuarioAdmin() {

    const usuarioGuardado =
        sessionStorage.getItem(
            'celiaUsuario'
        ) ||
        localStorage.getItem(
            'celiaUsuario'
        );

    if (!usuarioGuardado) {
        return null;
    }

    try {

        return JSON.parse(
            usuarioGuardado
        );

    } catch (error) {

        return null;

    }
}


// ==========================================
// LIMPIAR SESIÓN
// ==========================================

function limpiarSesionAdmin() {

    sessionStorage.removeItem(
        'celiaToken'
    );

    sessionStorage.removeItem(
        'celiaUsuario'
    );

    localStorage.removeItem(
        'celiaToken'
    );

    localStorage.removeItem(
        'celiaUsuario'
    );
}


// ==========================================
// VERIFICAR ACCESO AL ADMIN
// ==========================================

function verificarAccesoAdmin() {

    const token =
        obtenerTokenAdmin();

    const usuario =
        obtenerUsuarioAdmin();

    // --------------------------------------
    // NO HAY SESIÓN
    // --------------------------------------

    if (
        !token ||
        !usuario
    ) {

        limpiarSesionAdmin();

        window.location.replace(
            '../login.html'
        );

        return false;
    }


    // --------------------------------------
    // HAY SESIÓN PERO NO ES ADMIN
    // --------------------------------------

    if (
        Number(usuario.rolId) !== 1
    ) {

        window.location.replace(
            '../index.html'
        );

        return false;
    }


    return true;
}


// ==========================================
// INICIAR ADMIN
// ==========================================

document.addEventListener(
    'DOMContentLoaded',
    () => {

        // Primero validamos el acceso.
        // Si no corresponde, no cargamos
        // ninguna parte del panel.

        if (!verificarAccesoAdmin()) {
            return;
        }


        cargarComponente(
            '#admin-sidebar-placeholder',
    '../components/admin-sidebar.html',
    () => {

        marcarLinkActivoAdmin();

        inicializarCerrarSesionAdmin();

    }
        );


        inicializarMenuMobileAdmin();


        inicializarModalModeracion();


        cargarComentariosPendientes();

    }
);


// ==========================================
// MARCAR LINK ACTIVO
// ==========================================

function marcarLinkActivoAdmin() {

    const paginaActual =
        window.location.pathname
            .split('/')
            .pop() ||
        'index.html';


    document
        .querySelectorAll(
            '.admin-nav-link[data-page]'
        )
        .forEach(link => {

            link.classList.toggle(
                'active',
                link.dataset.page ===
                    paginaActual
            );

        });
}


// ==========================================
// MENÚ MOBILE
// ==========================================

function inicializarMenuMobileAdmin() {

    const body =
        document.body;

    const botonMenu =
        document.getElementById(
            'adminMenuToggle'
        );

    const overlay =
        document.getElementById(
            'adminOverlay'
        );

    const sidebar =
        document.getElementById(
            'admin-sidebar-placeholder'
        );


    const cerrarMenu =
        () =>
            body.classList.remove(
                'admin-menu-open'
            );


    if (botonMenu) {

        botonMenu.addEventListener(
            'click',
            () => {

                body.classList.toggle(
                    'admin-menu-open'
                );

            }
        );
    }


    if (overlay) {

        overlay.addEventListener(
            'click',
            cerrarMenu
        );
    }


    if (sidebar) {

        sidebar.addEventListener(
            'click',
            evento => {

                if (
                    evento.target.closest(
                        '.admin-nav-link, .admin-close'
                    )
                ) {

                    cerrarMenu();

                }

            }
        );
    }


    document.addEventListener(
        'keydown',
        evento => {

            if (
                evento.key ===
                'Escape'
            ) {

                cerrarMenu();

            }

        }
    );
}

// ==========================================
// CERRAR SESIÓN ADMIN
// ==========================================

function inicializarCerrarSesionAdmin() {

    const botonCerrarSesion =
        document.getElementById(
            'adminCerrarSesion'
        );

    if (!botonCerrarSesion) {
        return;
    }

    botonCerrarSesion.addEventListener(
        'click',
        evento => {

            evento.preventDefault();

            limpiarSesionAdmin();

            window.location.replace(
                '../login.html'
            );

        }
    );
}

// ==========================================
// GENERAR INICIALES
// ==========================================

function generarIniciales(
    nombre,
    apellido
) {

    const inicialNombre =
        nombre
            ? nombre.charAt(0)
            : '';

    const inicialApellido =
        apellido
            ? apellido.charAt(0)
            : '';


    return (
        inicialNombre +
        inicialApellido
    ).toUpperCase();
}


// ==========================================
// CARGAR COMENTARIOS PENDIENTES
// ==========================================

async function cargarComentariosPendientes() {

    const contenedor =
        document.getElementById(
            'comentarios-pendientes'
        );


    if (!contenedor) {
        return;
    }


    const token =
        obtenerTokenAdmin();


    if (!token) {

        limpiarSesionAdmin();

        window.location.replace(
            '../login.html'
        );

        return;
    }


    try {

        const respuesta =
            await fetch(
                API_ADMIN_COMENTARIOS,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );


        // ==================================
        // SESIÓN INVÁLIDA O VENCIDA
        // ==================================

        if (
            respuesta.status === 401
        ) {

            limpiarSesionAdmin();

            window.location.replace(
                '../login.html'
            );

            return;
        }


        // ==================================
        // USUARIO SIN PERMISO ADMIN
        // ==================================

        if (
            respuesta.status === 403
        ) {

            window.location.replace(
                '../index.html'
            );

            return;
        }


        if (!respuesta.ok) {

            throw new Error(
                'No se pudieron obtener los comentarios'
            );

        }


        const comentarios =
            await respuesta.json();


        contenedor.innerHTML = '';


        actualizarContadorComentarios(
            comentarios.length
        );


        // ==================================
        // SIN PENDIENTES
        // ==================================

        if (
            comentarios.length === 0
        ) {

            contenedor.innerHTML = `
                <div class="p-4 text-muted">
                    No hay comentarios pendientes de moderación.
                </div>
            `;

            return;
        }


        // ==================================
        // MOSTRAR COMENTARIOS
        // ==================================

        comentarios.forEach(
            comentario => {

                const item =
                    document.createElement(
                        'div'
                    );


                item.className =
                    'mod-item';


                const iniciales =
                    generarIniciales(
                        comentario.usuarioNombre,
                        comentario.usuarioApellido
                    );


                const nombreUsuario =
                    `${comentario.usuarioNombre} ${comentario.usuarioApellido}`;


                const producto =
                    comentario.marca
                        ? `${comentario.productoNombre} · ${comentario.marca}`
                        : comentario.productoNombre;


                item.innerHTML = `

                    <div class="mod-head">

                        <span class="mod-avatar">
                            ${iniciales}
                        </span>


                        <div class="mod-who">

                            <strong>
                                ${nombreUsuario}
                            </strong>

                            <span>
                                en ${producto}
                            </span>

                        </div>


                        <span class="mod-stars">

                            <i class="bi bi-star-fill"></i>

                            ${comentario.calificacion}

                        </span>

                    </div>


                    <p class="mod-text">
                        ${comentario.comentario}
                    </p>


                    <div class="mod-actions">

                        <button
                            type="button"
                            class="mod-btn"
                            data-comentario-id="${comentario.id}"
                            data-estado="aprobado"
                        >

                            <i class="bi bi-check-lg"></i>

                            Aprobar

                        </button>


                        <button
                            type="button"
                            class="mod-btn reject"
                            data-comentario-id="${comentario.id}"
                            data-estado="rechazado"
                        >

                            <i class="bi bi-x-lg"></i>

                            Rechazar

                        </button>

                    </div>
                `;


                const botones =
                    item.querySelectorAll(
                        '[data-comentario-id]'
                    );


                botones.forEach(
                    boton => {

                        boton.addEventListener(
                            'click',
                            () => {

                                abrirModalModeracion(
                                    Number(
                                        boton.dataset.comentarioId
                                    ),
                                    boton.dataset.estado
                                );

                            }
                        );

                    }
                );


                contenedor.appendChild(
                    item
                );

            }
        );


    } catch (error) {

        console.error(
            'Error al cargar comentarios pendientes:',
            error
        );


        contenedor.innerHTML = `
            <div class="p-4 text-danger">
                No se pudieron cargar los comentarios pendientes.
            </div>
        `;

    }
}


// ==========================================
// ACTUALIZAR CONTADOR
// ==========================================

function actualizarContadorComentarios(
    cantidad
) {

    // Contador del panel "Por moderar"
    const contadorPanel =
        document.querySelector(
            '.admin-panel-title .admin-count'
        );

    if (contadorPanel) {

        contadorPanel.textContent =
            cantidad;

    }


    // Contador del menú lateral
    const contadorSidebar =
        document.getElementById(
            'adminComentariosCount'
        );

    if (contadorSidebar) {

        contadorSidebar.textContent =
            cantidad;

    }
}


// ==========================================
// INICIALIZAR MODAL
// ==========================================

function inicializarModalModeracion() {

    const botonConfirmar =
        document.getElementById(
            'btnConfirmarModeracion'
        );


    if (!botonConfirmar) {
        return;
    }


    botonConfirmar.addEventListener(
        'click',
        confirmarModeracion
    );
}


// ==========================================
// ABRIR MODAL
// ==========================================

function abrirModalModeracion(
    comentarioId,
    estado
) {

    comentarioSeleccionado =
        comentarioId;

    estadoSeleccionado =
        estado;


    const titulo =
        document.getElementById(
            'modalModeracionTitulo'
        );

    const pregunta =
        document.getElementById(
            'modalModeracionPregunta'
        );

    const botonConfirmar =
        document.getElementById(
            'btnConfirmarModeracion'
        );

    const icono =
        document.getElementById(
            'modalModeracionIcono'
        );


    if (
        estado === 'aprobado'
    ) {

        titulo.textContent =
            'Aprobar comentario';

        pregunta.textContent =
            '¿Confirmás que querés aprobar esta opinión?';

        botonConfirmar.textContent =
            'Aprobar';

        botonConfirmar.className =
            'btn btn-success';

        icono.className =
            'bi bi-check-circle fs-5 text-success';

    } else {

        titulo.textContent =
            'Rechazar comentario';

        pregunta.textContent =
            '¿Confirmás que querés rechazar esta opinión?';

        botonConfirmar.textContent =
            'Rechazar';

        botonConfirmar.className =
            'btn btn-danger';

        icono.className =
            'bi bi-x-circle fs-5 text-danger';

    }


    const elementoModal =
        document.getElementById(
            'modalModeracion'
        );


    const modal =
        bootstrap.Modal.getOrCreateInstance(
            elementoModal
        );


    modal.show();
}


// ==========================================
// CONFIRMAR MODERACIÓN
// ==========================================

async function confirmarModeracion() {

    if (
        !comentarioSeleccionado ||
        !estadoSeleccionado
    ) {
        return;
    }


    const token =
        obtenerTokenAdmin();

    const boton =
        document.getElementById(
            'btnConfirmarModeracion'
        );


    if (!token) {

        limpiarSesionAdmin();

        window.location.replace(
            '../login.html'
        );

        return;
    }


    boton.disabled = true;

    boton.innerHTML = `
        <span
            class="spinner-border spinner-border-sm me-2"
            aria-hidden="true"
        ></span>
        Procesando...
    `;


    try {

        const respuesta =
            await fetch(
                `${API_ADMIN_COMENTARIOS}/${comentarioSeleccionado}`,
                {
                    method: 'PATCH',

                    headers: {

                        'Content-Type':
                            'application/json',

                        Authorization:
                            `Bearer ${token}`

                    },

                    body: JSON.stringify({
                        estado:
                            estadoSeleccionado
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

            limpiarSesionAdmin();

            window.location.replace(
                '../login.html'
            );

            return;
        }


        // ==================================
        // SIN PERMISOS
        // ==================================

        if (
            respuesta.status === 403
        ) {

            window.location.replace(
                '../index.html'
            );

            return;
        }


        if (!respuesta.ok) {

            mostrarMensajeModeracion(
                datos.mensaje ||
                'No se pudo moderar el comentario.',
                'danger'
            );

            return;
        }


        // ==================================
        // CERRAR MODAL
        // ==================================

        const elementoModal =
            document.getElementById(
                'modalModeracion'
            );


        const modal =
            bootstrap.Modal.getInstance(
                elementoModal
            );


        if (modal) {
            modal.hide();
        }


        // ==================================
        // MOSTRAR ÉXITO
        // ==================================

        mostrarMensajeModeracion(
            datos.mensaje,
            'success'
        );


        // ==================================
        // RECARGAR PENDIENTES
        // ==================================

        await cargarComentariosPendientes();


        comentarioSeleccionado = null;
        estadoSeleccionado = null;


    } catch (error) {

        console.error(
            'Error al moderar comentario:',
            error
        );


        mostrarMensajeModeracion(
            'No se pudo conectar con el servidor.',
            'danger'
        );


    } finally {

        boton.disabled = false;

    }
}


// ==========================================
// MENSAJE DE MODERACIÓN
// ==========================================

function mostrarMensajeModeracion(
    texto,
    tipo
) {

    const contenedor =
        document.getElementById(
            'mensajeModeracion'
        );


    if (!contenedor) {
        return;
    }


    contenedor.innerHTML = `
        <div
            class="alert alert-${tipo} alert-dismissible fade show shadow"
            role="alert"
        >
            ${texto}

            <button
                type="button"
                class="btn-close"
                data-bs-dismiss="alert"
                aria-label="Cerrar"
            ></button>
        </div>
    `;


    setTimeout(
        () => {

            contenedor.innerHTML = '';

        },
        4000
    );
}
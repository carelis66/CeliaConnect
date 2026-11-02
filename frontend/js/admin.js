/* =====================================================
   CELIACONNECT - ADMIN.JS
  panel de administración.
===================================================== */

const API_ADMIN_PRODUCTOS =
    'http://localhost:3000/api/admin/comentarios/productos';

const API_ADMIN_RESTAURANTES =
    'http://localhost:3000/api/admin/comentarios/restaurantes';

const API_ADMIN_LOCALES =
    'http://localhost:3000/api/admin/comentarios/locales';

const API_ADMIN_NUTRICIONISTAS =
'http://localhost:3000/api/admin/comentarios/nutricionistas';

const API_ADMIN_DASHBOARD =
    'http://localhost:3000/api/admin/dashboard';

const API_PRODUCTOS =
    'http://localhost:3000/api/productos';

const API_ADMIN_MARCAS =
    'http://localhost:3000/api/admin/marcas';

const API_ADMIN_CATEGORIAS =
    'http://localhost:3000/api/admin/categorias';

const API_ADMIN_ULTIMAS_ALTAS =
    'http://localhost:3000/api/admin/ultimas-altas';

let comentarioSeleccionado = null;
let estadoSeleccionado = null;
let tipoComentarioSeleccionado = null;


// ==========================================
// OBTENER TOKEN
// ==========================================

function obtenerTokenAdmin() {

    return (
        sessionStorage.getItem('celiaToken') ||
        localStorage.getItem('celiaToken')
    );
}


// ==========================================
// OBTENER USUARIO GUARDADO
// ==========================================

function obtenerUsuarioAdmin() {

    const usuarioGuardado =
        sessionStorage.getItem('celiaUsuario') ||
        localStorage.getItem('celiaUsuario');


    if (!usuarioGuardado) {
        return null;
    }


    try {

        return JSON.parse(usuarioGuardado);

    } catch (error) {

        return null;

    }
}


// ==========================================
// LIMPIAR SESIÓN
// ==========================================

function limpiarSesionAdmin() {

    sessionStorage.removeItem('celiaToken');
    sessionStorage.removeItem('celiaUsuario');

    localStorage.removeItem('celiaToken');
    localStorage.removeItem('celiaUsuario');
}


// ==========================================
// VERIFICAR ACCESO AL ADMIN
// ==========================================

function verificarAccesoAdmin() {

    const token =
        obtenerTokenAdmin();

    const usuario =
        obtenerUsuarioAdmin();


    // NO HAY SESIÓN
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


    // NO ES ADMIN
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
// DASHBOARD - ESTADÍSTICAS
// ==========================================

async function cargarEstadisticasDashboard() {
    try {

        const kpiProductos = document.getElementById('kpiProductos');
        if (!kpiProductos) {
             return;
        }

        const token = obtenerTokenAdmin();

        const respuesta = await fetch(API_ADMIN_DASHBOARD, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!respuesta.ok) {
            throw new Error(
                'No se pudieron cargar las estadísticas del dashboard'
            );
        }

        const datos = await respuesta.json();

        document.getElementById('kpiProductos').textContent =
            datos.productos;

        document.getElementById('kpiRestaurantes').textContent =
            datos.restaurantes;

        document.getElementById('kpiLocales').textContent =
            datos.locales;

        document.getElementById('kpiNutricionistas').textContent =
            datos.nutricionistas;

        document.getElementById('kpiUsuarios').textContent =
            datos.usuarios;

    } catch (error) {
        console.error(
            'Error al cargar estadísticas del dashboard:',
            error
        );
    }
}

// ==========================================
// DASHBOARD - ÚLTIMAS ALTAS
// ==========================================

async function cargarUltimasAltas() {
    try {
        const token = obtenerTokenAdmin();

        const respuesta = await fetch(API_ADMIN_ULTIMAS_ALTAS, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!respuesta.ok) {
            throw new Error(
                'No se pudieron cargar las últimas altas'
            );
        }

        const altas = await respuesta.json();

        const tabla = document.getElementById('tablaUltimasAltas');

        if (!tabla) {
            return;
        }

        tabla.innerHTML = '';

        altas.forEach((alta) => {

            let icono = 'bi-circle-fill';

            if (alta.tipo === 'Producto') {
                icono = 'bi-basket2-fill';
            }

            if (alta.tipo === 'Restaurante') {
                icono = 'bi-shop';
            }

            if (alta.tipo === 'Local') {
                icono = 'bi-geo-alt-fill';
            }

            if (alta.tipo === 'Nutricionista') {
                icono = 'bi-heart-pulse-fill';
            }


            let claseEstado = 'status-pending';
            let iconoEstado = 'bi-hourglass-split';

            const estado = alta.estado.toLowerCase();

            if (estado === 'verificado') {
                claseEstado = 'status-ok';
                iconoEstado = 'bi-patch-check-fill';
            }

            if (estado === 'rechazado') {
                claseEstado = 'status-rejected';
                iconoEstado = 'bi-x-circle-fill';
            }


            const fecha = new Date(alta.fechaCreacion);

            const fechaFormateada =
                fecha.toLocaleDateString('es-AR', {
                    day: '2-digit',
                    month: 'short'
                });


            tabla.innerHTML += `
                <tr>
                    <td>
                        <div class="admin-item">

                            <span class="admin-item-icon">
                                <i class="bi ${icono}"></i>
                            </span>

                            <div>
                                <span class="admin-item-name">
                                    ${alta.nombre}
                                </span>
                            </div>

                        </div>
                    </td>

                    <td>
                        ${alta.tipo}
                    </td>

                    <td>
                        <span class="status-pill ${claseEstado}">
                            <i class="bi ${iconoEstado}"></i>
                            ${alta.estado}
                        </span>
                    </td>

                    <td>
                        ${fechaFormateada}
                    </td>
                </tr>
            `;
        });

    } catch (error) {
        console.error(
            'Error al cargar últimas altas:',
            error
        );
    }
}

async function cargarProductosAdmin() {

    const tabla =
        document.getElementById('tablaProductosAdmin');

    if (!tabla) {
        return;
    }

    try {

        const respuesta =
            await fetch(API_PRODUCTOS);

        if (!respuesta.ok) {
            throw new Error(
                'No se pudieron cargar los productos'
            );
        }

        const productos =
            await respuesta.json();

        tabla.innerHTML = '';

        productos.forEach((producto) => {

            const certificado =
                Number(producto.certificadoSinTacc) === 1;

            const claseEstado =
                certificado
                    ? 'status-ok'
                    : 'status-pending';

            const iconoEstado =
                certificado
                    ? 'bi-patch-check-fill'
                    : 'bi-hourglass-split';

            const textoEstado =
                certificado
                    ? 'Certificado'
                    : 'Pendiente';

            tabla.innerHTML += `
                <tr>

                    <td>
                        <div class="admin-item">

                            <span class="admin-item-icon">
                                <i class="bi bi-basket2-fill"></i>
                            </span>

                            <div>
                                <span class="admin-item-name">
                                    ${producto.nombre}
                                </span>

                                <span class="admin-item-sub">
                                    ${producto.codigoBarras || 'Sin código'}
                                </span>
                            </div>

                        </div>
                    </td>

                    <td>
                        ${producto.marca}
                    </td>

                    <td>
                        ${producto.categoria}
                    </td>

                    <td>
                        <span class="status-pill ${claseEstado}">
                            <i class="bi ${iconoEstado}"></i>
                            ${textoEstado}
                        </span>
                    </td>

                    <td class="text-end">

                        <button
                            type="button"
                            class="btn btn-sm btn-light me-1"
                            title="Editar"
                            data-id="${producto.id}"
                        >
                            <i class="bi bi-pencil"></i>
                        </button>

                        <button
                            type="button"
                            class="btn btn-sm btn-light"
                            title="Eliminar"
                            data-id="${producto.id}"
                        >
                            <i class="bi bi-trash3"></i>
                        </button>

                    </td>

                </tr>
            `;

        });

    } catch (error) {

        console.error(
            'Error al cargar productos:',
            error
        );

        tabla.innerHTML = `
            <tr>
                <td
                    colspan="5"
                    class="text-center py-5 text-muted"
                >
                    No se pudieron cargar los productos.
                </td>
            </tr>
        `;

    }

}

// ==========================================
// EDITAR PRODUCTO - ADMIN
// ==========================================

async function cargarOpcionesProducto() {

    const selectMarca =
        document.getElementById('productoMarca');

    const selectCategoria =
        document.getElementById('productoCategoria');

    if (!selectMarca || !selectCategoria) {
        return;
    }

    try {

        const token = obtenerTokenAdmin();

        const [respuestaMarcas, respuestaCategorias] =
            await Promise.all([
                fetch(API_ADMIN_MARCAS, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }),

                fetch(API_ADMIN_CATEGORIAS, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            ]);


        if (
            !respuestaMarcas.ok ||
            !respuestaCategorias.ok
        ) {
            throw new Error(
                'No se pudieron cargar marcas y categorías'
            );
        }


        const marcas =
            await respuestaMarcas.json();

        const categorias =
            await respuestaCategorias.json();


        selectMarca.innerHTML =
            '<option value="">Seleccionar marca</option>';

        marcas.forEach((marca) => {

            selectMarca.innerHTML += `
                <option value="${marca.id}">
                    ${marca.nombre}
                </option>
            `;

        });


        selectCategoria.innerHTML =
            '<option value="">Seleccionar categoría</option>';

        categorias.forEach((categoria) => {

            selectCategoria.innerHTML += `
                <option value="${categoria.id}">
                    ${categoria.nombre}
                </option>
            `;

        });


    } catch (error) {

        console.error(
            'Error al cargar opciones de producto:',
            error
        );

    }

}

function inicializarEdicionProductos() {

    const tabla =
        document.getElementById('tablaProductosAdmin');

    const modalElemento =
        document.getElementById('modalProducto');

    if (!tabla || !modalElemento) {
        return;
    }

    tabla.addEventListener('click', async (event) => {

        const boton =
            event.target.closest(
                'button[title="Editar"]'
            );

        if (!boton) {
            return;
        }

        const productoId =
            Number(boton.dataset.id);

        try {

            const respuesta =
                await fetch(
                    `${API_PRODUCTOS}/${productoId}`
                );

            if (!respuesta.ok) {
                throw new Error(
                    'No se pudo obtener el producto'
                );
            }

            const producto =
                await respuesta.json();


            document.getElementById(
                'productoId'
            ).value = producto.id;

            document.getElementById(
                'productoNombre'
            ).value = producto.nombre || '';

            document.getElementById(
                'productoCodigoBarras'
            ).value = producto.codigoBarras || '';

            document.getElementById(
                'productoDescripcion'
            ).value = producto.descripcion || '';

            document.getElementById(
                'productoIngredientes'
            ).value = producto.ingredientes || '';

            document.getElementById(
                'productoInfoNutricional'
            ).value =
                producto.informacionNutricional || '';

            document.getElementById(
                'productoImagen'
            ).value = producto.imagen || '';

            document.getElementById(
    'productoMarca'
).value = producto.marcaId;

document.getElementById(
    'productoCategoria'
).value = producto.categoriaId;

            document.getElementById(
                'productoCertificado'
            ).checked =
                Number(producto.certificadoSinTacc) === 1;


            document.getElementById(
                'modalProductoTitulo'
            ).textContent = 'Editar producto';

            document.getElementById(
    'btnGuardarProducto'
).innerHTML = `
    <i class="bi bi-check-lg"></i>
    Guardar producto
`;


            const modal =
                bootstrap.Modal.getOrCreateInstance(
                    modalElemento
                );

            modal.show();


        } catch (error) {

            console.error(
                'Error al cargar producto para editar:',
                error
            );

        }

    });

}

// ==========================================
// PREPARAR ELIMINACIÓN DE PRODUCTO - ADMIN
// ==========================================

function inicializarEliminarProducto() {

    const tabla =
        document.getElementById('tablaProductosAdmin');

    const modalElemento =
        document.getElementById('modalEliminarProducto');

    if (!tabla || !modalElemento) {
        return;
    }

    tabla.addEventListener('click', (event) => {

        const boton =
            event.target.closest(
                'button[title="Eliminar"]'
            );

        if (!boton) {
            return;
        }

        const productoId =
            Number(boton.dataset.id);

        const fila =
            boton.closest('tr');

        const nombreProducto =
            fila.querySelector(
                '.admin-item-name'
            ).textContent.trim();


        document.getElementById(
            'nombreProductoEliminar'
        ).textContent = nombreProducto;


        const botonConfirmar =
            document.getElementById(
                'btnConfirmarEliminarProducto'
            );

        botonConfirmar.dataset.id =
            productoId;


        const modal =
            bootstrap.Modal.getOrCreateInstance(
                modalElemento
            );

        modal.show();

    });

}

// ==========================================
// CONFIRMAR ELIMINACIÓN DE PRODUCTO - ADMIN
// ==========================================

function inicializarConfirmarEliminarProducto() {

    const botonConfirmar =
        document.getElementById(
            'btnConfirmarEliminarProducto'
        );

    const modalElemento =
        document.getElementById(
            'modalEliminarProducto'
        );

    if (!botonConfirmar || !modalElemento) {
        return;
    }


    botonConfirmar.addEventListener(
        'click',
        async () => {

            const productoId =
                Number(
                    botonConfirmar.dataset.id
                );

            if (!productoId) {
                return;
            }


            try {

                const token =
                    obtenerTokenAdmin();

                botonConfirmar.disabled = true;


                const respuesta =
                    await fetch(
                        `http://localhost:3000/api/admin/productos/${productoId}`,
                        {
                            method: 'DELETE',

                            headers: {
                                Authorization:
                                    `Bearer ${token}`
                            }
                        }
                    );


                const resultado =
                    await respuesta.json();


                if (!respuesta.ok) {
                    throw new Error(
                        resultado.mensaje ||
                        'No se pudo eliminar el producto'
                    );
                }


                const modal =
                    bootstrap.Modal.getInstance(
                        modalElemento
                    );

                modal.hide();


                await cargarProductosAdmin();


            } catch (error) {

                console.error(
                    'Error al eliminar producto:',
                    error
                );

            } finally {

                botonConfirmar.disabled = false;

            }

        }
    );

}

// ==========================================
// GUARDAR EDICIÓN DE PRODUCTO - ADMIN
// ==========================================

function inicializarGuardarProducto() {

    const formulario =
        document.getElementById('formProducto');

    const modalElemento =
        document.getElementById('modalProducto');

    if (!formulario || !modalElemento) {
        return;
    }

    formulario.addEventListener('submit', async (event) => {

        event.preventDefault();

        const productoId =
            Number(
                document.getElementById('productoId').value
            );


        const token =
            obtenerTokenAdmin();

        const datosProducto = {

            nombre:
                document.getElementById(
                    'productoNombre'
                ).value.trim(),

            codigoBarras:
                document.getElementById(
                    'productoCodigoBarras'
                ).value.trim(),

            marcaId:
                Number(
                    document.getElementById(
                        'productoMarca'
                    ).value
                ),

            categoriaId:
                Number(
                    document.getElementById(
                        'productoCategoria'
                    ).value
                ),

            descripcion:
                document.getElementById(
                    'productoDescripcion'
                ).value.trim(),

            ingredientes:
                document.getElementById(
                    'productoIngredientes'
                ).value.trim(),

            informacionNutricional:
                document.getElementById(
                    'productoInfoNutricional'
                ).value.trim(),

            imagen:
                document.getElementById(
                    'productoImagen'
                ).value.trim(),

            certificadoSinTacc:
                document.getElementById(
                    'productoCertificado'
                ).checked
                    ? 1
                    : 0
        };


        try {

            const botonGuardar =
                document.getElementById(
                    'btnGuardarProducto'
                );

            botonGuardar.disabled = true;

            const esNuevo =
    !productoId;

const url =
    esNuevo
        ? 'http://localhost:3000/api/admin/productos'
        : `http://localhost:3000/api/admin/productos/${productoId}`;

const metodo =
    esNuevo
        ? 'POST'
        : 'PUT';

const respuesta =
    await fetch(
        url,
        {
            method: metodo,

            headers: {
                'Content-Type':
                    'application/json',

                Authorization:
                    `Bearer ${token}`
            },

            body:
                JSON.stringify(datosProducto)
        }
    );


            const resultado =
                await respuesta.json();


            if (!respuesta.ok) {
                throw new Error(
                    resultado.mensaje ||
                    'No se pudo actualizar el producto'
                );
            }

            const tituloExito =
    document.querySelector(
        '#modalProductoExito h5'
    );

const textoExito =
    document.querySelector(
        '#modalProductoExito p'
    );

if (tituloExito && textoExito) {

    tituloExito.textContent =
        esNuevo
            ? 'Producto creado'
            : 'Producto actualizado';

    textoExito.textContent =
        esNuevo
            ? 'El producto se creó correctamente.'
            : 'Los cambios se guardaron correctamente.';
}


            const modal =
    bootstrap.Modal.getInstance(
        modalElemento
    );

modalElemento.addEventListener(
    'hidden.bs.modal',
    () => {

        const modalExitoElemento =
            document.getElementById(
                'modalProductoExito'
            );

        const modalExito =
            bootstrap.Modal.getOrCreateInstance(
                modalExitoElemento
            );

        modalExito.show();

    },
    { once: true }
);

modal.hide();


            await cargarProductosAdmin();


        } catch (error) {

            console.error(
                'Error al guardar producto:',
                error
            );

        } finally {

            const botonGuardar =
                document.getElementById(
                    'btnGuardarProducto'
                );

            botonGuardar.disabled = false;

        }

    });

}

// ==========================================
// INICIAR ADMIN
// ==========================================

document.addEventListener(
    'DOMContentLoaded',
    () => {

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

        cargarEstadisticasDashboard();

        cargarUltimasAltas();

        cargarComentariosPendientes();

        cargarProductosAdmin();

        cargarOpcionesProducto()
    .then(() => {
        inicializarEdicionProductos();
        inicializarNuevoProducto();
    });
    inicializarGuardarProducto();
    inicializarEliminarProducto();
    inicializarConfirmarEliminarProducto();

    }
);

// ==========================================
// NUEVO PRODUCTO - ADMIN
// ==========================================

function inicializarNuevoProducto() {

    const botonNuevo =
        document.getElementById('btnNuevoProducto');

    const formulario =
        document.getElementById('formProducto');

    const modalElemento =
        document.getElementById('modalProducto');

    if (!botonNuevo || !formulario || !modalElemento) {
        return;
    }

    botonNuevo.addEventListener('click', () => {

        formulario.reset();

        document.getElementById(
            'productoId'
        ).value = '';

        document.getElementById(
            'modalProductoTitulo'
        ).textContent = 'Nuevo producto';

        document.getElementById(
            'btnGuardarProducto'
        ).innerHTML = `
            <i class="bi bi-check-lg"></i>
            Crear producto
        `;

        const modal =
            bootstrap.Modal.getOrCreateInstance(
                modalElemento
            );

        modal.show();

    });

}


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
// PETICIÓN ADMIN
// ==========================================

async function obtenerComentariosAPI(
    url,
    token
) {

    const respuesta =
        await fetch(
            url,
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );


    // SESIÓN VENCIDA
    if (
        respuesta.status === 401
    ) {

        limpiarSesionAdmin();

        window.location.replace(
            '../login.html'
        );

        throw new Error(
            'Sesión vencida'
        );
    }


    // SIN PERMISOS
    if (
        respuesta.status === 403
    ) {

        window.location.replace(
            '../index.html'
        );

        throw new Error(
            'Sin permisos'
        );
    }


    if (!respuesta.ok) {

        throw new Error(
            'No se pudieron obtener los comentarios'
        );
    }


    return await respuesta.json();
}


// ==========================================
// CARGAR COMENTARIOS PENDIENTES
// PRODUCTOS + RESTAURANTES
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


    contenedor.innerHTML = `
        <div class="p-4 text-muted">
            Cargando comentarios pendientes...
        </div>
    `;


    try {

        const [
    comentariosProductos,
    comentariosRestaurantes,
    comentariosLocales,
    comentariosNutricionistas
] = await Promise.all([

    obtenerComentariosAPI(
        API_ADMIN_PRODUCTOS,
        token
    ),

    obtenerComentariosAPI(
        API_ADMIN_RESTAURANTES,
        token
    ),

    obtenerComentariosAPI(
        API_ADMIN_LOCALES,
        token
    ),

    obtenerComentariosAPI(
        API_ADMIN_NUTRICIONISTAS,
        token
    )

]);


        // AGREGAMOS EL TIPO A CADA COMENTARIO

        const productos =
            comentariosProductos.map(
                comentario => ({
                    ...comentario,
                    tipoComentario: 'producto'
                })
            );


        const restaurantes =
            comentariosRestaurantes.map(
                comentario => ({
                    ...comentario,
                    tipoComentario: 'restaurante'
                })
            );

        const locales =
    comentariosLocales.map(
        comentario => ({
            ...comentario,
            tipoComentario: 'local'
        })
    );

    const nutricionistas =
    comentariosNutricionistas.map(
        comentario => ({
            ...comentario,
            tipoComentario: 'nutricionista'
        })
    );


        const comentarios = [
            ...productos,
            ...restaurantes,
            ...locales,
            ...nutricionistas
        ];


        // ORDENAR POR FECHA MÁS RECIENTE

        comentarios.sort(
            (a, b) =>
                new Date(b.fechaComentario) -
                new Date(a.fechaComentario)
        );


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


                let destino = '';
                let etiquetaTipo = '';


                // PRODUCTO
                if (
                    comentario.tipoComentario ===
                    'producto'
                ) {

                    destino =
                        comentario.marca
                            ? `${comentario.productoNombre} · ${comentario.marca}`
                            : comentario.productoNombre;

                    etiquetaTipo =
                        'Producto';

                }


                // RESTAURANTE
                if (
                    comentario.tipoComentario ===
                    'restaurante'
                ) {

                    destino =
                        comentario.restauranteNombre;

                    etiquetaTipo =
                        'Restaurante';
                // LOCAL
if (
    comentario.tipoComentario ===
    'local'
) {

    destino =
        comentario.localNombre;

    etiquetaTipo =
        'Local';

}

// NUTRICIONISTA
if (
    comentario.tipoComentario ===
    'nutricionista'
) {

    destino =
        comentario.nutricionistaNombre;

    etiquetaTipo =
        'Nutricionista';

}

                }


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
                                ${etiquetaTipo}: ${destino}
                            </span>

                        </div>


                        <span class="mod-stars">

                            <i class="bi bi-star-fill"></i>

                            ${comentario.calificacion}

                        </span>

                    </div>


                    ${
                        comentario.titulo
                            ? `
                                <strong class="d-block mb-1">
                                    ${comentario.titulo}
                                </strong>
                            `
                            : ''
                    }


                    <p class="mod-text">
                        ${comentario.comentario}
                    </p>


                    <div class="mod-actions">

                        <button
                            type="button"
                            class="mod-btn"
                            data-comentario-id="${comentario.id}"
                            data-estado="aprobado"
                            data-tipo="${comentario.tipoComentario}"
                        >

                            <i class="bi bi-check-lg"></i>

                            Aprobar

                        </button>


                        <button
                            type="button"
                            class="mod-btn reject"
                            data-comentario-id="${comentario.id}"
                            data-estado="rechazado"
                            data-tipo="${comentario.tipoComentario}"
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
                                    boton.dataset.estado,
                                    boton.dataset.tipo
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

    const contadorPanel =
        document.querySelector(
            '.admin-panel-title .admin-count'
        );


    if (contadorPanel) {

        contadorPanel.textContent =
            cantidad;

    }


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
    estado,
    tipo
) {

    comentarioSeleccionado =
        comentarioId;

    estadoSeleccionado =
        estado;

    tipoComentarioSeleccionado =
        tipo;


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
        !estadoSeleccionado ||
        !tipoComentarioSeleccionado
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



   let apiModeracion = '';

if (
    tipoComentarioSeleccionado ===
    'producto'
) {

    apiModeracion =
        API_ADMIN_PRODUCTOS;

} else if (
    tipoComentarioSeleccionado ===
    'restaurante'
) {

    apiModeracion =
        API_ADMIN_RESTAURANTES;

} else if (
    tipoComentarioSeleccionado ===
    'local'
) {

    apiModeracion =
        API_ADMIN_LOCALES;

} else if (
    tipoComentarioSeleccionado ===
    'nutricionista'
) {

    apiModeracion =
        API_ADMIN_NUTRICIONISTAS;

} else {

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
                `${apiModeracion}/${comentarioSeleccionado}`,
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


        // SESIÓN VENCIDA
        if (
            respuesta.status === 401
        ) {

            limpiarSesionAdmin();

            window.location.replace(
                '../login.html'
            );

            return;
        }


        // SIN PERMISOS
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
        // RECARGAR PRODUCTOS + RESTAURANTES
        // ==================================

        await cargarComentariosPendientes();


        comentarioSeleccionado = null;
        estadoSeleccionado = null;
        tipoComentarioSeleccionado = null;


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
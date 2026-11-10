// ==========================================
// CELIACONNECT - MIS FAVORITOS
// ==========================================

const API_BASE = 'https://celiaconnect-production.up.railway.app/api';


// ==========================================
// ELEMENTOS DEL DOM
// ==========================================

const loading =
    document.getElementById('favoritos-loading');

const contenido =
    document.getElementById('favoritos-contenido');

const vacio =
    document.getElementById('favoritos-vacio');

const contenedorProductos =
    document.getElementById('favoritos-productos');

const contenedorRestaurantes =
    document.getElementById('favoritos-restaurantes');

const contenedorLocales =
    document.getElementById('favoritos-locales');

const contenedorNutricionistas =
    document.getElementById('favoritos-nutricionistas');

const paginacionProductos =
    document.getElementById(
        'favoritos-productos-paginacion'
    );

const paginacionRestaurantes =
    document.getElementById(
        'favoritos-restaurantes-paginacion'
    );

const paginacionLocales =
    document.getElementById(
        'favoritos-locales-paginacion'
    );

const paginacionNutricionistas =
    document.getElementById(
        'favoritos-nutricionistas-paginacion'
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
// ESTADO DE FAVORITOS
// ==========================================

let productosFavoritos = [];
let restaurantesFavoritos = [];
let localesFavoritos = [];
let nutricionistasFavoritos = [];


// ==========================================
// PAGINACIÓN
// ==========================================

const FAVORITOS_POR_PAGINA = 6;

let paginaProductos = 1;
let paginaRestaurantes = 1;
let paginaLocales = 1;
let paginaNutricionistas = 1;


// ==========================================
// CARGAR FAVORITOS
// ==========================================

async function cargarFavoritos() {

    const token = obtenerToken();

    if (!token) {

        window.location.href = 'login.html';

        return;
    }


    try {

        const respuestas = await Promise.all([

            fetch(
                `${API_BASE}/productos/favoritos`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            ),

            fetch(`${API_BASE}/productos`),

            fetch(
                `${API_BASE}/restaurantes/favoritos`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            ),

            fetch(`${API_BASE}/restaurantes`),

            fetch(
                `${API_BASE}/locales/favoritos`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            ),

            fetch(`${API_BASE}/locales`),

            fetch(
                `${API_BASE}/nutricionistas/favoritos`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            ),

            fetch(`${API_BASE}/nutricionistas`)
        ]);


        if (
            respuestas.some(
                respuesta => !respuesta.ok
            )
        ) {

            throw new Error(
                'No se pudieron cargar los favoritos'
            );
        }


        const [
            favoritosProductos,
            productos,
            favoritosRestaurantes,
            restaurantes,
            favoritosLocales,
            locales,
            favoritosNutricionistas,
            nutricionistas
        ] = await Promise.all(
            respuestas.map(
                respuesta => respuesta.json()
            )
        );


        const idsProductos =
            favoritosProductos.map(
                favorito =>
                    Number(favorito.productoId)
            );


        productosFavoritos =
            productos.filter(
                producto =>
                    idsProductos.includes(
                        Number(producto.id)
                    )
            );


        const idsRestaurantes =
            favoritosRestaurantes.map(
                favorito =>
                    Number(
                        favorito.restauranteId
                    )
            );


        restaurantesFavoritos =
            restaurantes.filter(
                restaurante =>
                    idsRestaurantes.includes(
                        Number(restaurante.id)
                    )
            );


        const idsLocales =
            favoritosLocales.map(
                favorito =>
                    Number(favorito.localId)
            );


        localesFavoritos =
            locales.filter(
                local =>
                    idsLocales.includes(
                        Number(local.id)
                    )
            );


        const idsNutricionistas =
            favoritosNutricionistas.map(
                favorito =>
                    Number(
                        favorito.nutricionistaId
                    )
            );


        nutricionistasFavoritos =
            nutricionistas.filter(
                nutricionista =>
                    idsNutricionistas.includes(
                        Number(nutricionista.id)
                    )
            );


        loading.classList.add('d-none');

        comprobarEstadoGeneral();

        mostrarProductos();
        mostrarRestaurantes();
        mostrarLocales();
        mostrarNutricionistas();


    } catch (error) {

        console.error(
            'Error al cargar favoritos:',
            error
        );


        loading.classList.add('d-none');

        contenido.classList.add('d-none');

        vacio.classList.remove('d-none');


        vacio.innerHTML = `
            <i
                class="bi bi-exclamation-circle fs-1 text-warning"
            ></i>

            <h3 class="fw-bold mt-3">
                No pudimos cargar tus favoritos
            </h3>

            <p class="text-muted">
                Intentá nuevamente más tarde.
            </p>
        `;
    }
}


// ==========================================
// ESTADO GENERAL
// ==========================================

function comprobarEstadoGeneral() {

    const totalFavoritos =
        productosFavoritos.length +
        restaurantesFavoritos.length +
        localesFavoritos.length +
        nutricionistasFavoritos.length;


    if (totalFavoritos === 0) {

        contenido.classList.add('d-none');

        vacio.classList.remove('d-none');

        vacio.innerHTML = `
            <i class="bi bi-heart fs-1 text-muted"></i>

            <h3 class="fw-bold mt-3">
                Todavía no tenés favoritos
            </h3>

            <p class="text-muted mb-4">
                Explorá CeliaConnect y guardá los productos,
                lugares y profesionales que más te interesen.
            </p>

            <a
                href="index.html"
                class="btn btn-success"
            >
                Explorar CeliaConnect
            </a>
        `;

        return;
    }


    vacio.classList.add('d-none');

    contenido.classList.remove('d-none');
}


// ==========================================
// ACTUALIZAR CANTIDAD
// ==========================================

function actualizarCantidad(id, cantidad) {

    const elemento =
        document.getElementById(id);

    if (elemento) {

        elemento.textContent =
            `(${cantidad})`;
    }
}


// ==========================================
// PAGINADOR GENERAL
// ==========================================

function crearPaginacion(
    contenedorPaginacion,
    totalElementos,
    paginaActual,
    cambiarPagina
) {

    contenedorPaginacion.innerHTML = '';


    const totalPaginas =
        Math.ceil(
            totalElementos /
            FAVORITOS_POR_PAGINA
        );


    if (totalPaginas <= 1) {

        return;
    }


    // ANTERIOR

    const anterior =
        document.createElement('li');


    anterior.className =
        `page-item ${
            paginaActual === 1
                ? 'disabled'
                : ''
        }`;


    anterior.innerHTML = `
        <button
            class="page-link"
            type="button"
            aria-label="Página anterior"
        >
            <i class="bi bi-chevron-left"></i>
        </button>
    `;


    anterior
        .querySelector('button')
        .addEventListener(
            'click',
            () => {

                if (paginaActual > 1) {

                    cambiarPagina(
                        paginaActual - 1
                    );
                }
            }
        );


    contenedorPaginacion.appendChild(
        anterior
    );


    // NÚMEROS

    for (
        let pagina = 1;
        pagina <= totalPaginas;
        pagina++
    ) {

        const item =
            document.createElement('li');


        item.className =
            `page-item ${
                pagina === paginaActual
                    ? 'active'
                    : ''
            }`;


        item.innerHTML = `
            <button
                class="page-link"
                type="button"
            >
                ${pagina}
            </button>
        `;


        item
            .querySelector('button')
            .addEventListener(
                'click',
                () => {

                    cambiarPagina(pagina);
                }
            );


        contenedorPaginacion.appendChild(
            item
        );
    }


    // SIGUIENTE

    const siguiente =
        document.createElement('li');


    siguiente.className =
        `page-item ${
            paginaActual === totalPaginas
                ? 'disabled'
                : ''
        }`;


    siguiente.innerHTML = `
        <button
            class="page-link"
            type="button"
            aria-label="Página siguiente"
        >
            <i class="bi bi-chevron-right"></i>
        </button>
    `;


    siguiente
        .querySelector('button')
        .addEventListener(
            'click',
            () => {

                if (
                    paginaActual <
                    totalPaginas
                ) {

                    cambiarPagina(
                        paginaActual + 1
                    );
                }
            }
        );


    contenedorPaginacion.appendChild(
        siguiente
    );
}


// ==========================================
// ELIMINAR FAVORITO
// ==========================================

async function eliminarFavorito(
    tipo,
    id,
    boton
) {

    const token = obtenerToken();

    if (!token) {

        window.location.href = 'login.html';

        return;
    }


    boton.disabled = true;


    try {

        const respuesta = await fetch(
            `${API_BASE}/${tipo}/${id}/favorito`,
            {
                method: 'DELETE',

                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );


        if (!respuesta.ok) {

            throw new Error(
                'No se pudo eliminar el favorito'
            );
        }


        const idNumerico = Number(id);


        switch (tipo) {

            case 'productos':

                productosFavoritos =
                    productosFavoritos.filter(
                        producto =>
                            Number(producto.id) !==
                            idNumerico
                    );

                mostrarProductos();

                break;


            case 'restaurantes':

                restaurantesFavoritos =
                    restaurantesFavoritos.filter(
                        restaurante =>
                            Number(restaurante.id) !==
                            idNumerico
                    );

                mostrarRestaurantes();

                break;


            case 'locales':

                localesFavoritos =
                    localesFavoritos.filter(
                        local =>
                            Number(local.id) !==
                            idNumerico
                    );

                mostrarLocales();

                break;


            case 'nutricionistas':

                nutricionistasFavoritos =
                    nutricionistasFavoritos.filter(
                        nutricionista =>
                            Number(nutricionista.id) !==
                            idNumerico
                    );

                mostrarNutricionistas();

                break;
        }


        comprobarEstadoGeneral();


    } catch (error) {

        console.error(
            'Error al eliminar favorito:',
            error
        );


        boton.disabled = false;
    }
}


// ==========================================
// PRODUCTOS
// ==========================================

function mostrarProductos() {

    const seccion =
        document.getElementById(
            'favoritos-productos-seccion'
        );


    actualizarCantidad(
        'cantidad-productos',
        productosFavoritos.length
    );


    if (productosFavoritos.length === 0) {

        seccion.classList.add('d-none');

        contenedorProductos.innerHTML = '';

        paginacionProductos.innerHTML = '';

        return;
    }


    seccion.classList.remove('d-none');


    const totalPaginas =
        Math.ceil(
            productosFavoritos.length /
            FAVORITOS_POR_PAGINA
        );


    if (paginaProductos > totalPaginas) {

        paginaProductos =
            Math.max(totalPaginas, 1);
    }


    const inicio =
        (paginaProductos - 1) *
        FAVORITOS_POR_PAGINA;


    const productosPagina =
        productosFavoritos.slice(
            inicio,
            inicio + FAVORITOS_POR_PAGINA
        );


    contenedorProductos.innerHTML =
        productosPagina.map(producto => {

            const imagen =
                producto.imagen &&
                producto.imagen.trim() !== ''
                    ? `
                        <img
                            src="${producto.imagen}"
                            alt="${producto.nombre}"
                            class="favorito-card-img"
                        >
                    `
                    : `
                        <div class="favorito-card-placeholder">
                            <i class="bi bi-box-seam"></i>
                        </div>
                    `;


            return `
                <div class="col-12 col-lg-6">

                    <article class="favorito-card">

                        <div class="favorito-card-media">
                            ${imagen}
                        </div>

                        <div class="favorito-card-contenido">

                            <div class="favorito-card-superior">

                                <span class="favorito-badge">
                                    Producto
                                </span>

                                <button
                                    type="button"
                                    class="favorito-corazon"
                                    data-tipo="productos"
                                    data-id="${producto.id}"
                                    aria-label="Quitar ${producto.nombre} de favoritos"
                                    title="Quitar de favoritos"
                                >
                                    <i class="bi bi-heart-fill"></i>
                                </button>

                            </div>

                            <h3 class="favorito-card-titulo">
                                ${producto.nombre}
                            </h3>

                            <p class="favorito-card-info">
                                ${
                                    producto.marca ||
                                    'Producto Sin TACC'
                                }
                            </p>

                            <a
                                href="producto-detalle.html?id=${producto.id}"
                                class="favorito-card-link"
                            >
                                Ver detalle
                                <i class="bi bi-arrow-right"></i>
                            </a>

                        </div>

                    </article>

                </div>
            `;
        })
        .join('');


    crearPaginacion(
        paginacionProductos,
        productosFavoritos.length,
        paginaProductos,
        nuevaPagina => {

            paginaProductos = nuevaPagina;

            mostrarProductos();
        }
    );
}


// ==========================================
// RESTAURANTES
// ==========================================

function mostrarRestaurantes() {

    const seccion =
        document.getElementById(
            'favoritos-restaurantes-seccion'
        );


    actualizarCantidad(
        'cantidad-restaurantes',
        restaurantesFavoritos.length
    );


    if (restaurantesFavoritos.length === 0) {

        seccion.classList.add('d-none');

        contenedorRestaurantes.innerHTML = '';

        paginacionRestaurantes.innerHTML = '';

        return;
    }


    seccion.classList.remove('d-none');


    const totalPaginas =
        Math.ceil(
            restaurantesFavoritos.length /
            FAVORITOS_POR_PAGINA
        );


    if (paginaRestaurantes > totalPaginas) {

        paginaRestaurantes =
            Math.max(totalPaginas, 1);
    }


    const inicio =
        (paginaRestaurantes - 1) *
        FAVORITOS_POR_PAGINA;


    const restaurantesPagina =
        restaurantesFavoritos.slice(
            inicio,
            inicio + FAVORITOS_POR_PAGINA
        );


    contenedorRestaurantes.innerHTML =
        restaurantesPagina.map(
            restaurante => {

                const imagen =
                    restaurante.imagenExterior &&
                    restaurante.imagenExterior.trim() !== ''
                        ? `
                            <img
                                src="${restaurante.imagenExterior}"
                                alt="${restaurante.nombre}"
                                class="favorito-card-img"
                            >
                        `
                        : `
                            <div class="favorito-card-placeholder">
                                <i class="bi bi-cup-hot"></i>
                            </div>
                        `;


                return `
                    <div class="col-12 col-lg-6">

                        <article class="favorito-card">

                            <div class="favorito-card-media">
                                ${imagen}
                            </div>

                            <div class="favorito-card-contenido">

                                <div class="favorito-card-superior">

                                    <span class="favorito-badge">
                                        ${
                                            restaurante.tipoRestaurante ||
                                            'Restaurante'
                                        }
                                    </span>

                                    <button
                                        type="button"
                                        class="favorito-corazon"
                                        data-tipo="restaurantes"
                                        data-id="${restaurante.id}"
                                        aria-label="Quitar ${restaurante.nombre} de favoritos"
                                        title="Quitar de favoritos"
                                    >
                                        <i class="bi bi-heart-fill"></i>
                                    </button>

                                </div>

                                <h3 class="favorito-card-titulo">
                                    ${restaurante.nombre}
                                </h3>

                                <p class="favorito-card-info">

                                    <i class="bi bi-geo-alt"></i>

                                    ${
                                        restaurante.barrio ||
                                        'CABA'
                                    }

                                </p>

                                <a
                                    href="restaurante-detalle.html?id=${restaurante.id}"
                                    class="favorito-card-link"
                                >
                                    Ver detalle
                                    <i class="bi bi-arrow-right"></i>
                                </a>

                            </div>

                        </article>

                    </div>
                `;
            }
        )
        .join('');


    crearPaginacion(
        paginacionRestaurantes,
        restaurantesFavoritos.length,
        paginaRestaurantes,
        nuevaPagina => {

            paginaRestaurantes =
                nuevaPagina;

            mostrarRestaurantes();
        }
    );
}


// ==========================================
// LOCALES
// ==========================================

function mostrarLocales() {

    const seccion =
        document.getElementById(
            'favoritos-locales-seccion'
        );


    actualizarCantidad(
        'cantidad-locales',
        localesFavoritos.length
    );


    if (localesFavoritos.length === 0) {

        seccion.classList.add('d-none');

        contenedorLocales.innerHTML = '';

        paginacionLocales.innerHTML = '';

        return;
    }


    seccion.classList.remove('d-none');


    const totalPaginas =
        Math.ceil(
            localesFavoritos.length /
            FAVORITOS_POR_PAGINA
        );


    if (paginaLocales > totalPaginas) {

        paginaLocales =
            Math.max(totalPaginas, 1);
    }


    const inicio =
        (paginaLocales - 1) *
        FAVORITOS_POR_PAGINA;


    const localesPagina =
        localesFavoritos.slice(
            inicio,
            inicio + FAVORITOS_POR_PAGINA
        );


    contenedorLocales.innerHTML =
        localesPagina.map(local => {

            const imagen =
                local.imagen &&
                local.imagen.trim() !== ''
                    ? `
                        <img
                            src="${local.imagen}"
                            alt="${local.nombre}"
                            class="favorito-card-img"
                        >
                    `
                    : `
                        <div class="favorito-card-placeholder">
                            <i class="bi bi-shop"></i>
                        </div>
                    `;


            return `
                <div class="col-12 col-lg-6">

                    <article class="favorito-card">

                        <div class="favorito-card-media">
                            ${imagen}
                        </div>

                        <div class="favorito-card-contenido">

                            <div class="favorito-card-superior">

                                <span class="favorito-badge">
                                    ${
                                        local.tipoLocal ||
                                        'Local'
                                    }
                                </span>

                                <button
                                    type="button"
                                    class="favorito-corazon"
                                    data-tipo="locales"
                                    data-id="${local.id}"
                                    aria-label="Quitar ${local.nombre} de favoritos"
                                    title="Quitar de favoritos"
                                >
                                    <i class="bi bi-heart-fill"></i>
                                </button>

                            </div>

                            <h3 class="favorito-card-titulo">
                                ${local.nombre}
                            </h3>

                            <p class="favorito-card-info">

                                <i class="bi bi-geo-alt"></i>

                                ${
                                    local.barrio ||
                                    'CABA'
                                }

                            </p>

                            <a
                                href="local-detalle.html?id=${local.id}"
                                class="favorito-card-link"
                            >
                                Ver detalle
                                <i class="bi bi-arrow-right"></i>
                            </a>

                        </div>

                    </article>

                </div>
            `;
        })
        .join('');


    crearPaginacion(
        paginacionLocales,
        localesFavoritos.length,
        paginaLocales,
        nuevaPagina => {

            paginaLocales = nuevaPagina;

            mostrarLocales();
        }
    );
}


// ==========================================
// NUTRICIONISTAS
// ==========================================

function mostrarNutricionistas() {

    const seccion =
        document.getElementById(
            'favoritos-nutricionistas-seccion'
        );


    actualizarCantidad(
        'cantidad-nutricionistas',
        nutricionistasFavoritos.length
    );


    if (nutricionistasFavoritos.length === 0) {

        seccion.classList.add('d-none');

        contenedorNutricionistas.innerHTML = '';

        paginacionNutricionistas.innerHTML = '';

        return;
    }


    seccion.classList.remove('d-none');


    const totalPaginas =
        Math.ceil(
            nutricionistasFavoritos.length /
            FAVORITOS_POR_PAGINA
        );


    if (paginaNutricionistas > totalPaginas) {

        paginaNutricionistas =
            Math.max(totalPaginas, 1);
    }


    const inicio =
        (paginaNutricionistas - 1) *
        FAVORITOS_POR_PAGINA;


    const nutricionistasPagina =
        nutricionistasFavoritos.slice(
            inicio,
            inicio + FAVORITOS_POR_PAGINA
        );


    contenedorNutricionistas.innerHTML =
        nutricionistasPagina.map(
            nutricionista => {

                const foto =
                    nutricionista.fotoPerfil &&
                    nutricionista.fotoPerfil.trim() !== ''
                        ? `
                            <img
                                src="${nutricionista.fotoPerfil}"
                                alt="${nutricionista.nombre} ${nutricionista.apellido}"
                                class="favorito-card-img"
                            >
                        `
                        : `
                            <div class="favorito-card-placeholder">
                                <i class="bi bi-person"></i>
                            </div>
                        `;


                return `
                    <div class="col-12 col-lg-6">

                        <article class="favorito-card">

                            <div class="favorito-card-media">
                                ${foto}
                            </div>

                            <div class="favorito-card-contenido">

                                <div class="favorito-card-superior">

                                    <span class="favorito-badge">
                                        Nutricionista
                                    </span>

                                    <button
                                        type="button"
                                        class="favorito-corazon"
                                        data-tipo="nutricionistas"
                                        data-id="${nutricionista.id}"
                                        aria-label="Quitar ${nutricionista.nombre} ${nutricionista.apellido} de favoritos"
                                        title="Quitar de favoritos"
                                    >
                                        <i class="bi bi-heart-fill"></i>
                                    </button>

                                </div>

                                <h3 class="favorito-card-titulo">
                                    ${nutricionista.nombre}
                                    ${nutricionista.apellido}
                                </h3>

                                <p class="favorito-card-info">

                                    <i class="bi bi-geo-alt"></i>

                                    ${
                                        nutricionista.barrio ||
                                        'Buenos Aires'
                                    }

                                </p>

                                <a
                                    href="nutricionista-detalle.html?id=${nutricionista.id}"
                                    class="favorito-card-link"
                                >
                                    Ver detalle
                                    <i class="bi bi-arrow-right"></i>
                                </a>

                            </div>

                        </article>

                    </div>
                `;
            }
        )
        .join('');


    crearPaginacion(
        paginacionNutricionistas,
        nutricionistasFavoritos.length,
        paginaNutricionistas,
        nuevaPagina => {

            paginaNutricionistas =
                nuevaPagina;

            mostrarNutricionistas();
        }
    );
}


// ==========================================
// CLICK EN CORAZÓN
// ==========================================

contenido.addEventListener(
    'click',
    async event => {

        const boton =
            event.target.closest(
                '.favorito-corazon'
            );


        if (!boton) {

            return;
        }


        const tipo =
            boton.dataset.tipo;

        const id =
            boton.dataset.id;


        await eliminarFavorito(
            tipo,
            id,
            boton
        );
    }
);


// ==========================================
// INICIO
// ==========================================

cargarFavoritos();
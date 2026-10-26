// ==========================================
// CELIACONNECT - RESTAURANTES
// ==========================================

const API_RESTAURANTES =
    'http://localhost:3000/api/restaurantes';

const RESTAURANTES_POR_PAGINA = 9;

let restaurantes = [];
let restaurantesFiltrados = [];
let paginaActual = 1;


// ==========================================
// ELEMENTOS DEL DOM
// ==========================================

const contenedorRestaurantes =
    document.getElementById('restaurantes-container');

const contadorRestaurantes =
    document.getElementById('restaurantes-count');

const paginacionRestaurantes =
    document.getElementById('restaurantes-paginacion');

const buscadorRestaurantes =
    document.getElementById('buscar-restaurante');

const ordenRestaurantes =
    document.getElementById('orden-restaurantes');


// ==========================================
// CARGAR RESTAURANTES DESDE LA API
// ==========================================

async function cargarRestaurantes() {

    try {

        const respuesta =
            await fetch(API_RESTAURANTES);

        if (!respuesta.ok) {
            throw new Error(
                'No se pudieron obtener los restaurantes'
            );
        }

        restaurantes =
            await respuesta.json();

        restaurantesFiltrados =
            [...restaurantes];

        aplicarFiltrosYOrden();

    } catch (error) {

        console.error(
            'Error al cargar restaurantes:',
            error
        );

        contadorRestaurantes.textContent =
            'No se pudieron cargar los restaurantes';

        contenedorRestaurantes.innerHTML = `
            <div class="col-12">
                <div class="alert alert-warning">
                    No pudimos cargar los restaurantes.
                    Intentá nuevamente más tarde.
                </div>
            </div>
        `;
    }

}


// ==========================================
// CREAR ESTRELLAS
// ==========================================

function crearEstrellas(calificacion) {

    const valor =
        Number(calificacion) || 0;

    if (valor === 0) {
        return `
            <span class="text-muted">
                Sin reseñas
            </span>
        `;
    }

    return `
        <span class="text-warning">
            <i class="bi bi-star-fill"></i>
        </span>

        <strong>
            ${valor.toFixed(1)}
        </strong>
    `;
}


// ==========================================
// CREAR TARJETA DE RESTAURANTE
// ==========================================

function crearTarjetaRestaurante(restaurante) {

    const tieneImagen =
        restaurante.imagenExterior &&
        restaurante.imagenExterior.trim() !== '';

    const imagen = tieneImagen
        ? `
            <img
                src="${restaurante.imagenExterior}"
                class="card-img-top"
                alt="${restaurante.nombre}"
            >
        `
        : `
            <div
                class="d-flex align-items-center justify-content-center bg-light"
                style="height: 210px;"
            >
                <i
                    class="bi bi-shop text-secondary"
                    style="font-size: 4rem;"
                ></i>
            </div>
        `;


    return `
        <div class="col-md-6 col-xl-4">

            <a
                href="restaurante-detalle.html?id=${restaurante.id}"
                class="text-decoration-none text-dark"
            >

                <article class="card h-100 shadow-sm border-0">

                    ${imagen}

                    <div class="card-body d-flex flex-column">

                        <div class="mb-2">

                            <span class="badge text-bg-success text-white">
                                ${restaurante.tipoRestaurante}
                            </span>

                        </div>


                        <h5 class="card-title fw-bold">
                            ${restaurante.nombre}
                        </h5>


                        <p class="card-text text-muted small">
                            ${restaurante.descripcion || ''}
                        </p>


                        <div class="mt-auto">

                            <p class="mb-2">

                                <i class="bi bi-geo-alt"></i>

                                ${restaurante.barrio}

                            </p>


                            <div
                                class="d-flex align-items-center gap-2"
                            >

                                ${crearEstrellas(
                                    restaurante.calificacionPromedio
                                )}

                                ${
                                    Number(restaurante.cantidadResenas) > 0
                                        ? `
                                            <span class="text-muted small">
                                                (${restaurante.cantidadResenas}
                                                ${
                                                    Number(restaurante.cantidadResenas) === 1
                                                        ? 'reseña'
                                                        : 'reseñas'
                                                })
                                            </span>
                                        `
                                        : ''
                                }

                            </div>

                        </div>

                    </div>

                </article>

            </a>

        </div>
    `;
}


// ==========================================
// MOSTRAR RESTAURANTES
// ==========================================

function mostrarRestaurantes() {

    contenedorRestaurantes.innerHTML = '';


    if (restaurantesFiltrados.length === 0) {

        contadorRestaurantes.textContent =
            '0 restaurantes encontrados';

        contenedorRestaurantes.innerHTML = `
            <div class="col-12">
                <div class="alert alert-light border">
                    No encontramos restaurantes
                    con los filtros seleccionados.
                </div>
            </div>
        `;

        paginacionRestaurantes.innerHTML = '';

        return;
    }


    const inicio =
        (paginaActual - 1) *
        RESTAURANTES_POR_PAGINA;

    const fin =
        inicio +
        RESTAURANTES_POR_PAGINA;

    const restaurantesPagina =
        restaurantesFiltrados.slice(
            inicio,
            fin
        );


    restaurantesPagina.forEach(
        restaurante => {

            contenedorRestaurantes.insertAdjacentHTML(
                'beforeend',
                crearTarjetaRestaurante(restaurante)
            );

        }
    );


    contadorRestaurantes.textContent =
        `${restaurantesFiltrados.length} ${
            restaurantesFiltrados.length === 1
                ? 'restaurante encontrado'
                : 'restaurantes encontrados'
        }`;


    crearPaginacion();

}


// ==========================================
// PAGINACIÓN
// ==========================================

function crearPaginacion() {

    paginacionRestaurantes.innerHTML = '';

    const totalPaginas =
        Math.ceil(
            restaurantesFiltrados.length /
            RESTAURANTES_POR_PAGINA
        );


    if (totalPaginas <= 1) {
        return;
    }


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
                type="button"
                class="page-link"
            >
                ${pagina}
            </button>
        `;


        item.addEventListener(
            'click',
            () => {

                paginaActual = pagina;

                mostrarRestaurantes();

                document
                    .getElementById('listado')
                    .scrollIntoView({
                        behavior: 'smooth'
                    });

            }
        );


        paginacionRestaurantes.appendChild(
            item
        );

    }

}


// ==========================================
// OBTENER TIPOS SELECCIONADOS
// ==========================================

function obtenerTiposSeleccionados(
    selector
) {

    return Array.from(
        document.querySelectorAll(
            selector
        )
    )
        .filter(input => input.checked)
        .map(input => input.value);

}


// ==========================================
// FILTRAR
// ==========================================

function aplicarFiltrosYOrden() {

    const busqueda =
        buscadorRestaurantes.value
            .trim()
            .toLowerCase();


    const tiposDesktop =
        obtenerTiposSeleccionados(
            '.filtro-tipo'
        );

    const tiposMobile =
        obtenerTiposSeleccionados(
            '.filtro-tipo-mobile'
        );


    const tiposSeleccionados =
        window.innerWidth >= 992
            ? tiposDesktop
            : tiposMobile;


    const barrioDesktop =
        document
            .getElementById('filtro-barrio')
            .value;

    const barrioMobile =
        document
            .getElementById(
                'filtro-barrio-mobile'
            )
            .value;


    const barrioSeleccionado =
        window.innerWidth >= 992
            ? barrioDesktop
            : barrioMobile;


    restaurantesFiltrados =
        restaurantes.filter(
            restaurante => {

                const coincideBusqueda =
                    !busqueda ||
                    restaurante.nombre
                        .toLowerCase()
                        .includes(busqueda) ||
                    restaurante.tipoRestaurante
                        .toLowerCase()
                        .includes(busqueda) ||
                    restaurante.barrio
                        .toLowerCase()
                        .includes(busqueda);


                const coincideTipo =
                    tiposSeleccionados.length === 0 ||
                    tiposSeleccionados.includes(
                        restaurante.tipoRestaurante
                    );


                const coincideBarrio =
                    !barrioSeleccionado ||
                    restaurante.barrio ===
                        barrioSeleccionado;


                return (
                    coincideBusqueda &&
                    coincideTipo &&
                    coincideBarrio
                );

            }
        );


    ordenarRestaurantes();

    paginaActual = 1;

    mostrarRestaurantes();

}


// ==========================================
// ORDENAR
// ==========================================

function ordenarRestaurantes() {

    const orden =
        ordenRestaurantes.value;


    if (orden === 'nombre') {

        restaurantesFiltrados.sort(
            (a, b) =>
                a.nombre.localeCompare(
                    b.nombre,
                    'es'
                )
        );

    }


    if (orden === 'calificacion') {

        restaurantesFiltrados.sort(
            (a, b) =>
                Number(
                    b.calificacionPromedio
                ) -
                Number(
                    a.calificacionPromedio
                )
        );

    }


    if (orden === 'relevantes') {

        restaurantesFiltrados.sort(
            (a, b) =>
                Number(b.cantidadResenas) -
                Number(a.cantidadResenas) ||
                Number(
                    b.calificacionPromedio
                ) -
                Number(
                    a.calificacionPromedio
                ) ||
                a.nombre.localeCompare(
                    b.nombre,
                    'es'
                )
        );

    }

}


// ==========================================
// LIMPIAR FILTROS
// ==========================================

function limpiarFiltros() {

    document
        .querySelectorAll(
            '.filtro-tipo, .filtro-tipo-mobile'
        )
        .forEach(
            input => {
                input.checked = false;
            }
        );


    document.getElementById(
        'filtro-barrio'
    ).value = '';

    document.getElementById(
        'filtro-barrio-mobile'
    ).value = '';


    buscadorRestaurantes.value = '';

    ordenRestaurantes.value =
        'relevantes';


    aplicarFiltrosYOrden();

}


// ==========================================
// EVENTOS
// ==========================================

buscadorRestaurantes.addEventListener(
    'input',
    aplicarFiltrosYOrden
);


ordenRestaurantes.addEventListener(
    'change',
    aplicarFiltrosYOrden
);


document
    .getElementById(
        'btn-aplicar-filtros-restaurantes'
    )
    .addEventListener(
        'click',
        aplicarFiltrosYOrden
    );


document
    .getElementById(
        'btn-limpiar-filtros-restaurantes'
    )
    .addEventListener(
        'click',
        limpiarFiltros
    );


document
    .getElementById(
        'btn-aplicar-filtros-restaurantes-mobile'
    )
    .addEventListener(
        'click',
        aplicarFiltrosYOrden
    );


document
    .getElementById(
        'btn-limpiar-filtros-restaurantes-mobile'
    )
    .addEventListener(
        'click',
        limpiarFiltros
    );


// ==========================================
// INICIAR
// ==========================================

cargarRestaurantes();
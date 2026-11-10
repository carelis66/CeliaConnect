// ==========================================
// CELIACONNECT - LOCALES
// ==========================================

const API_LOCALES =
'https://celiaconnect-production.up.railway.app/api/locales';

const LOCALES_POR_PAGINA = 9;

let todosLosLocales = [];
let localesFiltrados = [];
let localesFavoritos = [];
let paginaActual = 1;


// ==========================================
// ELEMENTOS DEL DOM
// ==========================================

const contenedorLocales =
    document.getElementById('locales-container');

const contadorLocales =
    document.getElementById('locales-count');

const paginacionLocales =
    document.getElementById('locales-paginacion');

const buscador =
    document.getElementById('buscar-local');

const ordenLocales =
    document.getElementById('orden-locales');

const filtroBarrio =
    document.getElementById('filtro-barrio');

const filtroBarrioMobile =
    document.getElementById('filtro-barrio-mobile');

const btnAplicarFiltros =
    document.getElementById('btn-aplicar-filtros-locales');

const btnLimpiarFiltros =
    document.getElementById('btn-limpiar-filtros-locales');

const btnAplicarFiltrosMobile =
    document.getElementById('btn-aplicar-filtros-locales-mobile');

const btnLimpiarFiltrosMobile =
    document.getElementById('btn-limpiar-filtros-locales-mobile');


// ==========================================
// CARGAR LOCALES
// ==========================================

async function cargarLocales() {

    try {

        const respuesta =
            await fetch(API_LOCALES);

        if (!respuesta.ok) {

            throw new Error(
                'No se pudieron cargar los locales'
            );
        }


        todosLosLocales =
            await respuesta.json();


        // ======================================
        // CARGAR FAVORITOS DEL USUARIO
        // ======================================

        const token =
            localStorage.getItem('celiaToken') ||
            sessionStorage.getItem('celiaToken');

        localesFavoritos = [];

        if (token) {

            const respuestaFavoritos =
                await fetch(
                    `${API_LOCALES}/favoritos`,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            if (respuestaFavoritos.ok) {

                const favoritos =
                    await respuestaFavoritos.json();

                localesFavoritos =
                    favoritos.map(
                        favorito =>
                            Number(favorito.localId)
                    );
            }
        }


        localesFiltrados =
            [...todosLosLocales];


        aplicarFiltros();


    } catch (error) {

        console.error(
            'Error al cargar locales:',
            error
        );


        contadorLocales.textContent =
            'No se pudieron cargar los locales';


        contenedorLocales.innerHTML = `
            <div class="col-12">

                <div
                    class="alert alert-danger"
                    role="alert"
                >
                    No pudimos cargar los locales.
                    Intentá nuevamente más tarde.
                </div>

            </div>
        `;
    }
}


// ==========================================
// OBTENER TIPOS SELECCIONADOS
// ==========================================

function obtenerTiposSeleccionados() {

    const checkboxes =
        document.querySelectorAll(
            '.filtro-tipo:checked'
        );


    return Array.from(checkboxes)
        .map(checkbox => checkbox.value);
}


// ==========================================
// OBTENER TIPOS MOBILE
// ==========================================

function obtenerTiposSeleccionadosMobile() {

    const checkboxes =
        document.querySelectorAll(
            '.filtro-tipo-mobile:checked'
        );


    return Array.from(checkboxes)
        .map(checkbox => checkbox.value);
}


// ==========================================
// APLICAR FILTROS
// ==========================================

function aplicarFiltros() {

    const textoBusqueda =
        buscador.value
            .trim()
            .toLowerCase();


    const tiposSeleccionados =
        obtenerTiposSeleccionados();


    const barrioSeleccionado =
        filtroBarrio.value;


    localesFiltrados =
        todosLosLocales.filter(local => {

            const coincideBusqueda =
                !textoBusqueda ||
                local.nombre
                    .toLowerCase()
                    .includes(textoBusqueda) ||
                local.tipoLocal
                    .toLowerCase()
                    .includes(textoBusqueda) ||
                local.barrio
                    .toLowerCase()
                    .includes(textoBusqueda);


            const coincideTipo =
                tiposSeleccionados.length === 0 ||
                tiposSeleccionados.includes(
                    local.tipoLocal
                );


            const coincideBarrio =
                !barrioSeleccionado ||
                local.barrio ===
                    barrioSeleccionado;


            return (
                coincideBusqueda &&
                coincideTipo &&
                coincideBarrio
            );
        });


    ordenarLocales();

    paginaActual = 1;

    mostrarLocales();
}


// ==========================================
// APLICAR FILTROS MOBILE
// ==========================================

function aplicarFiltrosMobile() {

    const tiposMobile =
        obtenerTiposSeleccionadosMobile();


    document
        .querySelectorAll('.filtro-tipo')
        .forEach(checkbox => {

            checkbox.checked =
                tiposMobile.includes(
                    checkbox.value
                );
        });


    filtroBarrio.value =
        filtroBarrioMobile.value;


    aplicarFiltros();
}


// ==========================================
// ORDENAR LOCALES
// ==========================================

function ordenarLocales() {

    const orden =
        ordenLocales.value;


    if (orden === 'nombre') {

        localesFiltrados.sort(
            (a, b) =>
                a.nombre.localeCompare(
                    b.nombre,
                    'es'
                )
        );
    }


    if (orden === 'calificacion') {

        localesFiltrados.sort(
            (a, b) => {

                const diferencia =
                    Number(b.calificacionPromedio) -
                    Number(a.calificacionPromedio);


                if (diferencia !== 0) {
                    return diferencia;
                }


                return (
                    Number(b.cantidadResenas) -
                    Number(a.cantidadResenas)
                );
            }
        );
    }


    if (orden === 'relevantes') {

        localesFiltrados.sort(
            (a, b) => {

                const diferenciaResenas =
                    Number(b.cantidadResenas) -
                    Number(a.cantidadResenas);


                if (diferenciaResenas !== 0) {
                    return diferenciaResenas;
                }


                const diferenciaCalificacion =
                    Number(b.calificacionPromedio) -
                    Number(a.calificacionPromedio);


                if (diferenciaCalificacion !== 0) {
                    return diferenciaCalificacion;
                }


                return a.nombre.localeCompare(
                    b.nombre,
                    'es'
                );
            }
        );
    }
}


// ==========================================
// MOSTRAR LOCALES
// ==========================================

function mostrarLocales() {

    contenedorLocales.innerHTML = '';


    const totalLocales =
        localesFiltrados.length;


    contadorLocales.textContent =
        totalLocales === 1
            ? '1 local encontrado'
            : `${totalLocales} locales encontrados`;


    if (totalLocales === 0) {

        contenedorLocales.innerHTML = `
            <div class="col-12">

                <div
                    class="alert alert-light border"
                    role="alert"
                >
                    No encontramos locales con esos filtros.
                </div>

            </div>
        `;


        paginacionLocales.innerHTML = '';

        return;
    }


    const inicio =
        (paginaActual - 1) *
        LOCALES_POR_PAGINA;


    const fin =
        inicio +
        LOCALES_POR_PAGINA;


    const localesPagina =
        localesFiltrados.slice(
            inicio,
            fin
        );


    localesPagina.forEach(local => {

        const columna =
            document.createElement('div');


        columna.className =
            'col-md-6 col-xl-4';


        const promedio =
            Number(local.calificacionPromedio);


        const cantidadResenas =
            Number(local.cantidadResenas);


        const esFavorito =
            localesFavoritos.includes(
                Number(local.id)
            );


        const textoCalificacion =
            cantidadResenas > 0
                ? `
                    <span class="fw-semibold">
                        <i class="bi bi-star-fill text-warning"></i>
                        ${promedio.toFixed(1)}
                    </span>

                    <span class="text-muted small">
                        (${cantidadResenas}
                        ${cantidadResenas === 1
                            ? 'reseña'
                            : 'reseñas'})
                    </span>
                `
                : `
                    <span class="text-muted small">
                        Sin reseñas
                    </span>
                `;


        const imagenLocal =
            local.imagen
                ? `
                    <img
                        src="${local.imagen}"
                        class="card-img-top"
                        alt="${local.nombre}"
                    >
                `
                : `
                    <div
                        class="d-flex align-items-center justify-content-center bg-light"
                        style="height: 190px;"
                    >
                        <i
                            class="bi bi-shop fs-1 text-secondary"
                        ></i>
                    </div>
                `;


        columna.innerHTML = `

            <div class="position-relative h-100">

                <a
                    href="local-detalle.html?id=${local.id}"
                    class="text-decoration-none text-dark"
                >

                    <div
                        class="card h-100 shadow-sm border-0"
                    >

                        ${imagenLocal}

                        <div class="card-body">

                            <span
                                class="badge text-bg-success text-white mb-2"
                            >
                                ${local.tipoLocal}
                            </span>


                            <h5 class="card-title fw-bold">
                                ${local.nombre}
                            </h5>


                            <p
                                class="card-text text-muted small"
                            >
                                ${local.descripcion}
                            </p>


                            <div
                                class="d-flex align-items-center gap-1 mb-2"
                            >
                                <i class="bi bi-geo-alt"></i>

                                <span class="small">
                                    ${local.barrio}
                                </span>
                            </div>


                            <div
                                class="d-flex align-items-center gap-2"
                            >
                                ${textoCalificacion}
                            </div>

                        </div>

                    </div>

                </a>


                <button
                    class="local-fav"
                    type="button"
                    data-local-id="${local.id}"
                    aria-label="${
                        esFavorito
                            ? `Quitar ${local.nombre} de favoritos`
                            : `Agregar ${local.nombre} a favoritos`
                    }"
                >
                    <i
                        class="bi ${
                            esFavorito
                                ? 'bi-heart-fill'
                                : 'bi-heart'
                        }"
                    ></i>
                </button>

            </div>
        `;


        contenedorLocales.appendChild(
            columna
        );
    });


    // ======================================
    // FAVORITOS DE LOCALES
    // ======================================

    const botonesFavoritos =
        contenedorLocales.querySelectorAll(
            '.local-fav'
        );


    botonesFavoritos.forEach(boton => {

        boton.addEventListener(
            'click',
            async evento => {

                evento.preventDefault();
                evento.stopPropagation();


                const localId =
                    Number(
                        boton.dataset.localId
                    );


                const token =
                    localStorage.getItem(
                        'celiaToken'
                    ) ||
                    sessionStorage.getItem(
                        'celiaToken'
                    );


                if (!token) {

                    window.location.href =
                        'login.html';

                    return;
                }


                const esFavorito =
                    localesFavoritos.includes(
                        localId
                    );


                try {

                    const respuesta =
                        await fetch(
                            `${API_LOCALES}/${localId}/favorito`,
                            {
                                method:
                                    esFavorito
                                        ? 'DELETE'
                                        : 'POST',

                                headers: {
                                    Authorization:
                                        `Bearer ${token}`
                                }
                            }
                        );


                    const datos =
                        await respuesta.json();


                    if (!respuesta.ok) {

                        throw new Error(
                            datos.mensaje ||
                            'No se pudo actualizar el favorito'
                        );
                    }


                    const icono =
                        boton.querySelector('i');


                    if (esFavorito) {

                        localesFavoritos =
                            localesFavoritos.filter(
                                id => id !== localId
                            );


                        icono.classList.remove(
                            'bi-heart-fill'
                        );

                        icono.classList.add(
                            'bi-heart'
                        );


                        boton.setAttribute(
                            'aria-label',
                            'Agregar local a favoritos'
                        );

                    } else {

                        localesFavoritos.push(
                            localId
                        );


                        icono.classList.remove(
                            'bi-heart'
                        );

                        icono.classList.add(
                            'bi-heart-fill'
                        );


                        boton.setAttribute(
                            'aria-label',
                            'Quitar local de favoritos'
                        );
                    }


                } catch (error) {

                    console.error(
                        'Error al actualizar favorito de local:',
                        error
                    );
                }
            }
        );
    });


    generarPaginacion();
}


// ==========================================
// GENERAR PAGINACIÓN
// ==========================================

function generarPaginacion() {

    paginacionLocales.innerHTML = '';


    const totalPaginas =
        Math.ceil(
            localesFiltrados.length /
            LOCALES_POR_PAGINA
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

                    paginaActual =
                        pagina;


                    mostrarLocales();


                    document
                        .getElementById('listado')
                        .scrollIntoView({
                            behavior: 'smooth'
                        });
                }
            );


        paginacionLocales.appendChild(
            item
        );
    }
}


// ==========================================
// LIMPIAR FILTROS
// ==========================================

function limpiarFiltros() {

    buscador.value = '';


    document
        .querySelectorAll(
            '.filtro-tipo'
        )
        .forEach(
            checkbox =>
                checkbox.checked = false
        );


    document
        .querySelectorAll(
            '.filtro-tipo-mobile'
        )
        .forEach(
            checkbox =>
                checkbox.checked = false
        );


    filtroBarrio.value = '';

    filtroBarrioMobile.value = '';


    ordenLocales.value =
        'relevantes';


    aplicarFiltros();
}


// ==========================================
// EVENTOS
// ==========================================

buscador.addEventListener(
    'input',
    aplicarFiltros
);


ordenLocales.addEventListener(
    'change',
    aplicarFiltros
);


btnAplicarFiltros.addEventListener(
    'click',
    aplicarFiltros
);


btnLimpiarFiltros.addEventListener(
    'click',
    limpiarFiltros
);


btnAplicarFiltrosMobile.addEventListener(
    'click',
    aplicarFiltrosMobile
);


btnLimpiarFiltrosMobile.addEventListener(
    'click',
    limpiarFiltros
);


// ==========================================
// SINCRONIZAR FILTROS AL ABRIR MOBILE
// ==========================================

const offcanvasLocales =
    document.getElementById(
        'filtrosLocalesOffcanvas'
    );


offcanvasLocales.addEventListener(
    'show.bs.offcanvas',
    () => {

        const tiposDesktop =
            obtenerTiposSeleccionados();


        document
            .querySelectorAll(
                '.filtro-tipo-mobile'
            )
            .forEach(checkbox => {

                checkbox.checked =
                    tiposDesktop.includes(
                        checkbox.value
                    );
            });


        filtroBarrioMobile.value =
            filtroBarrio.value;
    }
);


// ==========================================
// INICIAR
// ==========================================

cargarLocales();
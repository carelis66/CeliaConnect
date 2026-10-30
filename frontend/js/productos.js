const API_PRODUCTOS = 'http://localhost:3000/api/productos';

const PRODUCTOS_POR_PAGINA = 9;

let productos = [];
let productosFiltrados = [];
let paginaActual = 1;


// ==========================================
// CARGAR PRODUCTOS DESDE LA API
// ==========================================

async function cargarProductos() {

    const contenedor =
        document.getElementById('productos-container');

    const contador =
        document.getElementById('productos-count');

    try {

        const respuesta = await fetch(API_PRODUCTOS);

        if (!respuesta.ok) {
            throw new Error('No se pudieron obtener los productos');
        }

        productos = await respuesta.json();

        paginaActual = 1;

        aplicarFiltros();

    } catch (error) {

        console.error('Error al cargar productos:', error);

        contador.textContent =
            'No se pudieron cargar los productos';

        contenedor.innerHTML = `
            <div class="col-12">
                <div class="alert alert-danger">
                    No se pudieron cargar los productos.
                    Verificá que el servidor de CeliaConnect esté encendido.
                </div>
            </div>
        `;
    }
}


// ==========================================
// MOSTRAR PRODUCTOS
// ==========================================

function mostrarProductos() {

    const contenedor =
        document.getElementById('productos-container');

    const contador =
        document.getElementById('productos-count');

    contenedor.innerHTML = '';

    contador.textContent =
        `${productosFiltrados.length} productos encontrados`;


    // Sin resultados
    if (productosFiltrados.length === 0) {

        contenedor.innerHTML = `
            <div class="col-12">
                <div class="alert alert-light text-center">
                    No se encontraron productos con los filtros seleccionados.
                </div>
            </div>
        `;

        return;
    }


    // Productos de la página actual
    const inicio =
        (paginaActual - 1) * PRODUCTOS_POR_PAGINA;

    const fin =
        inicio + PRODUCTOS_POR_PAGINA;

    const productosPagina =
        productosFiltrados.slice(inicio, fin);


    // Crear tarjetas
    productosPagina.forEach(producto => {

        const certificado =
            producto.certificadoSinTacc
                ? '<span class="product-tag">Sin TACC</span>'
                : '<span class="product-tag">Certificación pendiente</span>';


        const tarjeta = `
            <div class="col-md-6 col-xl-4">

                <div
                    class="product-card"
                    role="link"
                    tabindex="0"
                    data-producto-id="${producto.id}"
                    aria-label="Ver detalle de ${producto.nombre}"
                >

                    <div
                        class="product-image"
                        style="
                            position: relative;
                            overflow: hidden;
                            height: 220px;
                            background: #f8f5f2;
                        "
                    >

                        ${
                            producto.imagen
                                ? `
                                    <img
                                        src="${producto.imagen}"
                                        alt="${producto.nombre}"
                                        class="w-100 h-100"
                                        style="
                                            object-fit: cover;
                                            object-position: center;
                                        "
                                        onerror="this.style.display='none'"
                                    >
                                `
                                : `
                                    <i class="bi bi-basket2-fill"></i>
                                `
                        }

                        ${certificado}

                    </div>

                    <div class="product-body">

                        <span class="product-category">
                            ${producto.categoria}
                        </span>

                        <h5>
                            ${producto.nombre}
                        </h5>

                        <p class="product-brand">
                            ${producto.marca}
                        </p>

                        <div class="product-footer">

                            <span class="product-rating">
    <i class="bi bi-star-fill"></i>
    ${
        Number(producto.cantidadResenas) > 0
            ? `${Number(producto.calificacionPromedio).toFixed(1)} (${producto.cantidadResenas} ${Number(producto.cantidadResenas) === 1 ? 'reseña' : 'reseñas'})`
            : 'Sin reseñas'
    }
</span>

                            <button
                                class="product-fav"
                                type="button"
                                aria-label="Agregar ${producto.nombre} a favoritos"
                            >
                                <i class="bi bi-heart"></i>
                            </button>

                        </div>

                    </div>

                </div>

            </div>
        `;

        contenedor.insertAdjacentHTML(
            'beforeend',
            tarjeta
        );
    });


    // ======================================
    // CLIC EN TARJETAS
    // ======================================

    const tarjetas =
        contenedor.querySelectorAll('.product-card');

    tarjetas.forEach(tarjeta => {

        // Abrir producto con clic
        tarjeta.addEventListener('click', (event) => {

            // Si se hace clic en favoritos,
            // no abrimos el detalle del producto.
            if (event.target.closest('.product-fav')) {
                return;
            }

            const productoId =
                tarjeta.dataset.productoId;

            window.location.href =
                `producto-detalle.html?id=${productoId}`;
        });


        // Abrir producto con Enter
        tarjeta.addEventListener('keydown', (event) => {

            if (event.key === 'Enter') {

                const productoId =
                    tarjeta.dataset.productoId;

                window.location.href =
                    `producto-detalle.html?id=${productoId}`;
            }
        });

    });
}


// ==========================================
// PAGINACIÓN
// ==========================================

function mostrarPaginacion() {

    const paginacion =
        document.getElementById('productos-paginacion');

    paginacion.innerHTML = '';

    const totalPaginas =
        Math.ceil(
            productosFiltrados.length /
            PRODUCTOS_POR_PAGINA
        );


    if (totalPaginas === 0) {
        return;
    }


    // Botón anterior
    paginacion.insertAdjacentHTML(
        'beforeend',
        `
        <li class="page-item ${paginaActual === 1 ? 'disabled' : ''}">

            <button
                class="page-link"
                type="button"
                data-pagina="${paginaActual - 1}"
            >
                <i class="bi bi-chevron-left"></i>
            </button>

        </li>
        `
    );


    // Números de página
    for (
        let pagina = 1;
        pagina <= totalPaginas;
        pagina++
    ) {

        paginacion.insertAdjacentHTML(
            'beforeend',
            `
            <li class="page-item ${pagina === paginaActual ? 'active' : ''}">

                <button
                    class="page-link"
                    type="button"
                    data-pagina="${pagina}"
                >
                    ${pagina}
                </button>

            </li>
            `
        );
    }


    // Botón siguiente
    paginacion.insertAdjacentHTML(
        'beforeend',
        `
        <li class="page-item ${paginaActual === totalPaginas ? 'disabled' : ''}">

            <button
                class="page-link"
                type="button"
                data-pagina="${paginaActual + 1}"
            >
                <i class="bi bi-chevron-right"></i>
            </button>

        </li>
        `
    );


    // Eventos de paginación
    const botones =
        paginacion.querySelectorAll('[data-pagina]');

    botones.forEach(boton => {

        boton.addEventListener('click', () => {

            const nuevaPagina =
                Number(boton.dataset.pagina);

            if (
                nuevaPagina < 1 ||
                nuevaPagina > totalPaginas ||
                nuevaPagina === paginaActual
            ) {
                return;
            }

            paginaActual = nuevaPagina;

            mostrarProductos();
            mostrarPaginacion();

            document
                .getElementById('listado')
                .scrollIntoView({
                    behavior: 'smooth'
                });
        });
    });
}


// ==========================================
// ORDENAR PRODUCTOS
// ==========================================

function ordenarProductos() {

    const selectorOrden =
        document.getElementById('orden-productos');

    if (!selectorOrden) {
        return;
    }

    const orden =
        selectorOrden.value;


    switch (orden) {

        // Orden original de la base de datos
        case 'relevantes':

            productosFiltrados.sort(
                (a, b) =>
                    Number(a.id) - Number(b.id)
            );

            break;


        // Nombre A-Z
        case 'nombre':

            productosFiltrados.sort(
                (a, b) =>
                    a.nombre.localeCompare(
                        b.nombre,
                        'es',
                        { sensitivity: 'base' }
                    )
            );

            break;


        // Marca A-Z
        case 'marca':

            productosFiltrados.sort(
                (a, b) =>
                    a.marca.localeCompare(
                        b.marca,
                        'es',
                        { sensitivity: 'base' }
                    )
            );

            break;


        // Se implementará cuando
        // conectemos las reseñas.
        case 'calificacion':

            break;
    }
}


// ==========================================
// APLICAR BÚSQUEDA + FILTROS
// ==========================================

function aplicarFiltros() {

    // --------------------------------------
    // BUSCADOR
    // --------------------------------------

    const buscador =
        document.getElementById('buscar-producto');

    const texto =
        buscador
            ? buscador.value.toLowerCase().trim()
            : '';


    // --------------------------------------
    // CATEGORÍAS
    // --------------------------------------

    const categoriasSeleccionadas = Array.from(
        document.querySelectorAll(
            '.filtro-categoria:checked'
        )
    ).map(
        checkbox =>
            checkbox.value.toLowerCase()
    );


    // --------------------------------------
    // MARCAS
    // --------------------------------------

    const marcasSeleccionadas = Array.from(
        document.querySelectorAll(
            '.filtro-marca:checked'
        )
    ).map(
        checkbox =>
            checkbox.value.toLowerCase()
    );




    // --------------------------------------
    // FILTRAR
    // --------------------------------------

    productosFiltrados =
        productos.filter(producto => {

            const nombre =
                producto.nombre?.toLowerCase() || '';

            const marca =
                producto.marca?.toLowerCase() || '';

            const categoria =
                producto.categoria?.toLowerCase() || '';


            // Buscador
            const coincideTexto =
                texto === '' ||
                nombre.includes(texto) ||
                marca.includes(texto) ||
                categoria.includes(texto);


            // Categoría
            const coincideCategoria =
                categoriasSeleccionadas.length === 0 ||
                categoriasSeleccionadas.includes(
                    categoria
                );


            // Marca
            const coincideMarca =
                marcasSeleccionadas.length === 0 ||
                marcasSeleccionadas.includes(
                    marca
                );


            // Certificación El catálogo público muestra únicamente productos Sin TACC certificados.
const coincideCertificado =
    Number(
        producto.certificadoSinTacc
    ) === 1;

            return (
                coincideTexto &&
                coincideCategoria &&
                coincideMarca &&
                coincideCertificado
            );
        });


    // Ordenar resultados
    ordenarProductos();


    // Volver a página 1
    paginaActual = 1;

    mostrarProductos();
    mostrarPaginacion();
}


// ==========================================
// CAMBIAR ORDEN
// ==========================================

function cambiarOrden() {

    ordenarProductos();

    paginaActual = 1;

    mostrarProductos();
    mostrarPaginacion();
}


// ==========================================
// LIMPIAR FILTROS
// ==========================================

function limpiarFiltros() {

    // Vaciar buscador
    const buscador =
        document.getElementById('buscar-producto');

    if (buscador) {
        buscador.value = '';
    }


    // Desmarcar categorías
    document
        .querySelectorAll('.filtro-categoria')
        .forEach(checkbox => {

            checkbox.checked = false;

        });


    // Desmarcar marcas
    document
        .querySelectorAll('.filtro-marca')
        .forEach(checkbox => {

            checkbox.checked = false;

        });


  // ----------------------------------
// SWITCH SIN TACC
// ----------------------------------

const switchCertificado =
    document.getElementById(
        'cert-sintacc'
    );

if (switchCertificado) {

    switchCertificado.addEventListener(
        'change',
        aplicarFiltros
    );
}


    // Restaurar orden
    const selectorOrden =
        document.getElementById(
            'orden-productos'
        );

    if (selectorOrden) {

        selectorOrden.value =
            'relevantes';

    }


    aplicarFiltros();
}


// ==========================================
// INICIAR PRODUCTOS
// ==========================================

document.addEventListener(
    'DOMContentLoaded',
    () => {

        // ----------------------------------
        // BUSCADOR
        // ----------------------------------

        const buscador =
            document.getElementById(
                'buscar-producto'
            );

        if (buscador) {

            buscador.addEventListener(
                'input',
                aplicarFiltros
            );
        }


        // ----------------------------------
        // APLICAR FILTROS
        // ----------------------------------

        const btnAplicarFiltros =
            document.getElementById(
                'btn-aplicar-filtros'
            );

        if (btnAplicarFiltros) {

            btnAplicarFiltros.addEventListener(
                'click',
                aplicarFiltros
            );
        }


        // ----------------------------------
        // LIMPIAR FILTROS
        // ----------------------------------

        const btnLimpiarFiltros =
            document.getElementById(
                'btn-limpiar-filtros'
            );

        if (btnLimpiarFiltros) {

            btnLimpiarFiltros.addEventListener(
                'click',
                limpiarFiltros
            );
        }


        // ----------------------------------
        // SWITCH SIN TACC
        // ----------------------------------

        const switchCertificado =
            document.getElementById(
                'cert-sintacc'
            );

        if (switchCertificado) {

            switchCertificado.addEventListener(
                'change',
                aplicarFiltros
            );
        }


        // ----------------------------------
        // ORDENAMIENTO
        // ----------------------------------

        const selectorOrden =
            document.getElementById(
                'orden-productos'
            );

        if (selectorOrden) {

            selectorOrden.addEventListener(
                'change',
                cambiarOrden
            );
        }


        // ----------------------------------
        // CARGAR PRODUCTOS
        // ----------------------------------

        cargarProductos();

    }
);

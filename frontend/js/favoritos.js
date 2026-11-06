// ==========================================
// CELIACONNECT - MIS FAVORITOS
// ==========================================

const API_BASE = 'http://localhost:3000/api';


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


        // ======================================
        // PRODUCTOS FAVORITOS
        // ======================================

        const idsProductos =
            favoritosProductos.map(
                favorito =>
                    Number(favorito.productoId)
            );


        const productosFavoritos =
            productos.filter(
                producto =>
                    idsProductos.includes(
                        Number(producto.id)
                    )
            );


        // ======================================
        // RESTAURANTES FAVORITOS
        // ======================================

        const idsRestaurantes =
            favoritosRestaurantes.map(
                favorito =>
                    Number(
                        favorito.restauranteId
                    )
            );


        const restaurantesFavoritos =
            restaurantes.filter(
                restaurante =>
                    idsRestaurantes.includes(
                        Number(restaurante.id)
                    )
            );


        // ======================================
        // LOCALES FAVORITOS
        // ======================================

        const idsLocales =
            favoritosLocales.map(
                favorito =>
                    Number(favorito.localId)
            );


        const localesFavoritos =
            locales.filter(
                local =>
                    idsLocales.includes(
                        Number(local.id)
                    )
            );


        // ======================================
        // NUTRICIONISTAS FAVORITOS
        // ======================================

        const idsNutricionistas =
            favoritosNutricionistas.map(
                favorito =>
                    Number(
                        favorito.nutricionistaId
                    )
            );


        const nutricionistasFavoritos =
            nutricionistas.filter(
                nutricionista =>
                    idsNutricionistas.includes(
                        Number(nutricionista.id)
                    )
            );


        // ======================================
        // OCULTAR LOADING
        // ======================================

        loading.classList.add('d-none');


        const totalFavoritos =
            productosFavoritos.length +
            restaurantesFavoritos.length +
            localesFavoritos.length +
            nutricionistasFavoritos.length;


        // ======================================
        // SIN FAVORITOS
        // ======================================

        if (totalFavoritos === 0) {

            vacio.classList.remove('d-none');

            return;
        }


        contenido.classList.remove('d-none');


        // ======================================
        // MOSTRAR FAVORITOS
        // ======================================

        mostrarProductos(
            productosFavoritos
        );

        mostrarRestaurantes(
            restaurantesFavoritos
        );

        mostrarLocales(
            localesFavoritos
        );

        mostrarNutricionistas(
            nutricionistasFavoritos
        );


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
// PRODUCTOS
// ==========================================

function mostrarProductos(productos) {

    const seccion =
        document.getElementById(
            'favoritos-productos-seccion'
        );


    if (productos.length === 0) {

        seccion.classList.add('d-none');

        return;
    }


    contenedorProductos.innerHTML =
        productos.map(producto => {

            const tieneImagen =
                producto.imagen &&
                producto.imagen.trim() !== '';


            const imagen = tieneImagen
                ? `
                    <img
                        src="${producto.imagen}"
                        class="card-img-top"
                        alt="${producto.nombre}"
                        style="
                            height: 220px;
                            object-fit: cover;
                            object-position: center;
                        "
                    >
                `
                : `
                    <div
                        class="d-flex align-items-center justify-content-center bg-light"
                        style="height: 220px;"
                    >
                        <i
                            class="bi bi-box-seam text-secondary"
                            style="font-size: 4rem;"
                        ></i>
                    </div>
                `;


            return `
                <div class="col-md-6 col-xl-4">

                    <div
                        class="card h-100 shadow-sm border-0"
                    >

                        ${imagen}

                        <div
                            class="card-body d-flex flex-column"
                        >

                            <span
                                class="badge bg-success-subtle text-success align-self-start mb-2"
                            >
                                Sin TACC
                            </span>


                            <h5 class="card-title fw-bold">
                                ${producto.nombre}
                            </h5>


                            <p class="text-muted small">
                                ${producto.marca || ''}
                            </p>


                            <a
                                href="producto-detalle.html?id=${producto.id}"
                                class="btn btn-outline-success mt-auto"
                            >
                                Ver producto
                            </a>

                        </div>

                    </div>

                </div>
            `;
        })
        .join('');
}


// ==========================================
// RESTAURANTES
// ==========================================

function mostrarRestaurantes(restaurantes) {

    const seccion =
        document.getElementById(
            'favoritos-restaurantes-seccion'
        );


    if (restaurantes.length === 0) {

        seccion.classList.add('d-none');

        return;
    }


    contenedorRestaurantes.innerHTML =
        restaurantes.map(restaurante => {

            const tieneImagen =
                restaurante.imagenExterior &&
                restaurante.imagenExterior.trim() !== '';


            const imagen = tieneImagen
                ? `
                    <img
                        src="${restaurante.imagenExterior}"
                        class="card-img-top"
                        alt="${restaurante.nombre}"
                        style="
                            height: 220px;
                            object-fit: cover;
                            object-position: center;
                        "
                    >
                `
                : `
                    <div
                        class="d-flex align-items-center justify-content-center bg-light"
                        style="height: 220px;"
                    >
                        <i
                            class="bi bi-shop text-secondary"
                            style="font-size: 4rem;"
                        ></i>
                    </div>
                `;


            return `
                <div class="col-md-6 col-xl-4">

                    <div
                        class="card h-100 shadow-sm border-0"
                    >

                        ${imagen}


                        <div
                            class="card-body d-flex flex-column"
                        >

                            ${
                                restaurante.tipoRestaurante
                                    ? `
                                        <span
                                            class="badge text-bg-success text-white align-self-start mb-2"
                                        >
                                            ${restaurante.tipoRestaurante}
                                        </span>
                                    `
                                    : ''
                            }


                            <h5 class="card-title fw-bold">
                                ${restaurante.nombre}
                            </h5>


                            <p class="text-muted small mb-2">

                                <i class="bi bi-geo-alt"></i>

                                ${
                                    restaurante.barrio ||
                                    'CABA'
                                }

                            </p>


                            <p class="card-text text-muted">
                                ${
                                    restaurante.descripcion ||
                                    ''
                                }
                            </p>


                            <a
                                href="restaurante-detalle.html?id=${restaurante.id}"
                                class="btn btn-outline-success mt-auto"
                            >
                                Ver restaurante
                            </a>

                        </div>

                    </div>

                </div>
            `;
        })
        .join('');
}


// ==========================================
// LOCALES
// ==========================================

function mostrarLocales(locales) {

    const seccion =
        document.getElementById(
            'favoritos-locales-seccion'
        );


    if (locales.length === 0) {

        seccion.classList.add('d-none');

        return;
    }


    contenedorLocales.innerHTML =
        locales.map(local => {

            const tieneImagen =
                local.imagen &&
                local.imagen.trim() !== '';


            const imagen = tieneImagen
                ? `
                    <img
                        src="${local.imagen}"
                        class="card-img-top"
                        alt="${local.nombre}"
                        style="
                            height: 220px;
                            object-fit: cover;
                            object-position: center;
                        "
                    >
                `
                : `
                    <div
                        class="d-flex align-items-center justify-content-center bg-light"
                        style="height: 220px;"
                    >
                        <i
                            class="bi bi-shop text-secondary"
                            style="font-size: 4rem;"
                        ></i>
                    </div>
                `;


            return `
                <div class="col-md-6 col-xl-4">

                    <div
                        class="card h-100 shadow-sm border-0"
                    >

                        ${imagen}


                        <div
                            class="card-body d-flex flex-column"
                        >

                            <span
                                class="badge bg-success-subtle text-success align-self-start mb-2"
                            >
                                ${local.tipoLocal || 'Local'}
                            </span>


                            <h5 class="card-title fw-bold">
                                ${local.nombre}
                            </h5>


                            <p class="text-muted small mb-2">

                                <i class="bi bi-geo-alt"></i>

                                ${
                                    local.barrio ||
                                    'CABA'
                                }

                            </p>


                            <p class="card-text text-muted">
                                ${
                                    local.descripcion ||
                                    ''
                                }
                            </p>


                            <a
                                href="local-detalle.html?id=${local.id}"
                                class="btn btn-outline-success mt-auto"
                            >
                                Ver local
                            </a>

                        </div>

                    </div>

                </div>
            `;
        })
        .join('');
}


// ==========================================
// NUTRICIONISTAS
// ==========================================

function mostrarNutricionistas(
    nutricionistas
) {

    const seccion =
        document.getElementById(
            'favoritos-nutricionistas-seccion'
        );


    if (nutricionistas.length === 0) {

        seccion.classList.add('d-none');

        return;
    }


    contenedorNutricionistas.innerHTML =
        nutricionistas.map(
            nutricionista => {

                const tieneFoto =
                    nutricionista.fotoPerfil &&
                    nutricionista.fotoPerfil.trim() !== '';


                const foto = tieneFoto
                    ? `
                        <img
                            src="${nutricionista.fotoPerfil}"
                            class="card-img-top"
                            alt="${nutricionista.nombre} ${nutricionista.apellido}"
                            style="
                                height: 300px;
                                object-fit: cover;
                                object-position: center;
                            "
                        >
                    `
                    : `
                        <div
                            class="d-flex align-items-center justify-content-center bg-light"
                            style="height: 300px;"
                        >
                            <i
                                class="bi bi-person text-secondary"
                                style="font-size: 5rem;"
                            ></i>
                        </div>
                    `;


                return `
                    <div class="col-md-6 col-xl-4">

                        <div
                            class="card h-100 shadow-sm border-0"
                        >

                            ${foto}


                            <div
                                class="card-body d-flex flex-column"
                            >

                                <span
                                    class="badge bg-success-subtle text-success align-self-start mb-2"
                                >
                                    Profesional verificado
                                </span>


                                <h5 class="card-title fw-bold">

                                    ${nutricionista.nombre}
                                    ${nutricionista.apellido}

                                </h5>


                                <p class="text-muted small">

                                    <i class="bi bi-geo-alt"></i>

                                    ${
                                        nutricionista.barrio ||
                                        'Buenos Aires'
                                    }

                                </p>


                                <p class="card-text text-muted">
                                    ${
                                        nutricionista.descripcion ||
                                        'Profesional de nutrición.'
                                    }
                                </p>


                                <a
                                    href="nutricionista-detalle.html?id=${nutricionista.id}"
                                    class="btn btn-outline-success mt-auto"
                                >
                                    Ver perfil
                                </a>

                            </div>

                        </div>

                    </div>
                `;
            }
        )
        .join('');
}


// ==========================================
// INICIO
// ==========================================

cargarFavoritos();
/* =====================================================
   CELIACONNECT - APP.JS
   Carga de componentes reutilizables (header / footer)
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        cargarComponente(
            "#header-placeholder",
            "components/header.html",
            () => {

                marcarLinkActivo();
                actualizarCuentaUsuario();

            }
        );


        cargarComponente(
            "#footer-placeholder",
            "components/footer.html",
            ajustarAcordeonFooter
        );


        inicializarToggleContraseña();

    }
);


/**
 * Carga un componente HTML dentro de un elemento del DOM.
 * @param {string} selector - selector del contenedor destino
 * @param {string} url - ruta del archivo HTML a inyectar
 * @param {Function} [callback] - función a ejecutar luego de inyectar el HTML
 */

function cargarComponente(
    selector,
    url,
    callback
) {

    const destino =
        document.querySelector(
            selector
        );


    if (!destino) {
        return;
    }


    fetch(url)

        .then(respuesta => {

            if (!respuesta.ok) {

                throw new Error(
                    `No se pudo cargar ${url} (${respuesta.status})`
                );

            }


            return respuesta.text();

        })

        .then(html => {

            destino.innerHTML =
                html;


            if (
                typeof callback ===
                "function"
            ) {

                callback();

            }

        })

        .catch(error => {

            console.error(
                "Error cargando componente:",
                error
            );

        });

}


/**
 * Controla el acordeón del footer
 * según el ancho de pantalla.
 */

function ajustarAcordeonFooter() {

    const ESCRITORIO =
        window.matchMedia(
            "(min-width: 768px)"
        );


    const aplicarEstado =
        () => {

            document
                .querySelectorAll(
                    ".footer-accordion"
                )
                .forEach(
                    acordeon => {

                        acordeon.open =
                            ESCRITORIO.matches;

                    }
                );

        };


    aplicarEstado();


    ESCRITORIO.addEventListener(
        "change",
        aplicarEstado
    );

}


/**
 * Habilita el botón para mostrar
 * u ocultar la contraseña.
 */

function inicializarToggleContraseña() {

    document
        .querySelectorAll(
            ".password-toggle"
        )
        .forEach(
            boton => {

                boton.addEventListener(
                    "click",
                    () => {

                        const input =
                            boton
                                .previousElementSibling;

                        const icono =
                            boton.querySelector(
                                "i"
                            );


                        if (
                            !input ||
                            !icono
                        ) {
                            return;
                        }


                        const esPassword =
                            input.type ===
                            "password";


                        input.type =
                            esPassword
                                ? "text"
                                : "password";


                        icono.classList.toggle(
                            "bi-eye",
                            !esPassword
                        );

                        icono.classList.toggle(
                            "bi-eye-slash",
                            esPassword
                        );

                    }
                );

            }
        );

}


/**
 * Marca como activo el link del menú
 * correspondiente a la página actual.
 */

function marcarLinkActivo() {

    const paginaActual =
        window.location.pathname
            .split("/")
            .pop() ||
        "index.html";


    document
        .querySelectorAll(
            ".nav-link[data-page]"
        )
        .forEach(
            link => {

                const esActivo =
                    link.dataset.page ===
                    paginaActual;


                link.classList.toggle(
                    "active",
                    esActivo
                );

            }
        );

}


/**
 * Elimina todos los datos relacionados
 * con la sesión del usuario.
 */

function limpiarSesionUsuario() {

    sessionStorage.removeItem(
        "celiaUsuario"
    );

    sessionStorage.removeItem(
        "celiaToken"
    );

    localStorage.removeItem(
        "celiaUsuario"
    );

    localStorage.removeItem(
        "celiaToken"
    );

}


/**
 * Muestra el nombre del usuario cuando
 * existe una sesión iniciada.
 *
 * Si el usuario es administrador,
 * habilita también el acceso al panel.
 */

function actualizarCuentaUsuario() {

    const botonCuenta =
        document.getElementById(
            "cuenta-usuario"
        );

    const menuUsuario =
        document.getElementById(
            "menu-usuario"
        );

    const nombreUsuario =
        document.getElementById(
            "nombre-usuario"
        );

    const emailUsuario =
        document.getElementById(
            "email-usuario"
        );

    const botonCerrarSesion =
        document.getElementById(
            "btn-cerrar-sesion"
        );

    const opcionPanelAdmin =
        document.getElementById(
            "opcion-panel-admin"
        );

    const separadorPanelAdmin =
        document.getElementById(
            "separador-panel-admin"
        );


    if (
        !botonCuenta ||
        !menuUsuario
    ) {
        return;
    }


    const usuarioGuardado =
        sessionStorage.getItem(
            "celiaUsuario"
        ) ||
        localStorage.getItem(
            "celiaUsuario"
        );


    /* =========================================
       USUARIO NO LOGUEADO
    ========================================= */

    if (!usuarioGuardado) {

        botonCuenta.classList.remove(
            "d-none"
        );

        menuUsuario.classList.add(
            "d-none"
        );


        return;

    }


    /* =========================================
       USUARIO LOGUEADO
    ========================================= */

    try {

        const usuario =
            JSON.parse(
                usuarioGuardado
            );


        if (
            !usuario ||
            !usuario.email
        ) {

            throw new Error(
                "Datos de usuario inválidos"
            );

        }


        botonCuenta.classList.add(
            "d-none"
        );

        menuUsuario.classList.remove(
            "d-none"
        );


        if (nombreUsuario) {

            nombreUsuario.textContent =
                usuario.nombre;

        }


        if (emailUsuario) {

            emailUsuario.textContent =
                usuario.email;

        }


        /* =====================================
           PANEL DE ADMINISTRACIÓN
        ===================================== */

        if (
            Number(usuario.rolId) === 1
        ) {

            if (opcionPanelAdmin) {

                opcionPanelAdmin
                    .classList
                    .remove(
                        "d-none"
                    );

            }


            if (separadorPanelAdmin) {

                separadorPanelAdmin
                    .classList
                    .remove(
                        "d-none"
                    );

            }

        } else {

            if (opcionPanelAdmin) {

                opcionPanelAdmin
                    .classList
                    .add(
                        "d-none"
                    );

            }


            if (separadorPanelAdmin) {

                separadorPanelAdmin
                    .classList
                    .add(
                        "d-none"
                    );

            }

        }


        /* =====================================
           CERRAR SESIÓN
        ===================================== */

        if (botonCerrarSesion) {

            botonCerrarSesion
                .addEventListener(
                    "click",
                    () => {

                        limpiarSesionUsuario();


                        window.location.href =
                            "index.html";

                    }
                );

        }


    } catch (error) {

        console.error(
            "Error al leer el usuario guardado:",
            error
        );


        limpiarSesionUsuario();


        botonCuenta.classList.remove(
            "d-none"
        );

        menuUsuario.classList.add(
            "d-none"
        );

    }

}
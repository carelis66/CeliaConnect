/* =====================================================
   CELIACONNECT - APP.JS
   Carga de componentes reutilizables (header / footer)
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    cargarComponente("#header-placeholder", "components/header.html", marcarLinkActivo);
    cargarComponente("#footer-placeholder", "components/footer.html", ajustarAcordeonFooter);

    inicializarToggleContraseña();

});

/**
 * Carga un componente HTML dentro de un elemento del DOM.
 * @param {string} selector - selector del contenedor destino (ej: "#header-placeholder")
 * @param {string} url - ruta del archivo HTML a inyectar
 * @param {Function} [callback] - función a ejecutar luego de inyectar el HTML
 */
function cargarComponente(selector, url, callback) {

    const destino = document.querySelector(selector);

    if (!destino) return;

    fetch(url)
        .then(respuesta => {

            if (!respuesta.ok) {
                throw new Error(`No se pudo cargar ${url} (${respuesta.status})`);
            }

            return respuesta.text();

        })
        .then(html => {

            destino.innerHTML = html;

            if (typeof callback === "function") {
                callback();
            }

        })
        .catch(error => {

            console.error("Error cargando componente:", error);

        });

}

/**
 * Controla el acordeón del footer según el ancho de pantalla:
 * en desktop (>=768px) queda siempre abierto, en mobile arranca cerrado
 * y el usuario lo despliega tocando el título.
 */
function ajustarAcordeonFooter() {

    const ESCRITORIO = window.matchMedia("(min-width: 768px)");

    const aplicarEstado = () => {

        document.querySelectorAll(".footer-accordion").forEach(acordeon => {
            acordeon.open = ESCRITORIO.matches;
        });

    };

    aplicarEstado();

    ESCRITORIO.addEventListener("change", aplicarEstado);

}

/**
 * Habilita el botón de "ojito" para mostrar/ocultar la contraseña
 * en los formularios de login y registro.
 */
function inicializarToggleContraseña() {

    document.querySelectorAll(".password-toggle").forEach(boton => {

        boton.addEventListener("click", () => {

            const input = boton.previousElementSibling;
            const icono = boton.querySelector("i");

            const esPassword = input.type === "password";

            input.type = esPassword ? "text" : "password";

            icono.classList.toggle("bi-eye", !esPassword);
            icono.classList.toggle("bi-eye-slash", esPassword);

        });

    });

}

/**
 * Marca como activo el link del menú que corresponde a la página actual,
 * comparando el atributo data-page de cada link con el nombre del archivo.
 */
function marcarLinkActivo() {

    const paginaActual = window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".nav-link[data-page]").forEach(link => {

        const esActivo = link.dataset.page === paginaActual;

        link.classList.toggle("active", esActivo);

    });

}
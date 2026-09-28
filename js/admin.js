/* =====================================================
   CELIACONNECT - ADMIN.JS
   Lógica del panel de administración.
   Requiere cargar ../js/app.js ANTES (reutiliza cargarComponente).
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    cargarComponente(
        "#admin-sidebar-placeholder",
        "../components/admin-sidebar.html",
        marcarLinkActivoAdmin
    );

    inicializarMenuMobileAdmin();

});

/**
 * Marca como activo el link del sidebar que corresponde a la página actual,
 * comparando el atributo data-page con el nombre del archivo.
 */
function marcarLinkActivoAdmin() {

    const paginaActual = window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".admin-nav-link[data-page]").forEach(link => {

        link.classList.toggle("active", link.dataset.page === paginaActual);

    });

}

/**
 * Menú lateral deslizable para pantallas chicas (<992px).
 * Se controla con la clase "admin-menu-open" en el <body>.
 */
function inicializarMenuMobileAdmin() {

    const body = document.body;
    const botonMenu = document.getElementById("adminMenuToggle");
    const overlay = document.getElementById("adminOverlay");
    const sidebar = document.getElementById("admin-sidebar-placeholder");

    const cerrarMenu = () => body.classList.remove("admin-menu-open");

    if (botonMenu) {
        botonMenu.addEventListener("click", () => {
            body.classList.toggle("admin-menu-open");
        });
    }

    if (overlay) {
        overlay.addEventListener("click", cerrarMenu);
    }

    // Delegación de eventos: el contenido del sidebar se inyecta después de cargar la página
    if (sidebar) {
        sidebar.addEventListener("click", (evento) => {

            if (evento.target.closest(".admin-nav-link, .admin-close")) {
                cerrarMenu();
            }

        });
    }

    document.addEventListener("keydown", (evento) => {

        if (evento.key === "Escape") {
            cerrarMenu();
        }

    });

}
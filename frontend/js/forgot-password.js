// ==========================================
// RECUPERAR CONTRASEÑA
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    console.log("forgot-password.js cargado correctamente");

    const form = document.getElementById("forgot-form");
    const emailInput = document.getElementById("email");
    const mensaje = document.getElementById("forgot-mensaje");
    const boton = document.getElementById("btn-forgot");

    // Verificar que encontramos los elementos
    console.log("Formulario encontrado:", form);
    console.log("Botón encontrado:", boton);

    if (!form || !emailInput || !mensaje || !boton) {
        console.error(
            "No se encontraron todos los elementos necesarios del formulario."
        );
        return;
    }

    form.addEventListener("submit", async (event) => {

        event.preventDefault();

        console.log("Formulario de recuperación enviado");

        const email = emailInput.value.trim();

        // Limpiar mensaje anterior
        mensaje.className = "alert d-none";
        mensaje.textContent = "";

        // Validar email
        if (!email) {
            mostrarMensaje(
                "Ingresá tu correo electrónico.",
                "danger"
            );
            return;
        }

        try {

            boton.disabled = true;

            boton.innerHTML = `
                <span
                    class="spinner-border spinner-border-sm me-2"
                    aria-hidden="true">
                </span>
                Enviando...
            `;

            console.log(
                "Enviando solicitud al backend local para:",
                email
            );

            const response = await fetch(
                "https://celiaconnect-production.up.railway.app/api/forgot-password",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({
                        email: email,
                    }),
                }
            );

            console.log(
                "Respuesta HTTP del backend:",
                response.status
            );

            const data = await response.json();

            console.log(
                "Respuesta del backend:",
                data
            );

            if (!response.ok) {
                throw new Error(
                    data.mensaje ||
                    "No se pudo procesar la solicitud."
                );
            }

            mostrarMensaje(
                data.mensaje,
                "success"
            );

            form.reset();

        } catch (error) {

            console.error(
                "Error al recuperar contraseña:",
                error
            );

            mostrarMensaje(
                error.message ||
                "Ocurrió un error. Intentá nuevamente.",
                "danger"
            );

        } finally {

            boton.disabled = false;

            boton.innerHTML = `
                Enviar enlace
                <i class="bi bi-envelope-arrow-up ms-1"></i>
            `;

        }

    });


    // ==========================================
    // MOSTRAR MENSAJE
    // ==========================================

    function mostrarMensaje(texto, tipo) {

        mensaje.textContent = texto;

        mensaje.className =
            `alert alert-${tipo}`;

    }

});
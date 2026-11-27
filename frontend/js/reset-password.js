
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("reset-form");
    const passwordInput = document.getElementById("password");
    const confirmInput = document.getElementById("confirm-password");
    const mensaje = document.getElementById("reset-mensaje");
    const boton = document.getElementById("btn-reset");

    if (!form || !passwordInput || !confirmInput || !mensaje || !boton) {
        console.error("No se encontraron los elementos del formulario.");
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    function mostrarMensaje(texto, tipo) {
        mensaje.textContent = texto;
        mensaje.className = `alert alert-${tipo}`;
    }

    if (!token) {
        mostrarMensaje(
            "El enlace de recuperación no es válido. Solicitá uno nuevo.",
            "danger"
        );
        boton.disabled = true;
        return;
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const password = passwordInput.value;
        const confirmPassword = confirmInput.value;

        mensaje.className = "alert d-none";
        mensaje.textContent = "";

        if (password.length < 8) {
            mostrarMensaje(
                "La contraseña debe tener al menos 8 caracteres.",
                "danger"
            );
            return;
        }

        if (password !== confirmPassword) {
            mostrarMensaje(
                "Las contraseñas no coinciden.",
                "danger"
            );
            return;
        }

        try {
            boton.disabled = true;
            boton.innerHTML = `
                <span class="spinner-border spinner-border-sm me-2"></span>
                Guardando...
            `;

            const response = await fetch(
                "https://celiaconnect-production.up.railway.app/api/reset-password",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        token,
                        password
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.mensaje || "No se pudo cambiar la contraseña."
                );
            }

            mostrarMensaje(
                "¡Contraseña actualizada correctamente! Ya podés iniciar sesión.",
                "success"
            );

            form.reset();
            boton.disabled = true;

        } catch (error) {
            console.error("Error al restablecer contraseña:", error);

            mostrarMensaje(
                error.message || "Ocurrió un error. Intentá nuevamente.",
                "danger"
            );

        } finally {
            if (!boton.disabled || mensaje.className !== "alert alert-success") {
                boton.disabled = false;
            }

            boton.innerHTML = `
                Guardar nueva contraseña
                <i class="bi bi-check-circle ms-1"></i>
            `;
        }
    });
});

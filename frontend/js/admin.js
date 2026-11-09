/* =====================================================
   CELIACONNECT - ADMIN.JS
   Panel de administración
===================================================== */

/* =====================================================
   DASHBOARD
===================================================== */

const API_ADMIN_DASHBOARD = "http://localhost:3000/api/admin/dashboard";

const API_ADMIN_ULTIMAS_ALTAS = "http://localhost:3000/api/admin/ultimas-altas";

/* =====================================================
   MODERACIÓN DE COMENTARIOS
===================================================== */

const API_ADMIN_PRODUCTOS =
  "http://localhost:3000/api/admin/comentarios/productos";

const API_ADMIN_RESTAURANTES_COMENTARIOS =
  "http://localhost:3000/api/admin/comentarios/restaurantes";

const API_ADMIN_LOCALES = "http://localhost:3000/api/admin/comentarios/locales";

const API_ADMIN_NUTRICIONISTAS =
  "http://localhost:3000/api/admin/comentarios/nutricionistas";

/* =====================================================
   PRODUCTOS
===================================================== */

const API_PRODUCTOS = "http://localhost:3000/api/productos";

const API_ADMIN_MARCAS = "http://localhost:3000/api/admin/marcas";

const API_ADMIN_CATEGORIAS = "http://localhost:3000/api/admin/categorias";

/* =====================================================
   RESTAURANTES
===================================================== */

const API_RESTAURANTES = "http://localhost:3000/api/restaurantes";

const API_ADMIN_RESTAURANTES = "http://localhost:3000/api/admin/restaurantes";

const API_ADMIN_TIPOS_RESTAURANTE =
  "http://localhost:3000/api/admin/tipos-restaurante";

const API_ADMIN_BARRIOS = "http://localhost:3000/api/admin/barrios";

/* =====================================================
   LOCALES
===================================================== */

const API_ADMIN_LOCALES_CRUD = "http://localhost:3000/api/admin/locales";

const API_ADMIN_TIPOS_LOCAL = "http://localhost:3000/api/admin/tipos-local";

/* NUTRICIONISTAS */
const API_ADMIN_NUTRICIONISTAS_CRUD =
  "http://localhost:3000/api/admin/nutricionistas";
let comentarioSeleccionado = null;
let estadoSeleccionado = null;
let tipoComentarioSeleccionado = null;

// ==========================================
// OBTENER TOKEN
// ==========================================

function obtenerTokenAdmin() {
  return (
    sessionStorage.getItem("celiaToken") || localStorage.getItem("celiaToken")
  );
}

// ==========================================
// OBTENER USUARIO GUARDADO
// ==========================================

function obtenerUsuarioAdmin() {
  const usuarioGuardado =
    sessionStorage.getItem("celiaUsuario") ||
    localStorage.getItem("celiaUsuario");

  if (!usuarioGuardado) {
    return null;
  }

  try {
    return JSON.parse(usuarioGuardado);
  } catch (error) {
    return null;
  }
}

// ==========================================
// LIMPIAR SESIÓN
// ==========================================

function limpiarSesionAdmin() {
  sessionStorage.removeItem("celiaToken");
  sessionStorage.removeItem("celiaUsuario");

  localStorage.removeItem("celiaToken");
  localStorage.removeItem("celiaUsuario");
}

// ==========================================
// VERIFICAR ACCESO AL ADMIN
// ==========================================

function verificarAccesoAdmin() {
  const token = obtenerTokenAdmin();

  const usuario = obtenerUsuarioAdmin();

  // NO HAY SESIÓN
  if (!token || !usuario) {
    limpiarSesionAdmin();

    window.location.replace("../login.html");

    return false;
  }

  // SOLO ADMINISTRADOR O MODERADOR
  const rolId = Number(usuario.rolId);

  if (rolId !== 1 && rolId !== 3) {
    window.location.replace("../index.html");

    return false;
  }

  // MODERADOR:
  // SOLO PUEDE ACCEDER AL DASHBOARD
  if (rolId === 3) {
    const paginaActual = window.location.pathname.split("/").pop();

    if (paginaActual !== "index.html" && paginaActual !== "") {
      window.location.replace("index.html");

      return false;
    }
  }

  return true;
}

// ==========================================
// CARGAR ESTADÍSTICAS DEL DASHBOARD
// ==========================================

async function cargarEstadisticasDashboard() {
  try {
    const token = obtenerTokenAdmin();

    if (!token) {
      return;
    }

    const respuesta = await fetch(API_ADMIN_DASHBOARD, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!respuesta.ok) {
      throw new Error("No se pudieron cargar las estadísticas");
    }

    const datos = await respuesta.json();

    const kpiProductos = document.getElementById("kpiProductos");

    const kpiRestaurantes = document.getElementById("kpiRestaurantes");

    const kpiLocales = document.getElementById("kpiLocales");

    const kpiNutricionistas = document.getElementById("kpiNutricionistas");

    const kpiUsuarios = document.getElementById("kpiUsuarios");

    if (kpiProductos) {
      kpiProductos.textContent = datos.productos ?? 0;
    }

    if (kpiRestaurantes) {
      kpiRestaurantes.textContent = datos.restaurantes ?? 0;
    }

    if (kpiLocales) {
      kpiLocales.textContent = datos.locales ?? 0;
    }

    if (kpiNutricionistas) {
      kpiNutricionistas.textContent = datos.nutricionistas ?? 0;
    }

    if (kpiUsuarios) {
      kpiUsuarios.textContent = datos.usuarios ?? 0;
    }
  } catch (error) {
    console.error("Error al cargar estadísticas del dashboard:", error);
  }
}

// ==========================================
// DASHBOARD - ÚLTIMAS ALTAS
// ==========================================

async function cargarUltimasAltas() {
  try {
    const token = obtenerTokenAdmin();

    const respuesta = await fetch(API_ADMIN_ULTIMAS_ALTAS, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!respuesta.ok) {
      throw new Error("No se pudieron cargar las últimas altas");
    }

    const altas = await respuesta.json();

    const tabla = document.getElementById("tablaUltimasAltas");

    if (!tabla) {
      return;
    }

    tabla.innerHTML = "";

    altas.forEach((alta) => {
      let icono = "bi-circle-fill";

      if (alta.tipo === "Producto") {
        icono = "bi-basket2-fill";
      }

      if (alta.tipo === "Restaurante") {
        icono = "bi-shop";
      }

      if (alta.tipo === "Local") {
        icono = "bi-geo-alt-fill";
      }

      if (alta.tipo === "Nutricionista") {
        icono = "bi-heart-pulse-fill";
      }

      let claseEstado = "status-pending";
      let iconoEstado = "bi-hourglass-split";

      const estado = alta.estado.toLowerCase();

      if (estado === "verificado") {
        claseEstado = "status-ok";
        iconoEstado = "bi-patch-check-fill";
      }

      if (estado === "rechazado") {
        claseEstado = "status-rejected";
        iconoEstado = "bi-x-circle-fill";
      }

      const fecha = new Date(alta.fechaCreacion);

      const fechaFormateada = fecha.toLocaleDateString("es-AR", {
        day: "2-digit",
        month: "short",
      });

      tabla.innerHTML += `
                <tr>
                    <td>
                        <div class="admin-item">

                            <span class="admin-item-icon">
                                <i class="bi ${icono}"></i>
                            </span>

                            <div>
                                <span class="admin-item-name">
                                    ${alta.nombre}
                                </span>
                            </div>

                        </div>
                    </td>

                    <td>
                        ${alta.tipo}
                    </td>

                    <td>
                        <span class="status-pill ${claseEstado}">
                            <i class="bi ${iconoEstado}"></i>
                            ${alta.estado}
                        </span>
                    </td>

                    <td>
                        ${fechaFormateada}
                    </td>
                </tr>
            `;
    });
  } catch (error) {
    console.error("Error al cargar últimas altas:", error);
  }
}

async function cargarProductosAdmin() {
  const tabla = document.getElementById("tablaProductosAdmin");

  if (!tabla) {
    return;
  }

  try {
    const respuesta = await fetch(API_PRODUCTOS);

    if (!respuesta.ok) {
      throw new Error("No se pudieron cargar los productos");
    }

    const productos = await respuesta.json();

    tabla.innerHTML = "";

    productos.forEach((producto) => {
      const estado = producto.estadoVerificacion || "pendiente";

      let claseEstado = "status-pending";

      let iconoEstado = "bi-hourglass-split";

      let textoEstado = "Pendiente";

      if (estado === "verificado") {
        claseEstado = "status-ok";

        iconoEstado = "bi-patch-check-fill";

        textoEstado = "Verificado";
      } else if (estado === "rechazado") {
        claseEstado = "status-rejected";

        iconoEstado = "bi-x-circle-fill";

        textoEstado = "Rechazado";
      }

      tabla.innerHTML += `
                <tr>

                    <td>
                        <div class="admin-item">

                            <span class="admin-item-icon">
                                <i class="bi bi-basket2-fill"></i>
                            </span>

                            <div>
                                <span class="admin-item-name">
                                    ${producto.nombre}
                                </span>

                                <span class="admin-item-sub">
                                    ${producto.codigoBarras || "Sin código"}
                                </span>
                            </div>

                        </div>
                    </td>

                    <td>
                        ${producto.marca}
                    </td>

                    <td>
                        ${producto.categoria}
                    </td>

                    <td>
                        <span class="status-pill ${claseEstado}">
                            <i class="bi ${iconoEstado}"></i>
                            ${textoEstado}
                        </span>
                    </td>

                    <td class="text-end">

                        <button
                            type="button"
                            class="btn btn-sm btn-light me-1"
                            title="Editar"
                            data-id="${producto.id}"
                        >
                            <i class="bi bi-pencil"></i>
                        </button>

                        <button
                            type="button"
                            class="btn btn-sm btn-light"
                            title="Eliminar"
                            data-id="${producto.id}"
                        >
                            <i class="bi bi-trash3"></i>
                        </button>

                    </td>

                </tr>
            `;
    });
  } catch (error) {
    console.error("Error al cargar productos:", error);

    tabla.innerHTML = `
            <tr>
                <td
                    colspan="5"
                    class="text-center py-5 text-muted"
                >
                    No se pudieron cargar los productos.
                </td>
            </tr>
        `;
  }
}

// ==========================================
// CARGAR RESTAURANTES - ADMIN
// ==========================================

async function cargarRestaurantesAdmin() {
  const tabla = document.getElementById("tablaRestaurantesAdmin");

  if (!tabla) {
    return;
  }

  try {
    const token = obtenerTokenAdmin();

    const respuesta = await fetch(API_ADMIN_RESTAURANTES, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!respuesta.ok) {
      throw new Error("No se pudieron cargar los restaurantes");
    }

    const restaurantes = await respuesta.json();

    tabla.innerHTML = "";

    restaurantes.forEach((restaurante) => {
      const estado = restaurante.estadoVerificacion;

      let claseEstado = "status-pending";

      let iconoEstado = "bi-hourglass-split";

      let textoEstado = "Pendiente";

      if (estado === "verificado") {
        claseEstado = "status-ok";

        iconoEstado = "bi-patch-check-fill";

        textoEstado = "Verificado";
      } else if (estado === "rechazado") {
        claseEstado = "status-rejected";

        iconoEstado = "bi-x-circle-fill";

        textoEstado = "Rechazado";
      }

      tabla.innerHTML += `
                <tr>

                    <td>
                        <div class="admin-item">

                            <span class="admin-item-icon">
                                <i class="bi bi-shop"></i>
                            </span>

                            <div>
                                <span class="admin-item-name">
                                    ${restaurante.nombre}
                                </span>

                                <span class="admin-item-sub">
                                    ${restaurante.direccion || "Sin dirección"}
                                </span>
                            </div>

                        </div>
                    </td>

                    <td>
                        ${restaurante.tipo || restaurante.tipoRestaurante || "-"}
                    </td>

                    <td>
                        ${restaurante.barrio || "-"}
                    </td>

                    <td>
                        <span class="status-pill ${claseEstado}">
                            <i class="bi ${iconoEstado}"></i>
                            ${textoEstado}
                        </span>
                    </td>

                    <td class="text-end">

                        <button
                            type="button"
                            class="btn btn-sm btn-light me-1"
                            title="Editar restaurante"
                            data-id="${restaurante.id}"
                        >
                            <i class="bi bi-pencil"></i>
                        </button>

                        <button
                            type="button"
                            class="btn btn-sm btn-light"
                            title="Eliminar restaurante"
                            data-id="${restaurante.id}"
                        >
                            <i class="bi bi-trash3"></i>
                        </button>

                    </td>

                </tr>
            `;
    });
  } catch (error) {
    console.error("Error al cargar restaurantes:", error);

    tabla.innerHTML = `
            <tr>
                <td
                    colspan="5"
                    class="text-center py-5 text-muted"
                >
                    No se pudieron cargar los restaurantes.
                </td>
            </tr>
        `;
  }
}

// ==========================================
// CARGAR OPCIONES DE RESTAURANTE - ADMIN
// ==========================================

async function cargarOpcionesRestaurante() {
  const selectTipo = document.getElementById("restauranteTipo");

  const selectBarrio = document.getElementById("restauranteBarrio");

  if (!selectTipo || !selectBarrio) {
    return;
  }

  try {
    const token = obtenerTokenAdmin();

    const [respuestaTipos, respuestaBarrios] = await Promise.all([
      fetch(API_ADMIN_TIPOS_RESTAURANTE, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),

      fetch(API_ADMIN_BARRIOS, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    ]);

    if (!respuestaTipos.ok || !respuestaBarrios.ok) {
      throw new Error("No se pudieron cargar tipos y barrios");
    }

    const tipos = await respuestaTipos.json();

    const barrios = await respuestaBarrios.json();

    selectTipo.innerHTML = '<option value="">Seleccionar tipo</option>';

    tipos.forEach((tipo) => {
      selectTipo.innerHTML += `
                <option value="${tipo.id}">
                    ${tipo.nombre}
                </option>
            `;
    });

    selectBarrio.innerHTML = '<option value="">Seleccionar barrio</option>';

    barrios.forEach((barrio) => {
      selectBarrio.innerHTML += `
                <option value="${barrio.id}">
                    ${barrio.nombre}
                </option>
            `;
    });
  } catch (error) {
    console.error("Error al cargar opciones de restaurante:", error);
  }
}

// ==========================================
// EDITAR RESTAURANTE - ADMIN
// ==========================================

function inicializarEdicionRestaurantes() {
  const tabla = document.getElementById("tablaRestaurantesAdmin");

  const modalElemento = document.getElementById("modalRestaurante");

  if (!tabla || !modalElemento) {
    return;
  }

  tabla.addEventListener("click", async (event) => {
    const boton = event.target.closest('button[title="Editar restaurante"]');

    if (!boton) {
      return;
    }

    const restauranteId = Number(boton.dataset.id);

    try {
      const token = obtenerTokenAdmin();

      const respuesta = await fetch(API_ADMIN_RESTAURANTES, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!respuesta.ok) {
        throw new Error("No se pudo obtener el restaurante");
      }

      const restaurantes = await respuesta.json();

      const restaurante = restaurantes.find(
        (item) => Number(item.id) === restauranteId,
      );

      if (!restaurante) {
        throw new Error("Restaurante no encontrado");
      }

      document.getElementById("restauranteId").value = restaurante.id;

      document.getElementById("restauranteNombre").value =
        restaurante.nombre || "";

      document.getElementById("restauranteTipo").value =
        restaurante.tipoRestauranteId || "";

      document.getElementById("restauranteBarrio").value =
        restaurante.barrioId || "";

      document.getElementById("restauranteEstado").value =
        restaurante.estadoVerificacion || "pendiente";

      document.getElementById("restauranteDescripcion").value =
        restaurante.descripcion || "";

      document.getElementById("restauranteDireccion").value =
        restaurante.direccion || "";

      document.getElementById("restauranteTelefono").value =
        restaurante.telefono || "";

      document.getElementById("restauranteEmail").value =
        restaurante.email || "";

      document.getElementById("restauranteHorario").value =
        restaurante.horario || "";

      document.getElementById("restauranteSitioWeb").value =
        restaurante.sitioWeb || "";

      document.getElementById("restauranteInstagram").value =
        restaurante.instagram || "";

      document.getElementById("restauranteLatitud").value =
        restaurante.latitud || "";

      document.getElementById("restauranteLongitud").value =
        restaurante.longitud || "";

      document.getElementById("restauranteImagenExterior").value =
        restaurante.imagenExterior || "";

      document.getElementById("restauranteImagenInterior").value =
        restaurante.imagenInterior || "";

      document.getElementById("modalRestauranteTitulo").textContent =
        "Editar restaurante";

      document.getElementById("btnGuardarRestaurante").innerHTML = `
                    <i class="bi bi-check-lg"></i>
                    Guardar restaurante
                `;

      const modal = bootstrap.Modal.getOrCreateInstance(modalElemento);

      modal.show();
    } catch (error) {
      console.error("Error al cargar restaurante para editar:", error);
    }
  });
}

// ==========================================
// NUEVO RESTAURANTE - ADMIN
// ==========================================

function inicializarNuevoRestaurante() {
  const botonNuevo = document.getElementById("btnNuevoRestaurante");

  const form = document.getElementById("formRestaurante");

  const modalElemento = document.getElementById("modalRestaurante");

  if (!botonNuevo || !form || !modalElemento) {
    return;
  }

  botonNuevo.addEventListener("click", () => {
    // Limpiar formulario
    form.reset();

    // Vaciar ID para indicar que es un restaurante nuevo
    document.getElementById("restauranteId").value = "";

    // Estado inicial
    document.getElementById("restauranteEstado").value = "pendiente";

    // Cambiar título
    document.getElementById("modalRestauranteTitulo").textContent =
      "Nuevo restaurante";

    // Botón
    document.getElementById("btnGuardarRestaurante").innerHTML = `
                <i class="bi bi-check-lg"></i>
                Guardar restaurante
            `;

    const modal = bootstrap.Modal.getOrCreateInstance(modalElemento);

    modal.show();
  });
}

// ==========================================
// GUARDAR RESTAURANTE - ADMIN
// ==========================================

function inicializarGuardarRestaurante() {
  const form = document.getElementById("formRestaurante");

  if (!form) {
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const restauranteId = document.getElementById("restauranteId").value;

    const datosRestaurante = {
      nombre: document.getElementById("restauranteNombre").value.trim(),

      tipoRestauranteId: Number(
        document.getElementById("restauranteTipo").value,
      ),

      barrioId: Number(document.getElementById("restauranteBarrio").value),

      estadoVerificacion: document.getElementById("restauranteEstado").value,

      descripcion: document
        .getElementById("restauranteDescripcion")
        .value.trim(),

      direccion: document.getElementById("restauranteDireccion").value.trim(),

      telefono: document.getElementById("restauranteTelefono").value.trim(),

      email: document.getElementById("restauranteEmail").value.trim(),

      horario: document.getElementById("restauranteHorario").value.trim(),

      sitioWeb: document.getElementById("restauranteSitioWeb").value.trim(),

      instagram: document.getElementById("restauranteInstagram").value.trim(),

      latitud: document.getElementById("restauranteLatitud").value || null,

      longitud: document.getElementById("restauranteLongitud").value || null,

      imagenExterior: document
        .getElementById("restauranteImagenExterior")
        .value.trim(),

      imagenInterior: document
        .getElementById("restauranteImagenInterior")
        .value.trim(),
    };

    try {
      const token = obtenerTokenAdmin();

      // Si no hay ID, estamos creando.
      // Si hay ID, estamos editando.
      const esNuevo = !restauranteId;

      const url = esNuevo
        ? API_ADMIN_RESTAURANTES
        : `${API_ADMIN_RESTAURANTES}/${restauranteId}`;

      const metodo = esNuevo ? "POST" : "PUT";

      const respuesta = await fetch(url, {
        method: metodo,

        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(datosRestaurante),
      });

      if (!respuesta.ok) {
        const error = await respuesta.json();

        throw new Error(
          error.mensaje ||
            (esNuevo
              ? "No se pudo crear el restaurante"
              : "No se pudo actualizar el restaurante"),
        );
      }

      // Preparar mensaje de confirmación
      const tituloExito = document.querySelector("#modalRestauranteExito h5");

      const textoExito = document.querySelector("#modalRestauranteExito p");

      if (tituloExito && textoExito) {
        tituloExito.textContent = esNuevo
          ? "Restaurante creado"
          : "Restaurante actualizado";

        textoExito.textContent = esNuevo
          ? "El restaurante se creó correctamente."
          : "Los cambios del restaurante se guardaron correctamente.";
      }

      // Actualizar tabla
      await cargarRestaurantesAdmin();

      // Cerrar modal
      const modalElemento = document.getElementById("modalRestaurante");

      const modal = bootstrap.Modal.getInstance(modalElemento);

      if (modal) {
        modalElemento.addEventListener(
          "hidden.bs.modal",
          () => {
            const modalExito = bootstrap.Modal.getOrCreateInstance(
              document.getElementById("modalRestauranteExito"),
            );

            modalExito.show();
          },
          { once: true },
        );

        modal.hide();
      }
    } catch (error) {
      console.error("Error al guardar restaurante:", error);
    }
  });
}

// ==========================================
// ABRIR MODAL ELIMINAR RESTAURANTE
// ==========================================

function inicializarEliminarRestaurante() {
  const tabla = document.getElementById("tablaRestaurantesAdmin");

  const modalElemento = document.getElementById("modalEliminarRestaurante");

  if (!tabla || !modalElemento) {
    return;
  }

  tabla.addEventListener("click", (event) => {
    const boton = event.target.closest('button[title="Eliminar restaurante"]');

    if (!boton) {
      return;
    }

    const restauranteId = boton.dataset.id;

    const fila = boton.closest("tr");

    const nombre =
      fila.querySelector(".admin-item-name")?.textContent.trim() ||
      "este restaurante";

    // Guardamos el ID en el botón de confirmación
    const botonConfirmar = document.getElementById(
      "btnConfirmarEliminarRestaurante",
    );

    botonConfirmar.dataset.id = restauranteId;

    // Mostrar nombre en el modal
    document.getElementById("nombreRestauranteEliminar").textContent = nombre;

    const modal = bootstrap.Modal.getOrCreateInstance(modalElemento);

    modal.show();
  });
}

// ==========================================
// CONFIRMAR ELIMINAR RESTAURANTE
// ==========================================

function inicializarConfirmarEliminarRestaurante() {
  const botonConfirmar = document.getElementById(
    "btnConfirmarEliminarRestaurante",
  );

  if (!botonConfirmar) {
    return;
  }

  botonConfirmar.addEventListener("click", async () => {
    const restauranteId = botonConfirmar.dataset.id;

    if (!restauranteId) {
      return;
    }

    try {
      const token = obtenerTokenAdmin();

      const respuesta = await fetch(
        `${API_ADMIN_RESTAURANTES}/${restauranteId}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!respuesta.ok) {
        const error = await respuesta.json();

        throw new Error(error.mensaje || "No se pudo eliminar el restaurante");
      }

      // Cerrar modal de eliminación
      const modalEliminarElemento = document.getElementById(
        "modalEliminarRestaurante",
      );

      const modalEliminar = bootstrap.Modal.getInstance(modalEliminarElemento);

      if (modalEliminar) {
        modalEliminar.hide();
      }

      // Limpiar ID guardado
      delete botonConfirmar.dataset.id;

      // Recargar tabla
      await cargarRestaurantesAdmin();
    } catch (error) {
      console.error("Error al eliminar restaurante:", error);
    }
  });
}

// ==========================================
// EDITAR PRODUCTO - ADMIN
// ==========================================

async function cargarOpcionesProducto() {
  const selectMarca = document.getElementById("productoMarca");

  const selectCategoria = document.getElementById("productoCategoria");

  if (!selectMarca || !selectCategoria) {
    return;
  }

  try {
    const token = obtenerTokenAdmin();

    const [respuestaMarcas, respuestaCategorias] = await Promise.all([
      fetch(API_ADMIN_MARCAS, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),

      fetch(API_ADMIN_CATEGORIAS, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    ]);

    if (!respuestaMarcas.ok || !respuestaCategorias.ok) {
      throw new Error("No se pudieron cargar marcas y categorías");
    }

    const marcas = await respuestaMarcas.json();

    const categorias = await respuestaCategorias.json();

    selectMarca.innerHTML = '<option value="">Seleccionar marca</option>';

    marcas.forEach((marca) => {
      selectMarca.innerHTML += `
                <option value="${marca.id}">
                    ${marca.nombre}
                </option>
            `;
    });

    selectCategoria.innerHTML =
      '<option value="">Seleccionar categoría</option>';

    categorias.forEach((categoria) => {
      selectCategoria.innerHTML += `
                <option value="${categoria.id}">
                    ${categoria.nombre}
                </option>
            `;
    });
  } catch (error) {
    console.error("Error al cargar opciones de producto:", error);
  }
}

function inicializarEdicionProductos() {
  const tabla = document.getElementById("tablaProductosAdmin");

  const modalElemento = document.getElementById("modalProducto");

  if (!tabla || !modalElemento) {
    return;
  }

  tabla.addEventListener("click", async (event) => {
    const boton = event.target.closest('button[title="Editar"]');

    if (!boton) {
      return;
    }

    const productoId = Number(boton.dataset.id);

    try {
      const respuesta = await fetch(`${API_PRODUCTOS}/${productoId}`);

      if (!respuesta.ok) {
        throw new Error("No se pudo obtener el producto");
      }

      const producto = await respuesta.json();

      document.getElementById("productoId").value = producto.id;

      document.getElementById("productoNombre").value = producto.nombre || "";

      document.getElementById("productoCodigoBarras").value =
        producto.codigoBarras || "";

      document.getElementById("productoDescripcion").value =
        producto.descripcion || "";

      document.getElementById("productoIngredientes").value =
        producto.ingredientes || "";

      document.getElementById("productoInfoNutricional").value =
        producto.informacionNutricional || "";

      document.getElementById("productoImagen").value = producto.imagen || "";

      document.getElementById("productoMarca").value = producto.marcaId;

      document.getElementById("productoCategoria").value = producto.categoriaId;

      document.getElementById("productoCertificado").checked =
        Number(producto.certificadoSinTacc) === 1;

      document.getElementById("productoEstado").value =
        producto.estadoVerificacion || "pendiente";

      document.getElementById("modalProductoTitulo").textContent =
        "Editar producto";

      document.getElementById("btnGuardarProducto").innerHTML = `
    <i class="bi bi-check-lg"></i>
    Guardar producto
`;

      const modal = bootstrap.Modal.getOrCreateInstance(modalElemento);

      modal.show();
    } catch (error) {
      console.error("Error al cargar producto para editar:", error);
    }
  });
}

// ==========================================
// PREPARAR ELIMINACIÓN DE PRODUCTO - ADMIN
// ==========================================

function inicializarEliminarProducto() {
  const tabla = document.getElementById("tablaProductosAdmin");

  const modalElemento = document.getElementById("modalEliminarProducto");

  if (!tabla || !modalElemento) {
    return;
  }

  tabla.addEventListener("click", (event) => {
    const boton = event.target.closest('button[title="Eliminar"]');

    if (!boton) {
      return;
    }

    const productoId = Number(boton.dataset.id);

    const fila = boton.closest("tr");

    const nombreProducto = fila
      .querySelector(".admin-item-name")
      .textContent.trim();

    document.getElementById("nombreProductoEliminar").textContent =
      nombreProducto;

    const botonConfirmar = document.getElementById(
      "btnConfirmarEliminarProducto",
    );

    botonConfirmar.dataset.id = productoId;

    const modal = bootstrap.Modal.getOrCreateInstance(modalElemento);

    modal.show();
  });
}

// ==========================================
// CONFIRMAR ELIMINACIÓN DE PRODUCTO - ADMIN
// ==========================================

function inicializarConfirmarEliminarProducto() {
  const botonConfirmar = document.getElementById(
    "btnConfirmarEliminarProducto",
  );

  const modalElemento = document.getElementById("modalEliminarProducto");

  if (!botonConfirmar || !modalElemento) {
    return;
  }

  botonConfirmar.addEventListener("click", async () => {
    const productoId = Number(botonConfirmar.dataset.id);

    if (!productoId) {
      return;
    }

    try {
      const token = obtenerTokenAdmin();

      botonConfirmar.disabled = true;

      const respuesta = await fetch(
        `http://localhost:3000/api/admin/productos/${productoId}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const resultado = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(resultado.mensaje || "No se pudo eliminar el producto");
      }

      const modal = bootstrap.Modal.getInstance(modalElemento);

      modal.hide();

      await cargarProductosAdmin();
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    } finally {
      botonConfirmar.disabled = false;
    }
  });
}

// ==========================================
// GUARDAR EDICIÓN DE PRODUCTO - ADMIN
// ==========================================

function inicializarGuardarProducto() {
  const formulario = document.getElementById("formProducto");

  const modalElemento = document.getElementById("modalProducto");

  if (!formulario || !modalElemento) {
    return;
  }

  formulario.addEventListener("submit", async (event) => {
    event.preventDefault();

    const productoId = Number(document.getElementById("productoId").value);

    const token = obtenerTokenAdmin();

    const datosProducto = {
      nombre: document.getElementById("productoNombre").value.trim(),

      codigoBarras: document
        .getElementById("productoCodigoBarras")
        .value.trim(),

      marcaId: Number(document.getElementById("productoMarca").value),

      categoriaId: Number(document.getElementById("productoCategoria").value),

      descripcion: document.getElementById("productoDescripcion").value.trim(),

      ingredientes: document
        .getElementById("productoIngredientes")
        .value.trim(),

      informacionNutricional: document
        .getElementById("productoInfoNutricional")
        .value.trim(),

      imagen: document.getElementById("productoImagen").value.trim(),

      certificadoSinTacc: document.getElementById("productoCertificado").checked
        ? 1
        : 0,

      estadoVerificacion: document.getElementById("productoEstado").value,
    };

    try {
      const botonGuardar = document.getElementById("btnGuardarProducto");

      botonGuardar.disabled = true;

      const esNuevo = !productoId;

      const url = esNuevo
        ? "http://localhost:3000/api/admin/productos"
        : `http://localhost:3000/api/admin/productos/${productoId}`;

      const metodo = esNuevo ? "POST" : "PUT";

      const respuesta = await fetch(url, {
        method: metodo,

        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(datosProducto),
      });

      const resultado = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(
          resultado.mensaje || "No se pudo actualizar el producto",
        );
      }

      const tituloExito = document.querySelector("#modalProductoExito h5");

      const textoExito = document.querySelector("#modalProductoExito p");

      if (tituloExito && textoExito) {
        tituloExito.textContent = esNuevo
          ? "Producto creado"
          : "Producto actualizado";

        textoExito.textContent = esNuevo
          ? "El producto se creó correctamente."
          : "Los cambios se guardaron correctamente.";
      }

      const modal = bootstrap.Modal.getInstance(modalElemento);

      modalElemento.addEventListener(
        "hidden.bs.modal",
        () => {
          const modalExitoElemento =
            document.getElementById("modalProductoExito");

          const modalExito =
            bootstrap.Modal.getOrCreateInstance(modalExitoElemento);

          modalExito.show();
        },
        { once: true },
      );

      modal.hide();

      await cargarProductosAdmin();
    } catch (error) {
      console.error("Error al guardar producto:", error);
    } finally {
      const botonGuardar = document.getElementById("btnGuardarProducto");

      botonGuardar.disabled = false;
    }
  });
}

async function cargarNutricionistasAdmin() {
  const tabla = document.getElementById("tablaNutricionistasAdmin");

  if (!tabla) return;

  try {
    const token = obtenerTokenAdmin();

    const respuesta = await fetch(API_ADMIN_NUTRICIONISTAS_CRUD, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!respuesta.ok) {
      throw new Error("No se pudieron cargar los nutricionistas");
    }

    const nutricionistas = await respuesta.json();

    tabla.innerHTML = "";

    nutricionistas.forEach((nutricionista) => {
      const estado = nutricionista.estadoVerificacion;

      let claseEstado = "status-pending";

      let iconoEstado = "bi-hourglass-split";

      let textoEstado = "Pendiente";

      if (estado === "verificado") {
        claseEstado = "status-ok";

        iconoEstado = "bi-patch-check-fill";

        textoEstado = "Verificado";
      } else if (estado === "rechazado") {
        claseEstado = "status-rejected";

        iconoEstado = "bi-x-circle-fill";

        textoEstado = "Rechazado";
      }

      tabla.innerHTML += `
                <tr>

                    <td>
                        <div class="admin-item">

                            <span class="admin-item-icon">
                                <i class="bi bi-person-heart"></i>
                            </span>

                            <div>
                                <span class="admin-item-name">
                                    ${nutricionista.nombre}
                                    ${nutricionista.apellido}
                                </span>

                                <span class="admin-item-sub">
                                    ${nutricionista.email || "Sin email"}
                                </span>
                            </div>

                        </div>
                    </td>

                    <td>
                        ${nutricionista.matricula || "-"}
                    </td>

                    <td>
                        ${nutricionista.barrio || "-"}
                    </td>

                    <td>
                        <span class="status-pill ${claseEstado}">
                            <i class="bi ${iconoEstado}"></i>
                            ${textoEstado}
                        </span>
                    </td>

                    <td class="text-end">

                        <button
                            type="button"
                            class="btn btn-sm btn-light me-1"
                            title="Editar nutricionista"
                            data-id="${nutricionista.id}"
                        >
                            <i class="bi bi-pencil"></i>
                        </button>

                        <button
                            type="button"
                            class="btn btn-sm btn-light"
                            title="Eliminar nutricionista"
                            data-id="${nutricionista.id}"
                        >
                            <i class="bi bi-trash3"></i>
                        </button>

                    </td>

                </tr>
            `;
    });
  } catch (error) {
    console.error("Error al cargar nutricionistas:", error);

    tabla.innerHTML = `
            <tr>
                <td
                    colspan="5"
                    class="text-center py-5 text-muted"
                >
                    No se pudieron cargar los nutricionistas.
                </td>
            </tr>
        `;
  }
}

async function cargarOpcionesLocal() {
  const selectTipo = document.getElementById("localTipo");

  const selectBarrio = document.getElementById("localBarrio");

  if (!selectTipo || !selectBarrio) {
    return;
  }

  try {
    const token = obtenerTokenAdmin();

    const [respuestaTipos, respuestaBarrios] = await Promise.all([
      fetch(API_ADMIN_TIPOS_LOCAL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),

      fetch(API_ADMIN_BARRIOS, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    ]);

    if (!respuestaTipos.ok || !respuestaBarrios.ok) {
      throw new Error("No se pudieron cargar las opciones del local");
    }

    const tipos = await respuestaTipos.json();

    const barrios = await respuestaBarrios.json();

    selectTipo.innerHTML = `
            <option value="">
                Seleccionar tipo
            </option>
        `;

    tipos.forEach((tipo) => {
      selectTipo.innerHTML += `
                <option value="${tipo.id}">
                    ${tipo.nombre}
                </option>
            `;
    });

    selectBarrio.innerHTML = `
            <option value="">
                Seleccionar barrio
            </option>
        `;

    barrios.forEach((barrio) => {
      selectBarrio.innerHTML += `
                <option value="${barrio.id}">
                    ${barrio.nombre}
                </option>
            `;
    });
  } catch (error) {
    console.error("Error al cargar opciones del local:", error);
  }
}

function inicializarNuevoLocal() {
  const boton = document.getElementById("btnNuevoLocal");

  const formulario = document.getElementById("formLocal");

  const modalElemento = document.getElementById("modalLocal");

  if (!boton || !formulario || !modalElemento) {
    return;
  }

  boton.addEventListener("click", () => {
    formulario.reset();

    document.getElementById("localId").value = "";

    document.getElementById("localEstado").value = "pendiente";

    document.getElementById("modalLocalTitulo").textContent = "Nuevo local";

    document.getElementById("btnGuardarLocal").innerHTML = `
            <i class="bi bi-check-lg"></i>
            Guardar local
        `;

    const modal = bootstrap.Modal.getOrCreateInstance(modalElemento);

    modal.show();
  });
}

function inicializarGuardarLocal() {
  const formulario = document.getElementById("formLocal");

  const modalElemento = document.getElementById("modalLocal");

  const modalExitoElemento = document.getElementById("modalLocalExito");

  if (!formulario || !modalElemento || !modalExitoElemento) {
    return;
  }

  formulario.addEventListener("submit", async (event) => {
    event.preventDefault();

    const localId = document.getElementById("localId").value;

    const datosLocal = {
      nombre: document.getElementById("localNombre").value.trim(),

      tipoLocalId: document.getElementById("localTipo").value,

      barrioId: document.getElementById("localBarrio").value,

      estadoVerificacion: document.getElementById("localEstado").value,

      descripcion: document.getElementById("localDescripcion").value.trim(),

      direccion: document.getElementById("localDireccion").value.trim(),

      telefono: document.getElementById("localTelefono").value.trim(),

      email: document.getElementById("localEmail").value.trim(),

      horario: document.getElementById("localHorario").value.trim(),

      sitioWeb: document.getElementById("localSitioWeb").value.trim(),

      instagram: document.getElementById("localInstagram").value.trim(),

      imagen: document.getElementById("localImagen").value.trim(),

      latitud: document.getElementById("localLatitud").value || null,

      longitud: document.getElementById("localLongitud").value || null,
    };

    const esNuevo = !localId;

    const url = esNuevo
      ? API_ADMIN_LOCALES_CRUD
      : `${API_ADMIN_LOCALES_CRUD}/${localId}`;

    const metodo = esNuevo ? "POST" : "PUT";

    try {
      const token = obtenerTokenAdmin();

      const respuesta = await fetch(url, {
        method: metodo,

        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(datosLocal),
      });

      const resultado = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(resultado.mensaje || "No se pudo guardar el local");
      }

      await cargarLocalesAdmin();

      const modal = bootstrap.Modal.getInstance(modalElemento);

      const tituloExito = modalExitoElemento.querySelector("h5");

      const textoExito = modalExitoElemento.querySelector("p");

      if (esNuevo) {
        tituloExito.textContent = "Local creado";

        textoExito.textContent = "El local se creó correctamente.";
      } else {
        tituloExito.textContent = "Local actualizado";

        textoExito.textContent =
          "Los cambios del local se guardaron correctamente.";
      }

      modalElemento.addEventListener(
        "hidden.bs.modal",
        () => {
          const modalExito =
            bootstrap.Modal.getOrCreateInstance(modalExitoElemento);

          modalExito.show();
        },
        {
          once: true,
        },
      );

      modal.hide();
    } catch (error) {
      console.error("Error al guardar local:", error);
    }
  });
}

function inicializarEdicionLocales() {
  const tabla = document.getElementById("tablaLocalesAdmin");

  const modalElemento = document.getElementById("modalLocal");

  if (!tabla || !modalElemento) {
    return;
  }

  tabla.addEventListener("click", async (event) => {
    const botonEditar = event.target.closest('button[title="Editar local"]');

    if (!botonEditar) {
      return;
    }

    const localId = Number(botonEditar.dataset.id);

    try {
      const token = obtenerTokenAdmin();

      const respuesta = await fetch(API_ADMIN_LOCALES_CRUD, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!respuesta.ok) {
        throw new Error("No se pudo obtener el local");
      }

      const locales = await respuesta.json();

      const local = locales.find((item) => Number(item.id) === localId);

      if (!local) {
        throw new Error("Local no encontrado");
      }

      document.getElementById("localId").value = local.id;

      document.getElementById("localNombre").value = local.nombre || "";

      document.getElementById("localTipo").value = local.tipoLocalId || "";

      document.getElementById("localBarrio").value = local.barrioId || "";

      document.getElementById("localEstado").value =
        local.estadoVerificacion || "pendiente";

      document.getElementById("localDescripcion").value =
        local.descripcion || "";

      document.getElementById("localDireccion").value = local.direccion || "";

      document.getElementById("localTelefono").value = local.telefono || "";

      document.getElementById("localEmail").value = local.email || "";

      document.getElementById("localHorario").value = local.horario || "";

      document.getElementById("localSitioWeb").value = local.sitioWeb || "";

      document.getElementById("localInstagram").value = local.instagram || "";

      document.getElementById("localImagen").value = local.imagen || "";

      document.getElementById("localLatitud").value = local.latitud || "";

      document.getElementById("localLongitud").value = local.longitud || "";

      document.getElementById("modalLocalTitulo").textContent = "Editar local";

      document.getElementById("btnGuardarLocal").innerHTML = `
                    <i class="bi bi-check-lg"></i>
                    Guardar local
                `;

      const modal = bootstrap.Modal.getOrCreateInstance(modalElemento);

      modal.show();
    } catch (error) {
      console.error("Error al cargar local para editar:", error);
    }
  });
}

function inicializarEliminarLocal() {
  const tabla = document.getElementById("tablaLocalesAdmin");

  const modalElemento = document.getElementById("modalEliminarLocal");

  const nombreLocal = document.getElementById("nombreLocalEliminar");

  const botonConfirmar = document.getElementById("btnConfirmarEliminarLocal");

  if (!tabla || !modalElemento || !nombreLocal || !botonConfirmar) {
    return;
  }

  tabla.addEventListener("click", (event) => {
    const botonEliminar = event.target.closest(
      'button[title="Eliminar local"]',
    );

    if (!botonEliminar) {
      return;
    }

    const localId = botonEliminar.dataset.id;

    const fila = botonEliminar.closest("tr");

    const nombre =
      fila.querySelector(".admin-item-name")?.textContent.trim() ||
      "este local";

    botonConfirmar.dataset.id = localId;

    nombreLocal.textContent = nombre;

    const modal = bootstrap.Modal.getOrCreateInstance(modalElemento);

    modal.show();
  });
}

function inicializarConfirmarEliminarLocal() {
  const botonConfirmar = document.getElementById("btnConfirmarEliminarLocal");

  const modalElemento = document.getElementById("modalEliminarLocal");

  if (!botonConfirmar || !modalElemento) {
    return;
  }

  botonConfirmar.addEventListener("click", async () => {
    const localId = botonConfirmar.dataset.id;

    if (!localId) {
      return;
    }

    try {
      const token = obtenerTokenAdmin();

      const respuesta = await fetch(`${API_ADMIN_LOCALES_CRUD}/${localId}`, {
        method: "DELETE",

        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const resultado = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(resultado.mensaje || "No se pudo eliminar el local");
      }

      const modal = bootstrap.Modal.getInstance(modalElemento);

      modal.hide();

      delete botonConfirmar.dataset.id;

      await cargarLocalesAdmin();
    } catch (error) {
      console.error("Error al eliminar local:", error);
    }
  });
}

async function cargarLocalesAdmin() {
  const tabla = document.getElementById("tablaLocalesAdmin");

  if (!tabla) return;

  try {
    const token = obtenerTokenAdmin();

    const respuesta = await fetch(API_ADMIN_LOCALES_CRUD, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!respuesta.ok) {
      throw new Error("No se pudieron cargar los locales");
    }

    const locales = await respuesta.json();

    tabla.innerHTML = "";

    locales.forEach((local) => {
      const estado = local.estadoVerificacion;

      let claseEstado = "status-pending";

      let iconoEstado = "bi-hourglass-split";

      let textoEstado = "Pendiente";

      if (estado === "verificado") {
        claseEstado = "status-ok";

        iconoEstado = "bi-patch-check-fill";

        textoEstado = "Verificado";
      } else if (estado === "rechazado") {
        claseEstado = "status-rejected";

        iconoEstado = "bi-x-circle-fill";

        textoEstado = "Rechazado";
      }

      tabla.innerHTML += `
                <tr>

                    <td>
                        <div class="admin-item">

                            <span class="admin-item-icon">
                                <i class="bi bi-geo-alt-fill"></i>
                            </span>

                            <div>
                                <span class="admin-item-name">
                                    ${local.nombre}
                                </span>

                                <span class="admin-item-sub">
                                    ${local.direccion || "Sin dirección"}
                                </span>
                            </div>

                        </div>
                    </td>

                    <td>
                        ${local.tipo || "-"}
                    </td>

                    <td>
                        ${local.barrio || "-"}
                    </td>

                    <td>
                        <span class="status-pill ${claseEstado}">
                            <i class="bi ${iconoEstado}"></i>
                            ${textoEstado}
                        </span>
                    </td>

                    <td class="text-end">

                        <button
                            type="button"
                            class="btn btn-sm btn-light me-1"
                            title="Editar local"
                            data-id="${local.id}"
                        >
                            <i class="bi bi-pencil"></i>
                        </button>

                        <button
                            type="button"
                            class="btn btn-sm btn-light"
                            title="Eliminar local"
                            data-id="${local.id}"
                        >
                            <i class="bi bi-trash3"></i>
                        </button>

                    </td>

                </tr>
            `;
    });
  } catch (error) {
    console.error("Error al cargar locales:", error);

    tabla.innerHTML = `
            <tr>
                <td
                    colspan="5"
                    class="text-center py-5 text-muted"
                >
                    No se pudieron cargar los locales.
                </td>
            </tr>
        `;
  }
}

async function cargarOpcionesNutricionista() {
  const selectBarrio = document.getElementById("nutricionistaBarrio");

  if (!selectBarrio) return;

  try {
    const token = obtenerTokenAdmin();

    const respuesta = await fetch(API_ADMIN_BARRIOS, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!respuesta.ok) {
      throw new Error("No se pudieron cargar los barrios");
    }

    const barrios = await respuesta.json();

    selectBarrio.innerHTML = `
            <option value="">
                Seleccionar barrio
            </option>
        `;

    barrios.forEach((barrio) => {
      selectBarrio.innerHTML += `
                <option value="${barrio.id}">
                    ${barrio.nombre}
                </option>
            `;
    });
  } catch (error) {
    console.error("Error al cargar barrios para nutricionistas:", error);
  }
}

function inicializarNuevoNutricionista() {
  const boton = document.getElementById("btnNuevoNutricionista");

  const modalElemento = document.getElementById("modalNutricionista");

  const formulario = document.getElementById("formNutricionista");

  if (!boton || !modalElemento || !formulario) {
    return;
  }

  boton.addEventListener("click", () => {
    formulario.reset();

    document.getElementById("nutricionistaId").value = "";

    document.getElementById("nutricionistaEstado").value = "pendiente";

    document.getElementById("modalNutricionistaTitulo").textContent =
      "Nuevo nutricionista";

    document.getElementById("btnGuardarNutricionista").innerHTML = `
                <i class="bi bi-check-lg"></i>
                Guardar nutricionista
            `;

    const modal = bootstrap.Modal.getOrCreateInstance(modalElemento);

    modal.show();
  });
}

function inicializarGuardarNutricionista() {
  const formulario = document.getElementById("formNutricionista");

  const modalElemento = document.getElementById("modalNutricionista");

  if (!formulario || !modalElemento) {
    return;
  }

  formulario.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nutricionistaId = document.getElementById("nutricionistaId").value;

    const datos = {
      nombre: document.getElementById("nutricionistaNombre").value.trim(),

      apellido: document.getElementById("nutricionistaApellido").value.trim(),

      matricula: document.getElementById("nutricionistaMatricula").value.trim(),

      barrioId: document.getElementById("nutricionistaBarrio").value,

      estadoVerificacion: document.getElementById("nutricionistaEstado").value,

      descripcion: document
        .getElementById("nutricionistaDescripcion")
        .value.trim(),

      fotoPerfil: document.getElementById("nutricionistaFoto").value.trim(),

      direccion: document.getElementById("nutricionistaDireccion").value.trim(),

      telefono: document.getElementById("nutricionistaTelefono").value.trim(),

      tieneWhatsapp: document.getElementById("nutricionistaWhatsapp").checked,

      email: document.getElementById("nutricionistaEmail").value.trim(),

      instagram: document.getElementById("nutricionistaInstagram").value.trim(),

      sitioWeb: document.getElementById("nutricionistaSitioWeb").value.trim(),

      horario: document.getElementById("nutricionistaHorario").value.trim(),

      latitud: document.getElementById("nutricionistaLatitud").value || null,

      longitud: document.getElementById("nutricionistaLongitud").value || null,
    };

    const esNuevo = !nutricionistaId;

    const url = esNuevo
      ? API_ADMIN_NUTRICIONISTAS_CRUD
      : `${API_ADMIN_NUTRICIONISTAS_CRUD}/${nutricionistaId}`;

    const metodo = esNuevo ? "POST" : "PUT";

    try {
      const token = obtenerTokenAdmin();

      const respuesta = await fetch(url, {
        method: metodo,

        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(datos),
      });

      const resultado = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(
          resultado.mensaje || "No se pudo guardar el nutricionista",
        );
      }

      const modal = bootstrap.Modal.getInstance(modalElemento);

      modal.hide();

      await cargarNutricionistasAdmin();

      const titulo = document.getElementById("modalNutricionistaExitoTitulo");

      const mensaje = document.getElementById("modalNutricionistaExitoMensaje");

      if (esNuevo) {
        titulo.textContent = "Nutricionista creado";

        mensaje.textContent = "El nutricionista se creó correctamente.";
      } else {
        titulo.textContent = "Nutricionista actualizado";

        mensaje.textContent =
          "Los cambios del nutricionista se guardaron correctamente.";
      }

      const modalExito = bootstrap.Modal.getOrCreateInstance(
        document.getElementById("modalNutricionistaExito"),
      );

      modalExito.show();
    } catch (error) {
      console.error("Error al guardar nutricionista:", error);
    }
  });
}

function inicializarEdicionNutricionistas() {
  const tabla = document.getElementById("tablaNutricionistasAdmin");

  const modalElemento = document.getElementById("modalNutricionista");

  if (!tabla || !modalElemento) {
    return;
  }

  tabla.addEventListener("click", async (event) => {
    const botonEditar = event.target.closest(
      'button[title="Editar nutricionista"]',
    );

    if (!botonEditar) {
      return;
    }

    const nutricionistaId = Number(botonEditar.dataset.id);

    try {
      const token = obtenerTokenAdmin();

      const respuesta = await fetch(API_ADMIN_NUTRICIONISTAS_CRUD, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!respuesta.ok) {
        throw new Error("No se pudo obtener el nutricionista");
      }

      const nutricionistas = await respuesta.json();

      const nutricionista = nutricionistas.find(
        (item) => Number(item.id) === nutricionistaId,
      );

      if (!nutricionista) {
        throw new Error("Nutricionista no encontrado");
      }

      document.getElementById("nutricionistaId").value = nutricionista.id;

      document.getElementById("nutricionistaNombre").value =
        nutricionista.nombre || "";

      document.getElementById("nutricionistaApellido").value =
        nutricionista.apellido || "";

      document.getElementById("nutricionistaMatricula").value =
        nutricionista.matricula || "";

      document.getElementById("nutricionistaBarrio").value =
        nutricionista.barrioId || "";

      document.getElementById("nutricionistaEstado").value =
        nutricionista.estadoVerificacion || "pendiente";

      document.getElementById("nutricionistaDescripcion").value =
        nutricionista.descripcion || "";

      document.getElementById("nutricionistaFoto").value =
        nutricionista.fotoPerfil || "";

      document.getElementById("nutricionistaDireccion").value =
        nutricionista.direccion || "";

      document.getElementById("nutricionistaTelefono").value =
        nutricionista.telefono || "";

      document.getElementById("nutricionistaWhatsapp").checked = Boolean(
        Number(nutricionista.tieneWhatsapp),
      );

      document.getElementById("nutricionistaEmail").value =
        nutricionista.email || "";

      document.getElementById("nutricionistaInstagram").value =
        nutricionista.instagram || "";

      document.getElementById("nutricionistaSitioWeb").value =
        nutricionista.sitioWeb || "";

      document.getElementById("nutricionistaHorario").value =
        nutricionista.horario || "";

      document.getElementById("nutricionistaLatitud").value =
        nutricionista.latitud || "";

      document.getElementById("nutricionistaLongitud").value =
        nutricionista.longitud || "";

      document.getElementById("modalNutricionistaTitulo").textContent =
        "Editar nutricionista";

      document.getElementById("btnGuardarNutricionista").innerHTML = `
                    <i class="bi bi-check-lg"></i>
                    Guardar nutricionista
                `;

      const modal = bootstrap.Modal.getOrCreateInstance(modalElemento);

      modal.show();
    } catch (error) {
      console.error("Error al cargar nutricionista para editar:", error);
    }
  });
}

function inicializarEliminarNutricionista() {
  const tabla = document.getElementById("tablaNutricionistasAdmin");

  const modalElemento = document.getElementById("modalEliminarNutricionista");

  if (!tabla || !modalElemento) {
    return;
  }

  tabla.addEventListener("click", (event) => {
    const botonEliminar = event.target.closest(
      'button[title="Eliminar nutricionista"]',
    );

    if (!botonEliminar) {
      return;
    }

    const nutricionistaId = botonEliminar.dataset.id;

    const fila = botonEliminar.closest("tr");

    const nombre =
      fila.querySelector(".admin-item-name")?.textContent.trim() ||
      "este nutricionista";

    document.getElementById("nombreNutricionistaEliminar").textContent = nombre;

    const botonConfirmar = document.getElementById(
      "btnConfirmarEliminarNutricionista",
    );

    botonConfirmar.dataset.id = nutricionistaId;

    const modal = bootstrap.Modal.getOrCreateInstance(modalElemento);

    modal.show();
  });
}

function inicializarConfirmarEliminarNutricionista() {
  const botonConfirmar = document.getElementById(
    "btnConfirmarEliminarNutricionista",
  );

  const modalElemento = document.getElementById("modalEliminarNutricionista");

  if (!botonConfirmar || !modalElemento) {
    return;
  }

  botonConfirmar.addEventListener("click", async () => {
    const nutricionistaId = botonConfirmar.dataset.id;

    if (!nutricionistaId) {
      return;
    }

    try {
      const token = obtenerTokenAdmin();

      const respuesta = await fetch(
        `${API_ADMIN_NUTRICIONISTAS_CRUD}/${nutricionistaId}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const resultado = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(
          resultado.mensaje || "No se pudo eliminar el nutricionista",
        );
      }

      const modalEliminar = bootstrap.Modal.getInstance(modalElemento);

      modalEliminar.hide();

      await cargarNutricionistasAdmin();

      document.getElementById("modalNutricionistaExitoTitulo").textContent =
        "Nutricionista eliminado";

      document.getElementById("modalNutricionistaExitoMensaje").textContent =
        "El nutricionista se eliminó correctamente.";

      const modalExito = bootstrap.Modal.getOrCreateInstance(
        document.getElementById("modalNutricionistaExito"),
      );

      modalExito.show();

      botonConfirmar.dataset.id = "";
    } catch (error) {
      console.error("Error al eliminar nutricionista:", error);
    }
  });
}

// ==========================================
// INICIAR ADMIN
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  if (!verificarAccesoAdmin()) {
    return;
  }

  mostrarUsuarioPanel();
  configurarDashboardSegunRol();

  cargarComponente(
    "#admin-sidebar-placeholder",
    "../components/admin-sidebar.html",
    () => {
      configurarSidebarSegunRol();

      marcarLinkActivoAdmin();

      inicializarCerrarSesionAdmin();
    },
  );

  inicializarMenuMobileAdmin();

  inicializarModalModeracion();

  const usuarioActualAdmin = obtenerUsuarioAdmin();
  const rolActualAdmin = Number(usuarioActualAdmin?.rolId);

  // Solo el ADMIN carga estadísticas y últimas altas
  if (rolActualAdmin === 1) {
    if (typeof cargarEstadisticasDashboard === "function") {
      cargarEstadisticasDashboard();
    }

    if (typeof cargarUltimasAltas === "function") {
      cargarUltimasAltas();
    }
  }

  // Admin y Moderador pueden cargar comentarios pendientes
  cargarComentariosPendientes();

  // ==========================================
  // RESTAURANTES
  // ==========================================

  cargarRestaurantesAdmin();

  cargarOpcionesRestaurante().then(() => {
    inicializarEdicionRestaurantes();

    inicializarNuevoRestaurante();
  });

  inicializarGuardarRestaurante();

  inicializarEliminarRestaurante();

  inicializarConfirmarEliminarRestaurante();

  // LOCALES
  cargarLocalesAdmin();
  cargarOpcionesLocal();
  inicializarNuevoLocal();
  inicializarGuardarLocal();
  inicializarEdicionLocales();
  inicializarEliminarLocal();
  inicializarConfirmarEliminarLocal();

  // NUTRICIONISTAS
  cargarNutricionistasAdmin();
  cargarOpcionesNutricionista();
  inicializarNuevoNutricionista();
  inicializarGuardarNutricionista();
  inicializarEdicionNutricionistas();
  inicializarEliminarNutricionista();
  inicializarConfirmarEliminarNutricionista();

  // ==========================================
  // PRODUCTOS
  // ==========================================

  cargarProductosAdmin();

  cargarOpcionesProducto().then(() => {
    inicializarEdicionProductos();

    inicializarNuevoProducto();
  });

  inicializarGuardarProducto();

  inicializarEliminarProducto();

  inicializarConfirmarEliminarProducto();
});

// ==========================================
// NUEVO PRODUCTO - ADMIN
// ==========================================

function inicializarNuevoProducto() {
  const botonNuevo = document.getElementById("btnNuevoProducto");

  const formulario = document.getElementById("formProducto");

  const modalElemento = document.getElementById("modalProducto");

  if (!botonNuevo || !formulario || !modalElemento) {
    return;
  }

  botonNuevo.addEventListener("click", () => {
    formulario.reset();

    document.getElementById("productoId").value = "";

    document.getElementById("productoEstado").value = "pendiente";

    document.getElementById("modalProductoTitulo").textContent =
      "Nuevo producto";

    document.getElementById("btnGuardarProducto").innerHTML = `
            <i class="bi bi-check-lg"></i>
            Crear producto
        `;

    const modal = bootstrap.Modal.getOrCreateInstance(modalElemento);

    modal.show();
  });
}

// ==========================================
// MOSTRAR USUARIO DEL PANEL
// ==========================================

function mostrarUsuarioPanel() {
  const usuario = obtenerUsuarioAdmin();

  if (!usuario) {
    return;
  }

  const nombre = document.getElementById("adminUsuarioNombre");

  const rol = document.getElementById("adminUsuarioRol");

  if (!nombre || !rol) {
    return;
  }

  const rolId = Number(usuario.rolId);

  if (rolId === 1) {
    nombre.textContent = "Administrador";

    rol.textContent = "Rol: admin";
  } else if (rolId === 3) {
    nombre.textContent = "Moderador";

    rol.textContent = "Rol: moderador";
  }
}

// ==========================================
// CONFIGURAR DASHBOARD SEGÚN ROL
// ==========================================

function configurarDashboardSegunRol() {
  const usuario = obtenerUsuarioAdmin();

  if (!usuario) {
    return;
  }

  const rolId = Number(usuario.rolId);

  // ADMINISTRADOR
  // Conserva el dashboard completo
  if (rolId === 1) {
    return;
  }

  // MODERADOR
  if (rolId === 3) {
    const encabezadoAdmin = document.getElementById("dashboardAdminHead");

    const metricasAdmin = document.getElementById("dashboardAdminMetricas");

    const altasAdmin = document.getElementById("dashboardAdminAltas");

    const encabezadoModerador = document.getElementById(
      "dashboardModeradorHead",
    );

    const panelModeracion = document.getElementById("dashboardModeracion");

    if (encabezadoAdmin) {
      encabezadoAdmin.classList.add("d-none");
    }

    if (metricasAdmin) {
      metricasAdmin.classList.add("d-none");
    }

    if (altasAdmin) {
      altasAdmin.classList.add("d-none");
    }

    if (encabezadoModerador) {
      encabezadoModerador.classList.remove("d-none");

      if (panelModeracion) {
        panelModeracion.classList.remove("col-xl-4");

        panelModeracion.classList.add("col-xl-12");
      }
    }
  }
}

// ==========================================
// CONFIGURAR SIDEBAR SEGÚN ROL
// ==========================================

function configurarSidebarSegunRol() {
  const usuario = obtenerUsuarioAdmin();

  if (!usuario) {
    return;
  }

  const rolId = Number(usuario.rolId);

  // ADMINISTRADOR
  if (rolId === 1) {
    return;
  }

  // MODERADOR
  if (rolId === 3) {
    const enlacesPermitidos = ["index.html"];

    document.querySelectorAll(".admin-nav-link[data-page]").forEach((link) => {
      if (!enlacesPermitidos.includes(link.dataset.page)) {
        link.classList.add("d-none");
      }
    });

    // Ocultar títulos de secciones
    document.querySelectorAll(".admin-nav-label").forEach((label) => {
      if (
        label.textContent.trim() === "Catálogo" ||
        label.textContent.trim() === "Administración"
      ) {
        label.classList.add("d-none");
      }
    });
  }
}

// ==========================================
// MARCAR LINK ACTIVO
// ==========================================

function marcarLinkActivoAdmin() {
  const paginaActual =
    window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".admin-nav-link[data-page]").forEach((link) => {
    link.classList.toggle("active", link.dataset.page === paginaActual);
  });
}

// ==========================================
// MENÚ MOBILE
// ==========================================

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

// ==========================================
// CERRAR SESIÓN ADMIN
// ==========================================

function inicializarCerrarSesionAdmin() {
  const botonCerrarSesion = document.getElementById("adminCerrarSesion");

  if (!botonCerrarSesion) {
    return;
  }

  botonCerrarSesion.addEventListener("click", (evento) => {
    evento.preventDefault();

    limpiarSesionAdmin();

    window.location.replace("../login.html");
  });
}

// ==========================================
// GENERAR INICIALES
// ==========================================

function generarIniciales(nombre, apellido) {
  const inicialNombre = nombre ? nombre.charAt(0) : "";

  const inicialApellido = apellido ? apellido.charAt(0) : "";

  return (inicialNombre + inicialApellido).toUpperCase();
}

// ==========================================
// PETICIÓN ADMIN
// ==========================================

async function obtenerComentariosAPI(url, token) {
  const respuesta = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // SESIÓN VENCIDA
  if (respuesta.status === 401) {
    limpiarSesionAdmin();

    window.location.replace("../login.html");

    throw new Error("Sesión vencida");
  }

  // SIN PERMISOS
  if (respuesta.status === 403) {
    window.location.replace("../index.html");

    throw new Error("Sin permisos");
  }

  if (!respuesta.ok) {
    throw new Error("No se pudieron obtener los comentarios");
  }

  return await respuesta.json();
}

// ==========================================
// CARGAR COMENTARIOS PENDIENTES
// PRODUCTOS + RESTAURANTES
// ==========================================

async function cargarComentariosPendientes() {
  const contenedor = document.getElementById("comentarios-pendientes");

  if (!contenedor) {
    return;
  }

  const token = obtenerTokenAdmin();

  if (!token) {
    limpiarSesionAdmin();

    window.location.replace("../login.html");

    return;
  }

  contenedor.innerHTML = `
        <div class="p-4 text-muted">
            Cargando comentarios pendientes...
        </div>
    `;

  try {
    const [
      comentariosProductos,
      comentariosRestaurantes,
      comentariosLocales,
      comentariosNutricionistas,
    ] = await Promise.all([
      obtenerComentariosAPI(API_ADMIN_PRODUCTOS, token),

      obtenerComentariosAPI(API_ADMIN_RESTAURANTES_COMENTARIOS, token),

      obtenerComentariosAPI(API_ADMIN_LOCALES, token),

      obtenerComentariosAPI(API_ADMIN_NUTRICIONISTAS, token),
    ]);

    // AGREGAMOS EL TIPO A CADA COMENTARIO

    const productos = comentariosProductos.map((comentario) => ({
      ...comentario,
      tipoComentario: "producto",
    }));

    const restaurantes = comentariosRestaurantes.map((comentario) => ({
      ...comentario,
      tipoComentario: "restaurante",
    }));

    const locales = comentariosLocales.map((comentario) => ({
      ...comentario,
      tipoComentario: "local",
    }));

    const nutricionistas = comentariosNutricionistas.map((comentario) => ({
      ...comentario,
      tipoComentario: "nutricionista",
    }));

    const comentarios = [
      ...productos,
      ...restaurantes,
      ...locales,
      ...nutricionistas,
    ];

    // ORDENAR POR FECHA MÁS RECIENTE

    comentarios.sort(
      (a, b) => new Date(b.fechaComentario) - new Date(a.fechaComentario),
    );

    contenedor.innerHTML = "";

    actualizarContadorComentarios(comentarios.length);

    // ==================================
    // SIN PENDIENTES
    // ==================================

    if (comentarios.length === 0) {
      contenedor.innerHTML = `
                <div class="p-4 text-muted">
                    No hay comentarios pendientes de moderación.
                </div>
            `;

      return;
    }

    // ==================================
    // MOSTRAR COMENTARIOS
    // ==================================

    comentarios.forEach((comentario) => {
      const item = document.createElement("div");

      item.className = "mod-item";

      const iniciales = generarIniciales(
        comentario.usuarioNombre,
        comentario.usuarioApellido,
      );

      const nombreUsuario = `${comentario.usuarioNombre} ${comentario.usuarioApellido}`;

      let destino = "";
      let etiquetaTipo = "";

      // PRODUCTO
      if (comentario.tipoComentario === "producto") {
        destino = comentario.marca
          ? `${comentario.productoNombre} · ${comentario.marca}`
          : comentario.productoNombre;

        etiquetaTipo = "Producto";
      }

      // RESTAURANTE
      if (comentario.tipoComentario === "restaurante") {
        destino = comentario.restauranteNombre;

        etiquetaTipo = "Restaurante";
        // LOCAL
        if (comentario.tipoComentario === "local") {
          destino = comentario.localNombre;

          etiquetaTipo = "Local";
        }

        // NUTRICIONISTA
        if (comentario.tipoComentario === "nutricionista") {
          destino = comentario.nutricionistaNombre;

          etiquetaTipo = "Nutricionista";
        }
      }

      item.innerHTML = `

                    <div class="mod-head">

                        <span class="mod-avatar">
                            ${iniciales}
                        </span>


                        <div class="mod-who">

                            <strong>
                                ${nombreUsuario}
                            </strong>

                            <span>
                                ${etiquetaTipo}: ${destino}
                            </span>

                        </div>


                        <span class="mod-stars">

                            <i class="bi bi-star-fill"></i>

                            ${comentario.calificacion}

                        </span>

                    </div>


                    ${
                      comentario.titulo
                        ? `
                                <strong class="d-block mb-1">
                                    ${comentario.titulo}
                                </strong>
                            `
                        : ""
                    }


                    <p class="mod-text">
                        ${comentario.comentario}
                    </p>


                    <div class="mod-actions">

                        <button
                            type="button"
                            class="mod-btn"
                            data-comentario-id="${comentario.id}"
                            data-estado="aprobado"
                            data-tipo="${comentario.tipoComentario}"
                        >

                            <i class="bi bi-check-lg"></i>

                            Aprobar

                        </button>


                        <button
                            type="button"
                            class="mod-btn reject"
                            data-comentario-id="${comentario.id}"
                            data-estado="rechazado"
                            data-tipo="${comentario.tipoComentario}"
                        >

                            <i class="bi bi-x-lg"></i>

                            Rechazar

                        </button>

                    </div>
                `;

      const botones = item.querySelectorAll("[data-comentario-id]");

      botones.forEach((boton) => {
        boton.addEventListener("click", () => {
          abrirModalModeracion(
            Number(boton.dataset.comentarioId),
            boton.dataset.estado,
            boton.dataset.tipo,
          );
        });
      });

      contenedor.appendChild(item);
    });
  } catch (error) {
    console.error("Error al cargar comentarios pendientes:", error);

    contenedor.innerHTML = `
            <div class="p-4 text-danger">
                No se pudieron cargar los comentarios pendientes.
            </div>
        `;
  }
}

// ==========================================
// ACTUALIZAR CONTADOR
// ==========================================

function actualizarContadorComentarios(cantidad) {
  const contadorPanel = document.querySelector(
    ".admin-panel-title .admin-count",
  );

  if (contadorPanel) {
    contadorPanel.textContent = cantidad;
  }

  const contadorSidebar = document.getElementById("adminComentariosCount");

  if (contadorSidebar) {
    contadorSidebar.textContent = cantidad;
  }
}

// ==========================================
// INICIALIZAR MODAL
// ==========================================

function inicializarModalModeracion() {
  const botonConfirmar = document.getElementById("btnConfirmarModeracion");

  if (!botonConfirmar) {
    return;
  }

  botonConfirmar.addEventListener("click", confirmarModeracion);
}

// ==========================================
// ABRIR MODAL
// ==========================================

function abrirModalModeracion(comentarioId, estado, tipo) {
  comentarioSeleccionado = comentarioId;

  estadoSeleccionado = estado;

  tipoComentarioSeleccionado = tipo;

  const titulo = document.getElementById("modalModeracionTitulo");

  const pregunta = document.getElementById("modalModeracionPregunta");

  const botonConfirmar = document.getElementById("btnConfirmarModeracion");

  const icono = document.getElementById("modalModeracionIcono");

  if (estado === "aprobado") {
    titulo.textContent = "Aprobar comentario";

    pregunta.textContent = "¿Confirmás que querés aprobar esta opinión?";

    botonConfirmar.textContent = "Aprobar";

    botonConfirmar.className = "btn btn-success";

    icono.className = "bi bi-check-circle fs-5 text-success";
  } else {
    titulo.textContent = "Rechazar comentario";

    pregunta.textContent = "¿Confirmás que querés rechazar esta opinión?";

    botonConfirmar.textContent = "Rechazar";

    botonConfirmar.className = "btn btn-danger";

    icono.className = "bi bi-x-circle fs-5 text-danger";
  }

  const elementoModal = document.getElementById("modalModeracion");

  const modal = bootstrap.Modal.getOrCreateInstance(elementoModal);

  modal.show();
}

// ==========================================
// CONFIRMAR MODERACIÓN
// ==========================================

async function confirmarModeracion() {
  if (
    !comentarioSeleccionado ||
    !estadoSeleccionado ||
    !tipoComentarioSeleccionado
  ) {
    return;
  }

  const token = obtenerTokenAdmin();

  const boton = document.getElementById("btnConfirmarModeracion");

  if (!token) {
    limpiarSesionAdmin();

    window.location.replace("../login.html");

    return;
  }

  let apiModeracion = "";

  if (tipoComentarioSeleccionado === "producto") {
    apiModeracion = API_ADMIN_PRODUCTOS;
  } else if (tipoComentarioSeleccionado === "restaurante") {
    apiModeracion = API_ADMIN_RESTAURANTES_COMENTARIOS;
  } else if (tipoComentarioSeleccionado === "local") {
    apiModeracion = API_ADMIN_LOCALES;
  } else if (tipoComentarioSeleccionado === "nutricionista") {
    apiModeracion = API_ADMIN_NUTRICIONISTAS;
  } else {
    return;
  }

  boton.disabled = true;

  boton.innerHTML = `
        <span
            class="spinner-border spinner-border-sm me-2"
            aria-hidden="true"
        ></span>
        Procesando...
    `;

  try {
    const respuesta = await fetch(
      `${apiModeracion}/${comentarioSeleccionado}`,
      {
        method: "PATCH",

        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          estado: estadoSeleccionado,
        }),
      },
    );

    const datos = await respuesta.json();

    // SESIÓN VENCIDA
    if (respuesta.status === 401) {
      limpiarSesionAdmin();

      window.location.replace("../login.html");

      return;
    }

    // SIN PERMISOS
    if (respuesta.status === 403) {
      window.location.replace("../index.html");

      return;
    }

    if (!respuesta.ok) {
      mostrarMensajeModeracion(
        datos.mensaje || "No se pudo moderar el comentario.",
        "danger",
      );

      return;
    }

    // ==================================
    // CERRAR MODAL
    // ==================================

    const elementoModal = document.getElementById("modalModeracion");

    const modal = bootstrap.Modal.getInstance(elementoModal);

    if (modal) {
      modal.hide();
    }

    // ==================================
    // MOSTRAR ÉXITO
    // ==================================

    mostrarMensajeModeracion(datos.mensaje, "success");

    // ==================================
    // RECARGAR PRODUCTOS + RESTAURANTES
    // ==================================

    await cargarComentariosPendientes();

    comentarioSeleccionado = null;
    estadoSeleccionado = null;
    tipoComentarioSeleccionado = null;
  } catch (error) {
    console.error("Error al moderar comentario:", error);

    mostrarMensajeModeracion("No se pudo conectar con el servidor.", "danger");
  } finally {
    boton.disabled = false;
  }
}

// ==========================================
// MENSAJE DE MODERACIÓN
// ==========================================

function mostrarMensajeModeracion(texto, tipo) {
  const contenedor = document.getElementById("mensajeModeracion");

  if (!contenedor) {
    return;
  }

  contenedor.innerHTML = `
        <div
            class="alert alert-${tipo} alert-dismissible fade show shadow"
            role="alert"
        >
            ${texto}

            <button
                type="button"
                class="btn-close"
                data-bs-dismiss="alert"
                aria-label="Cerrar"
            ></button>
        </div>
    `;

  setTimeout(() => {
    contenedor.innerHTML = "";
  }, 4000);
}

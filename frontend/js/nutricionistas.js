// ==========================================
// CELIACONNECT - NUTRICIONISTAS
// ==========================================

const API_NUTRICIONISTAS = "https://celiaconnect-production.up.railway.app/api/nutricionistas";

let nutricionistas = [];
let nutricionistasFiltrados = [];
let nutricionistasFavoritos = [];

let paginaActual = 1;
const porPagina = 9;

// ==========================================
// ELEMENTOS DEL DOM
// ==========================================

const contenedor = document.getElementById("nutricionistas-container");

const contador = document.getElementById("nutricionistas-count");

const paginacion = document.getElementById("nutricionistas-paginacion");

const buscador = document.getElementById("buscar-nutricionista");

const filtroBarrio = document.getElementById("filtro-barrio");

const filtroBarrioMobile = document.getElementById("filtro-barrio-mobile");

const orden = document.getElementById("orden-nutricionistas");

// ==========================================
// CARGAR NUTRICIONISTAS
// ==========================================

async function cargarNutricionistas() {
  try {
    const respuesta = await fetch(API_NUTRICIONISTAS);

    if (!respuesta.ok) {
      throw new Error("No se pudieron obtener los nutricionistas");
    }

    nutricionistas = await respuesta.json();

    // ======================================
    // CARGAR FAVORITOS DEL USUARIO
    // ======================================

    const token =
      localStorage.getItem("celiaToken") ||
      sessionStorage.getItem("celiaToken");

    nutricionistasFavoritos = [];

    if (token) {
      const respuestaFavoritos = await fetch(
        `${API_NUTRICIONISTAS}/favoritos`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (respuestaFavoritos.ok) {
        const favoritos = await respuestaFavoritos.json();

        nutricionistasFavoritos = favoritos.map((favorito) =>
          Number(favorito.nutricionistaId),
        );
      }
    }

    nutricionistasFiltrados = [...nutricionistas];

    aplicarFiltros();
  } catch (error) {
    console.error("Error al cargar nutricionistas:", error);

    contador.textContent = "No se pudieron cargar los nutricionistas";

    contenedor.innerHTML = `
            <div class="col-12">
                <div class="alert alert-warning">
                    No pudimos cargar los nutricionistas.
                </div>
            </div>
        `;
  }
}

// ==========================================
// APLICAR FILTROS
// ==========================================

function aplicarFiltros() {
  const texto = buscador.value.trim().toLowerCase();

  const barrio = filtroBarrio.value || filtroBarrioMobile.value;

  nutricionistasFiltrados = nutricionistas.filter((nutricionista) => {
    const nombreCompleto =
      `${nutricionista.nombre} ${nutricionista.apellido}`.toLowerCase();

    const descripcion = (nutricionista.descripcion || "").toLowerCase();

    const barrioNutricionista = (nutricionista.barrio || "").toLowerCase();

    const coincideTexto =
      !texto ||
      nombreCompleto.includes(texto) ||
      descripcion.includes(texto) ||
      barrioNutricionista.includes(texto);

    const coincideBarrio = !barrio || nutricionista.barrio === barrio;

    return coincideTexto && coincideBarrio;
  });

  ordenarNutricionistas();

  paginaActual = 1;

  mostrarNutricionistas();
}

// ==========================================
// ORDENAR
// ==========================================

function ordenarNutricionistas() {
  const tipoOrden = orden.value;

  if (tipoOrden === "calificacion") {
    nutricionistasFiltrados.sort(
      (a, b) =>
        Number(b.calificacionPromedio || 0) -
        Number(a.calificacionPromedio || 0),
    );
  } else if (tipoOrden === "nombre") {
    nutricionistasFiltrados.sort((a, b) =>
      `${a.nombre} ${a.apellido}`.localeCompare(
        `${b.nombre} ${b.apellido}`,
        "es",
      ),
    );
  } else {
    nutricionistasFiltrados.sort(
      (a, b) => Number(b.cantidadResenas || 0) - Number(a.cantidadResenas || 0),
    );
  }
}

// ==========================================
// MOSTRAR NUTRICIONISTAS
// ==========================================

function mostrarNutricionistas() {
  contenedor.innerHTML = "";

  const total = nutricionistasFiltrados.length;

  contador.textContent =
    total === 1
      ? "1 nutricionista encontrado"
      : `${total} nutricionistas encontrados`;

  if (total === 0) {
    contenedor.innerHTML = `
            <div class="col-12">
                <div class="alert alert-light border">
                    No encontramos nutricionistas con esos filtros.
                </div>
            </div>
        `;

    paginacion.innerHTML = "";

    return;
  }

  const inicio = (paginaActual - 1) * porPagina;

  const fin = inicio + porPagina;

  const pagina = nutricionistasFiltrados.slice(inicio, fin);

  pagina.forEach((nutricionista) => {
    const columna = document.createElement("div");

    columna.className = "col-md-6 col-xl-4";

    const promedio = Number(nutricionista.calificacionPromedio || 0);

    const cantidad = Number(nutricionista.cantidadResenas || 0);

    const foto = nutricionista.fotoPerfil
      ? nutricionista.fotoPerfil
      : "assets/img/nutricionista-placeholder.png";

    const esFavorito = nutricionistasFavoritos.includes(
      Number(nutricionista.id),
    );

    columna.innerHTML = `

            <div
                class="card h-100 shadow-sm border-0 position-relative"
            >

                <button
                    class="nutricionista-fav"
                    type="button"
                    data-nutricionista-id="${nutricionista.id}"
                    aria-label="${
                      esFavorito
                        ? `Quitar ${nutricionista.nombre} ${nutricionista.apellido} de favoritos`
                        : `Agregar ${nutricionista.nombre} ${nutricionista.apellido} a favoritos`
                    }"
                >
                    <i
                        class="bi ${esFavorito ? "bi-heart-fill" : "bi-heart"}"
                    ></i>
                </button>


                <img
                    src="${foto}"
                    class="card-img-top"
                    alt="${nutricionista.nombre} ${nutricionista.apellido}"
                    style="height: 400px; object-fit: cover;"
                    onerror="this.style.display='none'"
                >


                <div class="card-body d-flex flex-column">

                    <span
    class="badge bg-success text-white align-self-start mb-2"
>
    Profesional verificado
</span>


                    <h5 class="card-title fw-bold">
                        ${nutricionista.nombre}
                        ${nutricionista.apellido}
                    </h5>


                    <p class="text-muted small mb-2">
                        <i class="bi bi-geo-alt"></i>
                        ${nutricionista.barrio || "Buenos Aires"}
                    </p>


                    <p class="card-text text-muted">
                        ${
                          nutricionista.descripcion ||
                          "Profesional de nutrición."
                        }
                    </p>


                    <div class="mt-auto">

                        <div class="mb-3">

                            <span class="text-warning">
                                ${generarEstrellas(promedio)}
                            </span>

                            <span class="small text-muted ms-1">
                                ${promedio.toFixed(1)}
                                (${cantidad})
                            </span>

                        </div>


                        <a
                            href="nutricionista-detalle.html?id=${nutricionista.id}"
                            class="btn btn-outline-success w-100"
                        >
                            Ver perfil
                        </a>

                    </div>

                </div>

            </div>
        `;

    contenedor.appendChild(columna);
  });

  // ======================================
  // FAVORITOS DE NUTRICIONISTAS
  // ======================================

  const botonesFavoritos = contenedor.querySelectorAll(".nutricionista-fav");

  botonesFavoritos.forEach((boton) => {
    boton.addEventListener("click", async (evento) => {
      evento.preventDefault();
      evento.stopPropagation();

      const nutricionistaId = Number(boton.dataset.nutricionistaId);

      const token =
        localStorage.getItem("celiaToken") ||
        sessionStorage.getItem("celiaToken");

      if (!token) {
        window.location.href = "login.html";

        return;
      }

      const esFavorito = nutricionistasFavoritos.includes(nutricionistaId);

      try {
        const respuesta = await fetch(
          `${API_NUTRICIONISTAS}/${nutricionistaId}/favorito`,
          {
            method: esFavorito ? "DELETE" : "POST",

            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const datos = await respuesta.json();

        if (!respuesta.ok) {
          throw new Error(datos.mensaje || "No se pudo actualizar el favorito");
        }

        const icono = boton.querySelector("i");

        if (esFavorito) {
          nutricionistasFavoritos = nutricionistasFavoritos.filter(
            (id) => id !== nutricionistaId,
          );

          icono.classList.remove("bi-heart-fill");

          icono.classList.add("bi-heart");

          boton.setAttribute("aria-label", "Agregar nutricionista a favoritos");
        } else {
          nutricionistasFavoritos.push(nutricionistaId);

          icono.classList.remove("bi-heart");

          icono.classList.add("bi-heart-fill");

          boton.setAttribute("aria-label", "Quitar nutricionista de favoritos");
        }
      } catch (error) {
        console.error("Error al actualizar favorito de nutricionista:", error);
      }
    });
  });

  mostrarPaginacion();
}

// ==========================================
// ESTRELLAS
// ==========================================

function generarEstrellas(calificacion) {
  const estrellasLlenas = Math.round(calificacion);

  let estrellas = "";

  for (let i = 1; i <= 5; i++) {
    if (i <= estrellasLlenas) {
      estrellas += '<i class="bi bi-star-fill"></i>';
    } else {
      estrellas += '<i class="bi bi-star"></i>';
    }
  }

  return estrellas;
}

// ==========================================
// PAGINACIÓN
// ==========================================

function mostrarPaginacion() {
  paginacion.innerHTML = "";

  const totalPaginas = Math.ceil(nutricionistasFiltrados.length / porPagina);

  if (totalPaginas <= 1) {
    return;
  }

  for (let pagina = 1; pagina <= totalPaginas; pagina++) {
    const item = document.createElement("li");

    item.className = `page-item ${pagina === paginaActual ? "active" : ""}`;

    item.innerHTML = `
            <button
                class="page-link"
                type="button"
            >
                ${pagina}
            </button>
        `;

    item.addEventListener("click", () => {
      paginaActual = pagina;

      mostrarNutricionistas();

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

    paginacion.appendChild(item);
  }
}

// ==========================================
// EVENTOS
// ==========================================

buscador.addEventListener("input", aplicarFiltros);

orden.addEventListener("change", aplicarFiltros);

document
  .getElementById("btn-aplicar-filtros-nutricionistas")
  .addEventListener("click", aplicarFiltros);

document
  .getElementById("btn-limpiar-filtros-nutricionistas")
  .addEventListener("click", () => {
    filtroBarrio.value = "";
    filtroBarrioMobile.value = "";
    buscador.value = "";
    orden.value = "relevantes";

    aplicarFiltros();
  });

document
  .getElementById("btn-aplicar-filtros-nutricionistas-mobile")
  .addEventListener("click", () => {
    filtroBarrio.value = filtroBarrioMobile.value;

    aplicarFiltros();
  });

document
  .getElementById("btn-limpiar-filtros-nutricionistas-mobile")
  .addEventListener("click", () => {
    filtroBarrio.value = "";
    filtroBarrioMobile.value = "";
    buscador.value = "";
    orden.value = "relevantes";

    aplicarFiltros();
  });

// ==========================================
// INICIO
// ==========================================

cargarNutricionistas();

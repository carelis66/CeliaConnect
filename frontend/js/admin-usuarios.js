// ==========================================
// CELIACONNECT - ADMIN USUARIOS
// ==========================================

const API_ADMIN_USUARIOS =
    'https://celiaconnect-production.up.railway.app/api/admin/usuarios';


// ==========================================
// OBTENER TOKEN
// ==========================================

function obtenerTokenAdminUsuarios() {

    return (
        localStorage.getItem('celiaToken') ||
        sessionStorage.getItem('celiaToken')
    );

}


// ==========================================
// CARGAR USUARIOS
// ==========================================

async function cargarUsuariosAdmin() {

    const tabla =
        document.getElementById('tablaUsuariosAdmin');


    if (!tabla) {
        return;
    }


    const token =
        obtenerTokenAdminUsuarios();


    if (!token) {

        tabla.innerHTML = `
            <tr>
                <td colspan="5" class="text-center py-4 text-danger">
                    No hay una sesión iniciada.
                </td>
            </tr>
        `;

        return;
    }


    try {

        const respuesta =
            await fetch(
                API_ADMIN_USUARIOS,
                {
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
                'No se pudieron obtener los usuarios'
            );

        }


        mostrarUsuariosAdmin(datos);


    } catch (error) {

        console.error(
            'Error al cargar usuarios:',
            error
        );


        tabla.innerHTML = `
            <tr>
                <td colspan="5" class="text-center py-4 text-danger">
                    ${error.message}
                </td>
            </tr>
        `;

    }

}


// ==========================================
// MOSTRAR USUARIOS
// ==========================================

function mostrarUsuariosAdmin(usuarios) {

    const tabla =
        document.getElementById('tablaUsuariosAdmin');


    if (!tabla) {
        return;
    }


    if (!usuarios.length) {

        tabla.innerHTML = `
            <tr>
                <td colspan="5" class="text-center py-4 text-muted">
                    No hay usuarios registrados.
                </td>
            </tr>
        `;

        return;
    }


    tabla.innerHTML =
        usuarios.map(usuario => {

            const nombreCompleto =
                `${usuario.nombre} ${usuario.apellido}`;


            // ======================================
            // ROL
            // ======================================

            let claseRol =
                'role-user';

            let nombreRol =
                'Usuario';


            if (usuario.rol === 'moderador') {

                claseRol =
                    'role-moderator';

                nombreRol =
                    'Moderador';

            }


            if (usuario.rol === 'admin') {

                claseRol =
                    'role-admin';

                nombreRol =
                    'Administrador';

            }


            // ======================================
            // ESTADO DE CUENTA
            // ======================================

            const cuentaActiva =
                Number(usuario.esActivo) === 1;


            const estadoCuenta =
                cuentaActiva
                    ? `
                        <span class="account-pill account-active">
                            <i class="bi bi-check-circle"></i>
                            Activa
                        </span>
                    `
                    : `
                        <span class="account-pill account-inactive">
                            <i class="bi bi-pause-circle"></i>
                            Inactiva
                        </span>
                    `;


            // ======================================
            // FILA
            // ======================================

            return `
                <tr>

                    <td>

                        <div class="fw-semibold">
                            ${nombreCompleto}
                        </div>

                        <small class="text-muted">
                            DNI: ${usuario.documento || 'Sin documento'}
                        </small>

                    </td>


                    <td>
                        ${usuario.email}
                    </td>


                    <td>

                        <span class="role-pill ${claseRol}">
                            ${nombreRol}
                        </span>

                    </td>


                    <td>
                        ${estadoCuenta}
                    </td>


                    <td class="text-end">

                        <button
                            type="button"
                            class="btn btn-sm btn-outline-secondary"
                            title="Editar usuario"
                            data-id="${usuario.id}"
                        >
                            <i class="bi bi-pencil"></i>
                        </button>

                    </td>

                </tr>
            `;

        }).join('');

}


// ==========================================
// NUEVO USUARIO
// ==========================================

function inicializarNuevoUsuario() {

    const boton =
        document.getElementById('btnNuevoUsuario');

    const formulario =
        document.getElementById('formUsuario');

    const titulo =
        document.getElementById('modalUsuarioTitulo');

    const usuarioId =
        document.getElementById('usuarioId');

    const password =
        document.getElementById('usuarioPassword');

    const confirmarPassword =
        document.getElementById('usuarioConfirmarPassword');


    if (
        !boton ||
        !formulario
    ) {
        return;
    }


    boton.addEventListener(
        'click',
        () => {

            formulario.reset();

            usuarioId.value = '';


            document.getElementById(
                'usuarioRol'
            ).value = '2';


            document.getElementById(
                'usuarioActivo'
            ).checked = true;


            password.required = true;
            confirmarPassword.required = true;

            document.getElementById(
    'grupoPasswordUsuario'
).style.display = '';

document.getElementById(
    'grupoConfirmarPasswordUsuario'
).style.display = '';


            titulo.textContent =
                'Nuevo usuario';


            const modal =
                bootstrap.Modal.getOrCreateInstance(
                    document.getElementById(
                        'modalUsuario'
                    )
                );


            modal.show();

        }
    );

}

// ==========================================
// GUARDAR USUARIO - CREAR / EDITAR
// ==========================================

function inicializarGuardarUsuario() {

    const formulario =
        document.getElementById('formUsuario');


    if (!formulario) {
        return;
    }


    formulario.addEventListener(
        'submit',
        async (event) => {

            event.preventDefault();


            const usuarioId =
                document.getElementById(
                    'usuarioId'
                ).value;


            const esEdicion =
                usuarioId !== '';


            const password =
                document.getElementById(
                    'usuarioPassword'
                ).value;


            const confirmarPassword =
                document.getElementById(
                    'usuarioConfirmarPassword'
                ).value;


            // ==========================================
            // VALIDAR CONTRASEÑAS SOLO AL CREAR
            // ==========================================

            if (!esEdicion) {

                if (!password) {

                    mostrarResultadoUsuario(
                        'No se pudo guardar',
                        'Ingresá una contraseña.',
                        false
                    );

                    return;
                }


                if (password !== confirmarPassword) {

                    mostrarResultadoUsuario(
                        'No se pudo guardar',
                        'Las contraseñas no coinciden.',
                        false
                    );

                    return;
                }

            }


            // ==========================================
            // DATOS COMUNES
            // ==========================================

            const datos = {

                nombre:
                    document.getElementById(
                        'usuarioNombre'
                    ).value.trim(),

                apellido:
                    document.getElementById(
                        'usuarioApellido'
                    ).value.trim(),

                documento:
                    document.getElementById(
                        'usuarioDocumento'
                    ).value.trim(),

                email:
                    document.getElementById(
                        'usuarioEmail'
                    ).value.trim(),

                telefono:
                    document.getElementById(
                        'usuarioTelefono'
                    ).value.trim(),

                fechaNacimiento:
                    document.getElementById(
                        'usuarioFechaNacimiento'
                    ).value || null,

                genero:
                    document.getElementById(
                        'usuarioGenero'
                    ).value || null,

                rolId:
                    Number(
                        document.getElementById(
                            'usuarioRol'
                        ).value
                    ),

                esActivo:
                    document.getElementById(
                        'usuarioActivo'
                    ).checked
                        ? 1
                        : 0

            };


            // CONTRASEÑA SOLO AL CREAR
            if (!esEdicion) {
                datos.password = password;
            }


            const token =
                obtenerTokenAdminUsuarios();


            if (!token) {

                mostrarResultadoUsuario(
                    'Sesión no disponible',
                    'Debés iniciar sesión nuevamente.',
                    false
                );

                return;
            }


            // ==========================================
            // DEFINIR POST O PUT
            // ==========================================

            const url =
                esEdicion
                    ? `${API_ADMIN_USUARIOS}/${usuarioId}`
                    : API_ADMIN_USUARIOS;


            const metodo =
                esEdicion
                    ? 'PUT'
                    : 'POST';


            try {

                const respuesta =
                    await fetch(
                        url,
                        {
                            method: metodo,

                            headers: {
                                'Content-Type':
                                    'application/json',

                                Authorization:
                                    `Bearer ${token}`
                            },

                            body:
                                JSON.stringify(datos)
                        }
                    );


                const resultado =
                    await respuesta.json();


                if (!respuesta.ok) {

                    throw new Error(
                        resultado.mensaje ||
                        (
                            esEdicion
                                ? 'No se pudo actualizar el usuario'
                                : 'No se pudo crear el usuario'
                        )
                    );

                }


                // CERRAR MODAL
                const modalUsuario =
                    bootstrap.Modal.getInstance(
                        document.getElementById(
                            'modalUsuario'
                        )
                    );


                if (modalUsuario) {
                    modalUsuario.hide();
                }


                // RECARGAR TABLA
                await cargarUsuariosAdmin();


                // CONFIRMACIÓN
                mostrarResultadoUsuario(
                    esEdicion
                        ? 'Usuario actualizado'
                        : 'Usuario creado',

                    esEdicion
                        ? 'Los datos del usuario se actualizaron correctamente.'
                        : 'El usuario se creó correctamente.',

                    true
                );


            } catch (error) {

                console.error(
                    esEdicion
                        ? 'Error al actualizar usuario:'
                        : 'Error al crear usuario:',
                    error
                );


                mostrarResultadoUsuario(
                    'No se pudo guardar',
                    error.message,
                    false
                );

            }

        }
    );

}

// ==========================================
// MOSTRAR MODAL DE RESULTADO
// ==========================================

function mostrarResultadoUsuario(
    titulo,
    mensaje,
    exito = true
) {

    const tituloModal =
        document.getElementById(
            'modalUsuarioExitoTitulo'
        );

    const mensajeModal =
        document.getElementById(
            'modalUsuarioExitoMensaje'
        );

    const modalElemento =
        document.getElementById(
            'modalUsuarioExito'
        );


    if (
        !tituloModal ||
        !mensajeModal ||
        !modalElemento
    ) {
        return;
    }


    tituloModal.textContent =
        titulo;


    mensajeModal.textContent =
        mensaje;


    // CAMBIAR ÍCONO SEGÚN RESULTADO
    const icono =
        modalElemento.querySelector(
            '.modal-body i'
        );


    if (icono) {

        if (exito) {

            icono.className =
                'bi bi-check-circle-fill text-success';

        } else {

            icono.className =
                'bi bi-exclamation-circle-fill text-danger';

        }

    }


    const modal =
        bootstrap.Modal.getOrCreateInstance(
            modalElemento
        );


    modal.show();

}

// ==========================================
// EDITAR USUARIO - ABRIR MODAL
// ==========================================

function inicializarEdicionUsuarios() {

    const tabla =
        document.getElementById('tablaUsuariosAdmin');


    if (!tabla) {
        return;
    }


    tabla.addEventListener(
        'click',
        async (event) => {

            const boton =
                event.target.closest(
                    'button[data-id]'
                );


            if (!boton) {
                return;
            }


            const usuarioId =
                Number(boton.dataset.id);


            const token =
                obtenerTokenAdminUsuarios();


            try {

                const respuesta =
                    await fetch(
                        API_ADMIN_USUARIOS,
                        {
                            headers: {
                                Authorization:
                                    `Bearer ${token}`
                            }
                        }
                    );


                const usuarios =
                    await respuesta.json();


                if (!respuesta.ok) {

                    throw new Error(
                        usuarios.mensaje ||
                        'No se pudo obtener el usuario'
                    );

                }


                const usuario =
                    usuarios.find(
                        item =>
                            Number(item.id) === usuarioId
                    );


                if (!usuario) {

                    throw new Error(
                        'No se encontró el usuario'
                    );

                }


                // ID
                document.getElementById(
                    'usuarioId'
                ).value = usuario.id;


                // NOMBRE
                document.getElementById(
                    'usuarioNombre'
                ).value = usuario.nombre || '';


                // APELLIDO
                document.getElementById(
                    'usuarioApellido'
                ).value = usuario.apellido || '';


                // DOCUMENTO
                document.getElementById(
                    'usuarioDocumento'
                ).value = usuario.documento || '';


                // EMAIL
                document.getElementById(
                    'usuarioEmail'
                ).value = usuario.email || '';


                // TELÉFONO
                document.getElementById(
                    'usuarioTelefono'
                ).value = usuario.telefono || '';


                // FECHA DE NACIMIENTO
                document.getElementById(
                    'usuarioFechaNacimiento'
                ).value =
                    usuario.fechaNacimiento
                        ? String(
                            usuario.fechaNacimiento
                        ).substring(0, 10)
                        : '';


                // GÉNERO
                document.getElementById(
                    'usuarioGenero'
                ).value = usuario.genero || '';


                // ROL
                document.getElementById(
                    'usuarioRol'
                ).value =
                    String(usuario.rolId);


                // ESTADO
                document.getElementById(
                    'usuarioActivo'
                ).checked =
                    Number(usuario.esActivo) === 1;


                // CONTRASEÑAS
                const password =
                    document.getElementById(
                        'usuarioPassword'
                    );

                const confirmarPassword =
                    document.getElementById(
                        'usuarioConfirmarPassword'
                    );


                password.value = '';
                confirmarPassword.value = '';

                password.required = false;
                confirmarPassword.required = false;


                // OCULTAR CONTRASEÑAS EN EDICIÓN
                document.getElementById(
                    'grupoPasswordUsuario'
                ).style.display = 'none';

                document.getElementById(
                    'grupoConfirmarPasswordUsuario'
                ).style.display = 'none';


                // TÍTULO
                document.getElementById(
                    'modalUsuarioTitulo'
                ).textContent =
                    'Editar usuario';


                // ABRIR MODAL
                const modal =
                    bootstrap.Modal.getOrCreateInstance(
                        document.getElementById(
                            'modalUsuario'
                        )
                    );


                modal.show();


            } catch (error) {

                console.error(
                    'Error al abrir usuario:',
                    error
                );


                mostrarResultadoUsuario(
                    'No se pudo abrir',
                    error.message,
                    false
                );

            }

        }
    );

}

// ==========================================
// BUSCAR USUARIOS
// ==========================================

function inicializarBusquedaUsuarios() {

    const buscador =
        document.getElementById(
            'buscarUsuarioAdmin'
        );


    if (!buscador) {
        return;
    }


    buscador.addEventListener(
        'input',
        () => {

            const texto =
                buscador.value
                    .toLowerCase()
                    .trim();


            const filas =
                document.querySelectorAll(
                    '#tablaUsuariosAdmin tr'
                );


            filas.forEach(fila => {

                const contenido =
                    fila.textContent
                        .toLowerCase();


                fila.style.display =
                    contenido.includes(texto)
                        ? ''
                        : 'none';

            });

        }
    );

}


// ==========================================
// INICIAR
// ==========================================

document.addEventListener(
    'DOMContentLoaded',
    () => {

        cargarUsuariosAdmin();

        inicializarNuevoUsuario();

        inicializarGuardarUsuario();

         inicializarEdicionUsuarios();

        inicializarBusquedaUsuarios();

    }
);

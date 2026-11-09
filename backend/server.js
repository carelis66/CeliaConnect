const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("./db");

const usuariosRoutes = require("./routes/usuarios.routes");

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`CeliaConnect API funcionando en http://localhost:${PORT}`);
});

const { verificarAdminOModerador } = require("./middleware/auth.middleware");

app.use(cors());
app.use(express.json());

// ==========================================
// RUTAS MODULARES
// ==========================================

app.use("/api/admin/usuarios", usuariosRoutes);

// ==========================================
// VERIFICAR TOKEN JWT
// ==========================================

function verificarToken(req, res, next) {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).json({
      mensaje: "Debés iniciar sesión",
    });
  }

  const partes = authorization.split(" ");

  if (partes.length !== 2 || partes[0] !== "Bearer") {
    return res.status(401).json({
      mensaje: "Token inválido",
    });
  }

  const token = partes[1];

  try {
    const usuario = jwt.verify(token, process.env.JWT_SECRET);

    req.usuario = usuario;

    next();
  } catch (error) {
    return res.status(401).json({
      mensaje: "Sesión inválida o vencida",
    });
  }
}

// ==========================================
// VERIFICAR ADMINISTRADOR
// ==========================================

function verificarAdmin(req, res, next) {
  if (!req.usuario || Number(req.usuario.rolId) !== 1) {
    return res.status(403).json({
      mensaje: "No tenés permisos de administrador",
    });
  }

  next();
}

// ==========================================
// RUTA DE PRUEBA
// ==========================================

app.get("/", (req, res) => {
  res.send("CeliaConnect API funcionando");
});

// ==========================================
// LOGIN
// ==========================================

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validar campos obligatorios
    if (!email || !password) {
      return res.status(400).json({
        mensaje: "Email y contraseña son obligatorios",
      });
    }

    // Buscar usuario por email
    const [usuarios] = await pool.query(
      `
            SELECT
                id,
                nombre,
                apellido,
                email,
                password,
                esActivo,
                rolId
            FROM usuario
            WHERE email = ?
            LIMIT 1
        `,
      [email],
    );

    // Usuario inexistente
    if (usuarios.length === 0) {
      return res.status(401).json({
        mensaje: "Email o contraseña incorrectos",
      });
    }

    const usuario = usuarios[0];

    // Verificar que el usuario esté activo
    if (Number(usuario.esActivo) !== 1) {
      return res.status(403).json({
        mensaje: "El usuario se encuentra inactivo",
      });
    }

    // Comparar contraseña con el hash bcrypt
    const passwordCorrecta = await bcrypt.compare(password, usuario.password);

    // Contraseña incorrecta
    if (!passwordCorrecta) {
      return res.status(401).json({
        mensaje: "Email o contraseña incorrectos",
      });
    }

    // Login correcto
    // Generar token de autenticación
    const token = jwt.sign(
      {
        id: usuario.id,
        rolId: usuario.rolId,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "8h",
      },
    );

    // Login correcto
    res.json({
      mensaje: "Inicio de sesión correcto",

      token: token,

      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        rolId: usuario.rolId,
      },
    });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);

    res.status(500).json({
      mensaje: "Error al iniciar sesión",
    });
  }
});

// ==========================================
// REGISTRO DE USUARIO
// ==========================================

app.post("/api/registro", async (req, res) => {
  try {
    const { nombre, apellido, documento, email, password } = req.body;

    // Validar campos obligatorios
    if (!nombre || !apellido || !documento || !email || !password) {
      return res.status(400).json({
        mensaje: "Todos los campos son obligatorios",
      });
    }

    // Validar longitud de contraseña
    if (password.length < 8) {
      return res.status(400).json({
        mensaje: "La contraseña debe tener al menos 8 caracteres",
      });
    }

    // Normalizar datos
    const emailNormalizado = email.trim().toLowerCase();

    const documentoNormalizado = documento.trim();

    // Verificar si ya existe el email
    const [usuariosEmail] = await pool.query(
      `
                SELECT id
                FROM usuario
                WHERE email = ?
                LIMIT 1
            `,
      [emailNormalizado],
    );

    if (usuariosEmail.length > 0) {
      return res.status(409).json({
        mensaje: "Ya existe una cuenta con ese correo electrónico",
      });
    }

    // Verificar si ya existe el documento
    const [usuariosDocumento] = await pool.query(
      `
                SELECT id
                FROM usuario
                WHERE documento = ?
                LIMIT 1
            `,
      [documentoNormalizado],
    );

    if (usuariosDocumento.length > 0) {
      return res.status(409).json({
        mensaje: "Ya existe una cuenta con ese documento",
      });
    }

    // Encriptar contraseña
    const passwordHash = await bcrypt.hash(password, 10);

    // Crear usuario
    const [resultado] = await pool.query(
      `
                INSERT INTO usuario (
                    documento,
                    nombre,
                    apellido,
                    email,
                    password,
                    esActivo,
                    rolId
                )
                VALUES (?, ?, ?, ?, ?, 1, 2)
            `,
      [
        documentoNormalizado,
        nombre.trim(),
        apellido.trim(),
        emailNormalizado,
        passwordHash,
      ],
    );

    // Registro correcto
    res.status(201).json({
      mensaje: "Cuenta creada correctamente",

      usuario: {
        id: resultado.insertId,
        nombre: nombre.trim(),
        apellido: apellido.trim(),
        email: emailNormalizado,
        rolId: 2,
      },
    });
  } catch (error) {
    console.error("Error al registrar usuario:", error);

    res.status(500).json({
      mensaje: "Error al crear la cuenta",
    });
  }
});

// ==========================================
// ADMIN - OBTENER COMENTARIOS PENDIENTES
// ==========================================

app.get(
  "/api/admin/comentarios/productos",
  verificarToken,
  verificarAdminOModerador,
  async (req, res) => {
    try {
      const [comentarios] = await pool.query(`
                    SELECT
                        cp.id,
                        cp.titulo,
                        cp.comentario,
                        cp.calificacion,
                        cp.fechaComentario,
                        cp.estado,

                        u.id AS usuarioId,
                        u.nombre AS usuarioNombre,
                        u.apellido AS usuarioApellido,

                        p.id AS productoId,
                        p.nombre AS productoNombre,

                        m.nombre AS marca

                    FROM comentarioproducto cp

                    INNER JOIN usuario u
                        ON cp.usuarioId = u.id

                    INNER JOIN producto p
                        ON cp.productoId = p.id

                    INNER JOIN marca m
                        ON p.marcaId = m.id

                    WHERE cp.estado = 'pendiente'

                    ORDER BY cp.fechaComentario DESC
                `);

      res.json(comentarios);
    } catch (error) {
      console.error("Error al obtener comentarios pendientes:", error);

      res.status(500).json({
        mensaje: "Error al obtener los comentarios pendientes",
      });
    }
  },
);

// ==========================================
// ADMIN - MODERAR COMENTARIO DE PRODUCTO
// ==========================================

app.patch(
  "/api/admin/comentarios/productos/:id",
  verificarToken,
  verificarAdminOModerador,
  async (req, res) => {
    try {
      const comentarioId = Number(req.params.id);

      const { estado } = req.body;

      // ==================================
      // VALIDAR ID
      // ==================================

      if (!Number.isInteger(comentarioId) || comentarioId <= 0) {
        return res.status(400).json({
          mensaje: "ID de comentario inválido",
        });
      }

      // ==================================
      // VALIDAR ESTADO
      // ==================================

      if (estado !== "aprobado" && estado !== "rechazado") {
        return res.status(400).json({
          mensaje: "Estado de moderación inválido",
        });
      }

      // ==================================
      // BUSCAR COMENTARIO
      // ==================================

      const [comentarios] = await pool.query(
        `
                    SELECT
                        id,
                        estado
                    FROM comentarioproducto
                    WHERE id = ?
                    LIMIT 1
                `,
        [comentarioId],
      );

      if (comentarios.length === 0) {
        return res.status(404).json({
          mensaje: "Comentario no encontrado",
        });
      }

      // ==================================
      // SOLO MODERAR PENDIENTES
      // ==================================

      if (comentarios[0].estado !== "pendiente") {
        return res.status(409).json({
          mensaje: "El comentario ya fue moderado",
        });
      }

      // ==================================
      // ACTUALIZAR ESTADO
      // ==================================

      await pool.query(
        `
                UPDATE comentarioproducto
                SET estado = ?
                WHERE id = ?
            `,
        [estado, comentarioId],
      );

      // ==================================
      // RESPUESTA
      // ==================================

      res.json({
        mensaje:
          estado === "aprobado"
            ? "Comentario aprobado correctamente"
            : "Comentario rechazado correctamente",
      });
    } catch (error) {
      console.error("Error al moderar comentario:", error);

      res.status(500).json({
        mensaje: "Error al moderar el comentario",
      });
    }
  },
);

// ==========================================
// ADMIN - OBTENER COMENTARIOS PENDIENTES
// DE RESTAURANTES
// ==========================================

app.get(
  "/api/admin/comentarios/restaurantes",
  verificarToken,
  verificarAdminOModerador,
  async (req, res) => {
    try {
      const [comentarios] = await pool.query(`
                    SELECT
                        cr.id,
                        cr.titulo,
                        cr.comentario,
                        cr.calificacion,
                        cr.fechaComentario,
                        cr.estado,

                        u.id AS usuarioId,
                        u.nombre AS usuarioNombre,
                        u.apellido AS usuarioApellido,

                        r.id AS restauranteId,
                        r.nombre AS restauranteNombre

                    FROM comentariorestaurante cr

                    INNER JOIN usuario u
                        ON cr.usuarioId = u.id

                    INNER JOIN restaurante r
                        ON cr.restauranteId = r.id

                    WHERE cr.estado = 'pendiente'

                    ORDER BY cr.fechaComentario DESC
                `);

      res.json(comentarios);
    } catch (error) {
      console.error(
        "Error al obtener comentarios pendientes de restaurantes:",
        error,
      );

      res.status(500).json({
        mensaje: "Error al obtener los comentarios pendientes de restaurantes",
      });
    }
  },
);

// ==========================================
// ADMIN - MODERAR COMENTARIO DE RESTAURANTE
// ==========================================

app.patch(
  "/api/admin/comentarios/restaurantes/:id",
  verificarToken,
  verificarAdminOModerador,
  async (req, res) => {
    try {
      const comentarioId = Number(req.params.id);

      const { estado } = req.body;

      // VALIDAR ID
      if (!Number.isInteger(comentarioId) || comentarioId <= 0) {
        return res.status(400).json({
          mensaje: "ID de comentario inválido",
        });
      }

      // VALIDAR ESTADO
      if (estado !== "aprobado" && estado !== "rechazado") {
        return res.status(400).json({
          mensaje: "Estado de moderación inválido",
        });
      }

      // BUSCAR COMENTARIO
      const [comentarios] = await pool.query(
        `
                    SELECT
                        id,
                        estado,
                        restauranteId
                    FROM comentariorestaurante
                    WHERE id = ?
                    LIMIT 1
                `,
        [comentarioId],
      );

      if (comentarios.length === 0) {
        return res.status(404).json({
          mensaje: "Comentario no encontrado",
        });
      }

      // SOLO MODERAR PENDIENTES
      if (comentarios[0].estado !== "pendiente") {
        return res.status(409).json({
          mensaje: "El comentario ya fue moderado",
        });
      }

      const restauranteId = comentarios[0].restauranteId;

      // ACTUALIZAR ESTADO
      await pool.query(
        `
                UPDATE comentariorestaurante
                SET estado = ?
                WHERE id = ?
            `,
        [estado, comentarioId],
      );

      // RECALCULAR PROMEDIO Y CANTIDAD
      // SOLO CON COMENTARIOS APROBADOS
      const [resumen] = await pool.query(
        `
                    SELECT
                        COALESCE(
                            AVG(calificacion),
                            0
                        ) AS promedio,
                        COUNT(*) AS cantidad
                    FROM comentariorestaurante
                    WHERE restauranteId = ?
                        AND estado = 'aprobado'
                `,
        [restauranteId],
      );

      await pool.query(
        `
                UPDATE restaurante
                SET
                    calificacionPromedio = ?,
                    cantidadResenas = ?
                WHERE id = ?
            `,
        [
          Number(resumen[0].promedio),
          Number(resumen[0].cantidad),
          restauranteId,
        ],
      );

      res.json({
        mensaje:
          estado === "aprobado"
            ? "Comentario aprobado correctamente"
            : "Comentario rechazado correctamente",
      });
    } catch (error) {
      console.error("Error al moderar comentario de restaurante:", error);

      res.status(500).json({
        mensaje: "Error al moderar el comentario",
      });
    }
  },
);

// ==========================================
// ADMIN - OBTENER COMENTARIOS PENDIENTES
// DE LOCALES
// ==========================================

app.get(
  "/api/admin/comentarios/locales",
  verificarToken,
  verificarAdminOModerador,
  async (req, res) => {
    try {
      const [comentarios] = await pool.query(`
                    SELECT
                        cl.id,
                        cl.titulo,
                        cl.comentario,
                        cl.calificacion,
                        cl.fechaComentario,
                        cl.estado,

                        u.id AS usuarioId,
                        u.nombre AS usuarioNombre,
                        u.apellido AS usuarioApellido,

                        l.id AS localId,
                        l.nombre AS localNombre

                    FROM comentariolocal cl

                    INNER JOIN usuario u
                        ON cl.usuarioId = u.id

                    INNER JOIN local l
                        ON cl.localId = l.id

                    WHERE cl.estado = 'pendiente'

                    ORDER BY cl.fechaComentario DESC
                `);

      res.json(comentarios);
    } catch (error) {
      console.error(
        "Error al obtener comentarios pendientes de locales:",
        error,
      );

      res.status(500).json({
        mensaje: "Error al obtener los comentarios pendientes de locales",
      });
    }
  },
);

// ==========================================
// ADMIN - MODERAR COMENTARIO DE LOCAL
// ==========================================

app.patch(
  "/api/admin/comentarios/locales/:id",
  verificarToken,
  verificarAdminOModerador,
  async (req, res) => {
    try {
      const comentarioId = Number(req.params.id);

      const { estado } = req.body;

      // ==================================
      // VALIDAR ID
      // ==================================

      if (!Number.isInteger(comentarioId) || comentarioId <= 0) {
        return res.status(400).json({
          mensaje: "ID de comentario inválido",
        });
      }

      // ==================================
      // VALIDAR ESTADO
      // ==================================

      if (estado !== "aprobado" && estado !== "rechazado") {
        return res.status(400).json({
          mensaje: "Estado de moderación inválido",
        });
      }

      // ==================================
      // BUSCAR COMENTARIO
      // ==================================

      const [comentarios] = await pool.query(
        `
                    SELECT
                        id,
                        estado,
                        localId
                    FROM comentariolocal
                    WHERE id = ?
                    LIMIT 1
                `,
        [comentarioId],
      );

      if (comentarios.length === 0) {
        return res.status(404).json({
          mensaje: "Comentario no encontrado",
        });
      }

      // ==================================
      // SOLO MODERAR PENDIENTES
      // ==================================

      if (comentarios[0].estado !== "pendiente") {
        return res.status(409).json({
          mensaje: "El comentario ya fue moderado",
        });
      }

      const localId = comentarios[0].localId;

      // ==================================
      // ACTUALIZAR ESTADO
      // ==================================

      await pool.query(
        `
                UPDATE comentariolocal
                SET estado = ?
                WHERE id = ?
            `,
        [estado, comentarioId],
      );

      // ==================================
      // RECALCULAR PROMEDIO Y CANTIDAD
      // SOLO CON COMENTARIOS APROBADOS
      // ==================================

      const [resumen] = await pool.query(
        `
                    SELECT
                        COALESCE(
                            AVG(calificacion),
                            0
                        ) AS promedio,
                        COUNT(*) AS cantidad
                    FROM comentariolocal
                    WHERE localId = ?
                        AND estado = 'aprobado'
                `,
        [localId],
      );

      // ==================================
      // ACTUALIZAR LOCAL
      // ==================================

      await pool.query(
        `
                UPDATE local
                SET
                    calificacionPromedio = ?,
                    cantidadResenas = ?
                WHERE id = ?
            `,
        [Number(resumen[0].promedio), Number(resumen[0].cantidad), localId],
      );

      // ==================================
      // RESPUESTA
      // ==================================

      res.json({
        mensaje:
          estado === "aprobado"
            ? "Comentario aprobado correctamente"
            : "Comentario rechazado correctamente",
      });
    } catch (error) {
      console.error("Error al moderar comentario de local:", error);

      res.status(500).json({
        mensaje: "Error al moderar el comentario",
      });
    }
  },
);

// ==========================================
// OBTENER TODOS LOS PRODUCTOS
// ==========================================

app.get("/api/productos", async (req, res) => {
  try {
    const [productos] = await pool.query(`
            SELECT
                p.id,
                p.nombre,
                p.descripcion,
                p.ingredientes,
                p.informacionNutricional,
                p.imagen,
                p.codigoBarras,
                p.certificadoSinTacc,
                p.estadoVerificacion,
                p.marcaId,
                p.categoriaId,
                m.nombre AS marca,
                c.nombre AS categoria,

                COALESCE(
                    AVG(
                        CASE
                            WHEN cp.estado = 'aprobado'
                            THEN cp.calificacion
                        END
                    ),
                    0
                ) AS calificacionPromedio,

                COUNT(
                    CASE
                        WHEN cp.estado = 'aprobado'
                        THEN cp.id
                    END
                ) AS cantidadResenas

            FROM producto p

            INNER JOIN marca m
                ON p.marcaId = m.id

            INNER JOIN categoria c
                ON p.categoriaId = c.id

            LEFT JOIN comentarioproducto cp
                ON cp.productoId = p.id

            GROUP BY
                p.id,
                p.nombre,
                p.descripcion,
                p.ingredientes,
                p.informacionNutricional,
                p.imagen,
                p.codigoBarras,
                p.certificadoSinTacc,
                p.estadoVerificacion,
                p.marcaId,
                p.categoriaId,
                m.nombre,
                c.nombre

            ORDER BY p.id
        `);

    res.json(productos);
  } catch (error) {
    console.error("Error al obtener productos:", error);

    res.status(500).json({
      mensaje: "Error al obtener los productos",
    });
  }
});

// ==========================================
// AGREGAR PRODUCTO A FAVORITOS
// ==========================================

app.post("/api/productos/:id/favorito", verificarToken, async (req, res) => {
  try {
    const productoId = Number(req.params.id);
    const usuarioId = req.usuario.id;

    // Validar ID del producto
    if (!Number.isInteger(productoId) || productoId <= 0) {
      return res.status(400).json({
        mensaje: "ID de producto inválido",
      });
    }

    // Verificar que el producto exista
    const [productos] = await pool.query(
      `
          SELECT id
          FROM producto
          WHERE id = ?
          LIMIT 1
        `,
      [productoId],
    );

    if (productos.length === 0) {
      return res.status(404).json({
        mensaje: "Producto no encontrado",
      });
    }

    // Verificar si ya está en favoritos
    const [favoritos] = await pool.query(
      `
          SELECT usuarioId, productoId
          FROM favoritoproducto
          WHERE usuarioId = ?
            AND productoId = ?
          LIMIT 1
        `,
      [usuarioId, productoId],
    );

    if (favoritos.length > 0) {
      return res.status(409).json({
        mensaje: "El producto ya está en favoritos",
      });
    }

    // Agregar a favoritos
    await pool.query(
      `
          INSERT INTO favoritoproducto (
            usuarioId,
            productoId
          )
          VALUES (?, ?)
        `,
      [usuarioId, productoId],
    );

    res.status(201).json({
      mensaje: "Producto agregado a favoritos",
    });
  } catch (error) {
    console.error("Error al agregar producto a favoritos:", error);

    res.status(500).json({
      mensaje: "Error al agregar el producto a favoritos",
    });
  }
});

// ==========================================
// QUITAR PRODUCTO DE FAVORITOS
// ==========================================

app.delete("/api/productos/:id/favorito", verificarToken, async (req, res) => {
  try {
    const productoId = Number(req.params.id);
    const usuarioId = req.usuario.id;

    if (!Number.isInteger(productoId) || productoId <= 0) {
      return res.status(400).json({
        mensaje: "ID de producto inválido",
      });
    }

    const [resultado] = await pool.query(
      `
          DELETE FROM favoritoproducto
          WHERE usuarioId = ?
            AND productoId = ?
        `,
      [usuarioId, productoId],
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        mensaje: "El producto no estaba en favoritos",
      });
    }

    res.json({
      mensaje: "Producto eliminado de favoritos",
    });
  } catch (error) {
    console.error("Error al quitar producto de favoritos:", error);

    res.status(500).json({
      mensaje: "Error al quitar el producto de favoritos",
    });
  }
});

// ==========================================
// OBTENER PRODUCTOS FAVORITOS DEL USUARIO
// ==========================================

app.get("/api/productos/favoritos", verificarToken, async (req, res) => {
  try {
    const usuarioId = req.usuario.id;

    const [favoritos] = await pool.query(
      `
          SELECT
            fp.productoId,
            fp.fechaAgregado
          FROM favoritoproducto fp
          WHERE fp.usuarioId = ?
          ORDER BY fp.fechaAgregado DESC
        `,
      [usuarioId],
    );

    res.json(favoritos);
  } catch (error) {
    console.error("Error al obtener productos favoritos:", error);

    res.status(500).json({
      mensaje: "Error al obtener los productos favoritos",
    });
  }
});

// ==========================================
// OBTENER COMENTARIOS APROBADOS DE UN PRODUCTO
// ==========================================

app.get("/api/productos/:id/comentarios", async (req, res) => {
  try {
    const { id } = req.params;

    const productoId = Number(id);

    // Validar ID
    if (!Number.isInteger(productoId) || productoId <= 0) {
      return res.status(400).json({
        mensaje: "ID de producto inválido",
      });
    }

    // Buscar comentarios aprobados
    const [comentarios] = await pool.query(
      `
            SELECT
                cp.id,
                cp.titulo,
                cp.comentario,
                cp.calificacion,
                cp.fechaComentario,
                u.nombre,
                u.apellido
            FROM comentarioproducto cp
            INNER JOIN usuario u
                ON cp.usuarioId = u.id
            WHERE cp.productoId = ?
                AND cp.estado = 'aprobado'
            ORDER BY cp.fechaComentario DESC
        `,
      [productoId],
    );

    res.json(comentarios);
  } catch (error) {
    console.error("Error al obtener comentarios:", error);

    res.status(500).json({
      mensaje: "Error al obtener los comentarios",
    });
  }
});

// ==========================================
// CREAR COMENTARIO DE UN PRODUCTO
// ==========================================

app.post("/api/productos/:id/comentarios", verificarToken, async (req, res) => {
  try {
    const { id } = req.params;

    const { titulo, comentario, calificacion } = req.body;

    const productoId = Number(id);

    const usuarioId = Number(req.usuario.id);

    const calificacionNumero = Number(calificacion);

    // ==================================
    // VALIDAR PRODUCTO
    // ==================================

    if (!Number.isInteger(productoId) || productoId <= 0) {
      return res.status(400).json({
        mensaje: "ID de producto inválido",
      });
    }

    // ==================================
    // VALIDAR CAMPOS
    // ==================================

    if (!titulo || !titulo.trim() || !comentario || !comentario.trim()) {
      return res.status(400).json({
        mensaje: "Título y comentario son obligatorios",
      });
    }

    if (
      !Number.isInteger(calificacionNumero) ||
      calificacionNumero < 1 ||
      calificacionNumero > 5
    ) {
      return res.status(400).json({
        mensaje: "La calificación debe ser entre 1 y 5 estrellas",
      });
    }

    // ==================================
    // VERIFICAR QUE EXISTA EL PRODUCTO
    // ==================================

    const [productos] = await pool.query(
      `
                    SELECT id
                    FROM producto
                    WHERE id = ?
                    LIMIT 1
                `,
      [productoId],
    );

    if (productos.length === 0) {
      return res.status(404).json({
        mensaje: "Producto no encontrado",
      });
    }

    // ==================================
    // VERIFICAR COMENTARIO EXISTENTE
    // ==================================

    const [comentariosExistentes] = await pool.query(
      `
                    SELECT id
                    FROM comentarioproducto
                    WHERE usuarioId = ?
                        AND productoId = ?
                    LIMIT 1
                `,
      [usuarioId, productoId],
    );

    if (comentariosExistentes.length > 0) {
      return res.status(409).json({
        mensaje: "Ya dejaste una opinión para este producto",
      });
    }

    // ==================================
    // CREAR COMENTARIO
    // ==================================

    const [resultado] = await pool.query(
      `
                    INSERT INTO comentarioproducto (
                        titulo,
                        comentario,
                        calificacion,
                        estado,
                        usuarioId,
                        productoId
                    )
                    VALUES (?, ?, ?, 'pendiente', ?, ?)
                `,
      [
        titulo.trim(),
        comentario.trim(),
        calificacionNumero,
        usuarioId,
        productoId,
      ],
    );

    // ==================================
    // RESPUESTA
    // ==================================

    res.status(201).json({
      mensaje: "Tu opinión fue enviada y está pendiente de aprobación",

      comentario: {
        id: resultado.insertId,
        titulo: titulo.trim(),
        comentario: comentario.trim(),
        calificacion: calificacionNumero,
        estado: "pendiente",
        productoId: productoId,
      },
    });
  } catch (error) {
    console.error("Error al crear comentario:", error);

    res.status(500).json({
      mensaje: "Error al enviar la opinión",
    });
  }
});

// ==========================================
// OBTENER UN PRODUCTO POR ID
// ==========================================

app.get("/api/productos/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Validar que el ID sea un número válido
    const productoId = Number(id);

    if (!Number.isInteger(productoId) || productoId <= 0) {
      return res.status(400).json({
        mensaje: "ID de producto inválido",
      });
    }

    const [productos] = await pool.query(
      `
            SELECT
                p.id,
                p.nombre,
                p.descripcion,
                p.ingredientes,
                p.informacionNutricional,
                p.imagen,
                p.codigoBarras,
                p.certificadoSinTacc,
                p.marcaId,
                p.categoriaId,
                m.nombre AS marca,
                c.nombre AS categoria
            FROM producto p
            INNER JOIN marca m
                ON p.marcaId = m.id
            INNER JOIN categoria c
                ON p.categoriaId = c.id
            WHERE p.id = ?
        `,
      [productoId],
    );

    // Si el producto no existe
    if (productos.length === 0) {
      return res.status(404).json({
        mensaje: "Producto no encontrado",
      });
    }

    // Devolver un solo producto
    res.json(productos[0]);
  } catch (error) {
    console.error("Error al obtener el producto:", error);

    res.status(500).json({
      mensaje: "Error al obtener el producto",
    });
  }
});

// ==========================================
// OBTENER TODOS LOS RESTAURANTES VERIFICADOS
// ==========================================

app.get("/api/restaurantes", async (req, res) => {
  try {
    const [restaurantes] = await pool.query(`
            SELECT
                r.id,
                r.nombre,
                r.descripcion,
                r.direccion,
                r.imagenExterior,
                r.imagenInterior,
                r.sitioWeb,
                r.horario,
                r.latitud,
                r.longitud,
                r.instagram,
                r.email,
                r.telefono,
                r.estadoVerificacion,
                r.calificacionPromedio,
                r.cantidadResenas,
                tr.nombre AS tipoRestaurante,
                b.nombre AS barrio
            FROM restaurante r
            INNER JOIN tipoRestaurante tr
                ON r.tipoRestauranteId = tr.id
            INNER JOIN barrio b
                ON r.barrioId = b.id
            WHERE r.estadoVerificacion = 'verificado'
            ORDER BY r.nombre ASC
        `);

    res.json(restaurantes);
  } catch (error) {
    console.error("Error al obtener restaurantes:", error);

    res.status(500).json({
      mensaje: "Error al obtener los restaurantes",
    });
  }
});

// ==========================================
// AGREGAR RESTAURANTE A FAVORITOS
// ==========================================

app.post("/api/restaurantes/:id/favorito", verificarToken, async (req, res) => {
  try {
    const restauranteId = Number(req.params.id);
    const usuarioId = req.usuario.id;

    if (!Number.isInteger(restauranteId) || restauranteId <= 0) {
      return res.status(400).json({
        mensaje: "ID de restaurante inválido",
      });
    }

    const [restaurantes] = await pool.query(
      `
          SELECT id
          FROM restaurante
          WHERE id = ?
          LIMIT 1
        `,
      [restauranteId],
    );

    if (restaurantes.length === 0) {
      return res.status(404).json({
        mensaje: "Restaurante no encontrado",
      });
    }

    const [favoritos] = await pool.query(
      `
          SELECT usuarioId, restauranteId
          FROM favoritorestaurante
          WHERE usuarioId = ?
            AND restauranteId = ?
          LIMIT 1
        `,
      [usuarioId, restauranteId],
    );

    if (favoritos.length > 0) {
      return res.status(409).json({
        mensaje: "El restaurante ya está en favoritos",
      });
    }

    await pool.query(
      `
          INSERT INTO favoritorestaurante (
            usuarioId,
            restauranteId
          )
          VALUES (?, ?)
        `,
      [usuarioId, restauranteId],
    );

    res.status(201).json({
      mensaje: "Restaurante agregado a favoritos",
    });
  } catch (error) {
    console.error("Error al agregar restaurante a favoritos:", error);

    res.status(500).json({
      mensaje: "Error al agregar el restaurante a favoritos",
    });
  }
});

// ==========================================
// QUITAR RESTAURANTE DE FAVORITOS
// ==========================================

app.delete(
  "/api/restaurantes/:id/favorito",
  verificarToken,
  async (req, res) => {
    try {
      const restauranteId = Number(req.params.id);
      const usuarioId = req.usuario.id;

      if (!Number.isInteger(restauranteId) || restauranteId <= 0) {
        return res.status(400).json({
          mensaje: "ID de restaurante inválido",
        });
      }

      const [resultado] = await pool.query(
        `
          DELETE FROM favoritorestaurante
          WHERE usuarioId = ?
            AND restauranteId = ?
        `,
        [usuarioId, restauranteId],
      );

      if (resultado.affectedRows === 0) {
        return res.status(404).json({
          mensaje: "El restaurante no estaba en favoritos",
        });
      }

      res.json({
        mensaje: "Restaurante eliminado de favoritos",
      });
    } catch (error) {
      console.error("Error al quitar restaurante de favoritos:", error);

      res.status(500).json({
        mensaje: "Error al quitar el restaurante de favoritos",
      });
    }
  },
);

// ==========================================
// OBTENER RESTAURANTES FAVORITOS DEL USUARIO
// ==========================================

app.get("/api/restaurantes/favoritos", verificarToken, async (req, res) => {
  try {
    const usuarioId = req.usuario.id;

    const [favoritos] = await pool.query(
      `
          SELECT
            fr.restauranteId,
            fr.fechaAgregado
          FROM favoritorestaurante fr
          WHERE fr.usuarioId = ?
          ORDER BY fr.fechaAgregado DESC
        `,
      [usuarioId],
    );

    res.json(favoritos);
  } catch (error) {
    console.error("Error al obtener restaurantes favoritos:", error);

    res.status(500).json({
      mensaje: "Error al obtener los restaurantes favoritos",
    });
  }
});

// ==========================================
// OBTENER COMENTARIOS APROBADOS DE UN RESTAURANTE
// ==========================================

app.get("/api/restaurantes/:id/comentarios", async (req, res) => {
  try {
    const restauranteId = Number(req.params.id);

    // Validar ID
    if (!Number.isInteger(restauranteId) || restauranteId <= 0) {
      return res.status(400).json({
        mensaje: "ID de restaurante inválido",
      });
    }

    // Buscar comentarios aprobados
    const [comentarios] = await pool.query(
      `
            SELECT
                cr.id,
                cr.titulo,
                cr.comentario,
                cr.calificacion,
                cr.fechaComentario,
                u.nombre,
                u.apellido
            FROM comentariorestaurante cr
            INNER JOIN usuario u
                ON cr.usuarioId = u.id
            INNER JOIN restaurante r
                ON cr.restauranteId = r.id
            WHERE cr.restauranteId = ?
                AND cr.estado = 'aprobado'
                AND r.estadoVerificacion = 'verificado'
            ORDER BY cr.fechaComentario DESC
        `,
      [restauranteId],
    );

    res.json(comentarios);
  } catch (error) {
    console.error("Error al obtener comentarios del restaurante:", error);

    res.status(500).json({
      mensaje: "Error al obtener los comentarios",
    });
  }
});

// ==========================================
// CREAR COMENTARIO DE UN RESTAURANTE
// ==========================================

app.post(
  "/api/restaurantes/:id/comentarios",
  verificarToken,
  async (req, res) => {
    try {
      const restauranteId = Number(req.params.id);

      const usuarioId = Number(req.usuario.id);

      const { titulo, comentario, calificacion } = req.body;

      const calificacionNumero = Number(calificacion);

      // ==================================
      // VALIDAR RESTAURANTE
      // ==================================

      if (!Number.isInteger(restauranteId) || restauranteId <= 0) {
        return res.status(400).json({
          mensaje: "ID de restaurante inválido",
        });
      }

      // ==================================
      // VALIDAR CAMPOS
      // ==================================

      if (!titulo || !titulo.trim() || !comentario || !comentario.trim()) {
        return res.status(400).json({
          mensaje: "Título y comentario son obligatorios",
        });
      }

      if (titulo.trim().length > 150) {
        return res.status(400).json({
          mensaje: "El título no puede superar los 150 caracteres",
        });
      }

      if (
        !Number.isInteger(calificacionNumero) ||
        calificacionNumero < 1 ||
        calificacionNumero > 5
      ) {
        return res.status(400).json({
          mensaje: "La calificación debe ser entre 1 y 5 estrellas",
        });
      }

      // ==================================
      // VERIFICAR RESTAURANTE
      // ==================================

      const [restaurantes] = await pool.query(
        `
                    SELECT id
                    FROM restaurante
                    WHERE id = ?
                        AND estadoVerificacion = 'verificado'
                    LIMIT 1
                `,
        [restauranteId],
      );

      if (restaurantes.length === 0) {
        return res.status(404).json({
          mensaje: "Restaurante no encontrado",
        });
      }

      // ==================================
      // VERIFICAR OPINIÓN EXISTENTE
      // ==================================

      const [comentariosExistentes] = await pool.query(
        `
                    SELECT id
                    FROM comentariorestaurante
                    WHERE usuarioId = ?
                        AND restauranteId = ?
                    LIMIT 1
                `,
        [usuarioId, restauranteId],
      );

      if (comentariosExistentes.length > 0) {
        return res.status(409).json({
          mensaje: "Ya dejaste una opinión para este restaurante",
        });
      }

      // ==================================
      // CREAR COMENTARIO
      // ==================================

      const [resultado] = await pool.query(
        `
                    INSERT INTO comentariorestaurante (
                        titulo,
                        comentario,
                        calificacion,
                        estado,
                        usuarioId,
                        restauranteId
                    )
                    VALUES (?, ?, ?, 'pendiente', ?, ?)
                `,
        [
          titulo.trim(),
          comentario.trim(),
          calificacionNumero,
          usuarioId,
          restauranteId,
        ],
      );

      // ==================================
      // RESPUESTA
      // ==================================

      res.status(201).json({
        mensaje: "Tu opinión fue enviada y está pendiente de aprobación",

        comentario: {
          id: resultado.insertId,
          titulo: titulo.trim(),
          comentario: comentario.trim(),
          calificacion: calificacionNumero,
          estado: "pendiente",
          restauranteId: restauranteId,
        },
      });
    } catch (error) {
      console.error("Error al crear comentario de restaurante:", error);

      res.status(500).json({
        mensaje: "Error al enviar la opinión",
      });
    }
  },
);

// ==========================================
// CREAR COMENTARIO DE LOCAL
// ==========================================

app.post("/api/locales/:id/comentarios", verificarToken, async (req, res) => {
  try {
    const localId = Number(req.params.id);

    const usuarioId = Number(req.usuario.id);

    const { titulo, comentario, calificacion } = req.body;

    const calificacionNumero = Number(calificacion);

    // ==================================
    // VALIDAR LOCAL
    // ==================================

    if (!Number.isInteger(localId) || localId <= 0) {
      return res.status(400).json({
        mensaje: "ID de local inválido",
      });
    }

    // ==================================
    // VALIDAR CAMPOS
    // ==================================

    if (!titulo || !titulo.trim() || !comentario || !comentario.trim()) {
      return res.status(400).json({
        mensaje: "Título y comentario son obligatorios",
      });
    }

    if (titulo.trim().length > 150) {
      return res.status(400).json({
        mensaje: "El título no puede superar los 150 caracteres",
      });
    }

    if (
      !Number.isInteger(calificacionNumero) ||
      calificacionNumero < 1 ||
      calificacionNumero > 5
    ) {
      return res.status(400).json({
        mensaje: "La calificación debe ser entre 1 y 5 estrellas",
      });
    }

    // ==================================
    // VERIFICAR LOCAL
    // ==================================

    const [locales] = await pool.query(
      `
                    SELECT id
                    FROM local
                    WHERE id = ?
                        AND estadoVerificacion = 'verificado'
                    LIMIT 1
                `,
      [localId],
    );

    if (locales.length === 0) {
      return res.status(404).json({
        mensaje: "Local no encontrado",
      });
    }

    // ==================================
    // VERIFICAR OPINIÓN EXISTENTE
    // ==================================

    const [comentariosExistentes] = await pool.query(
      `
                    SELECT id
                    FROM comentariolocal
                    WHERE usuarioId = ?
                        AND localId = ?
                    LIMIT 1
                `,
      [usuarioId, localId],
    );

    if (comentariosExistentes.length > 0) {
      return res.status(409).json({
        mensaje: "Ya dejaste una opinión para este local",
      });
    }

    // ==================================
    // CREAR COMENTARIO
    // ==================================

    const [resultado] = await pool.query(
      `
                    INSERT INTO comentariolocal (
                        titulo,
                        comentario,
                        calificacion,
                        estado,
                        usuarioId,
                        localId
                    )
                    VALUES (?, ?, ?, 'pendiente', ?, ?)
                `,
      [
        titulo.trim(),
        comentario.trim(),
        calificacionNumero,
        usuarioId,
        localId,
      ],
    );

    // ==================================
    // RESPUESTA
    // ==================================

    res.status(201).json({
      mensaje: "Tu opinión fue enviada y está pendiente de aprobación",

      comentario: {
        id: resultado.insertId,
        titulo: titulo.trim(),
        comentario: comentario.trim(),
        calificacion: calificacionNumero,
        estado: "pendiente",
        localId: localId,
      },
    });
  } catch (error) {
    console.error("Error al crear comentario de local:", error);

    res.status(500).json({
      mensaje: "Error al enviar la opinión",
    });
  }
});

// Actualizar local
app.put(
  "/api/admin/locales/:id",
  verificarToken,
  verificarAdmin,
  async (req, res) => {
    try {
      const localId = Number(req.params.id);

      if (!Number.isInteger(localId) || localId <= 0) {
        return res.status(400).json({
          mensaje: "ID de local inválido",
        });
      }

      const {
        nombre,
        descripcion,
        imagen,
        direccion,
        telefono,
        email,
        instagram,
        sitioWeb,
        horario,
        latitud,
        longitud,
        estadoVerificacion,
        tipoLocalId,
        barrioId,
      } = req.body;

      if (!nombre || !tipoLocalId || !barrioId) {
        return res.status(400).json({
          mensaje: "Nombre, tipo de local y barrio son obligatorios",
        });
      }

      const [existente] = await pool.query(
        `
                    SELECT id
                    FROM local
                    WHERE id = ?
                    `,
        [localId],
      );

      if (existente.length === 0) {
        return res.status(404).json({
          mensaje: "Local no encontrado",
        });
      }

      await pool.query(
        `
                UPDATE local
                SET
                    nombre = ?,
                    descripcion = ?,
                    imagen = ?,
                    direccion = ?,
                    telefono = ?,
                    email = ?,
                    instagram = ?,
                    sitioWeb = ?,
                    horario = ?,
                    latitud = ?,
                    longitud = ?,
                    estadoVerificacion = ?,
                    tipoLocalId = ?,
                    barrioId = ?
                WHERE id = ?
                `,
        [
          nombre,
          descripcion || null,
          imagen || null,
          direccion || null,
          telefono || null,
          email || null,
          instagram || null,
          sitioWeb || null,
          horario || null,
          latitud || null,
          longitud || null,
          estadoVerificacion || "pendiente",
          tipoLocalId,
          barrioId,
          localId,
        ],
      );

      res.json({
        mensaje: "Local actualizado correctamente",
      });
    } catch (error) {
      console.error("Error al actualizar local:", error);

      res.status(500).json({
        mensaje: "Error al actualizar el local",
      });
    }
  },
);

// Eliminar local
app.delete(
  "/api/admin/locales/:id",
  verificarToken,
  verificarAdmin,
  async (req, res) => {
    try {
      const localId = Number(req.params.id);

      if (!Number.isInteger(localId) || localId <= 0) {
        return res.status(400).json({
          mensaje: "ID de local inválido",
        });
      }

      const [existente] = await pool.query(
        `
                    SELECT id
                    FROM local
                    WHERE id = ?
                    `,
        [localId],
      );

      if (existente.length === 0) {
        return res.status(404).json({
          mensaje: "Local no encontrado",
        });
      }

      await pool.query(
        `
                DELETE FROM local
                WHERE id = ?
                `,
        [localId],
      );

      res.json({
        mensaje: "Local eliminado correctamente",
      });
    } catch (error) {
      console.error("Error al eliminar local:", error);

      res.status(500).json({
        mensaje: "Error al eliminar el local",
      });
    }
  },
);

// ==========================================
// OBTENER UN RESTAURANTE POR ID
// ==========================================

app.get("/api/restaurantes/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const restauranteId = Number(id);

    // Validar ID
    if (!Number.isInteger(restauranteId) || restauranteId <= 0) {
      return res.status(400).json({
        mensaje: "ID de restaurante inválido",
      });
    }

    // Buscar restaurante
    const [restaurantes] = await pool.query(
      `
            SELECT
                r.id,
                r.nombre,
                r.descripcion,
                r.direccion,
                r.imagenExterior,
                r.imagenInterior,
                r.sitioWeb,
                r.horario,
                r.latitud,
                r.longitud,
                r.instagram,
                r.email,
                r.telefono,
                r.estadoVerificacion,
                r.calificacionPromedio,
                r.cantidadResenas,
                tr.nombre AS tipoRestaurante,
                b.nombre AS barrio
            FROM restaurante r
            INNER JOIN tipoRestaurante tr
                ON r.tipoRestauranteId = tr.id
            INNER JOIN barrio b
                ON r.barrioId = b.id
            WHERE r.id = ?
                AND r.estadoVerificacion = 'verificado'
            LIMIT 1
        `,
      [restauranteId],
    );

    // Restaurante inexistente o no verificado
    if (restaurantes.length === 0) {
      return res.status(404).json({
        mensaje: "Restaurante no encontrado",
      });
    }

    // Devolver un solo restaurante
    res.json(restaurantes[0]);
  } catch (error) {
    console.error("Error al obtener el restaurante:", error);

    res.status(500).json({
      mensaje: "Error al obtener el restaurante",
    });
  }
});

// ==========================================
// OBTENER TODOS LOS LOCALES VERIFICADOS
// ==========================================

app.get("/api/locales", async (req, res) => {
  try {
    const [locales] = await pool.query(`
            SELECT
                l.id,
                l.nombre,
                l.descripcion,
                l.imagen,
                l.direccion,
                l.telefono,
                l.email,
                l.instagram,
                l.sitioWeb,
                l.horario,
                l.latitud,
                l.longitud,
                l.estadoVerificacion,
                l.calificacionPromedio,
                l.cantidadResenas,
                tl.nombre AS tipoLocal,
                b.nombre AS barrio

            FROM local l

            INNER JOIN tipolocal tl
                ON l.tipoLocalId = tl.id

            INNER JOIN barrio b
                ON l.barrioId = b.id

            WHERE l.estadoVerificacion = 'verificado'

            ORDER BY l.nombre ASC
        `);

    res.json(locales);
  } catch (error) {
    console.error("Error al obtener locales:", error);

    res.status(500).json({
      mensaje: "Error al obtener los locales",
    });
  }
});

// ==========================================
// OBTENER COMENTARIOS APROBADOS DE UN LOCAL
// ==========================================

app.get("/api/locales/:id/comentarios", async (req, res) => {
  try {
    const localId = Number(req.params.id);

    if (!Number.isInteger(localId) || localId <= 0) {
      return res.status(400).json({
        mensaje: "ID de local inválido",
      });
    }

    const [comentarios] = await pool.query(
      `
            SELECT
                cl.id,
                cl.titulo,
                cl.comentario,
                cl.calificacion,
                cl.fechaComentario,
                u.nombre AS usuarioNombre,
                u.apellido AS usuarioApellido

            FROM comentariolocal cl

            INNER JOIN usuario u
                ON cl.usuarioId = u.id

            INNER JOIN local l
                ON cl.localId = l.id

            WHERE cl.localId = ?
                AND cl.estado = 'aprobado'
                AND l.estadoVerificacion = 'verificado'

            ORDER BY cl.fechaComentario DESC
        `,
      [localId],
    );

    res.json(comentarios);
  } catch (error) {
    console.error("Error al obtener comentarios del local:", error);

    res.status(500).json({
      mensaje: "Error al obtener los comentarios del local",
    });
  }
});

// ==========================================
// AGREGAR LOCAL A FAVORITOS
// ==========================================

app.post("/api/locales/:id/favorito", verificarToken, async (req, res) => {
  try {
    const localId = Number(req.params.id);
    const usuarioId = req.usuario.id;

    if (!Number.isInteger(localId) || localId <= 0) {
      return res.status(400).json({
        mensaje: "ID de local inválido",
      });
    }

    const [locales] = await pool.query(
      `
          SELECT id
          FROM local
          WHERE id = ?
          LIMIT 1
        `,
      [localId],
    );

    if (locales.length === 0) {
      return res.status(404).json({
        mensaje: "Local no encontrado",
      });
    }

    const [favoritos] = await pool.query(
      `
          SELECT usuarioId, localId
          FROM favoritolocal
          WHERE usuarioId = ?
            AND localId = ?
          LIMIT 1
        `,
      [usuarioId, localId],
    );

    if (favoritos.length > 0) {
      return res.status(409).json({
        mensaje: "El local ya está en favoritos",
      });
    }

    await pool.query(
      `
          INSERT INTO favoritolocal (
            usuarioId,
            localId
          )
          VALUES (?, ?)
        `,
      [usuarioId, localId],
    );

    res.status(201).json({
      mensaje: "Local agregado a favoritos",
    });
  } catch (error) {
    console.error("Error al agregar local a favoritos:", error);

    res.status(500).json({
      mensaje: "Error al agregar el local a favoritos",
    });
  }
});

// ==========================================
// QUITAR LOCAL DE FAVORITOS
// ==========================================

app.delete("/api/locales/:id/favorito", verificarToken, async (req, res) => {
  try {
    const localId = Number(req.params.id);
    const usuarioId = req.usuario.id;

    if (!Number.isInteger(localId) || localId <= 0) {
      return res.status(400).json({
        mensaje: "ID de local inválido",
      });
    }

    const [resultado] = await pool.query(
      `
          DELETE FROM favoritolocal
          WHERE usuarioId = ?
            AND localId = ?
        `,
      [usuarioId, localId],
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        mensaje: "El local no estaba en favoritos",
      });
    }

    res.json({
      mensaje: "Local eliminado de favoritos",
    });
  } catch (error) {
    console.error("Error al quitar local de favoritos:", error);

    res.status(500).json({
      mensaje: "Error al quitar el local de favoritos",
    });
  }
});

// ==========================================
// OBTENER LOCALES FAVORITOS DEL USUARIO
// ==========================================

app.get("/api/locales/favoritos", verificarToken, async (req, res) => {
  try {
    const usuarioId = req.usuario.id;

    const [favoritos] = await pool.query(
      `
          SELECT
            fl.localId,
            fl.fechaAgregado
          FROM favoritolocal fl
          WHERE fl.usuarioId = ?
          ORDER BY fl.fechaAgregado DESC
        `,
      [usuarioId],
    );

    res.json(favoritos);
  } catch (error) {
    console.error("Error al obtener locales favoritos:", error);

    res.status(500).json({
      mensaje: "Error al obtener los locales favoritos",
    });
  }
});

// ==========================================
// OBTENER UN LOCAL POR ID
// ==========================================

app.get("/api/locales/:id", async (req, res) => {
  try {
    const localId = Number(req.params.id);

    // VALIDAR ID
    if (!Number.isInteger(localId) || localId <= 0) {
      return res.status(400).json({
        mensaje: "ID de local inválido",
      });
    }

    // BUSCAR LOCAL
    const [locales] = await pool.query(
      `
                SELECT
                    l.id,
                    l.nombre,
                    l.descripcion,
                    l.imagen,
                    l.direccion,
                    l.telefono,
                    l.email,
                    l.instagram,
                    l.sitioWeb,
                    l.horario,
                    l.latitud,
                    l.longitud,
                    l.estadoVerificacion,
                    l.calificacionPromedio,
                    l.cantidadResenas,
                    tl.nombre AS tipoLocal,
                    b.nombre AS barrio

                FROM local l

                INNER JOIN tipoLocal tl
                    ON l.tipoLocalId = tl.id

                INNER JOIN barrio b
                    ON l.barrioId = b.id

                WHERE l.id = ?
                    AND l.estadoVerificacion = 'verificado'

                LIMIT 1
            `,
      [localId],
    );

    if (locales.length === 0) {
      return res.status(404).json({
        mensaje: "Local no encontrado",
      });
    }

    res.json(locales[0]);
  } catch (error) {
    console.error("Error al obtener el local:", error);

    res.status(500).json({
      mensaje: "Error al obtener el local",
    });
  }
});

// ==========================================
// OBTENER NUTRICIONISTAS VERIFICADOS
// ==========================================

app.get("/api/nutricionistas", async (req, res) => {
  try {
    const [nutricionistas] = await pool.query(`
                SELECT
                    n.id,
                    n.nombre,
                    n.apellido,
                    n.matricula,
                    n.descripcion,
                    n.fotoPerfil,
                    n.direccion,
                    n.telefono,
                    n.tieneWhatsapp,
                    n.email,
                    n.instagram,
                    n.sitioWeb,
                    n.horario,
                    n.latitud,
                    n.longitud,
                    n.estadoVerificacion,
                    n.calificacionPromedio,
                    n.cantidadResenas,
                    b.nombre AS barrio

                FROM nutricionista n

                INNER JOIN barrio b
                    ON n.barrioId = b.id

                WHERE n.estadoVerificacion = 'verificado'

                ORDER BY n.apellido ASC, n.nombre ASC
            `);

    res.json(nutricionistas);
  } catch (error) {
    console.error("Error al obtener nutricionistas:", error);

    res.status(500).json({
      mensaje: "Error al obtener los nutricionistas",
    });
  }
});

// ==========================================
// AGREGAR NUTRICIONISTA A FAVORITOS
// ==========================================

app.post(
  "/api/nutricionistas/:id/favorito",
  verificarToken,
  async (req, res) => {
    try {
      const nutricionistaId = Number(req.params.id);
      const usuarioId = req.usuario.id;

      if (!Number.isInteger(nutricionistaId) || nutricionistaId <= 0) {
        return res.status(400).json({
          mensaje: "ID de nutricionista inválido",
        });
      }

      const [nutricionistas] = await pool.query(
        `
          SELECT id
          FROM nutricionista
          WHERE id = ?
          LIMIT 1
        `,
        [nutricionistaId],
      );

      if (nutricionistas.length === 0) {
        return res.status(404).json({
          mensaje: "Nutricionista no encontrado",
        });
      }

      const [favoritos] = await pool.query(
        `
          SELECT usuarioId, nutricionistaId
          FROM favoritonutricionista
          WHERE usuarioId = ?
            AND nutricionistaId = ?
          LIMIT 1
        `,
        [usuarioId, nutricionistaId],
      );

      if (favoritos.length > 0) {
        return res.status(409).json({
          mensaje: "El nutricionista ya está en favoritos",
        });
      }

      await pool.query(
        `
          INSERT INTO favoritonutricionista (
            usuarioId,
            nutricionistaId
          )
          VALUES (?, ?)
        `,
        [usuarioId, nutricionistaId],
      );

      res.status(201).json({
        mensaje: "Nutricionista agregado a favoritos",
      });
    } catch (error) {
      console.error("Error al agregar nutricionista a favoritos:", error);

      res.status(500).json({
        mensaje: "Error al agregar el nutricionista a favoritos",
      });
    }
  },
);

// ==========================================
// QUITAR NUTRICIONISTA DE FAVORITOS
// ==========================================

app.delete(
  "/api/nutricionistas/:id/favorito",
  verificarToken,
  async (req, res) => {
    try {
      const nutricionistaId = Number(req.params.id);
      const usuarioId = req.usuario.id;

      if (!Number.isInteger(nutricionistaId) || nutricionistaId <= 0) {
        return res.status(400).json({
          mensaje: "ID de nutricionista inválido",
        });
      }

      const [resultado] = await pool.query(
        `
          DELETE FROM favoritonutricionista
          WHERE usuarioId = ?
            AND nutricionistaId = ?
        `,
        [usuarioId, nutricionistaId],
      );

      if (resultado.affectedRows === 0) {
        return res.status(404).json({
          mensaje: "El nutricionista no estaba en favoritos",
        });
      }

      res.json({
        mensaje: "Nutricionista eliminado de favoritos",
      });
    } catch (error) {
      console.error("Error al quitar nutricionista de favoritos:", error);

      res.status(500).json({
        mensaje: "Error al quitar el nutricionista de favoritos",
      });
    }
  },
);

// ==========================================
// OBTENER NUTRICIONISTAS FAVORITOS DEL USUARIO
// ==========================================

app.get("/api/nutricionistas/favoritos", verificarToken, async (req, res) => {
  try {
    const usuarioId = req.usuario.id;

    const [favoritos] = await pool.query(
      `
          SELECT
            fn.nutricionistaId,
            fn.fechaAgregado
          FROM favoritonutricionista fn
          WHERE fn.usuarioId = ?
          ORDER BY fn.fechaAgregado DESC
        `,
      [usuarioId],
    );

    res.json(favoritos);
  } catch (error) {
    console.error("Error al obtener nutricionistas favoritos:", error);

    res.status(500).json({
      mensaje: "Error al obtener los nutricionistas favoritos",
    });
  }
});

// ==========================================
// OBTENER UN NUTRICIONISTA POR ID
// ==========================================

app.get("/api/nutricionistas/:id", async (req, res) => {
  try {
    const nutricionistaId = Number(req.params.id);

    // VALIDAR ID
    if (!Number.isInteger(nutricionistaId) || nutricionistaId <= 0) {
      return res.status(400).json({
        mensaje: "ID de nutricionista inválido",
      });
    }

    // BUSCAR NUTRICIONISTA
    const [nutricionistas] = await pool.query(
      `
                SELECT
                    n.id,
                    n.nombre,
                    n.apellido,
                    n.matricula,
                    n.descripcion,
                    n.fotoPerfil,
                    n.direccion,
                    n.telefono,
                    n.tieneWhatsapp,
                    n.email,
                    n.instagram,
                    n.sitioWeb,
                    n.horario,
                    n.latitud,
                    n.longitud,
                    n.estadoVerificacion,
                    n.calificacionPromedio,
                    n.cantidadResenas,
                    b.nombre AS barrio

                FROM nutricionista n

                INNER JOIN barrio b
                    ON n.barrioId = b.id

                WHERE n.id = ?
                    AND n.estadoVerificacion = 'verificado'

                LIMIT 1
            `,
      [nutricionistaId],
    );

    if (nutricionistas.length === 0) {
      return res.status(404).json({
        mensaje: "Nutricionista no encontrado",
      });
    }

    res.json(nutricionistas[0]);
  } catch (error) {
    console.error("Error al obtener el nutricionista:", error);

    res.status(500).json({
      mensaje: "Error al obtener el nutricionista",
    });
  }
});

// ==========================================
// OBTENER COMENTARIOS DE UN NUTRICIONISTA
// ==========================================

app.get("/api/nutricionistas/:id/comentarios", async (req, res) => {
  try {
    const nutricionistaId = Number(req.params.id);

    if (!Number.isInteger(nutricionistaId) || nutricionistaId <= 0) {
      return res.status(400).json({
        mensaje: "ID de nutricionista inválido",
      });
    }

    // VERIFICAR QUE EL NUTRICIONISTA SEA PÚBLICO
    const [nutricionistas] = await pool.query(
      `
                SELECT id
                FROM nutricionista
                WHERE id = ?
                    AND estadoVerificacion = 'verificado'
                LIMIT 1
            `,
      [nutricionistaId],
    );

    if (nutricionistas.length === 0) {
      return res.status(404).json({
        mensaje: "Nutricionista no encontrado",
      });
    }

    // OBTENER SOLO COMENTARIOS APROBADOS
    const [comentarios] = await pool.query(
      `
                SELECT
                    cn.id,
                    cn.titulo,
                    cn.comentario,
                    cn.calificacion,
                    cn.fechaComentario,
                    u.nombre AS usuarioNombre,
                    u.apellido AS usuarioApellido

                FROM comentarionutricionista cn

                INNER JOIN usuario u
                    ON cn.usuarioId = u.id

                WHERE cn.nutricionistaId = ?
                    AND cn.estado = 'aprobado'

                ORDER BY cn.fechaComentario DESC
            `,
      [nutricionistaId],
    );

    res.json(comentarios);
  } catch (error) {
    console.error("Error al obtener comentarios del nutricionista:", error);

    res.status(500).json({
      mensaje: "Error al obtener los comentarios",
    });
  }
});

// ==========================================
// CREAR COMENTARIO DE NUTRICIONISTA
// ==========================================

app.post(
  "/api/nutricionistas/:id/comentarios",
  verificarToken,
  async (req, res) => {
    try {
      const nutricionistaId = Number(req.params.id);

      const usuarioId = Number(req.usuario.id);

      const { titulo, comentario, calificacion } = req.body;

      const calificacionNumero = Number(calificacion);

      // ==================================
      // VALIDAR NUTRICIONISTA
      // ==================================

      if (!Number.isInteger(nutricionistaId) || nutricionistaId <= 0) {
        return res.status(400).json({
          mensaje: "ID de nutricionista inválido",
        });
      }

      // ==================================
      // VALIDAR CAMPOS
      // ==================================

      if (!titulo || !titulo.trim() || !comentario || !comentario.trim()) {
        return res.status(400).json({
          mensaje: "Título y comentario son obligatorios",
        });
      }

      if (titulo.trim().length > 150) {
        return res.status(400).json({
          mensaje: "El título no puede superar los 150 caracteres",
        });
      }

      if (
        !Number.isInteger(calificacionNumero) ||
        calificacionNumero < 1 ||
        calificacionNumero > 5
      ) {
        return res.status(400).json({
          mensaje: "La calificación debe ser entre 1 y 5 estrellas",
        });
      }

      // ==================================
      // VERIFICAR NUTRICIONISTA
      // ==================================

      const [nutricionistas] = await pool.query(
        `
                    SELECT id
                    FROM nutricionista
                    WHERE id = ?
                        AND estadoVerificacion = 'verificado'
                    LIMIT 1
                `,
        [nutricionistaId],
      );

      if (nutricionistas.length === 0) {
        return res.status(404).json({
          mensaje: "Nutricionista no encontrado",
        });
      }

      // ==================================
      // VERIFICAR OPINIÓN EXISTENTE
      // ==================================

      const [comentariosExistentes] = await pool.query(
        `
                    SELECT id
                    FROM comentarionutricionista
                    WHERE usuarioId = ?
                        AND nutricionistaId = ?
                    LIMIT 1
                `,
        [usuarioId, nutricionistaId],
      );

      if (comentariosExistentes.length > 0) {
        return res.status(409).json({
          mensaje: "Ya dejaste una opinión para este nutricionista",
        });
      }

      // ==================================
      // CREAR COMENTARIO
      // ==================================

      const [resultado] = await pool.query(
        `
                    INSERT INTO comentarionutricionista (
                        titulo,
                        comentario,
                        calificacion,
                        estado,
                        usuarioId,
                        nutricionistaId
                    )
                    VALUES (?, ?, ?, 'pendiente', ?, ?)
                `,
        [
          titulo.trim(),
          comentario.trim(),
          calificacionNumero,
          usuarioId,
          nutricionistaId,
        ],
      );

      // ==================================
      // RESPUESTA
      // ==================================

      res.status(201).json({
        mensaje: "Tu opinión fue enviada y está pendiente de aprobación",

        comentario: {
          id: resultado.insertId,
          titulo: titulo.trim(),
          comentario: comentario.trim(),
          calificacion: calificacionNumero,
          estado: "pendiente",
          nutricionistaId: nutricionistaId,
        },
      });
    } catch (error) {
      console.error("Error al crear comentario de nutricionista:", error);

      res.status(500).json({
        mensaje: "Error al enviar la opinión",
      });
    }
  },
);

// ADMIN - CREAR NUTRICIONISTA
app.post(
  "/api/admin/nutricionistas",
  verificarToken,
  verificarAdmin,
  async (req, res) => {
    try {
      const {
        nombre,
        apellido,
        matricula,
        descripcion,
        fotoPerfil,
        direccion,
        telefono,
        tieneWhatsapp,
        email,
        instagram,
        sitioWeb,
        horario,
        latitud,
        longitud,
        estadoVerificacion,
        barrioId,
      } = req.body;

      if (!nombre || !apellido || !matricula || !barrioId) {
        return res.status(400).json({
          mensaje: "Nombre, apellido, matrícula y barrio son obligatorios",
        });
      }

      const [matriculaExistente] = await pool.query(
        `
                    SELECT id
                    FROM nutricionista
                    WHERE matricula = ?
                    `,
        [matricula],
      );

      if (matriculaExistente.length > 0) {
        return res.status(409).json({
          mensaje: "Ya existe un nutricionista con esa matrícula",
        });
      }

      const [resultado] = await pool.query(
        `
                    INSERT INTO nutricionista (
                        nombre,
                        apellido,
                        matricula,
                        descripcion,
                        fotoPerfil,
                        direccion,
                        telefono,
                        tieneWhatsapp,
                        email,
                        instagram,
                        sitioWeb,
                        horario,
                        latitud,
                        longitud,
                        estadoVerificacion,
                        calificacionPromedio,
                        cantidadResenas,
                        barrioId,
                        fechaCreacion
                    )
                    VALUES (
                        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
                        ?, ?, ?, ?, ?, 0, 0, ?, NOW()
                    )
                    `,
        [
          nombre,
          apellido,
          matricula,
          descripcion || null,
          fotoPerfil || null,
          direccion || null,
          telefono || null,
          tieneWhatsapp ? 1 : 0,
          email || null,
          instagram || null,
          sitioWeb || null,
          horario || null,
          latitud || null,
          longitud || null,
          estadoVerificacion || "pendiente",
          barrioId,
        ],
      );

      res.status(201).json({
        mensaje: "Nutricionista creado correctamente",
        id: resultado.insertId,
      });
    } catch (error) {
      console.error("Error al crear nutricionista:", error);

      res.status(500).json({
        mensaje: "Error al crear el nutricionista",
      });
    }
  },
);

// ADMIN - ACTUALIZAR NUTRICIONISTA
app.put(
  "/api/admin/nutricionistas/:id",
  verificarToken,
  verificarAdmin,
  async (req, res) => {
    try {
      const nutricionistaId = Number(req.params.id);

      if (!Number.isInteger(nutricionistaId) || nutricionistaId <= 0) {
        return res.status(400).json({
          mensaje: "ID de nutricionista inválido",
        });
      }

      const {
        nombre,
        apellido,
        matricula,
        descripcion,
        fotoPerfil,
        direccion,
        telefono,
        tieneWhatsapp,
        email,
        instagram,
        sitioWeb,
        horario,
        latitud,
        longitud,
        estadoVerificacion,
        barrioId,
      } = req.body;

      if (!nombre || !apellido || !matricula || !barrioId) {
        return res.status(400).json({
          mensaje: "Nombre, apellido, matrícula y barrio son obligatorios",
        });
      }

      const [existente] = await pool.query(
        `
                    SELECT id
                    FROM nutricionista
                    WHERE id = ?
                    `,
        [nutricionistaId],
      );

      if (existente.length === 0) {
        return res.status(404).json({
          mensaje: "Nutricionista no encontrado",
        });
      }

      const [matriculaExistente] = await pool.query(
        `
                    SELECT id
                    FROM nutricionista
                    WHERE matricula = ?
                    AND id <> ?
                    `,
        [matricula, nutricionistaId],
      );

      if (matriculaExistente.length > 0) {
        return res.status(409).json({
          mensaje: "Ya existe otro nutricionista con esa matrícula",
        });
      }

      await pool.query(
        `
                UPDATE nutricionista
                SET
                    nombre = ?,
                    apellido = ?,
                    matricula = ?,
                    descripcion = ?,
                    fotoPerfil = ?,
                    direccion = ?,
                    telefono = ?,
                    tieneWhatsapp = ?,
                    email = ?,
                    instagram = ?,
                    sitioWeb = ?,
                    horario = ?,
                    latitud = ?,
                    longitud = ?,
                    estadoVerificacion = ?,
                    barrioId = ?
                WHERE id = ?
                `,
        [
          nombre,
          apellido,
          matricula,
          descripcion || null,
          fotoPerfil || null,
          direccion || null,
          telefono || null,
          tieneWhatsapp ? 1 : 0,
          email || null,
          instagram || null,
          sitioWeb || null,
          horario || null,
          latitud || null,
          longitud || null,
          estadoVerificacion || "pendiente",
          barrioId,
          nutricionistaId,
        ],
      );

      res.json({
        mensaje: "Nutricionista actualizado correctamente",
      });
    } catch (error) {
      console.error("Error al actualizar nutricionista:", error);

      res.status(500).json({
        mensaje: "Error al actualizar el nutricionista",
      });
    }
  },
);

// ADMIN - ELIMINAR NUTRICIONISTA
app.delete(
  "/api/admin/nutricionistas/:id",
  verificarToken,
  verificarAdmin,
  async (req, res) => {
    try {
      const nutricionistaId = Number(req.params.id);

      if (!Number.isInteger(nutricionistaId) || nutricionistaId <= 0) {
        return res.status(400).json({
          mensaje: "ID de nutricionista inválido",
        });
      }

      const [existente] = await pool.query(
        `
                    SELECT id, nombre, apellido
                    FROM nutricionista
                    WHERE id = ?
                    `,
        [nutricionistaId],
      );

      if (existente.length === 0) {
        return res.status(404).json({
          mensaje: "Nutricionista no encontrado",
        });
      }

      // Eliminar relaciones asociadas
      await pool.query(
        `
                DELETE FROM comentarionutricionista
                WHERE nutricionistaId = ?
                `,
        [nutricionistaId],
      );

      await pool.query(
        `
                DELETE FROM favoritonutricionista
                WHERE nutricionistaId = ?
                `,
        [nutricionistaId],
      );

      // Eliminar nutricionista
      await pool.query(
        `
                DELETE FROM nutricionista
                WHERE id = ?
                `,
        [nutricionistaId],
      );

      res.json({
        mensaje: "Nutricionista eliminado correctamente",
      });
    } catch (error) {
      console.error("Error al eliminar nutricionista:", error);

      res.status(500).json({
        mensaje: "Error al eliminar el nutricionista",
      });
    }
  },
);

// ==========================================
// ADMIN - COMENTARIOS DE NUTRICIONISTAS
// ==========================================

app.get(
  "/api/admin/comentarios/nutricionistas",
  verificarToken,
  verificarAdminOModerador,
  async (req, res) => {
    try {
      const [comentarios] = await pool.query(`
                    SELECT
                        cn.id,
                        cn.titulo,
                        cn.comentario,
                        cn.calificacion,
                        cn.fechaComentario,
                        cn.estado,

                        u.nombre AS usuarioNombre,
                        u.apellido AS usuarioApellido,

                        n.id AS nutricionistaId,
                        CONCAT(
                            n.nombre,
                            ' ',
                            n.apellido
                        ) AS nutricionistaNombre

                    FROM comentarionutricionista cn

                    INNER JOIN usuario u
                        ON u.id = cn.usuarioId

                    INNER JOIN nutricionista n
                        ON n.id = cn.nutricionistaId

                    WHERE cn.estado = 'pendiente'

                    ORDER BY
                        cn.fechaComentario DESC,
                        cn.id DESC
                `);

      res.json(comentarios);
    } catch (error) {
      console.error("Error al obtener comentarios de nutricionistas:", error);

      res.status(500).json({
        mensaje: "Error al obtener comentarios de nutricionistas",
      });
    }
  },
);

// ==========================================
// ADMIN - MODERAR COMENTARIO NUTRICIONISTA
// ==========================================

app.patch(
  "/api/admin/comentarios/nutricionistas/:id",
  verificarToken,
  verificarAdminOModerador,
  async (req, res) => {
    const conexion = await pool.getConnection();

    try {
      const comentarioId = Number(req.params.id);

      const { estado } = req.body;

      if (!Number.isInteger(comentarioId) || comentarioId <= 0) {
        return res.status(400).json({
          mensaje: "ID de comentario inválido",
        });
      }

      if (!["aprobado", "rechazado"].includes(estado)) {
        return res.status(400).json({
          mensaje: "Estado inválido",
        });
      }

      await conexion.beginTransaction();

      // ==================================
      // BUSCAR COMENTARIO
      // ==================================

      const [comentarios] = await conexion.query(
        `
                    SELECT
                        id,
                        nutricionistaId
                    FROM comentarionutricionista
                    WHERE id = ?
                    LIMIT 1
                `,
        [comentarioId],
      );

      if (comentarios.length === 0) {
        await conexion.rollback();

        return res.status(404).json({
          mensaje: "Comentario no encontrado",
        });
      }

      const nutricionistaId = comentarios[0].nutricionistaId;

      // ==================================
      // ACTUALIZAR ESTADO
      // ==================================

      await conexion.query(
        `
                UPDATE comentarionutricionista
                SET estado = ?
                WHERE id = ?
            `,
        [estado, comentarioId],
      );

      // ==================================
      // RECALCULAR CALIFICACIÓN
      // ==================================

      const [resumen] = await conexion.query(
        `
                    SELECT
                        COALESCE(
                            AVG(calificacion),
                            0
                        ) AS promedio,

                        COUNT(*) AS cantidad

                    FROM comentarionutricionista

                    WHERE nutricionistaId = ?
                        AND estado = 'aprobado'
                `,
        [nutricionistaId],
      );

      const promedio = Number(resumen[0].promedio || 0);

      const cantidad = Number(resumen[0].cantidad || 0);

      // ==================================
      // ACTUALIZAR NUTRICIONISTA
      // ==================================

      await conexion.query(
        `
                UPDATE nutricionista
                SET
                    calificacionPromedio = ?,
                    cantidadResenas = ?
                WHERE id = ?
            `,
        [promedio, cantidad, nutricionistaId],
      );

      await conexion.commit();

      res.json({
        mensaje:
          estado === "aprobado"
            ? "Comentario aprobado correctamente"
            : "Comentario rechazado correctamente",
      });
    } catch (error) {
      await conexion.rollback();

      console.error("Error al moderar comentario de nutricionista:", error);

      res.status(500).json({
        mensaje: "Error al moderar comentario de nutricionista",
      });
    } finally {
      conexion.release();
    }
  },
);

// ==========================================
// ADMIN - MARCAS
// ==========================================

app.get(
  "/api/admin/marcas",
  verificarToken,
  verificarAdmin,
  async (req, res) => {
    try {
      const [marcas] = await pool.query(`
                    SELECT id, nombre
                    FROM marca
                    ORDER BY nombre ASC
                `);

      res.json(marcas);
    } catch (error) {
      console.error("Error al obtener marcas:", error);

      res.status(500).json({
        mensaje: "Error al obtener las marcas",
      });
    }
  },
);

// ==========================================
// ADMIN - CATEGORÍAS
// ==========================================

app.get(
  "/api/admin/categorias",
  verificarToken,
  verificarAdmin,
  async (req, res) => {
    try {
      const [categorias] = await pool.query(`
                    SELECT id, nombre
                    FROM categoria
                    ORDER BY nombre ASC
                `);

      res.json(categorias);
    } catch (error) {
      console.error("Error al obtener categorías:", error);

      res.status(500).json({
        mensaje: "Error al obtener las categorías",
      });
    }
  },
);

// ==========================================
// ADMIN - TIPOS DE RESTAURANTE
// ==========================================

app.get(
  "/api/admin/tipos-restaurante",
  verificarToken,
  verificarAdmin,
  async (req, res) => {
    try {
      const [tipos] = await pool.query(`
                    SELECT id, nombre
                    FROM tipoRestaurante
                    ORDER BY nombre ASC
                `);

      res.json(tipos);
    } catch (error) {
      console.error("Error al obtener tipos de restaurante:", error);

      res.status(500).json({
        mensaje: "Error al obtener los tipos de restaurante",
      });
    }
  },
);

// ==========================================
// ADMIN - BARRIOS
// ==========================================

app.get(
  "/api/admin/barrios",
  verificarToken,
  verificarAdmin,
  async (req, res) => {
    try {
      const [barrios] = await pool.query(`
                    SELECT id, nombre
                    FROM barrio
                    ORDER BY nombre ASC
                `);

      res.json(barrios);
    } catch (error) {
      console.error("Error al obtener barrios:", error);

      res.status(500).json({
        mensaje: "Error al obtener los barrios",
      });
    }
  },
);

// ==========================================
// ADMIN - LISTAR TODOS LOS RESTAURANTES
// ==========================================

app.get(
  "/api/admin/restaurantes",
  verificarToken,
  verificarAdmin,
  async (req, res) => {
    try {
      const [restaurantes] = await pool.query(`
                    SELECT
                        r.id,
                        r.nombre,
                        r.descripcion,
                        r.direccion,
                        r.imagenExterior,
                        r.imagenInterior,
                        r.sitioWeb,
                        r.horario,
                        r.latitud,
                        r.longitud,
                        r.instagram,
                        r.email,
                        r.telefono,
                        r.estadoVerificacion,
                        r.calificacionPromedio,
                        r.cantidadResenas,
                        r.tipoRestauranteId,
                        r.barrioId,
                        r.fechaCreacion,
                        tr.nombre AS tipo,
                        b.nombre AS barrio
                    FROM restaurante r
                    INNER JOIN tipoRestaurante tr
                        ON r.tipoRestauranteId = tr.id
                    INNER JOIN barrio b
                        ON r.barrioId = b.id
                    ORDER BY r.nombre ASC
                `);

      res.json(restaurantes);
    } catch (error) {
      console.error("Error al obtener restaurantes para admin:", error);

      res.status(500).json({
        mensaje: "Error al obtener los restaurantes",
      });
    }
  },
);

// ==========================================
// ADMIN - ACTUALIZAR RESTAURANTE
// ==========================================

app.put(
  "/api/admin/restaurantes/:id",
  verificarToken,
  verificarAdmin,
  async (req, res) => {
    try {
      const restauranteId = Number(req.params.id);

      if (!Number.isInteger(restauranteId) || restauranteId <= 0) {
        return res.status(400).json({
          mensaje: "ID de restaurante inválido",
        });
      }

      const {
        nombre,
        descripcion,
        direccion,
        imagenExterior,
        imagenInterior,
        sitioWeb,
        horario,
        latitud,
        longitud,
        instagram,
        email,
        telefono,
        estadoVerificacion,
        tipoRestauranteId,
        barrioId,
      } = req.body;

      if (!nombre || !direccion || !tipoRestauranteId || !barrioId) {
        return res.status(400).json({
          mensaje: "Nombre, dirección, tipo y barrio son obligatorios",
        });
      }

      const [restaurantes] = await pool.query(
        `
                    SELECT id
                    FROM restaurante
                    WHERE id = ?
                    LIMIT 1
                `,
        [restauranteId],
      );

      if (restaurantes.length === 0) {
        return res.status(404).json({
          mensaje: "Restaurante no encontrado",
        });
      }

      await pool.query(
        `
                UPDATE restaurante
                SET
                    nombre = ?,
                    descripcion = ?,
                    direccion = ?,
                    imagenExterior = ?,
                    imagenInterior = ?,
                    sitioWeb = ?,
                    horario = ?,
                    latitud = ?,
                    longitud = ?,
                    instagram = ?,
                    email = ?,
                    telefono = ?,
                    estadoVerificacion = ?,
                    tipoRestauranteId = ?,
                    barrioId = ?
                WHERE id = ?
            `,
        [
          nombre.trim(),
          descripcion || null,
          direccion.trim(),
          imagenExterior || null,
          imagenInterior || null,
          sitioWeb || null,
          horario || null,
          latitud || null,
          longitud || null,
          instagram || null,
          email || null,
          telefono || null,
          estadoVerificacion || "pendiente",
          Number(tipoRestauranteId),
          Number(barrioId),
          restauranteId,
        ],
      );

      res.json({
        mensaje: "Restaurante actualizado correctamente",
      });
    } catch (error) {
      console.error("Error al actualizar restaurante:", error);

      res.status(500).json({
        mensaje: "Error al actualizar el restaurante",
      });
    }
  },
);

// ==========================================
// ADMIN - CREAR RESTAURANTE
// ==========================================

app.post(
  "/api/admin/restaurantes",
  verificarToken,
  verificarAdmin,
  async (req, res) => {
    try {
      const {
        nombre,
        descripcion,
        direccion,
        imagenExterior,
        imagenInterior,
        sitioWeb,
        horario,
        latitud,
        longitud,
        instagram,
        email,
        telefono,
        estadoVerificacion,
        tipoRestauranteId,
        barrioId,
      } = req.body;

      if (!nombre || !direccion || !tipoRestauranteId || !barrioId) {
        return res.status(400).json({
          mensaje: "Nombre, dirección, tipo y barrio son obligatorios",
        });
      }

      const [resultado] = await pool.query(
        `
                    INSERT INTO restaurante (
                        nombre,
                        descripcion,
                        direccion,
                        imagenExterior,
                        imagenInterior,
                        sitioWeb,
                        horario,
                        latitud,
                        longitud,
                        instagram,
                        email,
                        telefono,
                        estadoVerificacion,
                        calificacionPromedio,
                        cantidadResenas,
                        tipoRestauranteId,
                        barrioId,
                        fechaCreacion
                    )
                    VALUES (
                        ?, ?, ?, ?, ?, ?,
                        ?, ?, ?, ?, ?, ?,
                        ?, 0, 0, ?, ?, NOW()
                    )
                `,
        [
          nombre.trim(),
          descripcion || null,
          direccion.trim(),
          imagenExterior || null,
          imagenInterior || null,
          sitioWeb || null,
          horario || null,
          latitud || null,
          longitud || null,
          instagram || null,
          email || null,
          telefono || null,
          estadoVerificacion || "pendiente",
          Number(tipoRestauranteId),
          Number(barrioId),
        ],
      );

      res.status(201).json({
        mensaje: "Restaurante creado correctamente",

        id: resultado.insertId,
      });
    } catch (error) {
      console.error("Error al crear restaurante:", error);

      res.status(500).json({
        mensaje: "Error al crear el restaurante",
      });
    }
  },
);

// ==========================================
// ADMIN - CREAR PRODUCTO
// ==========================================

app.post(
  "/api/admin/productos",
  verificarToken,
  verificarAdmin,
  async (req, res) => {
    try {
      const {
        nombre,
        descripcion,
        ingredientes,
        informacionNutricional,
        imagen,
        codigoBarras,
        certificadoSinTacc,
        estadoVerificacion,
        marcaId,
        categoriaId,
      } = req.body;

      if (!nombre || !marcaId || !categoriaId) {
        return res.status(400).json({
          mensaje: "Nombre, marca y categoría son obligatorios",
        });
      }

      const [resultado] = await pool.query(
        `
                    INSERT INTO producto (
                        nombre,
                        descripcion,
                        ingredientes,
                        informacionNutricional,
                        imagen,
                        codigoBarras,
                        certificadoSinTacc,
                        fechaCreacion,
                        estadoVerificacion,
                        marcaId,
                        categoriaId
                    )
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?, ?)
                `,
        [
          nombre.trim(),
          descripcion || null,
          ingredientes || null,
          informacionNutricional || null,
          imagen || null,
          codigoBarras || null,
          Number(certificadoSinTacc) === 1 ? 1 : 0,
          ["pendiente", "verificado", "rechazado"].includes(estadoVerificacion)
            ? estadoVerificacion
            : "pendiente",
          Number(marcaId),
          Number(categoriaId),
        ],
      );

      res.status(201).json({
        mensaje: "Producto creado correctamente",

        id: resultado.insertId,
      });
    } catch (error) {
      console.error("Error al crear producto:", error);

      res.status(500).json({
        mensaje: "Error al crear el producto",
      });
    }
  },
);

// ==========================================
// ADMIN - EDITAR PRODUCTO
// ==========================================

app.put(
  "/api/admin/productos/:id",
  verificarToken,
  verificarAdmin,
  async (req, res) => {
    try {
      const productoId = Number(req.params.id);

      if (!Number.isInteger(productoId) || productoId <= 0) {
        return res.status(400).json({
          mensaje: "ID de producto inválido",
        });
      }

      const {
        nombre,
        descripcion,
        ingredientes,
        informacionNutricional,
        imagen,
        codigoBarras,
        certificadoSinTacc,
        estadoVerificacion,
        marcaId,
        categoriaId,
      } = req.body;

      if (!nombre || !marcaId || !categoriaId) {
        return res.status(400).json({
          mensaje: "Nombre, marca y categoría son obligatorios",
        });
      }

      const [productos] = await pool.query(
        `
                    SELECT id
                    FROM producto
                    WHERE id = ?
                    LIMIT 1
                `,
        [productoId],
      );

      if (productos.length === 0) {
        return res.status(404).json({
          mensaje: "Producto no encontrado",
        });
      }

      await pool.query(
        `
                UPDATE producto
                SET
                    nombre = ?,
                    descripcion = ?,
                    ingredientes = ?,
                    informacionNutricional = ?,
                    imagen = ?,
                    codigoBarras = ?,
                    certificadoSinTacc = ?,
                    estadoVerificacion = ?,
                    marcaId = ?,
                    categoriaId = ?
                WHERE id = ?
            `,
        [
          nombre.trim(),
          descripcion || null,
          ingredientes || null,
          informacionNutricional || null,
          imagen || null,
          codigoBarras || null,
          Number(certificadoSinTacc) === 1 ? 1 : 0,
          ["pendiente", "verificado", "rechazado"].includes(estadoVerificacion)
            ? estadoVerificacion
            : "pendiente",
          Number(marcaId),
          Number(categoriaId),
          productoId,
        ],
      );

      res.json({
        mensaje: "Producto actualizado correctamente",
      });
    } catch (error) {
      console.error("Error al actualizar producto:", error);

      res.status(500).json({
        mensaje: "Error al actualizar el producto",
      });
    }
  },
);

// ==========================================
// ADMIN - ELIMINAR RESTAURANTE
// ==========================================

app.delete(
  "/api/admin/restaurantes/:id",
  verificarToken,
  verificarAdmin,
  async (req, res) => {
    try {
      const restauranteId = Number(req.params.id);

      if (!Number.isInteger(restauranteId) || restauranteId <= 0) {
        return res.status(400).json({
          mensaje: "ID de restaurante inválido",
        });
      }

      const [restaurantes] = await pool.query(
        `
                    SELECT id
                    FROM restaurante
                    WHERE id = ?
                    LIMIT 1
                `,
        [restauranteId],
      );

      if (restaurantes.length === 0) {
        return res.status(404).json({
          mensaje: "Restaurante no encontrado",
        });
      }

      await pool.query(
        `
                DELETE FROM restaurante
                WHERE id = ?
            `,
        [restauranteId],
      );

      res.json({
        mensaje: "Restaurante eliminado correctamente",
      });
    } catch (error) {
      console.error("Error al eliminar restaurante:", error);

      res.status(500).json({
        mensaje: "Error al eliminar el restaurante",
      });
    }
  },
);

/* =====================================================
   ADMIN - LOCALES
===================================================== */

// Obtener todos los locales para administración
app.get(
  "/api/admin/locales",
  verificarToken,
  verificarAdmin,
  async (req, res) => {
    try {
      const [locales] = await pool.query(`
                    SELECT
                        l.id,
                        l.nombre,
                        l.descripcion,
                        l.imagen,
                        l.direccion,
                        l.telefono,
                        l.email,
                        l.instagram,
                        l.sitioWeb,
                        l.horario,
                        l.latitud,
                        l.longitud,
                        l.estadoVerificacion,
                        l.calificacionPromedio,
                        l.cantidadResenas,
                        l.tipoLocalId,
                        l.barrioId,
                        l.fechaCreacion,
                        tl.nombre AS tipo,
                        b.nombre AS barrio
                    FROM local l
                    INNER JOIN tipoLocal tl
                        ON l.tipoLocalId = tl.id
                    INNER JOIN barrio b
                        ON l.barrioId = b.id
                    ORDER BY l.nombre ASC
                `);

      res.json(locales);
    } catch (error) {
      console.error("Error al obtener locales para admin:", error);

      res.status(500).json({
        mensaje: "Error al obtener los locales",
      });
    }
  },
);

// Crear nuevo local
app.post(
  "/api/admin/locales",
  verificarToken,
  verificarAdmin,
  async (req, res) => {
    try {
      const {
        nombre,
        descripcion,
        imagen,
        direccion,
        telefono,
        email,
        instagram,
        sitioWeb,
        horario,
        latitud,
        longitud,
        estadoVerificacion,
        tipoLocalId,
        barrioId,
      } = req.body;

      if (!nombre || !tipoLocalId || !barrioId) {
        return res.status(400).json({
          mensaje: "Nombre, tipo de local y barrio son obligatorios",
        });
      }

      const [resultado] = await pool.query(
        `
                    INSERT INTO local (
                        nombre,
                        descripcion,
                        imagen,
                        direccion,
                        telefono,
                        email,
                        instagram,
                        sitioWeb,
                        horario,
                        latitud,
                        longitud,
                        estadoVerificacion,
                        calificacionPromedio,
                        cantidadResenas,
                        tipoLocalId,
                        barrioId,
                        fechaCreacion
                    )
                    VALUES (
                        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
                        ?, 0, 0, ?, ?, NOW()
                    )
                    `,
        [
          nombre,
          descripcion || null,
          imagen || null,
          direccion || null,
          telefono || null,
          email || null,
          instagram || null,
          sitioWeb || null,
          horario || null,
          latitud || null,
          longitud || null,
          estadoVerificacion || "pendiente",
          tipoLocalId,
          barrioId,
        ],
      );

      res.status(201).json({
        mensaje: "Local creado correctamente",
        id: resultado.insertId,
      });
    } catch (error) {
      console.error("Error al crear local:", error);

      res.status(500).json({
        mensaje: "Error al crear el local",
      });
    }
  },
);

// Obtener tipos de local para administración
app.get(
  "/api/admin/tipos-local",
  verificarToken,
  verificarAdmin,
  async (req, res) => {
    try {
      const [tipos] = await pool.query(`
                    SELECT id, nombre
                    FROM tipolocal
                    ORDER BY nombre ASC
                `);

      res.json(tipos);
    } catch (error) {
      console.error("Error al obtener tipos de local:", error);

      res.status(500).json({
        mensaje: "Error al obtener los tipos de local",
      });
    }
  },
);

// ==========================================
// ADMIN - ELIMINAR PRODUCTO
// ==========================================

app.delete(
  "/api/admin/productos/:id",
  verificarToken,
  verificarAdmin,
  async (req, res) => {
    try {
      const productoId = Number(req.params.id);

      if (!Number.isInteger(productoId) || productoId <= 0) {
        return res.status(400).json({
          mensaje: "ID de producto inválido",
        });
      }

      const [productos] = await pool.query(
        `
                    SELECT id
                    FROM producto
                    WHERE id = ?
                    LIMIT 1
                `,
        [productoId],
      );

      if (productos.length === 0) {
        return res.status(404).json({
          mensaje: "Producto no encontrado",
        });
      }

      await pool.query(
        `
                DELETE FROM producto
                WHERE id = ?
            `,
        [productoId],
      );

      res.json({
        mensaje: "Producto eliminado correctamente",
      });
    } catch (error) {
      console.error("Error al eliminar producto:", error);

      res.status(500).json({
        mensaje: "Error al eliminar el producto",
      });
    }
  },
);

// ==========================================
// ADMIN - ESTADÍSTICAS DEL DASHBOARD
// ==========================================

app.get(
  "/api/admin/dashboard",
  verificarToken,
  verificarAdmin,
  async (req, res) => {
    try {
      const [productos] = await pool.query(`
                SELECT COUNT(*) AS total
                FROM producto
                WHERE certificadoSinTacc = 1
            `);

      const [restaurantes] = await pool.query(`
                SELECT COUNT(*) AS total
                FROM restaurante
                WHERE estadoVerificacion = 'verificado'
            `);

      const [locales] = await pool.query(`
                SELECT COUNT(*) AS total
                FROM local
                WHERE estadoVerificacion = 'verificado'
            `);

      const [nutricionistas] = await pool.query(`
                SELECT COUNT(*) AS total
                FROM nutricionista
                WHERE estadoVerificacion = 'verificado'
            `);

      const [usuarios] = await pool.query(`
                SELECT COUNT(*) AS total
                FROM usuario
                WHERE esActivo = 1
            `);

      res.json({
        productos: Number(productos[0].total),
        restaurantes: Number(restaurantes[0].total),
        locales: Number(locales[0].total),
        nutricionistas: Number(nutricionistas[0].total),
        usuarios: Number(usuarios[0].total),
      });
    } catch (error) {
      console.error("Error al obtener estadísticas del dashboard:", error);

      res.status(500).json({
        mensaje: "Error al obtener las estadísticas del dashboard",
      });
    }
  },
);

// ADMIN - OBTENER NUTRICIONISTAS
app.get(
  "/api/admin/nutricionistas",
  verificarToken,
  verificarAdmin,
  async (req, res) => {
    try {
      const [nutricionistas] = await pool.query(`
                SELECT
                    n.id,
                    n.nombre,
                    n.apellido,
                    n.matricula,
                    n.descripcion,
                    n.fotoPerfil,
                    n.direccion,
                    n.telefono,
                    n.tieneWhatsapp,
                    n.email,
                    n.instagram,
                    n.sitioWeb,
                    n.horario,
                    n.latitud,
                    n.longitud,
                    n.estadoVerificacion,
                    n.calificacionPromedio,
                    n.cantidadResenas,
                    n.barrioId,
                    n.fechaCreacion,
                    b.nombre AS barrio
                FROM nutricionista n
                INNER JOIN barrio b
                    ON n.barrioId = b.id
                ORDER BY n.apellido ASC, n.nombre ASC
            `);

      res.json(nutricionistas);
    } catch (error) {
      console.error("Error al obtener nutricionistas para admin:", error);

      res.status(500).json({
        mensaje: "Error al obtener los nutricionistas",
      });
    }
  },
);

// ==========================================
// ADMIN - ÚLTIMAS ALTAS
// ==========================================

app.get(
  "/api/admin/ultimas-altas",
  verificarToken,
  verificarAdmin,
  async (req, res) => {
    try {
      const [altas] = await pool.query(`
                SELECT *
                FROM (
                    SELECT
                        id,
                        nombre,
                        'Producto' AS tipo,
                        CASE
                            WHEN certificadoSinTacc = 1
                                THEN 'Verificado'
                            ELSE 'Pendiente'
                        END AS estado,
                        fechaCreacion
                    FROM producto

                    UNION ALL

                    SELECT
                        id,
                        nombre,
                        'Restaurante' AS tipo,
                        estadoVerificacion AS estado,
                        fechaCreacion
                    FROM restaurante

                    UNION ALL

                    SELECT
                        id,
                        nombre,
                        'Local' AS tipo,
                        estadoVerificacion AS estado,
                        fechaCreacion
                    FROM local

                    UNION ALL

                    SELECT
                        id,
                        CONCAT(nombre, ' ', apellido) AS nombre,
                        'Nutricionista' AS tipo,
                        estadoVerificacion AS estado,
                        fechaCreacion
                    FROM nutricionista
                ) AS ultimasAltas

                WHERE fechaCreacion IS NOT NULL

                ORDER BY fechaCreacion DESC

                LIMIT 6
            `);

      res.json(altas);
    } catch (error) {
      console.error("Error al obtener últimas altas:", error);

      res.status(500).json({
        mensaje: "Error al obtener las últimas altas",
      });
    }
  },
);

// ==========================================
// INICIAR SERVIDOR
// ==========================================

app.listen(PORT, () => {
  console.log(`CeliaConnect API funcionando en http://localhost:${PORT}`);
});

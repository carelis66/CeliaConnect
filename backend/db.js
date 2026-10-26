const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

async function probarConexion() {
    try {
        const connection = await pool.getConnection();
        console.log('✅ Conexión exitosa a CeliaConnect DB');
        connection.release();
    } catch (error) {
        console.error('❌ Error al conectar con la base de datos:');
        console.error(error.message);
    }
}

probarConexion();

module.exports = pool;
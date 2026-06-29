import pg from 'pg'
import 'dotenv/config'

const { Pool } = pg

// Las credenciales se leen desde variables de entorno (.env), nunca se
// escriben directamente en el código (ver requisito 4.5 del TP).
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
})

export default pool

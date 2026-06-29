import pg from 'pg'
import bcrypt from 'bcryptjs'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import 'dotenv/config'

const { Client } = pg
const __dirname = dirname(fileURLToPath(import.meta.url))

const DB_NAME = process.env.DB_NAME
const conexionBase = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
}

const ADMIN = {
    nombre: 'Administrador',
    email: 'admin@frenkel.com',
    password: 'admin123',
}

async function main() {
    const clienteAdmin = new Client({ ...conexionBase, database: 'postgres' })
    await clienteAdmin.connect()

    const existe = await clienteAdmin.query(
        'SELECT 1 FROM pg_database WHERE datname = $1', [DB_NAME]
    )
    if (existe.rowCount === 0) {
        await clienteAdmin.query(`CREATE DATABASE ${DB_NAME}`)
        console.log(`✅ Base de datos "${DB_NAME}" creada.`)
    } else {
        console.log(`ℹ️  La base de datos "${DB_NAME}" ya existía.`)
    }
    await clienteAdmin.end()

    const cliente = new Client({ ...conexionBase, database: DB_NAME })
    await cliente.connect()

    const schema = readFileSync(join(__dirname, 'schema.sql'), 'utf-8')
    await cliente.query(schema)
    console.log('✅ Tablas creadas y datos de ejemplo cargados.')

    const hash = await bcrypt.hash(ADMIN.password, 10)
    await cliente.query(
        'INSERT INTO usuarios (nombre, email, password) VALUES ($1, $2, $3)',
        [ADMIN.nombre, ADMIN.email, hash]
    )
    console.log(`✅ Usuario admin creado → email: ${ADMIN.email} / pass: ${ADMIN.password}`)

    await cliente.end()
    console.log('🎉 Base de datos lista.')
}

main().catch(err => {
    console.error('❌ Error al preparar la base de datos:', err.message)
    process.exit(1)
})

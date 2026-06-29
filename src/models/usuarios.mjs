import pool from './db.mjs'
import bcrypt from 'bcryptjs'

// Buscar un usuario por su email (devuelve undefined si no existe)
export async function buscarPorEmail(email) {
    const resultado = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email])
    return resultado.rows[0]
}

// Crear un usuario nuevo guardando la contraseña HASHEADA (nunca en texto plano)
export async function crear({ nombre, email, password }) {
    const hash = await bcrypt.hash(password, 10)
    const resultado = await pool.query(
        'INSERT INTO usuarios (nombre, email, password) VALUES ($1, $2, $3) RETURNING id, nombre, email, rol',
        [nombre, email, hash]
    )
    return resultado.rows[0]
}

// Verificar que una contraseña en texto plano coincida con el hash guardado
export async function verificarPassword(passwordPlano, hashGuardado) {
    return bcrypt.compare(passwordPlano, hashGuardado)
}

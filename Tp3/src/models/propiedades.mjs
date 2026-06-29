import pool from './db.mjs'


//obtener todas las propiedades + filtros
export async function obtenerTodas(filtros = {}) {
    let query = 'SELECT * FROM propiedades WHERE 1=1'
    const valores = []
    let i = 1

    if (filtros.type) {
        query += ` AND type = $${i}`
        valores.push(filtros.type)
        i++
    }

    if (filtros.operation) {
        query += ` AND operation = $${i}`
        valores.push(filtros.operation)
        i++
    }

    if (filtros.minPrice) {
        query += ` AND price >= $${i}`
        valores.push(filtros.minPrice)
        i++
    }

    if (filtros.maxPrice) {
        query += ` AND price <= $${i}`
        valores.push(filtros.maxPrice)
        i++
    }

    const resultado = await pool.query(query, valores)
    return resultado.rows
}

// Obtener una propiedad por id
export async function obtenerPorId(id) {
    const resultado = await pool.query('SELECT * FROM propiedades WHERE id = $1', [id])
    return resultado.rows[0]
}

// Crear una propiedad
export async function crear(propiedad) {
    const { title, type, operation, price, address, bedrooms, bathrooms, size, image } = propiedad
    const resultado = await pool.query(
        'INSERT INTO propiedades (title, type, operation, price, address, bedrooms, bathrooms, size, image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
        [title, type, operation, price, address, bedrooms, bathrooms, size, image]
    )
    return resultado.rows[0]
}

// Modificar una propiedad
export async function modificar(id, propiedad) {
    const { title, type, operation, price, address, bedrooms, bathrooms, size, image } = propiedad
    const resultado = await pool.query(
        'UPDATE propiedades SET title=$1, type=$2, operation=$3, price=$4, address=$5, bedrooms=$6, bathrooms=$7, size=$8, image=$9 WHERE id=$10 RETURNING *',
        [title, type, operation, price, address, bedrooms, bathrooms, size, image, id]
    )
    return resultado.rows[0]
}

// Eliminar una propiedad
export async function eliminar(id) {
    await pool.query('DELETE FROM propiedades WHERE id = $1', [id])
}
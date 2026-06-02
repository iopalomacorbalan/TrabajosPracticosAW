import pg from 'pg'

const { Pool } = pg

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'frankel_llopis',
    password: 'awvalepalo',
    port: 5432,
})

export default pool
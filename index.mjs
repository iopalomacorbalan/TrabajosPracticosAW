import express from 'express'
import propiedadesRouter from './src/routes/propiedades.js'

const app = express()
const PUERTO = 3000

app.use(express.json())
app.use(express.static('public'))

// Rutas CRUD
app.use('/api/propiedades', propiedadesRouter)

app.listen(PUERTO, () => console.log(`http://localhost:${PUERTO}`))

app.use('/admin', express.static('admin'))
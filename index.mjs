import express from 'express'
import cookieParser from 'cookie-parser'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import 'dotenv/config'
import propiedadesRouter from './src/routes/propiedades.mjs'
import authRouter from './src/routes/auth.mjs'

const app = express()
const PUERTO = process.env.PORT || 3000

// Ruta absoluta a la carpeta del proyecto (no depende del directorio desde donde se ejecuta node)
const __dirname = dirname(fileURLToPath(import.meta.url))

// 1) Middlewares para interpretar el body y las cookies de las peticiones
//    (deben ir primero, así las rutas reciben req.body y req.cookies listos)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// 2) Archivos estáticos: sitio público y panel de administración
app.use(express.static(join(__dirname, 'public')))
app.use('/admin', express.static(join(__dirname, 'admin')))

// 3) Rutas de la API
// Desactivamos el caché para todas las respuestas de la API, así el browser
// siempre trae datos frescos después de un POST/PUT/DELETE.
app.use('/api', (req, res, next) => {
    res.set('Cache-Control', 'no-store')
    next()
})
app.use('/api/auth', authRouter)              // login / logout / perfil
app.use('/api/propiedades', propiedadesRouter) // CRUD

// 4) Levantar el servidor (siempre al final)
app.listen(PUERTO, () => console.log(`Servidor en http://localhost:${PUERTO}`))

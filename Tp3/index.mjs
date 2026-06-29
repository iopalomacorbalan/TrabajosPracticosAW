import express from 'express'
import cookieParser from 'cookie-parser'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import 'dotenv/config'
import propiedadesRouter from './src/routes/propiedades.mjs'
import authRouter from './src/routes/auth.mjs'

const app = express()
const PUERTO = process.env.PORT || 3000
const __dirname = dirname(fileURLToPath(import.meta.url))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(express.static(join(__dirname, 'public')))
app.use('/admin', express.static(join(__dirname, 'admin')))

app.use('/api', (req, res, next) => {
    res.set('Cache-Control', 'no-store')
    next()
})
app.use('/api/auth', authRouter)
app.use('/api/propiedades', propiedadesRouter)

app.listen(PUERTO, () => console.log(`Servidor en http://localhost:${PUERTO}`))

import express from 'express'
import * as auth from '../controllers/authController.mjs'
import { verificarToken } from '../middlewares/auth.mjs'

const router = express.Router()

// Iniciar y cerrar sesión
router.post('/login', auth.login)
router.post('/logout', auth.logout)

// Saber si hay una sesión activa (protegida por el middleware)
router.get('/perfil', verificarToken, auth.perfil)

export default router

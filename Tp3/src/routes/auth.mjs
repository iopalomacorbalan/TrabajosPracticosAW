import express from 'express'
import * as auth from '../controllers/authController.mjs'
import { verificarToken } from '../middlewares/auth.mjs'

const router = express.Router()

router.post('/login', auth.login)
router.post('/logout', auth.logout)
router.get('/perfil', verificarToken, auth.perfil)

export default router

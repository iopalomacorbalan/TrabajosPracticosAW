import express from 'express'
import * as controller from '../controllers/propiedadesController.mjs'
import { verificarToken } from '../middlewares/auth.mjs'
import upload from '../middlewares/upload.mjs'

const router = express.Router()

// ---------- Lecturas (PÚBLICAS: las usa la web pública) ----------
router.get('/', controller.obtenerTodas)
router.get('/:id', controller.obtenerPorId)

// ---------- Escrituras (PROTEGIDAS: requieren sesión / JWT válido) ----------
router.post('/', verificarToken, upload.single('image'), controller.crear)
router.put('/:id', verificarToken, upload.single('image'), controller.modificar)
router.delete('/:id', verificarToken, controller.eliminar)

export default router

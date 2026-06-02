import express from 'express'
import * as controller from '../controllers/propiedadesController.js'

const router = express.Router()

// 2 lecturas
router.get('/', controller.obtenerTodas)
router.get('/:id', controller.obtenerPorId)

// Alta
router.post('/', controller.crear)

// Modificacion
router.put('/:id', controller.modificar)

// Baja
router.delete('/:id', controller.eliminar)

export default router
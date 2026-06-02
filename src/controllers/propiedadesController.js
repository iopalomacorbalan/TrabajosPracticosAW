import * as Propiedad from '../models/propiedades.js'

export async function obtenerTodas(req, res) {
    try {
        const propiedades = await Propiedad.obtenerTodas(req.query)
        res.json(propiedades)
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener propiedades' })
    }
}

export async function obtenerPorId(req, res) {
    try {
        const propiedad = await Propiedad.obtenerPorId(req.params.id)
        res.json(propiedad)
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener propiedad' })
    }
}

export async function crear(req, res) {
    try {
        const propiedad = await Propiedad.crear(req.body)
        res.status(201).json(propiedad)
    } catch (error) {
        res.status(500).json({ error: 'Error al crear propiedad' })
    }
}

export async function modificar(req, res) {
    try {
        const propiedad = await Propiedad.modificar(req.params.id, req.body)
        res.json(propiedad)
    } catch (error) {
        res.status(500).json({ error: 'Error al modificar propiedad' })
    }
}

export async function eliminar(req, res) {
    try {
        await Propiedad.eliminar(req.params.id)
        res.json({ mensaje: 'Propiedad eliminada' })
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar propiedad' })
    }
}
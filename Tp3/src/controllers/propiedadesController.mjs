import * as Propiedad from '../models/propiedades.mjs'

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
        const propiedad = { ...req.body }
        if (req.file) {
            // Si se subió un archivo, usamos la ruta local
            propiedad.image = 'imagenes/propiedades/' + req.file.filename
        }
        const nueva = await Propiedad.crear(propiedad)
        res.status(201).json(nueva)
    } catch (error) {
        res.status(500).json({ error: 'Error al crear propiedad' })
    }
}

export async function modificar(req, res) {
    try {
        const propiedad = { ...req.body }
        if (req.file) {
            propiedad.image = 'imagenes/propiedades/' + req.file.filename
        }
        const actualizada = await Propiedad.modificar(req.params.id, propiedad)
        res.json(actualizada)
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

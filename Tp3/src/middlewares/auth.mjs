import jwt from 'jsonwebtoken'
import 'dotenv/config'

export function verificarToken(req, res, next) {
    const token = req.cookies?.token

    if (!token) {
        return res.status(401).json({ error: 'Necesitás iniciar sesión para realizar esta acción' })
    }

    try {
        const datos = jwt.verify(token, process.env.JWT_SECRET)
        req.usuario = datos
        next()
    } catch (error) {
        return res.status(401).json({ error: 'La sesión expiró o el token no es válido. Iniciá sesión nuevamente' })
    }
}

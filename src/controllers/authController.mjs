import jwt from 'jsonwebtoken'
import 'dotenv/config'
import * as Usuario from '../models/usuarios.mjs'

const opcionesCookie = {
    httpOnly: true,
    sameSite: 'strict',
    secure: false,
    maxAge: 2 * 60 * 60 * 1000,
}

export async function login(req, res) {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ error: 'Email y contraseña son obligatorios' })
        }

        const usuario = await Usuario.buscarPorEmail(email)
        if (!usuario) {
            return res.status(401).json({ error: 'Email o contraseña incorrectos' })
        }

        const coincide = await Usuario.verificarPassword(password, usuario.password)
        if (!coincide) {
            return res.status(401).json({ error: 'Email o contraseña incorrectos' })
        }

        const token = jwt.sign(
            { id: usuario.id, email: usuario.email, rol: usuario.rol },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES || '2h' }
        )

        res.cookie('token', token, opcionesCookie)
        res.json({ mensaje: 'Sesión iniciada correctamente', usuario: { nombre: usuario.nombre, email: usuario.email } })
    } catch (error) {
        res.status(500).json({ error: 'Error al iniciar sesión' })
    }
}

export function logout(req, res) {
    res.clearCookie('token', opcionesCookie)
    res.json({ mensaje: 'Sesión cerrada' })
}

export function perfil(req, res) {
    res.json({ usuario: req.usuario })
}

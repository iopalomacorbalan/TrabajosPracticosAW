import jwt from 'jsonwebtoken'
import 'dotenv/config'
import * as Usuario from '../models/usuarios.mjs'

// Opciones de la cookie donde se guarda el token.
// httpOnly => el JavaScript del navegador NO puede leerla (protege contra XSS).
const opcionesCookie = {
    httpOnly: true,
    sameSite: 'strict',         // la cookie no se envía en peticiones de otros sitios (protege contra CSRF)
    secure: false,              // en producción (HTTPS) debería ser true
    maxAge: 2 * 60 * 60 * 1000, // 2 horas, igual que el token
}

// ---------- POST /api/auth/login ----------
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

// ---------- POST /api/auth/logout ----------
export function logout(req, res) {
    res.clearCookie('token', opcionesCookie)
    res.json({ mensaje: 'Sesión cerrada' })
}

// ---------- GET /api/auth/perfil  (ruta protegida) ----------
// Sirve para que el frontend sepa si hay una sesión activa
export function perfil(req, res) {
    res.json({ usuario: req.usuario })
}

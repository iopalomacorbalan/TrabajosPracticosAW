import multer from 'multer'
import { dirname, join, extname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const storage = multer.diskStorage({
    destination: join(__dirname, '../../public/imagenes/propiedades'),
    filename: (req, file, cb) => {
        const ext = extname(file.originalname)
        cb(null, `prop_${Date.now()}${ext}`)
    }
})

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const permitidos = /jpeg|jpg|png|webp/
        if (permitidos.test(extname(file.originalname).toLowerCase())) {
            cb(null, true)
        } else {
            cb(new Error('Solo se permiten imágenes (jpg, png, webp)'))
        }
    },
    limits: { fileSize: 5 * 1024 * 1024 }
})

export default upload

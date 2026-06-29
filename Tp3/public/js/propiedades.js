// ---------- Referencias al DOM ----------
const formFiltros = document.getElementById('filtros')

// ---------- Imágenes locales agrupadas por tipo de propiedad ----------
const imagenesPorTipo = {
    casa: [
        'imagenes/propiedades/Casamoderna.jpeg',
        'imagenes/propiedades/Casaconpatio.jpg',
        'imagenes/propiedades/casaeconomica.jpg',
        'imagenes/propiedades/casapremium.jpg'
    ],
    departamento: [
        'imagenes/propiedades/Dptocentrico.jpg',
        'imagenes/propiedades/Dptomoderno.jpg',
        'imagenes/propiedades/dptopeuqneo.jpg'
    ],
    ph: [
        'imagenes/propiedades/Casaconpatio.jpg',
        'imagenes/propiedades/casaeconomica.jpg'
    ],
    terreno: [
        'imagenes/propiedades/Terrenoampplio.jpeg'
    ]
}

function obtenerImagen(p) {
    const tipo = (p.type || '').toLowerCase()
    const pool = imagenesPorTipo[tipo]
    if (!pool || pool.length === 0) {
        return `https://picsum.photos/seed/prop${p.id}/400/300`
    }
    const indice = Math.abs(Number(p.id) || 0) % pool.length
    return pool[indice]
}

// ---------- Función principal: trae las propiedades y las muestra ----------
async function cargarPropiedades(contenedorId, opciones = {}) {
    const contenedor = document.getElementById(contenedorId)
    contenedor.innerHTML = '<p class="cargando">Cargando propiedades...</p>'

    try {
        const url = construirURL(opciones)
        const respuesta = await fetch(url)
        let propiedades = await respuesta.json()

        if (opciones.limit) {
            propiedades = propiedades.slice(0, opciones.limit)
        }

        if (propiedades.length === 0) {
            contenedor.innerHTML = '<p class="sin-resultados">No hay propiedades que coincidan.</p>'
            return
        }

        mostrarPropiedades(propiedades, contenedor)

    } catch (error) {
        console.log('Error:', error)
        contenedor.innerHTML = '<p class="sin-resultados">Error al cargar las propiedades.</p>'
    }
}

// ---------- Arma la URL con los filtros ----------
function construirURL(opciones) {
    const params = new URLSearchParams()

    if (opciones.type)       params.append('type', opciones.type)
    if (opciones.operation)  params.append('operation', opciones.operation)
    if (opciones.minPrice)   params.append('minPrice', opciones.minPrice)
    if (opciones.maxPrice)   params.append('maxPrice', opciones.maxPrice)

    const queryString = params.toString()
    return '/api/propiedades' + (queryString ? '?' + queryString : '')
}

// ---------- Renderiza el listado completo en el contenedor ----------
function mostrarPropiedades(lista, contenedor) {
    contenedor.innerHTML = ''

    lista.forEach(propiedad => {
        const tarjeta = crearTarjeta(propiedad)
        contenedor.appendChild(tarjeta)
    })
}

// ---------- Arma una sola tarjeta de propiedad ----------
function crearTarjeta(p) {
    const imagen = obtenerImagen(p)
    const precio = Number(p.price).toLocaleString('es-AR')

    const tarjeta = document.createElement('article')
    tarjeta.className = 'propiedad'

    tarjeta.innerHTML = `
        <img src="${imagen}" alt="${p.title}">
        <div class="propiedad-body">
            <span class="badge">${p.operation}</span>
            <h3>${p.title}</h3>
            <p class="precio">$${precio}</p>
            <p>${p.address}</p>
            <div class="detalles">
                <span>🛏 ${p.bedrooms} dorm.</span>
                <span>🛁 ${p.bathrooms} baños</span>
                <span>📐 ${p.size} m²</span>
            </div>
        </div>
    `

    return tarjeta
}

// ---------- Aplica los filtros del formulario ----------
function aplicarFiltros(evento) {
    evento.preventDefault()

    const datos = new FormData(formFiltros)
    const opciones = {}

    for (const [clave, valor] of datos.entries()) {
        if (valor) opciones[clave] = valor
    }

    cargarPropiedades('listado', opciones)
}

// ---------- Eventos ----------
if (formFiltros) {
    formFiltros.addEventListener('submit', aplicarFiltros)
}
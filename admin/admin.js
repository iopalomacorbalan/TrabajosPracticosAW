const API = '/api/propiedades'

// Cargar y mostrar todas las propiedades
async function cargarPropiedades() {
    const respuesta = await fetch(API)
    const propiedades = await respuesta.json()
    const lista = document.getElementById('lista')
    lista.innerHTML = ''

    propiedades.forEach(p => {
        lista.innerHTML += `
            <div>
                <h3>${p.title}</h3>
                <p>${p.type} | ${p.operation} | $${p.price}</p>
                <p>${p.address}</p>
                <button onclick="eliminar(${p.id})">Eliminar</button>
                <button onclick="editar(${p.id})">Editar</button>
            </div>
            <hr>
        `
    })
}

// Crear propiedad
async function crear() {
    const propiedad = {
        title: document.getElementById('title').value,
        type: document.getElementById('type').value,
        operation: document.getElementById('operation').value,
        price: document.getElementById('price').value,
        address: document.getElementById('address').value,
        bedrooms: document.getElementById('bedrooms').value,
        bathrooms: document.getElementById('bathrooms').value,
        size: document.getElementById('size').value,
        image: document.getElementById('image').value,
    }

    await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(propiedad)
    })

    cargarPropiedades()
}

// Eliminar propiedad
async function eliminar(id) {
    await fetch(`${API}/${id}`, { method: 'DELETE' })
    cargarPropiedades()
}

// Editar propiedad
async function editar(id) {
    const propiedad = {
        title: document.getElementById('title').value,
        type: document.getElementById('type').value,
        operation: document.getElementById('operation').value,
        price: document.getElementById('price').value,
        address: document.getElementById('address').value,
        bedrooms: document.getElementById('bedrooms').value,
        bathrooms: document.getElementById('bathrooms').value,
        size: document.getElementById('size').value,
        image: document.getElementById('image').value,
    }

    await fetch(`${API}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(propiedad)
    })

    cargarPropiedades()
}

cargarPropiedades()
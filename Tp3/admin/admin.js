const API = '/api/propiedades'

let editandoId = null
let imagenActual = ''

async function verificarSesion() {
  try {
    const respuesta = await fetch('/api/auth/perfil')
    if (!respuesta.ok) {
      window.location.replace('login.html')
      throw new Error('sin sesión')
    }
  } catch (error) {
    if (error.message !== 'sin sesión') window.location.replace('login.html')
    throw error
  }
}

async function cerrarSesion() {
  await fetch('/api/auth/logout', { method: 'POST' })
  window.location.href = 'login.html'
}

const CAMPOS_TEXTO = ['title', 'type', 'operation', 'price', 'address', 'bedrooms', 'bathrooms', 'size']

function mostrarMensaje(texto, tipo = 'ok') {
  const div = document.getElementById('mensaje')
  div.textContent = texto
  div.className = `mensaje ${tipo}`
  setTimeout(() => { div.className = 'mensaje' }, 3500)
}

function limpiarFormulario() {
  CAMPOS_TEXTO.forEach(campo => { document.getElementById(campo).value = '' })
  document.getElementById('image').value = ''
  document.getElementById('imagen-actual').textContent = ''
  editandoId = null
  imagenActual = ''
  document.getElementById('form-titulo').textContent = 'Nueva propiedad'
}

function cancelarEdicion() {
  limpiarFormulario()
  mostrarMensaje('Edición cancelada')
}

function armarFormData() {
  const fd = new FormData()
  CAMPOS_TEXTO.forEach(campo => {
    const el = document.getElementById(campo)
    let val = el.value
    if (el.type === 'number') {
      const num = parseFloat(val.replace(',', '.'))
      val = isNaN(num) ? '' : num
    }
    fd.append(campo, val)
  })
  const fileInput = document.getElementById('image')
  if (fileInput.files[0]) {
    fd.append('image', fileInput.files[0])
  } else if (imagenActual) {
    fd.append('image', imagenActual)
  }
  return fd
}

async function cargarPropiedades() {
  try {
    const respuesta = await fetch(API)
    const propiedades = await respuesta.json()
    const lista = document.getElementById('lista')
    lista.innerHTML = ''

    if (propiedades.length === 0) {
      lista.innerHTML = '<p>No hay propiedades cargadas todavía.</p>'
      return
    }

    propiedades.forEach(p => {
      lista.innerHTML += `
        <div class="item">
          <div class="item-info">
            <h3>${p.title}</h3>
            <p class="precio">$${p.price}</p>
            <p class="meta">${p.type} · ${p.operation} · ${p.address}</p>
          </div>
          <div class="item-acciones">
            <button class="btn btn-sm btn-sec" onclick="editar(${p.id})">Editar</button>
            <button class="btn btn-sm btn-danger" onclick="eliminar(${p.id})">Eliminar</button>
          </div>
        </div>
      `
    })
  } catch (error) {
    mostrarMensaje('No se pudieron cargar las propiedades', 'error')
  }
}

async function guardar() {
  const titulo = document.getElementById('title').value
  const precio = document.getElementById('price').value
  if (!titulo || !precio) {
    mostrarMensaje('El título y el precio son obligatorios', 'error')
    return
  }

  try {
    const url = editandoId ? `${API}/${editandoId}` : API
    const metodo = editandoId ? 'PUT' : 'POST'

    const respuesta = await fetch(url, {
      method: metodo,
      body: armarFormData()
    })

    if (respuesta.status === 401) { window.location.href = 'login.html'; return }
    if (!respuesta.ok) throw new Error('Error en el servidor')

    mostrarMensaje(editandoId ? 'Propiedad modificada correctamente' : 'Propiedad creada correctamente')
    limpiarFormulario()
    cargarPropiedades()
  } catch (error) {
    mostrarMensaje('No se pudo guardar la propiedad', 'error')
  }
}

async function editar(id) {
  try {
    const respuesta = await fetch(`${API}/${id}`)
    const p = await respuesta.json()

    CAMPOS_TEXTO.forEach(campo => { document.getElementById(campo).value = p[campo] ?? '' })
    imagenActual = p.image || ''
    document.getElementById('imagen-actual').textContent = imagenActual
      ? `Imagen actual: ${imagenActual.split('/').pop()}`
      : ''
    editandoId = id
    document.getElementById('form-titulo').textContent = `Editando: ${p.title}`
    mostrarMensaje('Modificá los datos y presioná Guardar')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } catch (error) {
    mostrarMensaje('No se pudo cargar la propiedad para editar', 'error')
  }
}

async function eliminar(id) {
  if (!confirm('¿Seguro que querés eliminar esta propiedad?')) return

  try {
    const respuesta = await fetch(`${API}/${id}`, { method: 'DELETE' })
    if (respuesta.status === 401) { window.location.href = 'login.html'; return }
    if (!respuesta.ok) throw new Error('Error en el servidor')

    mostrarMensaje('Propiedad eliminada')
    cargarPropiedades()
  } catch (error) {
    mostrarMensaje('No se pudo eliminar la propiedad', 'error')
  }
}

async function init() {
  try {
    await verificarSesion()
    cargarPropiedades()
  } catch {
  }
}

init()

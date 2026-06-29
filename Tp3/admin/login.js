const form = document.getElementById('form-login')

function mostrarMensaje(texto, tipo = 'error') {
  const div = document.getElementById('mensaje')
  div.textContent = texto
  div.className = `mensaje ${tipo}`
}

form.addEventListener('submit', async (evento) => {
  evento.preventDefault()

  const email = document.getElementById('email').value
  const password = document.getElementById('password').value

  try {
    const respuesta = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })

    const datos = await respuesta.json()

    if (!respuesta.ok) {
      mostrarMensaje(datos.error || 'No se pudo iniciar sesión')
      return
    }

    // Sesión iniciada: vamos al panel (navegación dentro de la misma interfaz /admin)
    mostrarMensaje('Ingresando...', 'ok')
    window.location.href = 'index.html'
  } catch (error) {
    mostrarMensaje('Error de conexión con el servidor')
  }
})

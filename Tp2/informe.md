# Trabajo Práctico — Aplicaciones Web

**Frenkel & Llopis Propiedades**

Integrantes: Caramanico Valentina y Corbalan Paloma

---

## 1. Introducción

### 1.1. Equipo y roles

- **Valentina Caramanico** — Desarrollo frontend, diseño visual e integración con el backend.
- **Paloma Corbalan** — Desarrollo backend, lógica de filtrado y consumo de la API externa.

Los roles pueden ir rotando durante el desarrollo para favorecer el aprendizaje integral del equipo.

### 1.2. Descripción del proyecto y justificación

Se desarrolla una aplicación web para **Frenkel & Llopis Propiedades**, inmobiliaria ubicada en Carlos F. Gauss 5760, Córdoba. El sitio está orientado a facilitar la visualización y búsqueda de propiedades en alquiler y en venta.

La plataforma permite:

- Explorar un catálogo organizado de inmuebles.
- Aplicar filtros por tipo de propiedad, tipo de operación y rango de precios.
- Ver el detalle de cada propiedad: imagen, ubicación, dormitorios, baños, superficie y precio.
- Contactar a la inmobiliaria desde un formulario.

**Justificación.** Frenkel & Llopis Propiedades tiene presencia activa en redes sociales pero no cuenta con una plataforma web propia que centralice su catálogo. Este proyecto cubre esa necesidad, mejora la experiencia de sus clientes y facilita la gestión de la información. La separación entre backend y frontend permite que el sistema sea escalable y que se incorporen nuevas mejoras (autenticación, panel administrativo, persistencia propia) sin reescribir toda la aplicación.

### 1.3. Tecnologías utilizadas

| Capa | Tecnología |
|---|---|
| Backend | Node.js + Express |
| Frontend | HTML5, CSS3, JavaScript (sin frameworks) |
| Datos | API externa MockAPI |
| Control de versiones | Git + GitHub |
| Gestión de tareas | Jira (tablero Kanban) |
| Editor | Visual Studio Code |

### 1.4. Cronograma

Para la planificación se utiliza **Jira** con tablero **Kanban**, organizando las tareas con fechas límite, responsables y estados de avance (Por hacer / En curso / Hecho).

Etapas principales:

| Etapa | Descripción | Responsable |
|---|---|---|
| 1 | Definición del proyecto y diseño visual | Equipo |
| 2 | Setup del backend con Express y conexión a MockAPI | Paloma |
| 3 | Implementación de endpoints y filtros | Paloma |
| 4 | Maquetado de páginas (index, propiedades, nosotros, contacto) | Valentina |
| 5 | Integración frontend-backend | Equipo |
| 6 | Estilos, paleta de colores e identidad visual | Valentina |
| 7 | Pruebas y ajustes finales | Equipo |

### 1.5. Control de versiones

Se utiliza **GitHub** como repositorio remoto, con commits descriptivos que reflejan el avance del proyecto. Se trabaja con ramas separadas para frontend y backend, lo que permite el trabajo colaborativo en paralelo y mantiene un historial ordenado de cambios.

---

## 2. Desarrollo del Backend

### 2.1. Arquitectura general

El backend funciona como **intermediario** entre el frontend y una API externa. Su responsabilidad es recibir las peticiones del cliente, consultar la fuente de datos, aplicar los filtros solicitados y devolver el resultado en formato JSON.

```
Frontend (Browser)  ──►  Backend (Express)  ──►  API externa (MockAPI)
                    ◄──                      ◄──
```

### 2.2. API externa

Los datos no se almacenan en el proyecto. Se obtienen desde **MockAPI** mediante peticiones HTTP utilizando `fetch`. Esto permite simular una fuente de datos real sin necesidad de levantar una base de datos propia, manteniendo el foco del trabajo en la lógica de la aplicación.

### 2.3. Endpoints

El servidor expone los siguientes endpoints:

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/propiedades` | Lista todas las propiedades, con filtros opcionales por query string |
| GET | `/api/propiedades/:id` | Devuelve el detalle de una propiedad específica |

Además, el servidor sirve los archivos estáticos del frontend desde la carpeta `public/`.

### 2.4. Filtros

El endpoint principal acepta los siguientes filtros, todos opcionales, mediante query string:

- `type` — tipo de propiedad (casa, departamento, ph, terreno)
- `operation` — tipo de operación (venta, alquiler)
- `minPrice` — precio mínimo
- `maxPrice` — precio máximo

Ejemplo: `GET /api/propiedades?type=casa&operation=venta&maxPrice=200000`

Los filtros se aplican sobre el array de propiedades devuelto por la API utilizando `.filter()`, encadenando las condiciones según los parámetros recibidos.

### 2.5. Ejecución

El servidor escucha en el puerto **3000**. Para levantarlo:

```bash
node index.mjs
```

Y se accede desde el navegador en `http://localhost:3000`.

---

## 3. Desarrollo del Frontend

### 3.1. Páginas y navegación

El sitio cuenta con cuatro páginas, conectadas mediante un menú de navegación común:

- **Inicio** — Hero principal y selección de propiedades destacadas.
- **Propiedades** — Catálogo completo con filtros.
- **Nosotros** — Misión, visión y valores de la empresa.
- **Contacto** — Datos de la inmobiliaria y formulario de mensaje.

### 3.2. Consumo del backend

El frontend consume los endpoints del backend mediante `fetch`. La función principal arma dinámicamente la URL con los filtros que el usuario seleccionó en el formulario y renderiza las tarjetas de propiedades en el DOM.

En la página de inicio se muestran las primeras 3 propiedades como "destacadas". En la página de propiedades se muestra el listado completo, con la posibilidad de filtrar y volver a consultar al backend en tiempo real.

### 3.3. Diseño visual

Se trabajó la identidad de marca con una paleta de cinco colores:

- Azul marino — titulares, navbar y footer
- Azul petróleo — bordes y acentos
- Naranja — hover y acentos cálidos
- Rojo ladrillo — botones y precios
- Bordó — texto secundario

El logo circular de la empresa se ubica en el navbar, y el hero del home utiliza una imagen de un agente inmobiliario con un degradado oscuro encima para garantizar la legibilidad del texto.

---

## 4. Conclusiones

Con este trabajo logramos construir una aplicación web completa, dividida en backend y frontend, que cumple con los requisitos planteados: visualización de un catálogo de propiedades, filtrado dinámico e integración con una fuente de datos externa.

Como equipo aprendimos a:

- Levantar un servidor con **Node.js** y **Express**.
- Consumir una API externa desde el backend y reexponer los datos al frontend.
- Construir un frontend que consume nuestro propio backend mediante `fetch`.
- Organizar el trabajo colaborativo con **Git/GitHub** y **Jira**.
- Aplicar una identidad visual coherente a un proyecto real.

### Trabajo futuro

- Autenticación para usuarios y administradores.
- Panel de administración para alta/baja/edición de propiedades.
- Persistencia propia (base de datos) en reemplazo de MockAPI.
- Sistema de favoritos y comparación entre propiedades.
- Carga de múltiples imágenes por propiedad.

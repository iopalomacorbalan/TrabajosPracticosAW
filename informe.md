# Informe de Desarrollo — TP3: CRUD y Administración

**Frenkel & Llopis Propiedades**  
Caramanico Valentina y Corbalan Paloma  
Aplicaciones Web II — Prof. Andrés Senn — 2026

---

## 1. Introducción

En este trabajo práctico se extendió el backend desarrollado en el TP2, incorporando una base de datos PostgreSQL, un sistema CRUD completo para administrar propiedades y un panel de administración frontend.

---

## 2. Tecnologías utilizadas

- Node.js + Express
- PostgreSQL
- HTML, CSS, JavaScript
- pgAdmin
- Git + GitHub

---

## 3. Estructura del proyecto (MVC)

El proyecto se organizó siguiendo el patrón MVC:

- `src/models/` — conexión a la base de datos y consultas SQL
- `src/controllers/` — lógica de cada endpoint
- `src/routes/` — definición de rutas
- `admin/` — frontend de administración
- `public/` — frontend del sitio web

---

## 4. Base de datos

Se utilizó PostgreSQL con una base de datos llamada `frenkel_llopis` y una tabla `propiedades` con los siguientes campos: id, title, type, operation, price, address, bedrooms, bathrooms, size, image.

---

## 5. Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /api/propiedades | Lista todas las propiedades con filtros opcionales |
| GET | /api/propiedades/:id | Obtiene una propiedad por ID |
| POST | /api/propiedades | Crea una nueva propiedad |
| PUT | /api/propiedades/:id | Modifica una propiedad |
| DELETE | /api/propiedades/:id | Elimina una propiedad |

---

## 6. Panel de administración

Se desarrolló un frontend en `/admin` que permite crear, editar y eliminar propiedades mediante formularios que consumen la API CRUD.

---

## 7. Conclusión

Con este trabajo logramos incorporar una base de datos real al proyecto, organizar el código con el patrón MVC y desarrollar un sistema completo de administración de propiedades para Frenkel & Llopis Propiedades.
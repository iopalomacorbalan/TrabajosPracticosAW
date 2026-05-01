Informe de Desarrollo – TP 2: Back-end para servir el sitio web

**Introducción**

En este trabajo práctico desarrollamos el backend de una aplicación web inmobiliaria. La idea fue poder tener un servidor que permita obtener y mostrar propiedades, usando datos que vienen de una API externa.


**Tecnologías utilizadas**

Para este proyecto usamos:

* Node.js
* Express.js
* MockAPI
* JavaScript

Estas herramientas nos permitieron crear un servidor simple pero funcional.

**Desarrollo del backend**

Creamos un servidor con Express que responde a distintas rutas. La principal es:

* `/api/propiedades`

Desde esta ruta se pueden obtener todas las propiedades disponibles.

El servidor se encarga de recibir la solicitud, buscar los datos y devolverlos en formato JSON.

**Uso de API externa**

Los datos no los guardamos en el proyecto, sino que los obtuvimos desde MockAPI. Para eso usamos `fetch`, que nos permite hacer una petición a la URL de la API y traer la información.

De esta forma, el backend funciona como intermediario entre el frontend y la API.

**Filtros**

Agregamos filtros para poder buscar propiedades según diferentes criterios. Estos filtros se pasan por la URL.

Por ejemplo:

* tipo de propiedad (`type`)
* tipo de operación (`operation`)
* precio mínimo y máximo (`minPrice` y `maxPrice`)

Para aplicar los filtros usamos `.filter()` sobre los datos que llegan de la API.

**Funcionamiento general**

El funcionamiento es así:

1. El usuario hace una petición (por ejemplo `/api/propiedades`).
2. El servidor recibe esa petición.
3. Se buscan los datos en la API externa.
4. Se aplican los filtros si hay.
5. Se devuelve el resultado.

**Conclusión**

Con este trabajo aprendimos a crear un servidor con Node y Express, a conectarnos con una API externa y a organizar el código de forma más clara. También logramos hacer un sistema que permite ver y filtrar propiedades, cumpliendo con lo pedido en el trabajo práctico.

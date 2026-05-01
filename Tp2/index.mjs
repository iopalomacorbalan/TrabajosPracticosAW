import express from "express";

const app = express();
const PUERTO = 3000;


const API_URL = "https://69f00887112e1b968e2526cd.mockapi.io/api/v1/propiedades";

app.get("/api/propiedades", async (req, res) => {
    try {
        const response = await fetch(API_URL);
        let data = await response.json();

        const { type, operation, minPrice, maxPrice } = req.query;

        if (type) {
            data = data.filter(p => p.type === type);
        }

        if (operation) {
            data = data.filter(p => p.operation === operation);
        }

        if (minPrice) {
            data = data.filter(p => p.price >= Number(minPrice));
        }

        if (maxPrice) {
            data = data.filter(p => p.price <= Number(maxPrice));
        }

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener datos" });
    }
});

app.get("/api/propiedades/:id", async (req, res) => {
    try {
        const response = await fetch(`${API_URL}/${req.params.id}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Error" });
    }
});

app.listen(PUERTO, () => {
    console.log(`Servidor en http://localhost:${PUERTO}`);
});
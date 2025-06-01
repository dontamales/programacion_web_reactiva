// src/index.js
const express = require("express");
const cors = require("cors");
const conditions = require("./data/conditions");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

/**
 * Retorna un entero aleatorio entre min y max (ambos incluidos).
 */
function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * GET /weather
 *   Parámetro query: city (string) - obligatorio.
 *   Retorna JSON con la simulación de clima.
 */
app.get("/weather", (req, res) => {
    const city = req.query.city;
    if (!city) {
        // Según buenas prácticas, devolvemos 400 Bad Request si falta city.
        return res.status(400).json({ error: "Falta el parámetro 'city'" });
    }

    // Simular temperatura en °C con un decimal: −10.0 a 40.0
    const temperature = parseFloat(
        (getRandomIntInclusive(-10, 40) + Math.random()).toFixed(1)
    );
    // Simular humedad: 0–100%
    const humidity = getRandomIntInclusive(0, 100);
    // Seleccionar condición al azar de conditions.js
    const condition = conditions[getRandomIntInclusive(0, conditions.length - 1)];

    const result = {
        city: city,
        temperature: temperature,
        humidity: humidity,
        condition: condition,
    };

    return res.json(result);
});

/**
 * GET /
 *   Ruta de comprobación (salud) para ver que el servidor está activo.
 */
app.get("/", (req, res) => {
    res.send("API de Clima funcionando. Usa GET /weather?city={ciudad}");
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

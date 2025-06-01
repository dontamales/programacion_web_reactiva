const express = require("express");
const cors = require("cors");
const cities = require("./data/cities"); // Importamos el array de ciudades

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

/**
 * GET /weather
 * 
 * - Si no viene query ?city=..., retorna TODAS las ciudades (array completo).
 * - Si viene ?city=Nombre, busca en el array un objeto cuyo campo city
 *   coincida (case-insensitive). Si lo encuentra, lo retorna; si no, 404.
 */
app.get("/weather", (req, res) => {
    const { city } = req.query;

    // 1) Si no se especifica query param `city`, devolvemos todo el array:
    if (!city) {
        return res.json(cities);
    }

    // 2) Si se envía city, lo buscamos (case-insensitive):
    const ciudadBuscada = String(city).trim().toLowerCase();
    const resultado = cities.find(
        (c) => c.city.toLowerCase() === ciudadBuscada
    );

    if (!resultado) {
        // No encontramos la ciudad solicitada
        return res
            .status(404)
            .json({ error: `No se encontró datos para la ciudad "${city}"` });
    }

    // Retornamos el objeto encontrado
    return res.json(resultado);
});

/**
 * GET /
 * Ruta de “salud” para verificar que el servidor está arriba.
 */
app.get("/", (req, res) => {
    res.send("API de Clima (hardcodeada). Usa GET /weather o /weather?city=<nombre>");
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

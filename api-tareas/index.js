const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());
let tareas = [
    { id: 1, titulo: "Aprender React", completado: false },
    { id: 2, titulo: "Crear API", completado: true },
    { id: 3, titulo: "Nose", completado: false }
];
app.get("/api/tareas", (req, res) => res.json(tareas));
app.post("/api/tareas", (req, res) => {
    const nueva = {
        id: Date.now(),
        titulo: req.body.titulo,
        completado: false
    };
    tareas.push(nueva);
    res.status(201).json(nueva);
});
app.put("/api/tareas/:id", (req, res) => {
    const idx = tareas.findIndex(t => t.id == req.params.id);
    if (idx >= 0) {
        tareas[idx] = { ...tareas[idx], ...req.body };
        res.json(tareas[idx]);
    } else {
        res.status(404).send("Tarea no encontrada");
    }
});
app.delete("/api/tareas/:id", (req, res) => {
    tareas = tareas.filter(t => t.id != req.params.id);
    res.status(204).send();
});
app.listen(PORT, () => console.log(`API corriendo en
http://localhost:${PORT}`));
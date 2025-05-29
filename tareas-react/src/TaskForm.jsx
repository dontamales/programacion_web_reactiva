import { useState } from "react";

export default function TaskForm({ onAdd }) {
    const [titulo, setTitulo] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!titulo.trim()) return;
        onAdd(titulo);
        setTitulo("");
    };
    return (
        <form onSubmit={handleSubmit}>
            <input
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Nueva tarea"
                style={{ padding: "0.5rem", width: "200px", marginRight: "1rem" }}
            />
            <button type="submit">Agregar</button>
        </form>
    );
}

export default function TaskList({ tareas, onDelete, onToggle }) {
    return (
        <ul style={{ marginTop: "1rem" }}>
            {tareas.map((tarea) => (
                <li key={tarea.id} style={{ marginBottom: "0.5rem" }}>
                    <input
                        type="checkbox"
                        checked={tarea.completado}
                        onChange={() => onToggle(tarea.id, !tarea.completado)}
                    />
                    {" "}
                    {tarea.titulo}
                    {" "}
                    <button onClick={() => onDelete(tarea.id)}>❌</button>
                </li>
            ))}
        </ul>
    );
}

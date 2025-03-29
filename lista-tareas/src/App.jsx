import { useState, useEffect } from 'react';

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(() => {
    // Cargar las tareas desde localStorage al inicializar el estado
    const savedTasks = localStorage.getItem("tasks");
    console.log("Inicializando tareas desde localStorage:", savedTasks); // Depuración
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [filter, setFilter] = useState("all");

  // Guardar las tareas en localStorage cada vez que cambien
  useEffect(() => {
    console.log("Guardando tareas en localStorage:", tasks); // Depuración
    localStorage.setItem("tasks", JSON.stringify(tasks)); // Guardar las tareas
  }, [tasks]);

  const addTask = () => {
    if (task.trim() !== "") {
      const newTask = { id: Date.now(), name: task, completed: false };
      console.log("Agregando tarea:", newTask); // Depuración
      setTasks((prevTasks) => [...prevTasks, newTask]); // Usar función para actualizar el estado
      setTask(""); // Limpiar el campo de entrada
    }
  };

  const toggleTask = (id) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      );
      console.log("Actualizando tarea completada:", updatedTasks); // Depuración
      return updatedTasks;
    });
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.filter((item) => item.id !== id);
      console.log("Eliminando tarea con ID:", id); // Depuración
      return updatedTasks;
    });
  };

  const completedTasks = tasks.filter((item) => item.completed).length;
  const remainingTasks = tasks.length - completedTasks;

  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed === b.completed) return 0;
    return a.completed ? 1 : -1;
  });

  // Filtrar las tareas según el filtro seleccionado
  const filteredTasks = sortedTasks.filter((item) => {
    if (filter === "completed") return item.completed;
    if (filter === "pending") return !item.completed;
    return true; // Mostrar todas las tareas
  });

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1 style={{ color: "#fff" }}>Lista de Tareas</h1>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Agregar Tarea"
        style={{
          padding: "10px",
          width: "300px",
          fontSize: "16px",
          marginBottom: "20px",
        }}
      />
      <button
        onClick={addTask}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          marginLeft: "10px",
          cursor: "pointer",
        }}
      >
        Agregar
      </button>
      <h3 style={{ marginTop: "20px", color: "#fff" }}>
        Tareas completadas: {completedTasks} | Tareas pendientes: {remainingTasks}
      </h3>
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => setFilter("all")}
          style={{
            padding: "10px 20px",
            marginRight: "10px",
            cursor: "pointer",
            backgroundColor: filter === "all" ? "#007bff" : "#6c757d",
            color: "#fff",
            border: "none",
            borderRadius: "3px",
          }}
        >
          Todas
        </button>
        <button
          onClick={() => setFilter("completed")}
          style={{
            padding: "10px 20px",
            marginRight: "10px",
            cursor: "pointer",
            backgroundColor: filter === "completed" ? "#007bff" : "#6c757d",
            color: "#fff",
            border: "none",
            borderRadius: "3px",
          }}
        >
          Completadas
        </button>
        <button
          onClick={() => setFilter("pending")}
          style={{
            padding: "10px 20px",
            cursor: "pointer",
            backgroundColor: filter === "pending" ? "#007bff" : "#6c757d",
            color: "#fff",
            border: "none",
            borderRadius: "3px",
          }}
        >
          Pendientes
        </button>
      </div>
      <ul
        style={{
          listStyleType: "none",
          padding: 0,
          maxWidth: "600px",
          margin: "20px auto",
          textAlign: "left",
        }}
      >
        {filteredTasks.map((item) => (
          <li
            key={item.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              marginBottom: "10px",
              backgroundColor: item.completed ? "#eae5e4" : "#f7f7f7",
              color: "#000",
              textDecoration: item.completed ? "line-through" : "none",
            }}
          >
            <span>{item.name}</span>
            <div>
              <button
                onClick={() => toggleTask(item.id)}
                style={{
                  marginRight: "10px",
                  padding: "5px 10px",
                  cursor: "pointer",
                  backgroundColor: item.completed ? "#ffc107" : "#28a745",
                  color: "#fff",
                  border: "none",
                  borderRadius: "3px",
                }}
              >
                {item.completed ? "Desmarcar" : "Completar"}
              </button>
              <button
                onClick={() => deleteTask(item.id)}
                style={{
                  padding: "5px 10px",
                  cursor: "pointer",
                  backgroundColor: "#dc3545",
                  color: "#fff",
                  border: "none",
                  borderRadius: "3px",
                }}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
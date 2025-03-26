import { useState } from 'react';

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task.trim() !== "") {
      setTasks([
        ...tasks,
        { id: Date.now(), name: task, completed: false },
      ]);
      setTask("");
    }
  };

  const toggleTask = (id) => {
    const updatedTasks = tasks.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((item) => item.id !== id));
  };

  const completedTasks = tasks.filter((item) => item.completed).length;
  const remainingTasks = tasks.length - completedTasks;

  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed === b.completed) return 0;
    return a.completed ? 1 : -1;
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
      <ul
        style={{
          listStyleType: "none",
          padding: 0,
          maxWidth: "600px",
          margin: "20px auto", 
          textAlign: "left", 
        }}
      >
        {sortedTasks.map((item) => (
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
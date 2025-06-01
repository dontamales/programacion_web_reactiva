import { useEffect, useState } from "react";
import './App.css';
import UserCard from "./UserCard";

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => setUsuarios(data))
      .catch(err => console.error("Error cargando usuarios:", err));
  }, []);
  const usuariosFiltrados = usuarios.filter(u =>
    u.name.toLowerCase().includes(busqueda.toLowerCase())
  );
  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>Buscador de Usuarios</h1>
      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={busqueda}
        onChange={e => setBusqueda(e.target.value)}
        style={{ padding: "0.5rem", width: "400px", marginBottom: "1rem" }}
      />
      <div>
        {usuariosFiltrados.length > 0 ? (
          usuariosFiltrados.map(usuario => (
            <UserCard key={usuario.id} usuario={usuario} />
          ))
        ) : (
          <p>No se encontraron usuarios.</p>
        )}
      </div>
      <div>Hinojo López Jesús Eduardo - 21111119</div>
    </div>
  );
}
export default App;
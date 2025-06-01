import { useState } from "react";
import "./App.css";
import WeatherCard from "./components/WeatherCard";

function App() {
  // Estado para la ciudad ingresada en el input
  const [ciudad, setCiudad] = useState("");
  // Estado para guardar los datos de la API
  const [clima, setClima] = useState(null);
  // Estado para mensajes de error
  const [error, setError] = useState("");

  // Función que se ejecuta al hacer clic en "Obtener Clima"
  const buscarClima = () => {
    if (!ciudad.trim()) {
      setError("Por favor ingresa el nombre de una ciudad.");
      setClima(null);
      return;
    }

    // Limpieza de estados previos
    setError("");
    setClima(null);

    // Llamar a la API de Clima que corre en el backend
    fetch(`http://localhost:3000/weather?city=${encodeURIComponent(ciudad)}`)
      .then((res) => {
        if (!res.ok) {
          // Si el servidor devolvió un 400 u otro error
          return res.json().then((body) => {
            throw new Error(body.error || "Error desconocido");
          });
        }
        return res.json();
      })
      .then((data) => {
        // data debe ser { city, temperature, humidity, condition }
        setClima(data);
      })
      .catch((err) => {
        console.error("Error al obtener datos:", err);
        setError(err.message);
      });
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>Consulta de Clima</h1>

      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Ingresa el nombre de la ciudad..."
          value={ciudad}
          onChange={(e) => setCiudad(e.target.value)}
          style={{
            padding: "0.5rem",
            width: "300px",
            marginRight: "0.5rem",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={buscarClima}
          style={{
            padding: "0.5rem 1rem",
            border: "none",
            borderRadius: "4px",
            backgroundColor: "#007bff",
            color: "white",
            cursor: "pointer",
          }}
        >
          Obtener Clima
        </button>
      </div>

      {error && (
        <p style={{ color: "red", marginBottom: "1rem" }}>
          {error}
        </p>
      )}

      {clima ? (
        <WeatherCard data={clima} />
      ) : (
        !error && <p>Ingresa una ciudad y presiona "Obtener Clima".</p>
      )}
    </div>
  );
}

export default App;

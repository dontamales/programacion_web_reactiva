import React, { useState, useEffect } from "react";
import "./App.css";
import WeatherCard from "./components/WeatherCard";

function App() {
  const [allCities, setAllCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    fetch("http://localhost:3000/weather")
      .then((res) => {
        if (!res.ok) {
          throw new Error("No se pudo obtener la lista de ciudades");
        }
        return res.json();
      })
      .then((data) => {
        setAllCities(data);
        setFilteredCities(data); // Inicialmente mostramos todo el array
      })
      .catch((err) => {
        console.error(err);
        setError("Error al cargar datos del servidor");
      });
  }, []); // Se ejecuta una sola vez al montar

  // Cada vez que “busqueda” cambie, recalculamos filteredCities:
  useEffect(() => {
    if (!busqueda.trim()) {
      // Si el input está vacío, mostramos todas las ciudades
      setFilteredCities(allCities);
    } else {
      // Filtrar case-insensitive por city que incluya el texto de “busqueda”
      const texto = busqueda.trim().toLowerCase();
      const filtradas = allCities.filter((c) =>
        c.city.toLowerCase().includes(texto)
      );
      setFilteredCities(filtradas);
    }
  }, [busqueda, allCities]);

  return (
    <div className="app-container">
      <h1>🏙️ Consultar Clima de Ciudades</h1>
      <div className="input-group">
        <input
          type="text"
          placeholder="Filtrar por nombre de ciudad..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <button onClick={() => {}}>Buscar</button>
      </div>
      {error && (
        <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>
      )}
      {!error && allCities.length === 0 && (
        <p>Cargando datos de ciudades...</p>
      )}
      {!error && allCities.length > 0 && filteredCities.length === 0 && (
        <p>No se encontraron ciudades que coincidan con "{busqueda}".</p>
      )}
      <div className="weather-grid">
        {filteredCities.map((ciudadObj) => (
          <WeatherCard key={ciudadObj.city} data={ciudadObj} />
        ))}
      </div>
    </div>
  );
}

export default App;

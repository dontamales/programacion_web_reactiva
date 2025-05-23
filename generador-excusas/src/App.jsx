import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [excuse, setExcuse] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchExcuse = async () => {
    setLoading(true);
    const res = await fetch("https://excuser-three.vercel.app/v1/excuse");
    const data = await res.json();
    setExcuse(data[0]?.excuse || "No se pudo obtener una excusa.");
    setLoading(false);
  };

  useEffect(() => {
    fetchExcuse();
  }, []);

  return (
    <div style={{ maxWidth: 400, margin: "3rem auto", textAlign: "center" }}>
      <h1>Generador de Excusas</h1>
      {loading ? (
        <p>Cargando excusa...</p>
      ) : (
        <p style={{ fontSize: "1.2rem", minHeight: 60 }}>{excuse}</p>
      )}
      <button onClick={fetchExcuse} style={{ marginTop: 20, padding: "0.5rem 1.5rem" }}>
        Nueva excusa
      </button>
    </div>
  );
}

export default App;
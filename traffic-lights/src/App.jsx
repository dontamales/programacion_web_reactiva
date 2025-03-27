import { useState, useEffect } from "react";

function App() {
  const [currentLight, setCurrentLight] = useState("red"); // Estado para la luz actual
  const [isRunning, setIsRunning] = useState(true); // Estado para detener/reanudar el semáforo

  useEffect(() => {
    if (!isRunning) return; // Si está detenido, no ejecutar el ciclo

    const intervals = {
      green: 6000, // 6 segundos
      yellow: 2000, // 2 segundos
      red: 4000, // 4 segundos
    };

    const cycle = () => {
      setCurrentLight((prevLight) => {
        if (prevLight === "red") return "green";
        if (prevLight === "green") return "yellow";
        return "red";
      });
    };

    const interval = setInterval(cycle, intervals[currentLight]);

    return () => clearInterval(interval); // Limpiar el intervalo al desmontar o cambiar
  }, [currentLight, isRunning]);

  const toggleRunning = () => {
    setIsRunning((prev) => !prev); // Alternar entre detener y reanudar
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        color: "#fff",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          height: "200px",
          width: "80px",
          backgroundColor: "#000",
          borderRadius: "10px",
          padding: "10px",
        }}
      >
        <div
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            backgroundColor: currentLight === "red" ? "red" : "#4d0000",
          }}
        ></div>
        <div
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            backgroundColor: currentLight === "yellow" ? "yellow" : "#4d4d00",
          }}
        ></div>
        <div
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            backgroundColor: currentLight === "green" ? "green" : "#004d00",
          }}
        ></div>
      </div>
      <button
        onClick={toggleRunning}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          borderRadius: "5px",
          backgroundColor: isRunning ? "#dc3545" : "#28a745",
          color: "#fff",
          border: "none",
        }}
      >
        {isRunning ? "Detener" : "Reanudar"}
      </button>
    </div>
  );
}

export default App;


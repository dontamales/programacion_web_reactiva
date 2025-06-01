import { useState, useEffect } from "react";
import "./App.css";

function GuessTheNumber() {
  const [secretNumber, setSecretNumber] = useState(0);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [history, setHistory] = useState([]); // Historial de intentos
  const [gameOver, setGameOver] = useState(false);
  const maxAttempts = 7; // Límite de intentos

  useEffect(() => {
    setSecretNumber(Math.floor(Math.random() * 100) + 1);
  }, []);

  const handleGuess = () => {
    if (gameOver) return;

    const number = parseInt(guess);
    if (isNaN(number)) {
      setMessage("Ingresa un número válido.");
      return;
    }

    setAttempts((prev) => prev + 1);
    setHistory((prevHistory) => [...prevHistory, number]); // Agregar al historial

    if (number === secretNumber) {
      setMessage(`🎉 Correcto! El número era ${secretNumber}.`);
      setGameOver(true);
    } else if (attempts + 1 >= maxAttempts) {
      setMessage(`❌ Has alcanzado el límite de intentos. El número era ${secretNumber}.`);
      setGameOver(true);
    } else if (Math.abs(number - secretNumber) <= 5) {
      setMessage("🔥 Caliente, Caliente!");
    } else {
      setMessage("❄️ Frío, Frío.");
    }
  };

  const resetGame = () => {
    setSecretNumber(Math.floor(Math.random() * 100) + 1);
    setGuess("");
    setMessage("");
    setAttempts(0);
    setHistory([]);
    setGameOver(false);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Adivina el Número</h2>
      <input
        type="number"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        placeholder="Escribe un número del 1 al 100"
        style={{ padding: "10px", width: "250px" }}
        disabled={gameOver}
      />
      <br />
      <button onClick={handleGuess} style={buttonStyle} disabled={gameOver}>
        Adivinar
      </button>
      <button onClick={resetGame} style={buttonStyle}>
        Reiniciar
      </button>
      <p style={messageStyle(message)}>{message}</p>
      <p>Intentos: {attempts} / {maxAttempts}</p>
      <h3>Historial de Intentos</h3>
      <ul
        style={{
          listStyleType: "none",
          padding: 0,
          maxWidth: "300px",
          margin: "20px auto",
          textAlign: "left",
        }}
      >
        {history.map((attempt, index) => (
          <li
            key={index}
            style={{
              color: "#333",
              padding: "10px",
              marginBottom: "5px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              backgroundColor: "#f7f7f7",
            }}
          >
            Intento {index + 1}: {attempt}
          </li>
        ))}
      </ul>
      <div style={{
        textAlign: "center",
        marginTop: "45px",
        fontSize: "20px",
      }}>Hinojo López Jesús Eduardo - 21111119</div>
    </div>
  );
}

const buttonStyle = {
  padding: "10px 20px",
  margin: "10px",
  fontSize: "16px",
  cursor: "pointer",
};

const messageStyle = (message) => {
  if (message.includes("Correcto")) {
    return { color: "green", fontWeight: "bold" };
  } else if (message.includes("Caliente")) {
    return { color: "orange", fontWeight: "bold" };
  } else if (message.includes("Frío")) {
    return { color: "blue", fontWeight: "bold" };
  } else if (message.includes("límite")) {
    return { color: "red", fontWeight: "bold" };
  }
  return {};
};

export default GuessTheNumber;
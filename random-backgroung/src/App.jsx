import { useState } from "react";

function App() {
  const [color, setColor] = useState("#ffffff");

  const getRandomColor = () => {
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
    return randomColor;
  }

  const changeColor = () => {
    const newColor = getRandomColor();
    setColor(newColor);
  };

  return (
    <div
      style={{
        backgroundColor: color,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        transition: "background-color 0.5s ease",
      }}
    >
      <h1>Cambiar el color de fondo</h1>
      <h2>Color actual: {color}</h2>
      <button onClick={changeColor}
        style={{ padding: "10px 20px",
          fontSize: "16px",
          borderRadius: "8px",
         }}>Cambiar color</button>
    </div>
  );

}

export default App;
import { useState, useEffect } from "react";

function LocalStorageExample() {
  const [name, setName] = useState("");

  //Cargar el nombre almacenado al iniciar
  useEffect(() => {
    const storedName = localStorage.getItem("name");
    if (storedName) setName(storedName);
    setName(storedName);
  }, []);

  //Guardar el nombre en el localStorage
  const saveName = () => {
    localStorage.setItem("name", name);
    alert("Nombre guardado en localStorage");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Ejemplo de Local Storage</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Escribe tu nombre"
        style={{ padding: "10px", fontSize: "16px", width: "250px" }}
      />
      <button onClick={saveName}>Guardar Nombre</button>
      <p>Nombre guardado: {name}</p>
    </div>
  );


}

export default LocalStorageExample;
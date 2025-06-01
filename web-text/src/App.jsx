import React from "react";
import "./App.css";
import UserForm from "./components/UserForm";
import FileUploader from "./components/FileUploader";
function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Formulario de Usuario</h1>
      <UserForm />
      <hr />
      <h2>Leer archivo de texto</h2>
      <FileUploader />
      <div class="autor">Hinojo López Jesús Eduardo - 21111119</div>
    </div>
  );
}
export default App;
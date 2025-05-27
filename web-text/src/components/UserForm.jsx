import React, { useState } from "react";
function UserForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const handleDownload = () => {
        const content = `Nombre: ${name}\nCorreo: ${email}`;
        const blob = new Blob([content], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "usuario.txt";
        a.click();
        URL.revokeObjectURL(url);
    };
    return (
        <div>
            <input
                type="text"
                placeholder="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <br />
            <input
                type="email"
                placeholder="Correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <button onClick={handleDownload}>Guardar en archivo .txt</button>
        </div>
    );
}
export default UserForm;

const form = document.getElementById('formRegistro');
const nombreInput = document.getElementById('nombre');
const emailInput = document.getElementById('email');
const tablaBody = document.getElementById('tablaUsuarios');
const mensajeError = document.getElementById('mensajeError');

// Lista simulada en memoria para mostrar
const usuariosRegistrados = [];

// Manejar el envío del formulario
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = nombreInput.value.trim();
    const email = emailInput.value.trim();

    // Validación de campos
    if (nombre === '' || email === '') {
        mensajeError.textContent = 'Todos los campos son obligatorios.';
        return;
    }

    mensajeError.textContent = 'Enviando...';

    try {
        // Enviar datos a la API
        const res = await fetch('https://jsonplaceholder.typicode.com/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: nombre, email })
        });

        const data = await res.json();

        if (!res.ok) throw new Error('Error al registrar el usuario.');

        // Guardar en la lista local
        usuariosRegistrados.push({
            id: data.id,
            name: nombre,
            email: email
        });

        // Actualizar la tabla
        renderizarTabla();

        // Limpiar el formulario
        form.reset();
        mensajeError.textContent = '';
    } catch (error) {
        mensajeError.textContent = 'Error: ' + error.message;
    }
});

// Renderizar la tabla
function renderizarTabla() {
    tablaBody.innerHTML = '';
    usuariosRegistrados.forEach((usuario, index) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${usuario.name}</td>
            <td>${usuario.email}</td>
            <td>${usuario.id}</td>
            <td><button onclick="eliminarUsuario(${index})">Eliminar</button></td>
        `;
        tablaBody.appendChild(fila);
    });
}

// Eliminar un usuario de la lista local
function eliminarUsuario(index) {
    usuariosRegistrados.splice(index, 1);
    renderizarTabla();
}

const form = document.getElementById('formRegistro');
const nombreInput = document.getElementById('nombre');
const emailInput = document.getElementById('email');
const tablaBody = document.querySelector('#tablaUsuarios tbody');
const mensajeError = document.getElementById('mensajeError');
// Lista simulada en memoria para mostrar
const usuariosRegistrados = [];
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = nombreInput.value.trim();
    const email = emailInput.value.trim();
    // Validación simple
    if (nombre === '' || email === '') {
        mensajeError.textContent = 'Todos los campos son obligatorios.';
        return;
    }
    mensajeError.textContent = 'Enviando...';
    try {
        const res = await fetch('https://reqres.in/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': 'reqres-free-v1' // Clave de API requerida
            },
            body: JSON.stringify({ name: nombre, email })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Error en la solicitud');
        // Guardamos en la lista simulada
        usuariosRegistrados.push({
            id: data.id,
            name: data.name,
            email: data.email
        });
        renderizarTabla();
        form.reset();
        mensajeError.textContent = '';
    } catch (error) {
        mensajeError.textContent = 'Error: ' + error.message;
    }
});
function renderizarTabla() {
    tablaBody.innerHTML = '';
    usuariosRegistrados.forEach(usuario => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
 <td>${usuario.name}</td>
 <td>${usuario.email}</td>
 <td>${usuario.id}</td>
 `;
        tablaBody.appendChild(fila);
    });
}

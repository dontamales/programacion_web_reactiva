function cargarUsuarios() {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los usuarios');
            }
            return response.json();
        })
        .then(usuarios => {
            const tabla = document.getElementById('tablaUsuarios');
            const tbody = tabla.querySelector('tbody');
            tbody.innerHTML = ''; // Limpia la tabla antes de llenar
            usuarios.forEach(usuario => {
                const fila = document.createElement('tr');
                const celdaNombre = document.createElement('td');
                celdaNombre.textContent = usuario.name;
                const celdaEmail = document.createElement('td');
                celdaEmail.textContent = usuario.email;
                const celdaCompania = document.createElement('td');
                celdaCompania.textContent = usuario.company.name;
                fila.appendChild(celdaNombre);
                fila.appendChild(celdaEmail);
                fila.appendChild(celdaCompania);
                tbody.appendChild(fila);
            });
            tabla.style.display = 'table';
        })
        .catch(error => {
            alert('Ocurrió un error al cargar los datos: ' + error.message);
        });
}

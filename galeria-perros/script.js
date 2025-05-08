let contadorImagenes = 0; // Variable para contar las imágenes vistas

function cargarImagen() {
    const contenedor = document.getElementById('contenedorImagen');
    const contador = document.getElementById('contador'); // Elemento para mostrar el contador

    contenedor.innerHTML = '<p>Cargando imagen...</p>';
    fetch('https://dog.ceo/api/breeds/image/random')
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo obtener la imagen');
            }
            return response.json();
        })
        .then(data => {
            contenedor.innerHTML = '';
            const img = document.createElement('img');
            img.src = data.message;
            img.alt = 'Un perro muy bonito';
            contenedor.appendChild(img);

            // Incrementar y mostrar el contador
            contadorImagenes++;
            contador.textContent = `Imágenes vistas: ${contadorImagenes}`;
        })
        .catch(error => {
            contenedor.innerHTML = `<p>Error: ${error.message}</p>`;
        });
}

// Cargar una imagen automáticamente al abrir la página
window.addEventListener('load', cargarImagen);

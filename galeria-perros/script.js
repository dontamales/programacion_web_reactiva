function cargarImagen() {
    const contenedor = document.getElementById('contenedorImagen');
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
        })
        .catch(error => {
            contenedor.innerHTML = `<p>Error: ${error.message}</p>`;
        });
}

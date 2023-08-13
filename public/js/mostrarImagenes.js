const imagenes = document.getElementById('listado');

document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('/api/obtener');
    const data = await response.json();
    data.forEach(imagen => {
        let imageURL = imagen.imagen;
        imagenes.innerHTML += `
        <tr>
            <td>${imagen.id}</td><br/>
            <td><img src="${imageURL}" class="d-block img" id="img"  alt="..."></td>
            <td>
              <a onclick="eliminarImagen(event)" class="btn btn-danger btn-sm" data-id="${imagen.id}">Eliminar</a>
              <a href="/editarImagen/${imagen.id}" class="btn btn-success btn-sm">Editar</a>
            </td>
          </tr>
        `;
    });
});

const eliminarImagen = async (event) => {
    const id = event.target.dataset.id;

    try {
        const res = await fetch(`/api/eliminar/${id}`, {
            method: 'DELETE'
        });
        const data = await res.json();
        swal({
            icon: 'success',
            title: 'Imagen eliminada',
            text: data.message,
        });
        
        setTimeout(() => {
            window.location.reload();
        }, 2200);

    } catch (error) {
        console.log(error);
        swal({
            icon: 'error',
            title: 'Oops...',
            text: error.message,
        })
    }

}
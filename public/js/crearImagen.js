const formImagen = document.getElementById('formNuevaImagen');

formImagen.addEventListener('submit',async (e)=>{
    e.preventDefault();

    const formData = new FormData();
    formData.append('imagen',document.getElementById('imagen').files[0]);

    try {
        const response = await fetch('/api/crear',{
            method:'POST',
            body:formData
        });
        const respToJson = await response.json();
        
        if(response.status!== 201 && response.status !== 200){
            console.log('error al subir la imagen')
        }
        swal({
            title: "Good job!",
            text: "You clicked the button!",
            icon: "success",
          });
        setTimeout(() => {
            window.location.href = '/index';
          }, 2000);
    } catch (error) {
        console.log(error)
    }
})
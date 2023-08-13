const Gestion = require('../models/gestion');
const ctrlGestion = {};
const path = require('path')
const cloudinary = require('../utils/cloudinary');

//----------Vistas-----------
ctrlGestion.renderMostrarImagenes = (req, res) => {
    res.render('index');
}
ctrlGestion.renderNuevaImagen = (req, res) => {
    res.render('nuevaImagen');
}
ctrlGestion.renderEditarImagen = (req, res) => {
    const { id } = req.params;
    res.render('editarImagen', { id: req.params.id });
}

// ---------CRUD---------
ctrlGestion.crearImagen = async (req,res)=>{
    const{
        imagen
    }= req.body;

    console.log(req.body)

    try{
          let imagenFile;

        imagenFile = req.files.imagen;
        let result = await cloudinary.uploader.upload(imagenFile.tempFilePath,{
            public_id: `${Date.now()}`,
            resource_type:'auto',
            folder:'images'
        })
        let imagen = result.url
        const Imagen = await Gestion.create({
          imagen: imagen
        })
        console.log(Imagen)
        imagenFile.mv(result, function(err){
          if(err){
              return res.status(500).json(err);
          }
          res.render(index)
        })
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}

ctrlGestion.obtenerImagenes = async (req,res)=>{
    try {
        const imagenes = await Gestion.findAll({
        })
        if(!imagenes){
            throw({
                status:404,
                message:'No hay imagenes!'
            })
        }
        console.log(imagenes)
        res.status(200).json(imagenes);
    } catch (error) {
        return res.status(error.message || 500).json({
            message:''
        })
    }
}
ctrlGestion.actualizarImagen = async (req,res)=>{
    const {id}=req.params.id;
    const{
        imagen
    }= req.body;
    
    console.log(req.body)
    try{
          let imagenFile;

        imagenFile = req.files.imagen;
        let result = await cloudinary.uploader.upload(imagenFile.tempFilePath,{
            public_id: `${Date.now()}`,
            resource_type:'auto',
            folder:'images'
        })
        let imagen = result.url
        const Imagen = await Gestion.update({
          imagen: imagen,
        },{
            where:{
                id:req.params.id
            }
        });
        console.log(Imagen)
        imagenFile.mv(result, function(err){
          if(err){
              return res.status(500).json(err);
          }
          res.render(index)
        })
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}

ctrlGestion.eliminarImagen = async (req,res)=>{
    const {id}= req.params
    try {
        const eliminaImagen = await Gestion.destroy({
            where:{id}
        });
        if(!eliminaImagen){
            throw({
                status:500,
                message: 'error interno del servidor!'
            })
        }
        let mensaje = 'Eliminado con exito'
        return res.json(mensaje);
    } catch (error) {
        return res.status(error.status || 500).json({
            message: error.message || 'error interno del servidor'
        })
    }
}

module.exports = ctrlGestion;
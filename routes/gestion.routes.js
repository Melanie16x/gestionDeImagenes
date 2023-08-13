const router = require('express').Router();
const path = require('path');
const express = require('express');

const { 
    renderMostrarImagenes,
    renderNuevaImagen,
    renderEditarImagen,
    crearImagen, 
    obtenerImagenes, 
    actualizarImagen, 
    eliminarImagen 
} = require('../controllers/gestion.controllers');

router.use('/imagenes', express.static(path.join(__dirname, '..', 'public', 'imagenes')));

//----------Vistas------------
router.get('/', renderMostrarImagenes);
router.get('/nuevaImagen', renderNuevaImagen);
router.get('/editarImagen/:id', renderEditarImagen);

// ----------CRUD-----------
router.get('/api/obtener', obtenerImagenes);
router.post('/api/crear', crearImagen);
router.put('/api/actualizar/:id', actualizarImagen);
router.delete('/api/eliminar/:id', eliminarImagen);

module.exports = router;
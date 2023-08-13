// Imports
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const helmet = require('helmet');
const cloudinary = require('cloudinary');
const fileUpload = require('express-fileupload');

const app = express();

require('dotenv').config();
require('ejs');

app.use(fileUpload({
  useTempFiles:true,
  limits:{fileSize: 50 * 2024 * 1024}
}));

const { conectarDB } = require('./database.js');

conectarDB();

const port = process.env.PORT || 5000;

// Middlewares
// TODO: Implementar middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use(require('./routes/gestion.routes.js'));

// TODO: Si la petición no coincide con ninguna de las rutas declaradas, mostrar error 404
app.use((req, res, next) => {
    res.write(`<div>
        <h1>404 - Ruta no encontrada</h1>
        <hr>
        <p>La pagina que intentas buscar no existe</p>
        <p>Redireccionando a la página de inicio...</p>
        <script>
        (
          () => setTimeout(() => {
            window.location.href='http://localhost:${port}';
           }, 4000)           
        )();
        </script>
    </h1>`)
})

// Starting the server
app.listen(port, () => console.log(`Server on port ${port}`));
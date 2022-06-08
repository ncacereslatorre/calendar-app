const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

//Crear el servidor de express
const app = express();

//Base de datos
dbConnection();

//CORS
app.use(cors());

//Lectura y parseo del body
app.use( express.json() );

// Rutas
//Todo lo que este archivo va a exportar lo va a habilitar
//En esta ruta
app.use('/api/auth', require('./routes/auth'));
// TODO CRUD: Eventos
app.use('/api/events', require('./routes/events'));//Ruta base

//Directorio publico
app.use( express.static('public') );



//Escuchar peticiones
app.listen( process.env.PORT , ()=> {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
} );
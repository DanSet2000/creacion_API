/*
Construcción y Evolución de Software

Creación de una API Para Almacenar Albums Musicales

Desarrollado Por:
    - Daniel Carvajal
    - Mónica Lucio
    - Lisbeth Romo
*/

// Importacion de Librerias
const express = require('express');
const app = express();

app.use(express.json());

// Puerto para Trabajar

const port = process.env.port || 80;
app.listen(port, () => console.log(`Escuchando en el puerto ${port}`));


// Elementos de la API con sus atributos
const albums = [
    {id: 1, nombre:'Californication', autor:'Red Hot Chili Peppers', genero: 'Funk Rock', anio_lanzamiento: 1999},
    {id: 2, nombre:'Invincible', autor:'Michael Jackson', genero: 'Pop', anio_lanzamiento: 2001},
    {id: 3, nombre:'Nevermind', autor:'Nirvana', genero: 'Rock', anio_lanzamiento: 1991},
    {id: 4, nombre:'Starboy', autor:'The Weeknd', genero: 'R&B', anio_lanzamiento: 2016},
    {id: 5, nombre:'Facelift', autor:'Alice in Chains', genero: 'Rock', anio_lanzamiento: 1990}
];

// Declaracion de Peticiones

app.get('/', (req, res) =>{
    res.send('Construccion y Evolucion de Software -' + ' API para almacenar Albumes Musicales')
});

// Ver todos los Albums Registrados
app.get('/api/albums', (req, res) =>{
    res.send(albums);
});

// Observar Album Por su Id Registrado
app.get('/api/albums/:id', (req, res) =>{
    const album = albums.find(c => c.id === parseInt(req.params.id));
    
    if (!album) return res.status(404).send("Album No Encontrado en Memoria");
    else res.send(album);
});

// Agregar un Nuevo Album
app.post('/api/albums', (req, res) => {
    const album = {
        id: albums.length + 1,
        nombre: req.body.nombre,
        autor: req.body.autor,
        genero: req.body.genero,
        anio_lanzamiento: parseInt(req.body.anio_lanzamiento)
    };

    albums.push(album);
    res.send(album);
});

// Eliminar un Album de Memoria por su ID
app.delete('/api/albums/:id', (req, res) =>{
    const album = albums.find(c => c.id === parseInt(req.params.id));

    if (!album) return res.status(404).send("Album No Encontrado en Memoria");
    
    const index = albums.indexOf(album);
    albums.splice(index, 1);
    res.send(album);
});


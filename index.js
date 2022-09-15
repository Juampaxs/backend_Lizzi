const express = require('express');
const { Contenedor } = require('./contenedor');

const PORT = process.env.PORT || 8080;

const app = express();

const contenedor = new Contenedor("productos.json");

app.get('/', (req, res) => {
    res.send('Página de inicio')
})

app.get('/productos', async (req, res) => {
    const data = await contenedor.getAll();
    res.send(data);
})

const sub = Math.floor(Math.random() * 10);

app.get('/productoRandom', async (req, res) => {
    const data = await contenedor.getById(sub);
    res.send(data);
})

app.get('*', (req, res) => {
    res.status(404).send('<h1> La página que busca no existe </h1>')
})

const connectedServer = app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
})

connectedServer.on('error', (error) => {
    console.log(error.message);
})
const express = require('express');

const PORT = process.env.PORT || 8080;

const app = express();

app.get('/', (req, res) => {
    res.send('Página de inicio')
})

app.get('/productos', (req, res) => {
    res.send('')
})

app.get('/productoRandom', (req, res) => {
    res.send('')
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
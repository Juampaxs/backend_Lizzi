const express = require('express');
const { Contenedor } = require('./contenedor');
const fs = require('fs');

const PORT = process.env.PORT || 8080;

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const contenedor = new Contenedor("productos.json");

//GET

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

app.get('/productos/:id', async (req, res) => {
    let { id } = req.params;
    const data = await contenedor.getById(parseInt(id));
    res.send(data);
})

app.get('*', (req, res) => {
    res.status(404).send('<h1> La página que busca no existe </h1>')
})

//POST

app.post('/productos', async (req, res) => {
    let { title, price, thumbnail} = req.body;
    let objeto = {
        id: null,
        title,
        price,
        thumbnail 
    }
    const data = await contenedor.save(objeto);
    res.send(data);
})

//PUT

app.put('/productos/:id', async (req, res) => {
    let { id } = req.params;
    let { title, price, thumbnail} = req.body;
    let data = await contenedor.getAll();
    data.forEach(element => {
        if (element.id == parseInt(id)) {
            element.title = title;
            element.price = price;
            element.thumbnail = thumbnail;
        }
    });
    await fs.promises.writeFile(`./productos.json`, JSON.stringify(data));
    let objeto = {
        id,
        title,
        price,
        thumbnail 
    }
    res.send(objeto);
})

//DELETE

app.delete('/productos/:id', async (req, res) => {
    const { id } = req.params;
    const data = await contenedor.deleteById(parseInt(id));
    res.send(data);
})

const connectedServer = app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
})

connectedServer.on('error', (error) => {
    console.log(error.message);
})
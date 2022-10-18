const express = require('express');
const { Contenedor } = require('../../contenedor');
const fs = require('fs');

const router = express.Router();

//Middlewares

//Routes

const contenedor = new Contenedor("carrito.json");

//GET

router.get('/:id/productos', async (req, res) => {
    let { id } = req.params;
    const data = await contenedor.getById(parseInt(id));
    if (!data) {
        return res.json({ error: 'carrito no encontrado'});
    }
    res.send(data.productos);
})

//POST

router.post('/', async (req, res) => {
    let { productos} = req.body;
    let productosArray = [];
    productos.forEach(e => {
        let producto = {
            id: e.id,
            timestamp: e.timestamp, 
            name: e.name,
            description: e.description,
            code: e.code,
            thumbnail: e.thumbnail,
            price: e.price,
            stock: e.stock
        }
        productosArray.push(producto);
    })
    let objeto = {
        id: null,
        timestamp: Date.now(),
        productos: productosArray
    }
    const data = await contenedor.save(objeto);
    res.send(data);
})

router.post('/:id/productos', async (req, res) => {
    let { idCarrito } = req.params;
    let { id, timestamp, name, description, code, thumbnail, price, stock} = req.body;
    let data = await contenedor.getAll();
    let producto = {};
    data.forEach(element => {
        if (element.id == parseInt(idCarrito)) {
            producto.id = id;
            producto.timestamp = timestamp;
            producto.name = name;
            producto.description = description;
            producto.code = code;
            producto.thumbnail = thumbnail;
            producto.price = price;
            producto.stock = stock;
            element.productos.push(producto);
        }
    });
    await fs.promises.writeFile(`./carrito.json`, JSON.stringify(data));
    res.send(producto);
})

//DELETE

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const data = await contenedor.deleteById(parseInt(id));
    res.send(data);
})

router.delete('/:id/productos/:id_prod', async (req, res) => {
    const { id, id_prod } = req.params;
    const data = await contenedor.deleteByIdCarritoAndProducto(parseInt(id), parseInt(id_prod));
    res.send(data);
})


module.exports = router;
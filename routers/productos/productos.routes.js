const express = require('express');
const { Contenedor } = require('../../contenedor');
const fs = require('fs');

const router = express.Router();

//Middlewares

//Routes

const contenedor = new Contenedor("productos.json");

//GET

router.get('/:id?', async (req, res) => {
    let { id } = req.params;
    let data;
    if (!!id) {
        data = await contenedor.getById(parseInt(id));
    } else {
        data = await contenedor.getAll();
    }
    if (!data) {
        return res.json({ error: 'producto no encontrado'});
    }
    res.send(data);
})

//POST

router.post('/', async (req, res) => {
    let { name, description, code, thumbnail, price, stock} = req.body;
    let objeto = {
        id: null,
        timestamp: Date.now(), 
        name,
        description,
        code,
        thumbnail,
        price,
        stock 
    }
    const data = await contenedor.save(objeto);
    res.send(data);
})

//PUT

router.put('/:id', async (req, res) => {
    let { id } = req.params;
    let { name, description, code, thumbnail, price, stock} = req.body;
    let data = await contenedor.getAll();
    data.forEach(element => {
        if (element.id == parseInt(id)) {
            element.timestamp = Date.now();
            element.name = name;
            element.description = description;
            element.code = code;
            element.thumbnail = thumbnail;
            element.price = price;
            element.stock = stock;
        }
    });
    await fs.promises.writeFile(`./productos.json`, JSON.stringify(data));
    let objeto = {
        id,
        timestamp,
        name,
        description,
        code,
        thumbnail,
        price,
        stock
    }
    res.send(objeto);
})

//DELETE

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const data = await contenedor.deleteById(parseInt(id));
    res.send(data);
})


module.exports = router;
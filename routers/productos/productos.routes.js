const express = require('express');
const { Contenedor } = require('../../contenedor');
const fs = require('fs');

const router = express.Router();

//Middlewares

//Routes

const contenedor = new Contenedor("productos.json");

//GET

router.get('/', async (req, res) => {
    const data = await contenedor.getAll();
    res.send(data);
})

router.get('/:id', async (req, res) => {
    let { id } = req.params;
    const data = await contenedor.getById(parseInt(id));
    res.send(data);
})

//POST

router.post('/', async (req, res) => {
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

router.put('/:id', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const data = await contenedor.deleteById(parseInt(id));
    res.send(data);
})


module.exports = router;
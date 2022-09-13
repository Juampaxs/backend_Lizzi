const fs = require('fs');

async function guardar (objeto) {
    try {
        const contenido = await fs.promises.readFile('./productos.txt', 'utf-8');
        const datos = JSON.parse(contenido);
        let id = 1;
        if (datos.length == 0) {   
            objeto.id = id;
        } else {
            objeto.id = datos[datos.length - 1].id + 1;
        }
        datos.push(objeto);
        contenido = JSON.stringify(datos);
        try {
            await fs.promises.writeFile('./productos.txt', contenido);
            return objeto.id;
        }
        catch (error) {
            console.log('Error al guardar archivo');
        }
    }
    catch (error) {
        console.log('Error al leer archivo');
    }
}

async function obtenerObjeto (id) {
    try {
        const contenido = await fs.promises.readFile('./productos.txt', 'utf-8');
        const datos = JSON.parse(contenido);
        datos.forEach(element => {
            if (element.id == id) {
                return element;
            } else {
                return null;
            }
        });
    }
    catch (error) {
        console.log('Error al leer archivo');
    }
}

async function obtenerArray () {
    try {
        const contenido = await fs.promises.readFile('./productos.txt', 'utf-8');
        return JSON.parse(contenido);
    }
    catch (error) {
        console.log('Error al leer archivo');
    }
}

async function eliminarId (id) {
    try {
        const contenido = await fs.promises.readFile('./productos.txt', 'utf-8');
        const datos = JSON.parse(contenido);
        const arr = datos.filter(element => element.id != id);
        try {
            await fs.promises.writeFile('./productos.txt', JSON.stringify(arr));
        }
        catch (error) {
            console.log('Error al guardar archivo');
        }
    }
    catch (error) {
        console.log('Error al leer archivo');
    }
}

async function eliminarArray () {
    try {
        await fs.promises.writeFile('./productos.txt', '');
    }
    catch (error) {
        console.log('Error al guardar archivo');
    }
}

class Contenedor {
    constructor(nombre) {
        this.nombre = nombre;
    }

    save(objeto) {
        const id = guardar(objeto);
        return id;
    }

    getById(id) {
        const objeto = obtenerObjeto(id);
        return objeto;
    }

    getAll() {
        const objeto = obtenerArray();
        return objeto;
    }

    deleteById(id) {
        eliminarId(id);
    }

    deleteAll() {
       eliminarArray();
    }
}
 module.exports = {
    Contenedor
 }
/*
const contenedor = new Contenedor("productos.txt");
const objeto1 = { title: "Producto 1", price: 123, thumbnail: "url1"}
contenedor.save(objeto1).then(result => {
    console.log(result);
});
const objeto2 = { title: "Producto 2", price: 123, thumbnail: "url2"}
contenedor.save(objeto2);
contenedor.getById(0).then(result => {
    console.log(result);
});
contenedor.deleteById(1);
contenedor.deleteAll();
*/

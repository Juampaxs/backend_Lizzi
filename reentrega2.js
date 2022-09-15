const fs = require('fs');

class Contenedor {
    constructor(nombre) {
        this.nombre = nombre;
    }

    async save(objeto) {
        try {
            let contenido = await fs.promises.readFile(`./${this.nombre}`, 'utf-8');
            let datos = JSON.parse(contenido);
            if (datos.length == 0) {   
                objeto.id = 1;
            } else {
                objeto.id = datos[datos.length - 1].id + 1;
            }
            datos.push(objeto);
            await fs.promises.writeFile(`./${this.nombre}`, JSON.stringify(datos));
            return objeto.id;
        }
        catch (error) {
            console.log('Error al leer archivo guardar');
        }
    }

    async getById(id) {
        try {
            let elemento;
            let contenido = await fs.promises.readFile(`./${this.nombre}`, 'utf-8');
            let datos = JSON.parse(contenido);
            datos.forEach(element => {
                if (element.id == id) {
                    elemento = element;
                } else {
                    return null;
                }
            });
            return elemento;
        }
        catch (error) {
            console.log('Error al leer archivo 1 obj');
        }
    }

    async getAll() {
        try {
            let contenido = await fs.promises.readFile(`./${this.nombre}`, 'utf-8');
            return JSON.parse(contenido);
        }
        catch (error) {
            console.log('Error al leer archivo array');
        }
    }

    async deleteById(id) {
        try {
            let contenido = await fs.promises.readFile(`./${this.nombre}`, 'utf-8');
            let datos = JSON.parse(contenido);
            let arr = datos.filter(element => element.id != id);
            await fs.promises.writeFile(`./${this.nombre}`, JSON.stringify(arr));
        }
        catch (error) {
            console.log('Error al leer archivo');
        }
    }

    async deleteAll() {
        try {
            await fs.promises.writeFile(`./${this.nombre}`, '');
        }
        catch (error) {
            console.log('Error al guardar archivo');
        }
    }
}


let contenedor = new Contenedor("productos.json");
let objeto1 = { title: "Producto 1", price: 123, thumbnail: "url1", id: 1}
contenedor.save(objeto1).then(result => {
    console.log(result);
});
contenedor.getById(2).then(result => {
    console.log(result);
});
contenedor.deleteById(1);
contenedor.deleteAll();
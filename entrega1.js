class Usuario {
    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName() {
        return `${this.nombre} ${this.apellido}`
    }

    addMascota(mascota) {
        this.mascotas.push(mascota);
    }

    countMascotas() {
        return this.mascotas.length;
    } 
    
    addBook(nombre,autor) {
        this.libros.push({ nombre: nombre, autor: autor });
    }

    getBookNames() {
        let nombres = [];
        this.libros.forEach(e => {
            nombres.push(e.nombre)
        });
        return nombres;
    }
}

const usuario = new Usuario('Elon', 'Musk', [], []);

usuario.addMascota('perro');
usuario.addMascota('gato');
console.log('Cantidad de mascotas: ' + usuario.countMascotas());
usuario.addBook('El señor de las moscas', 'William Golding');
usuario.addBook('Fundacion', 'Isaac Asimov');
console.log('Libros: ' + usuario.getBookNames());
console.log('Nombre completo: ' + usuario.getFullName());
const express = require('express');
const productsRoutes = require('./productos/productos.routes');
const carritoRoutes = require('./carrito/carrito.routes')

const router = express.Router();

router.use('/productos', productsRoutes);
router.use('/carrito', carritoRoutes)

module.exports = router;
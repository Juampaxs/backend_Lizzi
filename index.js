const express = require('express');
const path = require('path');
const apiRoutes = require('./routers/app.routers');
const loggerMiddleware = require('./middlewares/logger');

const PORT = process.env.PORT || 8080;

const app = express();

const { engine } = require('express-handlebars');

app.engine(
    "hbs",
    engine({
        extname: "hbs",
        defaultLayout: 'index.hbs',
        layoutsDir: path.resolve(__dirname, './views/layouts'),
        partialsDir: path.resolve(__dirname, './views/partials')
    })
);

app.set("view engine", "hbs");
app.set("views", "./views");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(loggerMiddleware);

//Routes
app.use('/api', apiRoutes);

//No implementados

app.get('*', (req, res) => {
    res.status(404).json({error: -2, description: 'La ruta del método GET no está implementada'})
})

app.post('*', (req, res) => {
    res.status(404).json({error: -2, description: 'La ruta del método POST no está implementada'})
})

app.put('*', (req, res) => {
    res.status(404).json({error: -2, description: 'La ruta del método PUT no está implementada'})
})

app.delete('*', (req, res) => {
    res.status(404).json({error: -2, description: 'La ruta del método DELETE no está implementada'})
})


const connectedServer = app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
})

connectedServer.on('error', (error) => {
    console.log(error.message);
})
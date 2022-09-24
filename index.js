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

//GET

app.get('*', (req, res) => {
    res.status(404).send('<h1> La página que busca no existe </h1>')
})


const connectedServer = app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
})

connectedServer.on('error', (error) => {
    console.log(error.message);
})
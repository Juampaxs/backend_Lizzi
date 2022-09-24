const logger = (req, res, next) => {
    const method = req.method;
    const url = req.url;
    const fecha = new Date();
    const fechaString = fecha.getDay() + '-' + fecha.getMonth() + '-' + fecha.getFullYear();
    console.log(`[${method}] => ${url}`, fechaString)
    next();
};

module.exports = logger;
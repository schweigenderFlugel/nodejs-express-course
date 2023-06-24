const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, './public')))

app.get('/', (req, res, next) => {
    res.sendFile('./views/index.html', { root: __dirname })
});

app.get('/new-page(.html)?', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html' ))
});

app.get('/old-page(.html)?', (req, res, next) => {
    res.redirect(301,'/new-page.html');
});

app.get('/*', (req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html' ))
})

app.listen(3000, () => {
    console.log('Estoy escuchando por el puerto 3000');
})
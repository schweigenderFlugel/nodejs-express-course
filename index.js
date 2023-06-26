const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express();


const userRoute = require('./routes/user.routes');
const { logger } = require('./middlewares/logEvents');
const errorHandler = require('./middlewares/errorHandler');

// THIS IS THE FIRST CUSTOM MIDDLEWARE, WHICH CAPTURES ALL THE INFORMATION OF THE REQUEST 
// WE MAKE TO THE API.  
app.use(logger);


const whitelist = ['https://www.yoursite.com', 'http://localhost:3500'];
const options = {
    origin: (origin, callback) => {
        if(whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}
app.use(cors(options));

// BUILT-IN MIDDLEWARES: 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, './public')))

app.use(cookieParser());

// CUSTOM MIDDLEWARE
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

app.use('/users', userRoute);

app.get('/', (req, res, next) => {
    res.sendFile('./views/index.html', { root: __dirname })
});

app.get('/new-page(.html)?', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html' ))
});

app.get('/old-page(.html)?', (req, res, next) => {
    res.redirect(301,'/new-page.html');
});

app.all('/*', (req, res, next) => {
    if (req.accepts('html')) {
        res.status(404).sendFile(path.join(__dirname, 'views', '404.html' ))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found'})
    } else {
        res.type('txt').send('404 Not Found'); 
    }
    
})

app.use(errorHandler)

app.listen(3000, () => {
    console.log('Estoy escuchando por el puerto 3000');
})
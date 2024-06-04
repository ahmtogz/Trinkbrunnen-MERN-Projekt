
const express = require('express')
const {engine} = require('express-handlebars')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const session = require('express-session');

const app = express()
const hostname = '127.0.0.1';
const port =  5000

const methodOverride = require('method-override');


mongoose.set('strictQuery',false)
mongoose.connect('mongodb://127.0.0.1/trink_brunnen')
    .then(() => {
        console.log('MongoDB connected');

    });

app.use(session({
    secret: 'testotesto',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }  // Setze dies auf true, wenn du HTTPS verwendest
}));

//Flash - message  Middleware
app.use((req, res, next)=>{
    res.locals.sessionFlash = req.session.sessionFlash
    delete req.session.sessionFlash
    next()
})

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use((req, res, next) => {
    const isAdmin = req.session.isAdmin || false; // Default to false if not set
    res.locals.displayLink = isAdmin;

    console.log("res.locals.displayLink:", res.locals.displayLink);
    next();
})

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

const main = require('./router/main');  // Kombinierte Routen-Datei
app.use('/', main);

app.use(express.static('public'))

app.listen(port,hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})




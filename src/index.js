const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars'); // es una función a configurar
const methodOverride = require('method-override');
const session = require('express-session'); // es una función a configurar
const flash = require('connect-flash'); // modulo para enviar mensajes en multiples vistas
const passport = require('passport');

//Init
const app = express();
require('./database');
require('./config/passport');

//Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({ // Configuración de la función para saber de qué forma obtendremos las vistas
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
}));
app.set('view engine', '.hbs'); // Configurar motor de las vistas

//Middlewares
app.use(express.urlencoded({extended: false})); // Para poder recibir los datos del form, extended false porque no voy a recibir imgs
app.use(methodOverride('_method')); // revisa las peticiones de los inputs ocultos
app.use(session({ // Para guardar los datos del usuario al autenticarse
    secret: 'mySecretApp',
    resave: true,
    saveUninitialized: true,
}));
// Configuración de autenticación
app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); // envía mensajes en multiples vistas

//Global variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');

    next(); // dejarlo al final antes de terminar la función para que no se quede cargando el navegador aquí y continué con lo siguiente
});

//Routes
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));

//Static files
app.use(express.static(path.join(__dirname, 'public')));

//Server is listening
app.listen(app.get('port'), () => {
    console.log('Server listening on port', app.get('port'));
});
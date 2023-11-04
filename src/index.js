const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars'); // es una función a configurar
const methodOverride = require('method-override');
const session = require('express-session'); // es una función a configurar

//Init
const app = express();
require('./database');

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
app.use(methodOverride('_method'));
app.use(session({ // Para guardar los datos del usuario al autenticarse
    secret: 'mySecretApp',
    resave: true,
    saveUninitialized: true,
}))

//Global variables

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
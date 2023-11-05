const passport = require('passport'); // autetnticar datos del usuario de alguna forma (fb, google, local, etc)
const LocalStrategy = require('passport-local').Strategy; // la elegida es la local

const User = require ('../models/User');

passport.use(new LocalStrategy ({ // definición de la auteticación
    usernameField: 'email',
}, async (email, password, done)=> { 
    const user = await User.findOne({ email: email});
    if (!user) {
        return done(null, false, { message: 'User not found' });// done es para terminar el proceso de auteticación (null es para decir que no hubo un error, false para si hay un error y te devuelve el mensaje)
    } else{
        const match = await user.matchPassword(password);
        if (match) {
            return done(null, user);
        } else {
            return done(null, false, {message: "Incorrect password"});
        }
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
}); // cuando el usuario se atentique al logearse guarda el id para evitar que se autentique más veces

passport.deserializeUser(async (id, done) => {// con base al id guardado pueden pasar dos encontrarlo y devolverlo o si hay un error devolver el error
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

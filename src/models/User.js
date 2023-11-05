const mongoose = require ('mongoose');
const bcrypt = require ('bcryptjs');

const {Schema} = mongoose;

const UserSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    date: { type: Date, default: Date.now() },
});

UserSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10); // numero de veces para hacer el hash
    const hash = bcrypt.hash(password, salt); // cifrar la contraseña
    return hash
};

UserSchema.methods.matchPassword = async function (password) { // comparar las contraseñas entre la que escriba el user y la cifrada de la DB
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema)
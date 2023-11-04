const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/notes-db-app') //evitar usar local host
  .then(() => {
    console.log('Conectado');
  })
  .catch(err => console.error(err));

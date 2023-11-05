const router = require('express').Router();
const Note = require('../models/Note');
const { isAuthenticated } = require('../helpers/auth'); // verifica que el usuario este logedo

//AGREGAR NOTAS
router.get('/notes/add', isAuthenticated, (req, res) => {
    res.render('notes/new-notes');
});

router.post('/notes/new-note', isAuthenticated, async (req, res) => {
    const { title, description } = req.body;
    const errors = [];
    if (!title) {
        errors.push({ text: 'Please enter a title' })
    }
    if (!description) {
        errors.push({ text: 'Please enter a description' })
    }
    if (errors.length > 0) {
        res.render('notes/new-notes', {
            errors,
            title,
            description
        })
    } else {
        const newNote = new Note({ title, description });
        await newNote.save();
        req.flash('success_msg', "Note saved successfully");
        res.redirect('/notes');
    }
});

//NOTAS
router.get('/notes', isAuthenticated, async (req, res) => {
    const notes = await Note.find().lean().sort({date: 'desc'}); // traer todos los datos, pero puedo pasarle dentro como objeto los parámetros especificos a traer. al agregar .lean() evitas que se traiga info inecesaria
    console.log(notes);
    res.render('notes/all-notes', { notes });
});

//EDITAR NOTAS
router.get('/notes/edit/:id', isAuthenticated, async (req, res) => {
    const note = await Note.findById(req.params.id).lean();
    res.render('notes/edit-note', { note });
});

router.put('/notes/edit-note/:id', isAuthenticated, async (req, res) => {
    const { title, description } = req.body;
    await Note.findByIdAndUpdate(req.params.id, { title, description }).lean();
    req.flash('success_msg', "Note updated successfully");
    res.redirect('/notes');
});

router.delete('/notes/delete/:id', isAuthenticated, async (req, res) => {
    const { title, description } = req.body;
    await Note.findByIdAndDelete(req.params.id).lean();
    req.flash('success_msg', "Note deleted successfully");
    res.redirect('/notes');
});

module.exports = router;
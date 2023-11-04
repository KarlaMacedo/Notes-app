const router = require('express').Router();

router.get('/notes/add', (req, res) => {
    res.render('notes/new-notes');
});

router.get('/notes', (req, res) => {
    res.send('All notes found from DB');
});

module.exports = router;
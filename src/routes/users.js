const router = require('express').Router();
const User = require('../models/User');
const passport = require('passport');

// LOGIN
router.get('/users/signin', (req, res) => {
    res.render('users/signin');
});

router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/notes',
    failureRedirect: '/users/signin',
    failureFlash: true,
})); // autenticación la traemos de passport

// REGISTRO
router.get('/users/signup', (req, res) => {
    res.render('users/signup');
});

router.post('/users/signup', async (req, res) => {
    const { name, email, password, confirm_password } = req.body;
    const errors = [];
    const emailUser = await User.findOne({ email: email });
    if (!confirm_password || !password || !email || !name) {
        errors.push({ text: 'Please complete all required fields' })
    }
    if (password !== confirm_password) {
        errors.push({ text: 'Password does not match' })
    }
    if (password.lenght < 4) {
        errors.push({ text: 'Password must be at least 4 characters' })
    }
    if (emailUser) {
        errors.push({ text: 'Email already exists' });
    }
    if (errors.length > 0) {
        res.render('users/signup', { errors, name, email, password, confirm_password })
    } else {
        const newUser = new User({ name, email, password });
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        req.flash('success_msg', 'User saved successfully');
        res.redirect('/users/signin');
    }

});

module.exports = router;
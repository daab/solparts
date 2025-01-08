import express from 'express';
import passport from 'passport';

const router = express.Router();

// Ruta de inicio de sesión
router.get('/login', (req, res) => {
  res.render('login', { message: req.flash('error') });
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login',
  failureFlash: true
}));

// Ruta de cierre de sesión
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/');
});

export default router;
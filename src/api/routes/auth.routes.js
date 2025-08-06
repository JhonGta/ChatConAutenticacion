const express = require("express");
const passport = require("passport");
const { generateToken } = require("../../infrastructure/utils/jwt.utils");
const authController = require("../controllers/auth.controller");
const {
  validate,
  authSchemas,
} = require("../../infrastructure/middlewares/validation.middleware");
const {
  authMiddleware,
} = require("../../infrastructure/middlewares/auth.middleware");

const router = express.Router();

// Rutas públicas
router.post(
  "/register",
  validate(authSchemas.register),
  authController.register
);
router.post("/login", validate(authSchemas.login), authController.login);

// Rutas de Google OAuth
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login-error' }),
  (req, res) => {
    try {
      console.log('Usuario en callback:', {
        id: req.user._id,
        email: req.user.email,
        displayName: req.user.displayName,
        isGoogleUser: req.user.isGoogleUser
      });

      // Generar JWT usando el helper
      const token = generateToken(req.user);

      console.log('Token generado para:', req.user.email);
      console.log('Token:', token.substring(0, 50) + '...');
      
      // Redirigir al frontend con el token
      res.redirect(`http://localhost:5500/auth-callback.html?token=${token}`);
    } catch (error) {
      console.error('Error en callback de Google:', error);
      res.redirect('http://localhost:5500/client-example.html?error=auth_failed');
    }
  }
);

// Rutas protegidas
router.get("/profile", authMiddleware, authController.getProfile);

module.exports = router;

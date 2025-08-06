const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');
const { UserRepository } = require('../infrastructure/repositories/user.repository');

const userRepository = new UserRepository();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
}, async (accessToken, refreshToken, profile, done) => {
    try {
        console.log('Perfil de Google recibido:', {
            id: profile.id,
            email: profile.emails[0].value,
            name: profile.displayName
        });

        // 1. Verificar si el usuario ya existe con su Google ID
        let user = await userRepository.findByGoogleId(profile.id);
        
        if (user) {
            console.log('Usuario existente encontrado:', user.email);
            return done(null, user);
        }

        // 2. Verificar si existe un usuario con el mismo email
        user = await userRepository.findByEmail(profile.emails[0].value);
        
        if (user) {
            // Usuario existe pero sin Google ID, agregar Google ID
            user.googleId = profile.id;
            await userRepository.update(user._id, { googleId: profile.id });
            console.log('Google ID agregado a usuario existente:', user.email);
            return done(null, user);
        }

        // 3. Crear nuevo usuario
        const newUserData = {
            email: profile.emails[0].value,
            googleId: profile.id,
            displayName: profile.displayName,
            // No necesita password porque usa OAuth
            isGoogleUser: true
        };

        user = await userRepository.create(newUserData);
        console.log('Nuevo usuario creado con Google:', user.email);
        
        return done(null, user);
        
    } catch (error) {
        console.error('Error en estrategia de Google:', error);
        return done(error, false);
    }
}));

// Serialización para sesiones (aunque usemos JWT)
passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await userRepository.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

module.exports = passport;

// filepath: /c:/www/solparts/passport-config.js
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

// Configurar la estrategia local
passport.use(new LocalStrategy(
  function(username, password, done) {
    // Aquí deberías buscar el usuario en tu base de datos y verificar la contraseña
    // Por simplicidad, vamos a usar un usuario ficticio
    const user = { id: 1, username: 'test', password: 'password' };

    if (username === user.username && password === user.password) {
      return done(null, user);
    } else {
      return done(null, false, { message: 'Incorrect username or password.' });
    }
  }
));

// Serializar el usuario
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// Deserializar el usuario
passport.deserializeUser(function(id, done) {
  // Aquí deberías buscar el usuario en tu base de datos por su ID
  // Por simplicidad, vamos a usar un usuario ficticio
  const user = { id: 1, username: 'test' };
  done(null, user);
});
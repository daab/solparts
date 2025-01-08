import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from './modules/system/models/user-model.js'; // Importar el modelo de usuario

// Configurar la estrategia local
passport.use(new LocalStrategy(
  async function(username, password, done) {
    try {
      const user = await User.findOne({ where: { username } });
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (user.password !== password) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

// Serializar el usuario
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// Deserializar el usuario
passport.deserializeUser(async function(id, done) {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
import createError from 'http-errors';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import session from 'express-session';
import passport from 'passport';
import flash from 'connect-flash';
import SequelizeStore from 'connect-session-sequelize';
import sequelize from './config/database.js'; // Importar la configuración de Sequelize
import './passport-config.js'; // Importar la configuración de passport

import indexRouter from './modules/system/routes/index-routes.js';
import usersRouter from './modules/system/routes/user-routes.js';
import authRouter from './modules/system/routes/auth-routes.js'; // Importar las rutas de autenticación

import adminRouter from './modules/admin/routes/admin-routes.js'; // Importar las rutas de admin

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'modules/system/views'));
app.set('view engine', 'pug'); // Cambiado de 'jade' a 'pug'

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Configurar express-session con connect-session-sequelize
const SequelizeSessionStore = SequelizeStore(session.Store);
const sessionStore = new SequelizeSessionStore({
  db: sequelize,
});

app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
}));

// Inicializar connect-flash
app.use(flash());

// Inicializar passport
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter); // Usar las rutas de autenticación
app.use('/admin', adminRouter); // Usar las rutas de admin

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');

  // render the error page
  res.status(err.status || 500);
  res.render('error-view');
});

// Sincronizar la base de datos
sequelize.sync({ force: false }).then(() => {
  console.log('Database & tables created!');
});

export default app;
import * as express from 'express';
import * as compression from 'compression';  // compresses requests
import * as session from 'express-session';
import * as bodyParser from 'body-parser';
import * as logger from 'morgan';
import * as lusca from 'lusca';
import * as dotenv from 'dotenv';
import * as mongo from 'connect-mongo';
import * as flash from 'express-flash';
import * as path from 'path';
import * as passport from 'passport';
import * as expressValidator from 'express-validator';
import { createConnection } from 'typeorm';

const MongoStore = mongo(session);

// Load environment variables from .env file
dotenv.config({ path: __dirname + '/../dev.env.example' });

// Controllers (route handlers)
import * as apiController from './controllers/api';
import * as userController from './controllers/user';
import * as contactController from './controllers/contact';

// Create Express server
const app = express();
const rootPath = path.normalize(__dirname + '/../');

// Connect to SQlite
createConnection({
  // configurazione del nostro DB
  driver: {
    type: 'sqlite',
    storage: './db/pausappranzo.db',
    username: '',
    password: '',
    database: 'pausappranzo'
  },

  // mapping modelli nella directory './models'
  entities: [
    __dirname + './models/*.js'
  ],

  // sincronizza i modelli TypeScript con il DB ad ogni avvio.
  autoSchemaSync: false,

  // ... c'e' un errore
}).catch(error => console.log(error));

// Express configuration
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});
app.use((req, res, next) => {
  // After successful login, redirect back to the intended page
  if (!req.user &&
    req.path !== '/login' &&
    req.path !== '/signup' &&
    !req.path.match(/^\/auth/) &&
    !req.path.match(/\./)) {
    req.session.returnTo = req.path;
  } else if (req.user &&
    req.path === '/account') {
    req.session.returnTo = req.path;
  }
  next();
});

app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));

/**
 * API routes.
 */
app.get('/api', apiController.getApi);
app.get('/user', userController.getUser);
app.get('/contact', contactController.getContact);
app.post('/contact', contactController.postContact);

/**
 * Primary app routes for Angular will catch all route
 * Keep this one as the last one
 */
app.get('*', function(req, res) {
  res.sendFile(rootPath + 'dist/public/index.html', { user: req.user });
});

module.exports = app;

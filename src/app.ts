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
import { getConnectionManager } from 'typeorm';

const MongoStore = mongo(session);

// Load environment variables from .env file
dotenv.config({ path: __dirname + '/../dev.env.example' });

// Controllers (route handlers)
import * as apiController from './server/controllers/api';
import * as userController from './server/controllers/user';
import * as contactController from './server/controllers/contact';

// Create Express server
const app = express();
const rootPath = path.normalize(__dirname + '/../');

const connectionManager = getConnectionManager();
const connection = connectionManager.create({
  type: 'sqlite',
  database: './db/pausappranzo.db',
  name : 'pausappranzo',
  entities: [
    __dirname + './models/*.js'
  ]
});

connection.connect(); // performs connection

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
app.get('*', function (req, res) {
  res.sendFile(rootPath + 'dist/public/index.html', { user: req.user });
});

module.exports = app;

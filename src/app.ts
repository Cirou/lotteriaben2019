import 'reflect-metadata';
import * as express from 'express';
import * as compression from 'compression';  // compresses requests
import * as bodyParser from 'body-parser';
import * as logger from 'morgan';
import * as lusca from 'lusca';
import * as dotenv from 'dotenv';
import * as flash from 'express-flash';
import * as path from 'path';
import * as passport from 'passport';
import * as expressValidator from 'express-validator';
import * as fs from 'fs';
import * as http from 'http';
import * as https from 'https';
import { createConnection, getConnectionOptions } from 'typeorm';
import { Request, Response } from 'express';
import { AppRoutes } from './routes';
import { startLTDietDaemon } from './server/services/LTDiet';

const rootPath = path.normalize(__dirname + '/../');

// Load environment variables from .env file
dotenv.config({ path: __dirname + '/../dev.env.example' });

// create connection with database
// note that it's not active database connection
// TypeORM creates connection pools and uses them for your requests
createConnection({
  'type': 'sqlite',
  'database': '../db/pausappranzo.db',
  'synchronize': false,
  'logging': false,
  'entities': [
    './server/models/*.js'
  ]
}).then(async connection => {

  // create express app
  const app = express();
  app.use(bodyParser.json());

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
  AppRoutes.forEach(route => {
    app[route.method](route.path, (request: Request, response: Response, next: Function) => {
      route.action(request, response);
    });
  });

  /**
   * Primary app routes for Angular will catch all route
   * Keep this one as the last one
   */
  app.get('*', function (req, res) {
    res.sendFile(rootPath + 'dist/public/index.html', { user: req.user });
  });

  const privateKey = fs.readFileSync('../nginx-selfsigned.key', 'utf8');
  const certificate = fs.readFileSync('../nginx-selfsigned.crt', 'utf8');
  const credentials = { key: privateKey, cert: certificate };

  // run app
  const httpServer = http.createServer(app);
  const httpsServer = https.createServer(credentials, app);
  httpServer.listen(8080);
  httpsServer.listen(8443);
  console.log('Express application is up and running on port 443');

  startLTDietDaemon();

}).catch(error => console.log('TypeORM connection error: ', error));

import 'reflect-metadata';
import * as express from 'express';
import * as compression from 'compression'; // compresses requests
import * as bodyParser from 'body-parser';
import * as multer from 'multer';
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

const rootPath = path.normalize(__dirname + '/../');

// Load environment variables from .env file
dotenv.config({ path: __dirname + '/../dev.env.example' });

// create connection with database
// note that it's not active database connection
// TypeORM creates connection pools and uses them for your requests
createConnection({
    type: 'mysql',
    host: 'database-1.csum6c43lqrx.us-east-1.rds.amazonaws.com',
    port: 3306,
    username: 'admin',
    password: 'lotteriabeneficenza2019',
    database: 'lotteriaben2019',
    synchronize: false,
    logging: false,
    entities: ['./server/models/*.js']
})
    .then(async connection => {
        // create express app
        const app = express();

        // Express configuration
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
        app.use(express.static(path.join(__dirname, '.well-known'), { maxAge: 31557600000 }));
        app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));
        app.use(express.static(path.join(path.normalize(__dirname + '../'), 'uploads'), { maxAge: 31557600000 }));

        /**
         * API routes.
         */
        AppRoutes.forEach(route => {
            app[route.method](route.path, (request: Request, response: Response, next: Function) => {
                route.action(request, response);
            });
        });

        const storage = multer.diskStorage({
            // multers disk storage settings
            destination: function(req, file, cb) {
                cb(undefined, './public/uploads/');
            },
            filename: function(req, file, cb) {
                const datetimestamp = Date.now();
                cb(undefined, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
            }
        });

        const upload = multer({
            // multer settings
            storage: storage
        }).single('file');

        // API path that will upload the files
        app.post('/upload', function(req, res) {
            upload(req, res, function(err) {
                if (err) {
                    res.json({ error_code: 1, err_desc: err });
                    return;
                }
                res.json({ error_code: 0, file_path: '/uploads/' + req.file.filename, err_desc: undefined });
            });
        });

        /**
         * Primary app routes for Angular will catch all route
         * Keep this one as the last one
         */
        app.get('*', function(req, res) {
            res.sendFile(rootPath + 'dist/public/index.html', { user: req.user });
        });

        // Certificate
        const privateKey = fs.readFileSync('../privkey.pem', 'utf8');
        const certificate = fs.readFileSync('../cert.pem', 'utf8');
        const ca = fs.readFileSync('../chain.pem', 'utf8');

        const credentials = {
            key: privateKey,
            cert: certificate,
            ca: ca
        };

        // run app
        const httpServer = http.createServer(app);
        const httpsServer = https.createServer(credentials, app);
        httpServer.listen(80);
        httpsServer.listen(443);
        console.log('Express application is up and running on port 80 and 443');
    })
    .catch(error => console.log('TypeORM connection error: ', error));

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var express = require("express");
var compression = require("compression"); // compresses requests
var bodyParser = require("body-parser");
var logger = require("morgan");
var lusca = require("lusca");
var dotenv = require("dotenv");
var flash = require("express-flash");
var path = require("path");
var passport = require("passport");
var expressValidator = require("express-validator");
var fs = require("fs");
var http = require("http");
var https = require("https");
var typeorm_1 = require("typeorm");
var routes_1 = require("./routes");
var LTDiet_1 = require("./server/services/LTDiet");
var rootPath = path.normalize(__dirname + '/../');
// Load environment variables from .env file
dotenv.config({ path: __dirname + '/../dev.env.example' });
// create connection with database
// note that it's not active database connection
// TypeORM creates connection pools and uses them for your requests
typeorm_1.createConnection({
    'type': 'sqlite',
    'database': '../db/pausappranzo.db',
    'synchronize': false,
    'logging': false,
    'entities': [
        './server/models/*.js'
    ]
}).then(function (connection) { return __awaiter(_this, void 0, void 0, function () {
    var app, privateKey, certificate, ca, credentials, httpServer, httpsServer;
    return __generator(this, function (_a) {
        app = express();
        app.use(bodyParser.json());
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
        /**
         * API routes.
         */
        routes_1.AppRoutes.forEach(function (route) {
            app[route.method](route.path, function (request, response, next) {
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
        privateKey = fs.readFileSync('/etc/letsencrypt/live/www.pausappranzo.it/privkey.pem', 'utf8');
        certificate = fs.readFileSync('/etc/letsencrypt/live/www.pausappranzo.it/cert.pem', 'utf8');
        ca = fs.readFileSync('/etc/letsencrypt/live/www.pausappranzo.it/chain.pem', 'utf8');
        credentials = {
            key: privateKey,
            cert: certificate,
            ca: ca
        };
        httpServer = http.createServer(app);
        httpsServer = https.createServer(credentials, app);
        httpServer.listen(4200);
        httpsServer.listen(4443);
        console.log('Express application is up and running on port 4200 and 4443');
        LTDiet_1.startLTDietDaemon();
        return [2 /*return*/];
    });
}); }).catch(function (error) { return console.log('TypeORM connection error: ', error); });

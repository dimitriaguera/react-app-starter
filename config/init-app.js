/**
 * Created by Dimitri Aguera on 29/08/2017.
 */
'use strict';

const chalk = require('chalk');
const dateFormat = require('dateformat');
const path = require('path');
const config = require('./env/config');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const moduleUser = require('../modules/users/server/config/strategy');
const seedDB = require('./seeds/seeds');
const http = require('http');
const socketServer = require('socket.io');
const socketsEvents = require('./sockets/sockets.conf');

/**
 * Check basics needs on config file.
 */
module.exports.checkConfig = function() {

    // Check if NODE_ENV is set.
    if ( !process.env.NODE_ENV ) {

        // If no NODE_ENV, default set to development.
        console.error(chalk.red('WARNING: NODE_ENV is not defined! Set development environment by default'));
        process.env.NODE_ENV = 'development';
    }

    // Check if secret word for JWT generation is different from vanilla.
    if ( config.security.jwtSecret === 'SECRET' ) {
        console.log(chalk.red('Hey bro! You have to change security jwtSecret word on config.js file....'));
    }
};

/**
 * Set Application local variables
 */
module.exports.initLocals = function(app) {

    app.locals.title = config.app.title;
    app.locals.description = config.app.description;
    app.locals.keywords = config.app.keywords;
    app.locals.logo = config.app.logo;
    app.locals.favicon = config.app.favicon;
    app.locals.env = config.env;

    // Passing the request url to environment locals
    app.use(function (req, res, next) {
        res.locals.host = req.protocol + '://' + req.hostname;
        res.locals.url = req.protocol + '://' + req.headers.host + req.originalUrl;
        next();
    });

    // Disable the powered-by from header resp.
    app.disable('x-powered-by');
};

/**
 * Init various express middlewares
 */
module.exports.initMiddleware = function(app) {

    // Helmet middleware.
    app.use(helmet());

    // Compression.
    app.use(compression());

    // Body parser
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(bodyParser.json());
};

/**
 * Init log messages system
 * @param app
 */
module.exports.initLogger = function(app) {

    // Morgan
    app.use(morgan(config.logger));
};

/**
 * Connect to database
 * @param app
 */
module.exports.initDatabase = function(app) {

    const dbUri = `mongodb://${config.db.host}:${config.db.port}/${config.db.database}`;
    const opt = {};
    opt.useMongoClient = true;

    mongoose.Promise = require('bluebird');

    mongoose.connect(dbUri, opt);
};

/**
 * Init Authentication module
 * @param app
 * @param passport
 */
module.exports.initAuth = function(app, passport) {

    moduleUser.init(app, passport);
};

/**
 * Set the pug view engine, called with .server.views.html suffixed files
 * @param app
 */
module.exports.initViewEngine = function(app) {

    app.engine('server.views.html', require('pug').__express);
    app.set('view engine', 'server.views.html');
    app.set('views', path.resolve('./'));
};

/**
 * Init routes app
 * @param app
 */
module.exports.initRoutes = function(app) {

    // Virtual path for Static files
    app.use('/static', express.static(path.resolve('./public')));

    // Modules routes
    require('../modules/users/server/routes/auth.server.routes')(app);
    require('../modules/core/server/routes/core.server.routes')(app);

};

/**
 * Connect Socket.io to server.
 */
module.exports.socketConnect = function(app) {

    const serve = http.createServer(app);
    const io = socketServer(serve);

    require('../modules/users/server/sockets/users.server.sockets')( socketsEvents, io );

    return serve;
};


/**
 * Main initialisation
 * @param app
 */
module.exports.startApp = function() {

    const app = express();

    this.checkConfig();

    this.initLocals(app);
    this.initMiddleware(app);
    this.initDatabase(app);
    this.initLogger(app);
    this.initAuth(app, passport);
    this.initViewEngine(app);
    this.initRoutes(app);

    const serve = this.socketConnect(app);

    serve.listen(config.port);

    seedDB.populate();

    console.log(chalk.yellow(`SERVER STARTED at ${dateFormat(new Date(), "isoDateTime")}`));
    console.log(chalk.yellow(`MODE ---> ${process.env.NODE_ENV}`));
    console.log(chalk.blue(`SOCKET listening`));

    return serve;
};
/**
 * Created by Dimitri Aguera on 27/08/2017.
 */
'use strict';

module.exports = {
    db: {
        client: 'mongodb',
        host: '127.0.0.1',
        port: '27017',
        user: 'DB_USER_NAME',
        password: 'DB_PASSWORD',
        database: 'my-db-name'
    },
    security: {
        jwtSecret: 'secret',
        saltRounds: 10
    },
    app: {
        name: 'react-app-starter',
        host: 'localhost',
        port: '3000',
        title: 'Un super titre',
        description: 'Une super description',
        keywords: 'de, super, mots, clés',
        logo: 'assets/img/logo.png',
        favicon: 'assets/img/ico.png',
        logger: ':method :url :status :response-time ms - :res[content-length]',
        api_base_url: '/api/',
    }

};



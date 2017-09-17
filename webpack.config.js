/**
 * Created by Dimitri Aguera on 30/08/2017.
 */
const path = require('path');

module.exports = {
    entry: './modules/core/client/index.js',
    output: {
        path: path.resolve('public/dist'),
        filename: 'bundle.js'
    },
    resolve: {
        modules: [
            path.resolve(__dirname, 'modules'),
            path.resolve(__dirname, 'config'),
            'node_modules'
        ]
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
        ]
    }
};
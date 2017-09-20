/**
 * Created by Dimitri Aguera on 20/09/2017.
 */
/**
 * Created by Dimitri Aguera on 30/08/2017.
 */
const path = require('path');

// Plugins
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        main: path.resolve(__dirname, 'modules/core/client/index.js'),
    },
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

        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.jsx$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(ico|eot|otf|webp|ttf|woff|woff2)$/i,
                use: {
                    loader:'file-loader',
                    options: {
                        limit: 100000,
                        name: 'assets/font/[name].[hash:8].[ext]',
                    }
                },
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            // path: '/images',
                            name: 'images/[name].[hash:8].[ext]'
                        }
                    },
                    'img-loader'
                ]
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(['public/dist']),
    ],
};
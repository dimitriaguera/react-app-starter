/**
 * Created by Dimitri Aguera on 20/09/2017.
 */
/**
 * Created by Dimitri Aguera on 30/08/2017.
 */
const path = require('path');

// Plugins
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJSPlugin  = require('uglifyjs-webpack-plugin');


const merge = require('webpack-merge');
const common = require('./webpack.default.js');


module.exports = merge(common, {
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
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader', options: {
                            sourceMap: true
                        }
                    }
                        // , {loader: 'autoprefixer-loader'}
                    ],
                }),
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {loader: "css-loader"},
                        {loader: 'postcss-loader'},
                        {loader: "sass-loader"},
                    ],
                })
            },
        ],

    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new ExtractTextPlugin({ // define where to save the file
            filename: '[name].bundle.css',
            allChunks: true,
        }),
        new OptimizeCssAssetsPlugin({
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments: { removeAll: true } },
        }),
        new UglifyJSPlugin({
            sourceMap: true,
            compress: {
                warnings: false,
                drop_console: true
            },
            output: {
                comments: false
            }
        }),
    ],
});
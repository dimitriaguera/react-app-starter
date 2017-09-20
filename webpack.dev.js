/**
 * Created by Dimitri Aguera on 20/09/2017.
 */
/**
 * Created by Dimitri Aguera on 30/08/2017.
 */

// Plugins
const StyleLintPlugin = require('stylelint-webpack-plugin');


const merge = require('webpack-merge');
const common = require('./webpack.default.js');


module.exports = merge(common, {
    module: {
        rules: [
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
            {
                test: /\.css$/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader', options: {
                        sourceMap: true
                    }
                }
                    // , {loader: 'autoprefixer-loader'}
                ]},
            {
                test: /\.scss$/,
                use: [{
                    loader: 'style-loader'
                },{
                    loader: "css-loader", options: {
                        sourceMap: true,
                        importLoaders: 1,
                    }
                },{
                    loader: 'postcss-loader', options: {
                        sourceMap: true,
                    }
                }, {
                    loader: "sass-loader", options: {
                        sourceMap: true,
                    }
                }],
            },
        ],
    },
    plugins: [
        new StyleLintPlugin({}),
    ],
});

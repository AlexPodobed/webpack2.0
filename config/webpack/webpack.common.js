const webpack = require('webpack');
const cfgBase = require('../index');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
    context: cfgBase.paths.source,
    entry: {
        app: ['./index.js'],
        vendor: [
            'moment',
            'jquery'
        ]
    },
    output: {
        path: cfgBase.paths.output,
        publicPath: cfgBase.publicPath,
        filename: cfgBase.filename
    },
    resolve: {
        modules: [
            cfgBase.paths.source,
            cfgBase.paths.nodeModules
        ]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: '/node_modules/'
            },
            {
                test: /\.(png|jpg|gif)$/,
                exclude: '/node_modules/',
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: cfgBase.paths.img + '/[hash:12].[ext]'
                    }
                }]
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: 'application/font-woff',
                        name: cfgBase.paths.fonts + '/[name].[ext]'
                    }
                }]
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: cfgBase.paths.fonts + '/[name].[ext]'
                    }
                }]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin([cfgBase.paths.output], { root: cfgBase.paths.root }),
        new HTMLWebpackPlugin(cfgBase.htmlWebpackPlugin),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest']
        }),
        new webpack.DefinePlugin({
            DEVELOPMENT: cfgBase.env.IS_DEVELOPMENT,
            PRODUCTION: cfgBase.env.IS_PRODUCTION,
        })
    ],
    devtool: "source-map"
};

// webpack 1 converts all modules to commonJS style and it not possible to use tree-shaking
// to enable "tree-shaking we need to use ES6 modules
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const DEVELOPMENT = process.env.NODE_ENV === 'development';
const PRODUCTION = process.env.NODE_ENV === 'production';

const entry = PRODUCTION
    ? ['./src/index.js']
    : [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/dev-server',
        './src/index.js'
    ];

const plugins = PRODUCTION
    ? [
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin('styles.css?[hash]'),
        new HTMLWebpackPlugin({
            template: 'index-template.html'
        })
    ]
    : [
        new webpack.HotModuleReplacementPlugin()
    ];

plugins.push(
    new webpack.DefinePlugin({
        DEVELOPMENT: JSON.stringify(DEVELOPMENT),
        PRODUCTION: JSON.stringify(PRODUCTION),
    })
);

const cssIdentifier = PRODUCTION ? '[hash:base64:10]' : '[path][name]---[local]';
const cssLoader  = PRODUCTION
    ? ExtractTextPlugin.extract('css-loader')
    : [
        {
            loader: 'style-loader'
        },
        {
            loader: 'css-loader',
            options: {
                localIdentName: cssIdentifier
            }
        }
    ];

module.exports = {
    entry: entry,
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: PRODUCTION ? '/' :'/dist/',
        filename: PRODUCTION ? 'bundle.min.js?[hash]' :'bundle.js'
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
                        name: 'images/[hash:12].[ext]'
                    }
                }]
            },
            {
                test: /\.css$/,
                exclude: '/node_modules/',
                loaders: cssLoader
            }
        ]
    },
    performance: {
        maxEntrypointSize: 4000000,
        maxAssetSize: 10000000
    },
    plugins: plugins,
    devtool: "source-map"
};

// webpack 1 converts all modules to commonJS style and it not possible to use tree-shaking
// to enable "tree-shaking we need to use ES6 modules
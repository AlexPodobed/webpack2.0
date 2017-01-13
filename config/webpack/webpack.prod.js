const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const commonWebpackCfg = require('./webpack.common');
const cfgBase = require('../index');

const cfg = webpackMerge(commonWebpackCfg, {
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: '/node_modules/',
                loaders: ExtractTextPlugin.extract([
                    'css-loader',
                    'resolve-url-loader'
                ])
            },
            {
                test: /\.scss$/,
                exclude: '/node_modules/',
                loaders: ExtractTextPlugin.extract([
                    'css-loader',
                    'resolve-url-loader',
                    'sass-loader'
                ])
            }
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin('css/styles.css?[hash]'),
        new HTMLWebpackPlugin(cfgBase.htmlWebpackPlugin)
    ],
    devtool: 'source-map'
});

module.exports = cfg;
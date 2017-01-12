const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const commonWebpackCfg = require('./webpack.common');
const cfgBase = require('../index');
console.log('webpack.dev')
const cfg = webpackMerge(commonWebpackCfg, {
    entry: {
        app: [
            `webpack-dev-server/client?http://localhost:${cfgBase.port}`,
            'webpack/hot/dev-server'
        ]
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: '/node_modules/',
                loaders: [
                    'style-loader',
                    'css-loader',
                    'resolve-url-loader'
                ]
            },
            {
                test: /\.scss$/,
                exclude: '/node_modules/',
                loaders: [
                    'style-loader',
                    'css-loader',
                    'resolve-url-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    performance: {
        maxEntrypointSize: 4000000,
        maxAssetSize: 10000000
    },
    devtool: "source-map"
});

module.exports = cfg;
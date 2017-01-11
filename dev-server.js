const path = require('path');
const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const config = require('./webpack.config');

const compiler = webpack(config);

const server = new WebpackDevServer(compiler, {
    hot: true,
    filename: config.output.filename,
    publicPath: config.output.publicPath,
    stats: {
        color: true
    }
});

server.listen(8080, 'localhost', function () {
    console.log('listening on port 8080');
});

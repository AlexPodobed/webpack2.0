const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const cfgBase = require('./config');

const compiler = webpack(webpackConfig);
const server = new WebpackDevServer(compiler, cfgBase.webpackDevServer);

server.listen(cfgBase.port, 'localhost', function () {
    console.log(`Run mode: ${cfgBase.env.NODE_ENV}`);
    console.log(`listening on port ${cfgBase.port}`);
});

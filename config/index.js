const path = require('path');
const normalize = path.normalize;
const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 8080;
const IS_PRODUCTION = NODE_ENV === 'production';
const IS_DEVELOPMENT = NODE_ENV === 'development';
const PUBLIC_PATH = IS_PRODUCTION ? '' :  '';
const filename = IS_PRODUCTION ? 'js/[name].min.js?[hash]' :'js/[name].js';
const root = path.resolve(__dirname, '../');
const source = normalize(`${root}/src`);

const cfg = {
    filename,
    paths: {
        root,
        source,
        output: normalize(`${root}/dist`),
        nodeModules: normalize(`${root}/node_modules`),
        img: './images',
        fonts: './fonts'
    },
    htmlWebpackPlugin: {
        template: 'index.html'
    },
    webpackDevServer: {
        filename,
        contentBase: source,
        hot: true,
        publicPath: PUBLIC_PATH,
        stats: {
            color: true
        }
    },
    publicPath: PUBLIC_PATH,
    port: PORT,
    env: {
        NODE_ENV,
        IS_PRODUCTION,
        IS_DEVELOPMENT
    }
};

module.exports = cfg;
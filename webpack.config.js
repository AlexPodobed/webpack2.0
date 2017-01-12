switch (process.env.NODE_ENV) {
    case 'production':
        console.log('production')
        module.exports = require('./config/webpack/webpack.prod');
        break;
    case 'development':
        console.log('development')
        module.exports = require('./config/webpack/webpack.dev');
        break;
    default:
        throw new Error('You should use correct NODE_ENV');
};
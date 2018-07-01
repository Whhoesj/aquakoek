const merge = require('webpack-merge');
const base = require('./webpack.base.js');

module.exports = merge(base, {
    mode: 'development',
    devServer: {
        port: 9001,
        overlay: {
            warnings: true,
            errors: true
        }
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.js'
        }
    },
});

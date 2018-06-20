const merge = require('webpack-merge');
const base = require('./webpack.base.js');
const path = require('path');

module.exports = merge(base, {
    mode: 'development',
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.js'
        }
    },
});

const merge = require('webpack-merge');
const base = require('./webpack.base.js');

module.exports = merge(base, {
    mode: 'production',
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.min.js'
        }
    },
});

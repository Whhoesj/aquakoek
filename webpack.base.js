const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {VueLoaderPlugin} = require('vue-loader');
const WorkboxPlugin = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');


module.exports = {
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader',
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },

    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default']
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        }),
        new VueLoaderPlugin(),
        new WorkboxPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true
        }),
        new WebpackPwaManifest({
            short_name: "",
            name: "",
            start_url: ".",
            display: "standalone",
            theme_color: "#343a40",
            background_color: "#ffffff",
            icons: [
                {
                    src: path.resolve('src/assets/icon.png'),
                    sizes: [96, 128, 192, 256, 384, 512]
                }
            ]
        })
    ]
};

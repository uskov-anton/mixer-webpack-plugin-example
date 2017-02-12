import path from 'path';
import MixerPlugin from 'mixer-webpack-plugin';
import HtmlPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const dist = path.join(__dirname, 'dist');

const cssLoaders = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: {
        loader: 'css-loader',
        query: {
            modules: true,
            sourceMap: true,
        },
    },
});

const cssPlugin = new ExtractTextPlugin({
    filename: '[name].css',
});

const mainPlugins = {
    html: new HtmlPlugin({
        chunks: ['main'],
        filename: 'main.html',
        template: 'src/pages/main.pug',
    }),
    css: new ExtractTextPlugin({
        filename: 'main.css',
    }),
};

const secondPlugins = {
    html: new HtmlPlugin({
        chunks: ['second'],
        filename: 'second/second.html',
        template: 'src/pages/second/second.pug',
    }),
    css: new ExtractTextPlugin({
        filename: 'second/second.css',
    }),
};

export default {
    entry: {
        'main': './src/pages/main.js',
        'second/second': './src/pages/second/second.js',
    },
    output: {
        path: dist,
        filename: '[name].js',
        chunkFilename: '[id].js',
    },
    module: {
        rules: [{
            test: /\.css$/,
            loader: cssLoaders,
        }, {
            test: /\.pug$/,
            use: "pug-loader"
        }]
    },
    plugins: [
        MixerPlugin(mainPlugins.html, mainPlugins.css),
        MixerPlugin(secondPlugins.html, secondPlugins.css),
        cssPlugin,
    ]
};
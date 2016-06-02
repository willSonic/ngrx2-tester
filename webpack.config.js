var path = require('path');
var _root = path.resolve(__dirname, '..');
var npmRoot = __dirname + "/node_modules";
var appDir = __dirname + "/app";

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [_root].concat(args));
}

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin   = require("extract-text-webpack-plugin");
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;

module.exports = {
  entry: {
    vendor: './src/vendors.ts',
    main: './src/main.browser.ts'
  },
  output: {
  	path: 'dist/',
  	filename: '[name].bundle.js',
  	sourceMapFilename: '[name].map',
  	chunkFilename: '[id].chunk.js'
  },
  resolve: {
    extensions: ['', '.ts', '.js', '.scss', '.html',
      '.component.ts',  '.component.scss', '.component.html'],
    root: root('src'),
    modulesDirectories: ['node_modules']
  },
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
        exclude: [/\.(spec|e2e)\.ts$/]
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.html$/,
        loader: 'raw-loader',
        exclude: [root('src/index.html')]
      },
      {
        test : /\.css$/,
        loader:   ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test : /\.scss$/,
        loaders: ['raw-loader','sass-loader']

      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("styles.css"),
    new ForkCheckerPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ],
  node: {
    global: 'window',
    crypto: 'empty',
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
}

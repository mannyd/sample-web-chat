const dotEnv = require('dotenv').config();
const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [{ loader: 'babel-loader' }]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
            name: '[name][hash].[ext]',
            outputPath: 'images',
            esModule: false,
        },
    },
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  devtool: 'source-map',
  devServer: {
    contentBase: './build'
  },
  performance: {
    maxEntrypointSize: 1000000,
    maxAssetSize: 1000000
  },
  output: {
    filename: 'nm-webchat-widget.js',
    path: path.resolve(__dirname, 'build'),
    library: 'SampleWebchat',
    libraryExport: 'default',
    libraryTarget: 'window'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({ 'process.env': JSON.stringify(dotEnv.parsed) }),
    new HtmlPlugin({ template: './src/index.html' })
  ]
};
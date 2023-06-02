const dotEnv = require('dotenv').config();
const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = function() {
  const { QA_TWILIO_ACCOUNT_SID, QA_TWILIO_FLEX_FLOW_SID, QA_AWS_ENDPOINT } = dotEnv.parsed;
  const processEnv = {
    TWILIO_ACCOUNT_SID: QA_TWILIO_ACCOUNT_SID,
    TWILIO_FLEX_FLOW_SID: QA_TWILIO_FLEX_FLOW_SID,
    AWS_ENDPOINT: QA_AWS_ENDPOINT
  };
  return {
    entry: './src/index.js',
    mode: 'production',
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader']
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
    performance: {
      maxEntrypointSize: 1000000,
      maxAssetSize: 1000000
    },
    output: {
      filename: 'nm-webchat-widget.min.js',
      path: path.resolve(__dirname, 'qa'),
      library: 'SampleWebchat',
      libraryExport: 'default',
      libraryTarget: 'window'
    },
    plugins: [
      new CleanWebpackPlugin(),
      new webpack.DefinePlugin({ 'process.env': JSON.stringify(processEnv) }),
      new HtmlPlugin({ template: './src/qa-index.html', inlineSource: '.(js|css)$' }),
      new HtmlWebpackInlineSourcePlugin()
    ]
  };
};
const path = require('path');
// 不需要将node_modules打包进最终的bundle
const webpackNodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node',
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: path.resolve(__dirname, '../src/server.js'),
  output: {
    filename: 'bundle_server.js',
    path: path.resolve(__dirname, '../dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/',
      },
    ],
  },
  externals: [webpackNodeExternals()],
};

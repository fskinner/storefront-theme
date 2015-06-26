var webpack = require('webpack');
var path = require('path');
var node_modules_dir = path.join(__dirname, 'node_modules');
var config = require('./webpack.config.js');

config.module = {
  preLoaders: [{
    test: /\.js$|\.jsx$/,
    exclude: /node_modules/,
    loader: 'jsxhint'
  }],

  loaders: [
    {
      test: /\.js$|\.jsx$/,
      exclude: [node_modules_dir],
      loader: 'babel-loader'
    }, {
      test: /\.less$/,
      loader: 'style-loader!css-loader!less-loader'
    }, {
      test: /\.css$/,
      loader: "style-loader!css-loader"
    }, {
      test: /\.(png|jpg|woff)$/,
      loader: "url-loader?limit=100000"
    }, {
      test: /\.jpg$/,
      loader: "file-loader"
    }
  ]
};

config.entry = [
  './src/storefront-theme.jsx'
];

config.externals = {
  'storefront': 'storefront',
  'react': 'React',
  'react-router': 'ReactRouter',
  intl: 'Intl',
  'react-intl': 'ReactIntl'
};

config.plugins = [
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin(),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.AggressiveMergingPlugin()
];

module.exports = config;
